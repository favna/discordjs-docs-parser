import type { Doc } from '../Doc';
import type { DocumentationTypeDefinition } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';

/**
 * Represents an instance of a Typedef in the DiscordJS documentation
 */
export class DocTypedef extends DocElement {
  public constructor(doc: Doc, data: DocumentationTypeDefinition) {
    super(doc, DocTypes.Typedef, data);
    this.type = data.type?.flat(5) ?? null;
  }
}
