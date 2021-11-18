import type { Doc } from '../Doc';
import type { Sources } from './enums';

export const docCache = new Map<Sources, Doc>();
