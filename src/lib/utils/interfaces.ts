import type { DocClass } from '../elements/Class';
import type { DocEvent } from '../elements/Event';
import type { DocFunction } from '../elements/Function';
import type { DocInterface } from '../elements/Interface';
import type { DocMethod } from '../elements/Method';
import type { DocParam } from '../elements/Param';
import type { DocProp } from '../elements/Prop';
import type { DocTypedef } from '../elements/Typedef';
import { DocTypes } from './constants';

export interface DocTypesToClassType {
  [DocTypes.Class]: DocClass;
  [DocTypes.Event]: DocEvent;
  [DocTypes.Function]: DocFunction;
  [DocTypes.Interface]: DocInterface;
  [DocTypes.Method]: DocMethod;
  [DocTypes.Param]: DocParam;
  [DocTypes.Prop]: DocProp;
  [DocTypes.Typedef]: DocTypedef;
}

/**
 * The options that can be provided to `Doc.fetch`
 */
export interface FetchOptions {
  force?: boolean;
}

/**
 * The options that can be provided to `doc.search`
 */
export interface SearchOptions {
  /**
   * Whether to exclude private elements or not
   * @default false
   */
  excludePrivateElements?: boolean;
  /**
   * The Jaro Winkler minimum threshold distance.
   * Decrease this to more often get matches.
   * @default 0.8 (80%)
   */
  jaroWinklerMinimumThreshold?: number;
}

export interface ElementJSON {
  name: string;
  description: string;
  internal_type: DocTypes | null;
  parent?: string;
  props?: string[];
  methods?: string[];
  events?: string[];
  params?: string[];
  type?: string;
  examples?: string[];
  returns?: Partial<{ type: string; description: string }>;
}

/**
 * Global options to configure the Doc output
 */
export interface DocParserGlobalOptions {
  /**
   * Whether to escape markdown links in the output.
   * @default false
   */
  escapeMarkdownLinks: boolean;
  /**
   * The maximum number of characters to show in the description.
   * @default 1500
   */
  descriptionLimit: number;
}

export interface FuzzySearchFormat {
  id: string | null;
  name: string | null;
}

export interface FuzzySearchFormatWithScore extends FuzzySearchFormat {
  score: number;
}

export type SourcesStringUnion = 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest';
