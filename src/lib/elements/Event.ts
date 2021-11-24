import type { DocumentationClassEvent } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocParam } from './Param';

export class DocEvent extends DocElement {
  public constructor(parent: DocElement, data: DocumentationClassEvent) {
    super(parent.doc, DocTypes.Event, data, parent);
    this.adoptAll(data.params, DocParam);
  }

  public get formattedName() {
    return `${this.parent?.name ?? ''}#${this.name}`;
  }
}
