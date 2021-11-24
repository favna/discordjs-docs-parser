import type { Doc } from '../Doc';
import type { DocumentationInterface } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocMethod } from './Method';
import { DocProp } from './Prop';

export class DocInterface extends DocElement {
  public constructor(doc: Doc, data: DocumentationInterface) {
    super(doc, DocTypes.Interface, data);
    this.adoptAll(data.props, DocProp);
    this.adoptAll(data.methods, DocMethod);
  }
}
