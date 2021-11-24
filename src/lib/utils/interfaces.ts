import type { DocClass } from '../elements/Class';
import type { DocEvent } from '../elements/Event';
import type { DocInterface } from '../elements/Interface';
import type { DocMethod } from '../elements/Method';
import type { DocParam } from '../elements/Param';
import type { DocProp } from '../elements/Prop';
import type { DocTypedef } from '../elements/Typedef';
import type { DocTypes } from './enums';

export interface DocTypesToClassType {
  [DocTypes.Class]: DocClass;
  [DocTypes.Event]: DocEvent;
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
  excludePrivateElements?: boolean;
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

export interface DocParserGlobalOptions {
  escapeMarkdownLinks: boolean;
}
