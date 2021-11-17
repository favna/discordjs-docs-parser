import { DocElement } from './Element';

export class DocTypedef extends DocElement {
  public constructor(doc: any, data: any) {
    super(doc, DocElement.types.TYPEDEF, data);
    this.type = data.type.flat(5);
  }
}
