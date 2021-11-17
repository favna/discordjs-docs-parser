import { DocElement } from './Element';
import { DocParam } from './Param';

export class DocEvent extends DocElement {
  public constructor(parent: any, data: any) {
    super(parent.doc, DocElement.types.EVENT, data, parent);
    this.adoptAll(data.params, DocParam);
  }

  public get formattedName() {
    return `${this.parent.name}#${this.name}`;
  }
}
