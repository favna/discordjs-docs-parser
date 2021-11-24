import type { DocumentationClassProperty } from '../types/DocgenOutput';
import { DocTypes } from '../utils/constants';
import { DocElement } from './Element';

/**
 * Represents a property on a class.
 */
export class DocProp extends DocElement {
  public constructor(parent: DocElement, data: DocumentationClassProperty) {
    super(parent.doc, DocTypes.Prop, data, parent);
    this.scope = data.scope ?? null;
    this.type = data.type.flat(5);
    this.nullable = data.nullable || false;
  }

  /**
   * Returns the formatted name of the property.
   *
   * This includes the parent name, if a parent is present
   * followed by either a `.` or `#` depending on whether this property is static (`.`) or not (`#`).
   * and finally the name of the property itself.
   */
  public override get formattedName() {
    return `${this.parent?.name ?? ''}${this.static ? '.' : '#'}${this.name}`;
  }
}
