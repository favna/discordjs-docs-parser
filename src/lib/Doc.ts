import Fuse from 'fuse.js/dist/fuse.basic.min.js';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { sources } from './sources';
import { DocBase, DocClass, DocInterface, DocTypedef } from './elements';

const docCache = new Map();

const DJS = 'discordjs';
const AKAIRO = 'discord-akairo';

function dissectURL(url: string) {
  const parts = url.slice(34).split('/');
  return [parts[0], parts[1], parts[3].slice(0, -5)];
}

export class Doc extends DocBase {
  public readonly url: string;

  private fuse: Fuse<any>;
  private project: string;
  private repo: string;
  private branch: string;

  public constructor(url: any, docs: any) {
    super(docs);
    this.url = url;
    [this.project, this.repo, this.branch] = dissectURL(url);

    this.adoptAll(docs.classes, DocClass);
    this.adoptAll(docs.typedefs, DocTypedef);
    this.adoptAll(docs.interfaces, DocInterface);

    this.fuse = new Fuse(this.toFuseFormat(), {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 80,
      //   maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'id']
      //   id: 'id'
    });
  }

  public get repoURL() {
    return `https://github.com/${this.project}/${this.repo}/blob/${this.branch}`;
  }

  public get baseURL() {
    switch (this.project) {
      case DJS:
        return 'https://discord.js.org';
      case AKAIRO:
        return 'https://discord-akairo.github.io';
      default:
        return null;
    }
  }

  public get baseDocsURL() {
    if (!this.baseURL) return null;
    const repo = ['discord.js', AKAIRO].includes(this.repo) ? 'main' : this.repo;
    return `${this.baseURL}/#/docs/${repo}/${this.branch}`;
  }

  public get icon() {
    if (!this.baseURL) return null;
    return `${this.baseURL}/favicon.ico`;
  }

  public get color() {
    switch (this.project) {
      case DJS:
        return 0x2296f3;
      case AKAIRO:
        return 0x87202f;
      default:
        return null;
    }
  }

  public get(...terms: any[]) {
    const exclude = Array.isArray(terms[0]) ? terms.shift() : [];
    terms = terms.filter((term) => term).map((term) => term.toLowerCase());

    let elem = this.findChild(terms.shift());
    if (!elem || !terms.length) return elem || null;

    while (terms.length) {
      const term = terms.shift();
      // @ts-expect-error - TODO to figure out
      const child = elem.findChild(term, exclude);

      if (!child) return null;
      // @ts-expect-error - TODO to figure out
      elem = terms.length && child.typeElement ? child.typeElement : child;
    }

    return elem;
  }

  public search(query: any, { excludePrivateElements }: any = {}) {
    const result = this.fuse.search(query);
    if (!result.length) return null;

    const filtered = [];

    while (result.length > 0 && filtered.length < 10) {
      // @ts-expect-error - TODO to figure out
      const element = this.get(filtered, ...result.shift().split('#'));
      // @ts-expect-error - TODO to figure out
      if (excludePrivateElements && element.access === 'private') continue;
      filtered.push(element);
    }

    return filtered;
  }

  public resolveEmbed(query: any, options: any = {}) {
    const element = this.get(...query.split(/\.|#/));
    // @ts-expect-error - TODO to figure out
    if (element) return element.embed(options);

    const searchResults = this.search(query, options);
    if (!searchResults) return null;

    const embed = this.baseEmbed();
    // @ts-expect-error - TODO to figure out
    embed.title = 'Search results:';
    // @ts-expect-error - TODO to figure out
    embed.description = searchResults
      .map((el) => {
        // @ts-expect-error - TODO to figure out
        const prefix = el.embedPrefix;
        // @ts-expect-error - TODO to figure out
        return `${prefix ? `${prefix} ` : ''}**${el.link}**`;
      })
      .join('\n');
    return embed;
  }

  public toFuseFormat() {
    const parents = Array.from(this.children.values());

    const children = parents.map((parent) => Array.from(parent.children.values())).reduce((a, b) => a.concat(b));

    const formattedParents = parents.map(({ name }) => ({ id: name, name }));
    // @ts-expect-error - TODO to figure out
    const formattedChildren = children.map(({ name, parent }) => ({ id: `${parent.name}#${name}`, name }));

    return formattedParents.concat(formattedChildren);
  }

  public toJSON() {
    const json = {};

    for (const key of ['classes', 'typedefs', 'interfaces']) {
      // @ts-expect-error - TODO to figure out
      if (!this[key]) continue;
      // @ts-expect-error - TODO to figure out
      json[key] = this[key].map((item) => item.toJSON());
    }

    return json;
  }

  public baseEmbed() {
    const title: any =
      {
        'discord.js': 'Discord.js Docs',
        commando: 'Commando Docs',
        rpc: 'RPC Docs',
        'discord-akairo': 'Akairo Docs',
        collection: 'Collection'
      }[this.repo] || this.repo;

    return {
      color: this.color,
      author: {
        name: `${title} (${this.branch})`,
        url: this.baseDocsURL,
        icon_url: this.icon
      }
    };
  }

  public formatType(types: any) {
    const typestring = types
      .map((text: any, index: any) => {
        if (/<|>|\*/.test(text)) {
          return text
            .split('')
            .map((char: any) => `\\${char}`)
            .join('');
        }

        const typeElem = this.findChild(text.toLowerCase());
        const prependOr = index !== 0 && /\w|>/.test(types[index - 1]) && /\w/.test(text);

        // @ts-expect-error - TODO to figure out
        return (prependOr ? '|' : '') + (typeElem ? typeElem.link : text);
      })
      .join('');

    return `**${typestring}**`;
  }

  public static getRepoURL(id: any) {
    const [name, branch] = id.split('/');
    // @ts-expect-error - TODO to figure out
    const project: any = {
      main: 'discord.js',
      commando: 'Commando',
      rpc: 'RPC'
    }[name];

    return `https://github.com/discordjs/${project}/blob/${branch}/`;
  }

  public static sources() {
    return sources;
  }

  public static async fetch(sourceName: any, { force }: any = {}) {
    const url = sources.get(sourceName) ?? sourceName;
    if (!force && docCache.has(url)) return docCache.get(url);

    try {
      const data = await fetch(url, FetchResultTypes.JSON);
      const doc = new Doc(url, data);
      docCache.set(url, doc);
      return doc;
    } catch (err) {
      throw new Error('invalid source name or URL.');
    }
  }
}
