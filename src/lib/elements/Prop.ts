import type { DocumentationClassProperty } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';

export class DocProp extends DocElement {
  public constructor(parent: DocElement, data: DocumentationClassProperty) {
    super(parent.doc, DocTypes.Prop, data, parent);
    this.scope = data.scope ?? null;
    this.type = data.type.flat(5);
    this.nullable = data.nullable || false;
  }

  public override get formattedName() {
    return `${this.parent?.name ?? ''}${this.static ? '.' : '#'}${this.name}`;
  }
}
