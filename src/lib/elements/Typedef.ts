import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';

export class DocTypedef extends DocElement {
  public constructor(doc: any, data: any) {
    super(doc, DocTypes.Typedef, data);
    this.type = data.type.flat(5);
  }
}
