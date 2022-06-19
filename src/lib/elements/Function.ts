import type { Doc } from '../Doc';
import type { DocumentationFunction } from '../types/DocgenOutput';
import { DocTypes } from '../utils/constants';
import { DocElement } from './Element';
import { DocParam } from './Param';

/**
 * Represents a Function in the DiscordJS documentation
 */
export class DocFunction extends DocElement {
  public constructor(doc: Doc, data: DocumentationFunction) {
    super(doc, DocTypes.Function, data);

    this.examples = data.examples || null;
    this.returns = data.returns ?? null;
    this.scope = data.scope ?? null;

    if (data.params) {
      this.adoptAll(data.params, DocParam);
    }
  }
}
