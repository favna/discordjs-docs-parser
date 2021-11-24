import type { Doc } from '../Doc';
import type { DocumentationClass, DocumentationClassConstructor } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocEvent } from './Event';
import { DocMethod } from './Method';
import { DocProp } from './Prop';

export class DocClass extends DocElement {
  public readonly construct: DocumentationClassConstructor;

  public constructor(doc: Doc, data: DocumentationClass) {
    super(doc, DocTypes.Class, data);

    this.construct = data.construct;

    this.adoptAll(data.props, DocProp);
    this.adoptAll(data.methods, DocMethod);
    this.adoptAll(data.events, DocEvent);
  }
}
