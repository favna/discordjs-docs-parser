import { cutText, filterNullAndUndefinedAndEmpty, isNullishOrEmpty } from '@sapphire/utilities';
import { Doc } from '../Doc';
import type { DocIterateeUnion, DocumentationClassMeta, DocumentationReturns } from '../types/DocgenOutput';
import { DocTypes } from '../utils/constants';
import type { ElementJSON } from '../utils/interfaces';
import { DocBase } from './Base';

/**
 * Represents any type of element in the DiscordJS documentation
 */
export class DocElement extends DocBase {
  public doc: Doc;
  public parent: DocElement | null;

  public description: string | null;
  public meta: DocumentationClassMeta | null;

  public returns: DocumentationReturns | string[][][] | null;
  public examples: string[] | null;
  public type: string[] | null;
  public nullable: boolean;
  public deprecated: boolean;
  public access: string;
  public scope: string | null;
  public extends: string[][] | null;
  public implements: string[][] | null;

  public constructor(doc: Doc, docType: DocTypes, data: DocIterateeUnion, parent?: DocElement) {
    super(docType, data.name);
    this.doc = doc;
    this.parent = parent ?? null;

    this.meta = Reflect.get(data, 'meta') ?? null;

    this.description = Reflect.get(data, 'description') ?? null;
    this.scope = Reflect.get(data, 'scope') ?? null;
    this.extends = Reflect.get(data, 'extends') ?? null;
    this.implements = Reflect.get(data, 'implements') ?? null;

    this.returns = null;
    this.examples = null;
    this.type = null;
    this.nullable = false;

    this.deprecated = Reflect.get(data, 'deprecated') ?? false;
    this.access = Reflect.get(data, 'access') ?? 'public';
  }

  /**
   * Returns the URL to this element on the [discord.js documentation](https://discord.js.org/).
   */
  public get url(): string | null {
    const path = this.parent
      ? `${this.parent.docType}/${this.parent.name}?scrollTo=${this.anchor || ''}${this.name}`
      : `${this.docType}/${this.name}`;

    return `${this.doc.baseDocsURL}/${path || 'general/welcome'}`;
  }

  /**
   * Returns the url to the source code for this element.
   */
  public get sourceURL() {
    if (isNullishOrEmpty(this.doc.repoURL) || isNullishOrEmpty(this.meta)) return null;

    const { path, file, line } = this.meta;
    return `${this.doc.repoURL}/${path}/${file}#L${line}`;
  }

  /**
   * Returns the pre-formatted name for this element.
   * This is either the name, or if it is nullish then an empty string.
   */
  public get formattedName(): string {
    return this.name ?? '';
  }

  /**
   * Returns the pre-formatted description of this element.
   */
  public get formattedDescription(): string {
    let result = this.formatText(this.description);

    if (result.length > Doc.globalOptions.descriptionLimit) {
      result = `${cutText(result, Doc.globalOptions.descriptionLimit)}\nDescription truncated. View full description [here](${this.url}).`;
    }

    return result;
  }

  /**
   * Returns the pre-formatted link of this element.
   * By default this will be returned as a regular markdown masked link.
   * You can further customize this by setting {@link Doc.globalOptions.escapeMarkdownLinks}
   * which will wrap the links with `<...>` so sending the link through a Webhook or Interaction reply
   * will not embed that link in the chat.
   */
  public get link(): string {
    if (!this.url) return '';

    const escapedUrl = `${Doc.globalOptions.escapeMarkdownLinks ? '<' : ''}${this.url}${Doc.globalOptions.escapeMarkdownLinks ? '>' : ''}`;

    return `[${this.formattedName}](${escapedUrl})`;
  }

  /**
   * Returns whether this element is static or not.
   */
  public get static(): boolean {
    return this.scope === 'static';
  }

  /** @internal */
  public get typeElement(): DocElement | null {
    if (isNullishOrEmpty(this.type)) return null;

    return (
      this.type
        .filter((text) => /^\w+$/.test(text))
        .map((text) => this.doc.findChild(text.toLowerCase()))
        .find((elem) => elem) ?? null
    );
  }

  /** @internal */
  private get anchor() {
    if (this.static) return 's-';
    else if (this.docType === DocTypes.Event) return 'e-';
    return null;
  }

  /**
   * Overrides what should be returned when calling `JSON.stringify` on this class
   */
  public toJSON(): ElementJSON {
    const json: ElementJSON = {
      name: this.name ?? '',
      description: this.description ?? '',
      internal_type: this.docType
    };

    if (this.props) {
      Reflect.set(json, 'props', this.props.map((prop) => prop.name).filter(filterNullAndUndefinedAndEmpty));
    }

    if (this.parent) {
      Reflect.set(json, 'parent', this.parent.name ?? undefined);
    }

    if (this.methods) {
      Reflect.set(json, 'methods', this.methods.map((method) => method.name).filter(filterNullAndUndefinedAndEmpty));
    }

    if (this.events) {
      Reflect.set(json, 'events', this.events.map((event) => event.name).filter(filterNullAndUndefinedAndEmpty));
    }

    if (this.params) {
      Reflect.set(
        json,
        'params',
        this.params.map((param) => JSON.stringify(param))
      );
    }

    if (this.type) {
      Reflect.set(json, 'type', this.type.join(''));
    }

    if (this.examples) {
      Reflect.set(json, 'examples', this.examples);
    }

    return json;
  }

  /**
   * @internal
   */
  private formatText(text: string | null) {
    if (isNullishOrEmpty(text)) return '';

    return text
      .replace(/\{@link (.+?)\}/g, (_match, name) => {
        const element = this.doc.get(...name.split(/\.|#/));
        return element ? element.link : name;
      })
      .replace(/(```[^]+?```)|(^[*-].+$)?\n(?![*-])/gm, (match, codeblock, hasListBefore) => {
        if (codeblock) return codeblock;
        if (hasListBefore) return match;
        return ' ';
      })
      .replace(/<(info|warn)>([^]+?)<\/(?:\1)>/g, '\n**$2**\n')
      .replace(/<\/?p>/g, '') // remove paragraph tags
      .replace(/<\/?code>/g, '`') // format code tags
      .replace(/<a href="(.+)">(.+)<\/a>/g, '[$2]($1)') // format anchor tags
      .replace(/\[(.+?)\]\((.+?)\)/g, '[$1](<$2>)'); // escape markdown links
  }
}
