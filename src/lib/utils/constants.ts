import type { Doc } from '../Doc';
import type { SourcesStringUnion } from './interfaces';

export const docCache = new Map<SourcesStringUnion, Doc>();
