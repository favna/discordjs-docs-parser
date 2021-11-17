import { DocElement } from './Element';

export class DocProp extends DocElement {
  public scope: string;
  public type: string;
  public nullable: boolean;

  public constructor(parent: any, data: any) {
    super(parent.doc, DocElement.types.PROP, data, parent);
    this.scope = data.scope;
    this.type = data.type.flat(5);
    this.nullable = data.nullable || false;
  }

  public get formattedName() {
    return [this.parent.name, this.static ? '.' : '#', this.name].join('');
  }
}
