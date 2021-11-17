import { stripIndents } from 'common-tags';
import type { DocParam } from '.';
import type { DocTypes } from '..';
import { DocBase } from './Base';

const DESCRIPTION_LIMIT = 1500;

export class DocElement extends DocBase {
  public doc: any;
  public parent: any;

  public description: string;
  public meta: any;

  public returns: any;
  public examples: any;
  public type: any;
  public nullable: any;
  public deprecated: boolean;
  public access: string;

  public constructor(doc: any, docType: DocTypes, data: any, parent?: DocElement) {
    super(data, docType, data.name);
    this.doc = doc;
    this.parent = parent ?? null;

    this.description = data.description;
    this.meta = data.meta;

    this.returns = null;
    this.examples = null;
    this.type = null;
    this.nullable = null;

    this.deprecated = data.deprecated || false;
    this.access = data.access || 'public';
  }

  public get embedPrefix() {
    const { types } = DocElement;
    const emoji = (char: any) => `:regional_indicator_${char}:`;

    switch (this.docType) {
      case types.CLASS:
        return emoji('c');
      case types.EVENT:
        return emoji('e');
      case types.INTERFACE:
        return emoji('i');
      case types.METHOD:
        return emoji('m');
      case types.TYPEDEF:
        return emoji('t');
      case types.PROP:
        return emoji('p');
      default:
        return null;
    }
  }

  public get anchor() {
    if (this.static) return 's-';
    else if (this.docType === DocElement.types.EVENT) return 'e-';
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
    if (!this.doc.repoURL) return null;

    const { path, file, line } = this.meta;
    return `${this.doc.repoURL}/${path}/${file}#L${line}`;
  }

  public get formattedName(): string {
    return this.name ?? '';
  }

  public get formattedDescription(): string {
    let result = this.formatText(this.description);

    if (result.length > DESCRIPTION_LIMIT) {
      result = `${result.slice(0, DESCRIPTION_LIMIT)}...\nDescription truncated. View full description [here](${this.url}).`;
    }

    return result;
  }

  public get formattedReturn() {
    return this.formatText(this.returns);
  }

  public get formattedType() {
    return `${this.nullable ? '?' : ''}${this.doc.formatType(this.type)}`;
  }

  public get formattedExtends() {
    // @ts-expect-error - TODO to figure out
    return `(extends ${this.formatInherits(this.extends)})`;
  }

  public get formattedImplements() {
    // @ts-expect-error - TODO to figure out
    return `(implements ${this.formatInherits(this.implements)})`;
  }

  public get link(): string {
    return `[${this.formattedName}](${this.url})`;
  }

  public get static(): boolean {
    // @ts-expect-error - TODO to figure out
    return this.scope === 'static';
  }

  public get typeElement() {
    if (!this.type) return null;

    return this.type
      .filter((text: any) => /^\w+$/.test(text))
      .map((text: any) => this.doc.findChild(text.toLowerCase()))
      .find((elem: any) => elem);
  }

  public embed(options = {}) {
    const embed = this.doc.baseEmbed();
    let name = `__**${this.link}**__`;

    // @ts-expect-error - TODO to figure out
    if (this.extends) name += ` ${this.formattedExtends}`;
    // @ts-expect-error - TODO to figure out
    if (this.implements) name += ` ${this.formattedImplements}`;
    if (this.access === 'private') name += ' **PRIVATE**';
    if (this.deprecated) name += ' **DEPRECATED**';

    embed.description = `${name}\n${this.formattedDescription}`;
    embed.url = this.url;
    embed.fields = [];
    this.formatEmbed(embed, options);
    embed.fields.push({
      name: '\u200b',
      value: `[View source](${this.sourceURL})`
    });

    return embed;
  }

  public formatEmbed(embed: any, options: any = {}) {
    this.attachProps(embed, options);
    this.attachMethods(embed, options);
    this.attachEvents(embed);
    this.attachParams(embed);
    this.attachType(embed);
    this.attachReturn(embed);
    this.attachExamples(embed);
  }

  public attachProps(embed: any, { excludePrivateElements }: any = {}) {
    if (!this.props) return;

    let { props } = this;
    if (excludePrivateElements) props = props.filter((prop: any) => prop.access !== 'private');
    if (props.length === 0) return;

    embed.fields.push({
      name: 'Properties',
      value: props.map((prop) => `\`${prop.name}\``).join(' ')
    });
  }

  public attachMethods(embed: any, { excludePrivateElements }: any = {}) {
    if (!this.methods) return;

    let { methods } = this;
    if (excludePrivateElements) methods = methods.filter((prop) => prop.access !== 'private');
    if (methods.length === 0) return;

    embed.fields.push({
      name: 'Methods',
      value: methods.map((method) => `\`${method.name}\``).join(' ')
    });
  }

  public attachEvents(embed: any) {
    if (!this.events) return;
    embed.fields.push({
      name: 'Events',
      value: this.events.map((event) => `\`${event.name}\``).join(' ')
    });
  }

  public attachParams(embed: any) {
    if (!this.params) return;
    const params = this.params.map((param: DocParam) => {
      return stripIndents`
        ${param.formattedName} ${param.formattedType}
        ${param.formattedDescription}
      `;
    });

    const slice = params.splice(0, 5);
    embed.fields.push({ name: 'Params', value: slice.join('\n\n') });

    while (params.length > 0) {
      const slice = params.splice(0, 5);
      embed.fields.push({ name: '\u200b', value: slice.join('\n\n') });
    }
  }

  public attachReturn(embed: any) {
    if (!this.returns) return;
    embed.fields.push({
      name: 'Returns',
      value: this.formattedReturn
    });
  }

  public attachType(embed: any) {
    if (!this.type) return;
    embed.fields.push({
      name: 'Type',
      value: this.formattedType
    });
  }

  public attachExamples(embed: any) {
    if (!this.examples) return;
    embed.fields.push({
      name: 'Examples',
      value: this.examples.map((ex: any) => `\`\`\`js\n${ex}\n\`\`\``).join('\n')
    });
  }

  public toJSON() {
    const json: any = {
      name: this.name,
      description: this.description,
      internal_type: this.docType
    };

    if (this.props) json.props = this.props.map((prop) => prop.name);
    if (this.parent) json.parent = this.parent.name;
    if (this.methods) json.methods = this.methods.map((method) => method.name);
    if (this.events) json.events = this.events.map((event) => event.name);
    if (this.params) json.params = this.params.map((param) => JSON.stringify(param));
    if (this.type) json.type = this.type.join('');
    if (this.examples) json.examples = this.examples;

    return json;
  }

  public formatInherits(inherits: any) {
    inherits = Array.isArray(inherits[0])
      ? inherits.map((element: any) => element.flat(5)) // docgen 0.9.0 format
      : inherits.map((baseClass: any) => [baseClass]); // docgen 0.8.0 format

    return inherits.map((baseClass: any) => this.doc.formatType(baseClass)).join(' and ');
  }

  public formatText(text: any) {
    if (!text) return '';

    return text
      .replace(/\{@link (.+?)\}/g, (_match: any, name: any) => {
        const element = this.doc.get(...name.split(/\.|#/));
        return element ? element.link : name;
      })
      .replace(/(```[^]+?```)|(^[*-].+$)?\n(?![*-])/gm, (match: any, codeblock: any, hasListBefore: any) => {
        if (codeblock) return codeblock;
        if (hasListBefore) return match;
        return ' ';
      })
      .replace(/<(info|warn)>([^]+?)<\/(?:\1)>/g, '\n**$2**\n')
      .replace(/<\/?p>/g, '') // remove paragraph tags
      .replace(/<\/?code>/g, '`') // format code tags
      .replace(/<a href="(.+)">(.+)<\/a>/g, '[$2]($1)'); // format anchor tags
  }

  public static get types() {
    return DocBase.types;
  }
}
