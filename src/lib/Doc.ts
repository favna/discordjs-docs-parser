import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { filterNullishOrEmpty, isNullish, isNullishOrEmpty } from '@sapphire/utilities';
import { jaroWinkler } from '@skyra/jaro-winkler';
import type { DocElement } from '../lib/elements/Element';
import { DocBase } from './elements/Base';
import { DocClass } from './elements/Class';
import { DocInterface } from './elements/Interface';
import { DocTypedef } from './elements/Typedef';
import type { Documentation } from './types/DocgenOutput';
import { docCache, sources } from './utils/constants';
import type {
  DocParserGlobalOptions,
  FetchOptions,
  FuzzySearchFormat,
  FuzzySearchFormatWithScore,
  SearchOptions,
  SourcesStringUnion
} from './utils/interfaces';

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

  /** @internal */
  private fuzzySearchFormat: FuzzySearchFormat[];

  public constructor(url: string, docs: Documentation) {
    super();

    this.url = url;
    [this.project, this.repo, this.branch] = dissectURL(url);

    this.adoptAll(docs.classes, DocClass);
    this.adoptAll(docs.typedefs, DocTypedef);
    this.adoptAll(docs.interfaces, DocInterface);

    this.fuzzySearchFormat = this.toFuzzySearchFormat();
  }

  public get repoURL() {
    return `https://github.com/${this.project}/${this.repo}/tree/${this.branch}`;
  }

  public get baseDocsURL() {
    const repo = this.repo === 'discord.js' ? 'main' : this.repo;
    return `${this.baseURL}/#/docs/${repo}/${this.branch}/general/welcome`;
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
  public get(...terms: (string | (DocElement | null)[])[]): DocElement | null {
    const exclude = Array.isArray(terms[0]) ? (terms.shift() as (DocElement | null)[]) : [];

    terms = terms.filter(filterNullishOrEmpty).map((term) => {
      if (typeof term === 'string') {
        return term.toLowerCase();
      }

      return term;
    });

    let elem = this.findChild(terms.shift() as string);
    if (isNullishOrEmpty(elem) || !terms.length) {
      return elem || null;
    }

    while (terms.length) {
      const term = terms.shift();
      const child: DocElement | undefined = elem!.findChild(term as string, exclude);

      if (!child) return null;
      elem = terms.length && child.typeElement ? child.typeElement : child;
    }

    return elem ?? null;
  }

  /**
   * Searches the documentation for elements matching the provided search query.
   *
   * This uses the [Jaro Winkler Distance](https://en.wikipedia.org/wiki/Jaro–Winkler_distance) algorithm
   * to fuzzily match your query against any potential matches.
   * The minimum threshold for a match is 80%
   *
   * @param query The query to use in the fuzzy search.
   * @param searchOptions Additional options to pass to the `search` function.
   * @returns The top 10 hits from the search.
   */
  public search(query: string, searchOptions: SearchOptions = {}) {
    // Replace all dots with hashes
    query = query.replaceAll('.', '#');

    const results = this.findWithJaroWinkler(query);
    if (!results.length) return null;

    const filtered = [];

    do {
      const element = this.get(filtered, ...(results.shift()?.id?.split('#') ?? []));

      if (isNullish(element)) continue;
      if (searchOptions.excludePrivateElements && element.access === 'private') continue;

      filtered.push(element);
    } while (results.length > 0);

    return filtered;
  }

  /** @internal */
  private toFuzzySearchFormat(): FuzzySearchFormat[] {
    const parents = Array.from(this.children.values());

    const children = parents.map((parent) => Array.from(parent.children.values())).reduce((a, b) => a.concat(b));

    const formattedParents = parents.map(({ name }) => ({ id: name, name }));
    const formattedChildren = children.map(({ name, parent }) => ({ id: `${parent ? `${parent.name}#` : ''}${name}`, name }));

    return formattedParents.concat(formattedChildren);
  }

  /** @internal */
  private findWithJaroWinkler(query: string): FuzzySearchFormatWithScore[] {
    const possibles: FuzzySearchFormatWithScore[] = [];

    for (const { id, name } of this.fuzzySearchFormat) {
      if (!id || !name) continue;

      const score = jaroWinkler(query.toLowerCase(), id.toLowerCase());

      if (score > 0.8) {
        possibles.push({ id, name, score });
      }
    }

    return possibles.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  /**
   * Global options to configure the Doc output
   * @property escapeMarkdownLinks Whether to escape markdown links in the output. (default: `false`)
   * @property descriptionLimit The maximum number of characters to show in the description. (default: `1500`)
   */
  public static globalOptions: DocParserGlobalOptions = {
    escapeMarkdownLinks: false,
    descriptionLimit: 1500
  };

  /**
   * Fetches the documentation JSON file and builds up a {@link Doc} object.
   * @param sourceName The name of the source to fetch.
   * @param fetchOptions Additional options to pass to the `fetch` function.
   * @returns An instance of {@link Doc}
   * @example
   * ```javascript
   * const { Doc } = require('discordjs-docs-parser');
   *
   * const doc = await Doc.fetch('stable');
   * ```
   * @example
   * ```typescript
   * import { Doc } from 'discordjs-docs-parser';
   *
   * const doc = await Doc.fetch('collection', { force: true });
   * ```
   */
  public static async fetch(sourceName: SourcesStringUnion, fetchOptions: FetchOptions = {}) {
    if (!fetchOptions.force && docCache.has(sourceName)) {
      return docCache.get(sourceName)!;
    }

    const url = sources.get(sourceName);
    if (!url) {
      throw new Error(
        '[DiscordJsDocsParser] An invalid source was provided. The valid sources are "stable", "main", "rpc", "collection", "builders", and "voice" '
      );
    }

    try {
      const data = await fetch<Documentation>(url, FetchResultTypes.JSON);
      const doc = new Doc(url, data);
      docCache.set(sourceName, doc);
      return doc;
    } catch (err) {
      throw err;
    }
  }
}

function dissectURL(url: string) {
  const parts = url.slice(34).split('/');

  return [parts[0], parts[1], parts[3].slice(0, -5)];
}
