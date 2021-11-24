import { fetch, FetchResultTypes } from '@sapphire/fetch';
import Fuse from 'fuse.js/dist/fuse.basic.min.js';
import type { DocElement } from '../lib/elements/Element';
import { DocBase } from './elements/Base';
import { DocClass } from './elements/Class';
import { DocInterface } from './elements/Interface';
import { DocTypedef } from './elements/Typedef';
import type { Documentation } from './types/DocgenOutput';
import { docCache } from './utils/constants';
import type { Sources } from './utils/enums';
import type { FetchOptions, SearchOptions } from './utils/interfaces';
import { sources } from './utils/sources';
import { buildErrorMessage, dissectURL } from './utils/utils';

export class Doc extends DocBase {
  /**
   * The documentation base URL.
   */
  public readonly baseURL: string = 'https://discord.js.org';
  /**
   * The project dissected from the {@link url}.
   */
  public readonly project: string;
  /**
   * The repository dissected from the {@link url}.
   */
  public readonly repo: string;
  /**
   * The branch dissected from the {@link url}.
   */
  public readonly branch: string;
  /**
   * The raw URL of the JSON that was fetched
   */
  public readonly url: string;

  /**
   * @internal
   */
  private fuse: Fuse<{
    id: string | null;
    name: string | null;
  }>;

  public constructor(url: string, docs: Documentation) {
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
      minMatchCharLength: 1,
      keys: ['name', 'id']
    });
  }

  public get repoURL() {
    return `https://github.com/${this.project}/${this.repo}/blob/${this.branch}`;
  }

  public get baseDocsURL() {
    if (!this.baseURL) return null;
    const repo = this.repo === 'discord.js' ? 'main' : this.repo;
    return `${this.baseURL}/#/docs/${repo}/${this.branch}`;
  }

  /**
   * Gets the documentation for one element.
   * @param terms The terms that lead to the element to get. Use multiple terms to get a nested element.
   * @returns Either the element or null if it doesn't exist.
   * @example
   * ```typescript
   * doc.get('message');
   * doc.get('message', 'guild');
   * doc.get('message', 'guild', 'members');
   * ```
   */
  public get(...terms: string[]): DocElement | null {
    const exclude = Array.isArray(terms[0]) ? terms.shift() : [];
    terms = terms.filter((term) => term).map((term) => term.toLowerCase());

    let elem = this.findChild(terms.shift());
    if (!elem || !terms.length) return elem || null;

    while (terms.length) {
      const term = terms.shift();
      // @ts-expect-error - TODO to figure out
      const child = elem.findChild(term, exclude);

      if (!child) return null;
      // @ts-ignore todo
      elem = terms.length && child.typeElement ? child.typeElement : child;
    }

    return elem ?? null;
  }

  public formatType(types: string[]) {
    const typestring = types
      .map((text, index) => {
        if (/<|>|\*/.test(text)) {
          return text
            .split('')
            .map((char) => `\\${char}`)
            .join('');
        }

        const typeElem = this.findChild(text.toLowerCase());
        const prependOr = index !== 0 && /\w|>/.test(types[index - 1]) && /\w/.test(text);

        return (prependOr ? '|' : '') + (typeElem ? typeElem.link : text);
      })
      .join('');

    return `**${typestring}**`;
  }

  /**
   * Searches the documentation for elements matching the provided search query.
   * @param query The query to use in the fuzzy search.
   * @param searchOptions Additional options to pass to the `search` function.
   * @returns The top 10 hits from the search.
   */
  public search(query: string, searchOptions: SearchOptions = {}) {
    const result = this.fuse.search(query);
    if (!result.length) return null;

    const filtered = [];

    while (result.length > 0 && filtered.length < 10) {
      // @ts-expect-error - TODO to figure out
      const element = this.get(filtered, ...result.shift().split('#'));
      // @ts-expect-error - TODO to figure out
      if (searchOptions.excludePrivateElements && element.access === 'private') continue;
      filtered.push(element);
    }

    return filtered;
  }

  /**
   * @internal
   */
  private toFuseFormat() {
    const parents = Array.from(this.children.values());

    const children = parents.map((parent) => Array.from(parent.children.values())).reduce((a, b) => a.concat(b));

    const formattedParents = parents.map(({ name }) => ({ id: name, name }));
    const formattedChildren = children.map(({ name, parent }) => ({ id: `${parent ? `${parent.name}#` : ''}${name}`, name }));

    return formattedParents.concat(formattedChildren);
  }

  /**
   * The limit of the {@link DocElement.formattedDescription}
   * @default 1500
   */
  public static DescriptionLimit = 1500;

  /**
   * Fetches the documentation JSON file and builds up a {@link Doc} object.
   * @param sourceName The name of the source to fetch. Be sure to use the {@link Sources} enum.
   * @param fetchOptions Additional options to pass to the `fetch` function.
   * @returns An instance of {@link Doc}
   * @example
   * ```javascript
   * const { Doc, Sources } = require('discordjs-docs-parser');
   *
   * const doc = await Doc.fetch(Sources.Main);
   * ```
   * @example
   * ```typescript
   * import { Doc, Sources } from 'discordjs-docs-parser';
   *
   * const doc = await Doc.fetch(Sources.Collection, { force: true });
   * ```
   */
  public static async fetch(sourceName: Sources, fetchOptions: FetchOptions = {}) {
    if (!fetchOptions.force && docCache.has(sourceName)) {
      return docCache.get(sourceName)!;
    }

    const url = sources.get(sourceName);
    if (!url) {
      throw new Error(buildErrorMessage('An invalid source was provided. Please make sure you\'re using the "Sources" exported enum'));
    }

    try {
      const data = await fetch<Documentation>(url, FetchResultTypes.JSON);
      const doc = new Doc(url, data);
      docCache.set(sourceName, doc);
      return doc;
    } catch (err) {
      throw new Error('invalid source name or URL.');
    }
  }
}
