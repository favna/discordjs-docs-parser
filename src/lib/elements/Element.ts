import { filterNullAndUndefinedAndEmpty, isNullishOrEmpty } from '@sapphire/utilities';
import { Doc } from '../Doc';
import type { DocIterateeUnion, DocumentationClassMeta, DocumentationReturns } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import type { ElementJSON } from '../utils/interfaces';
import { DocBase } from './Base';

export class DocElement extends DocBase {
  public doc: Doc;
  public parent: DocElement | null;

  public description: string | null;
  public meta: DocumentationClassMeta | null;

  public returns: DocumentationReturns | null;
  public examples: string[] | null;
  public type: string[] | null;
  public nullable: boolean;
  public deprecated: boolean;
  public access: string;
  public scope: string | null;
  public extends: string[][] | null;
  public implements: string[][] | null;

  public constructor(doc: Doc, docType: DocTypes, data: DocIterateeUnion, parent?: DocElement) {
    super(data, docType, data.name);
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

  public get anchor() {
    if (this.static) return 's-';
    else if (this.docType === DocTypes.Event) return 'e-';
    return null;
  }

  public get url() {
    if (!this.doc.baseDocsURL) return null;

    const path = this.parent
      ? `${this.parent.docType}/${this.parent.name}?scrollTo=${this.anchor || ''}${this.name}`
      : `${this.docType}/${this.name}`;

    return `${this.doc.baseDocsURL}/${path}`;
  }

  public get sourceURL() {
    if (isNullishOrEmpty(this.doc.repoURL) || isNullishOrEmpty(this.meta)) return null;

    const { path, file, line } = this.meta;
    return `${this.doc.repoURL}/${path}/${file}#L${line}`;
  }

  public get formattedName(): string {
    return this.name ?? '';
  }

  public get formattedDescription(): string {
    let result = this.formatText(this.description);

    if (result.length > Doc.DescriptionLimit) {
      result = `${result.slice(0, Doc.DescriptionLimit)}...\nDescription truncated. View full description [here](${this.url}).`;
    }

    return result;
  }

  public get formattedReturn() {
    if (isNullishOrEmpty(this.returns)) return '**Void**';

    const returnTypes = (this.returns.types || this.returns).map((type) => this.doc.formatType(type.flat(5))).join(' or ');

    return [returnTypes, this.formatText(this.returns.description)].filter((text) => text).join('\n');
  }

  public get formattedType() {
    return `${this.nullable ? '?' : ''}${isNullishOrEmpty(this.type) ? '' : this.doc.formatType(this.type)}`;
  }

  public get formattedExtends() {
    if (!this.extends) return null;

    return `(extends ${this.formatInherits(this.extends)})`;
  }

  public get formattedImplements() {
    if (!this.implements) return null;

    return `(implements ${this.formatInherits(this.implements)})`;
  }

  public get link(): string {
    if (!this.url) return '';

    const escapedUrl = `${Doc.globalOptions.escapeMarkdownLinks ? '<' : ''}${this.url}${Doc.globalOptions.escapeMarkdownLinks ? '>' : ''}`;

    return `[${this.formattedName}](${escapedUrl})`;
  }

  public get static(): boolean {
    return this.scope === 'static';
  }

  public get typeElement(): DocElement | null {
    if (isNullishOrEmpty(this.type)) return null;

    return (
      this.type
        .filter((text) => /^\w+$/.test(text))
        .map((text) => this.doc.findChild(text.toLowerCase()))
        .find((elem) => elem) ?? null
    );
  }

  /**
   * @internal
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
  public formatInherits(inherits: string[][]): string {
    const flattenedInherits = inherits.map((element) => element.flat(5));
    return flattenedInherits.map((baseClass) => this.doc.formatType(baseClass)).join(' and ');
  }

  /**
   * @internal
   */
  public formatText(text: string | null) {
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
      .replace(/<a href="(.+)">(.+)<\/a>/g, '[$2]($1)'); // format anchor tags
  }
}
