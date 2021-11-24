import type { DocumentationClassMethod, DocumentationReturns } from '../types/DocgenOutput';
import { DocTypes } from '../utils/constants';
import { DocElement } from './Element';
import { DocParam } from './Param';

/**
 * Represents a method on a {@link DocElement}
 */
export class DocMethod extends DocElement {
  public constructor(parent: DocElement, data: DocumentationClassMethod) {
    super(parent.doc, DocTypes.Method, data, parent);

    this.examples = data.examples || null;
    this.returns = data.returns ?? null;
    this.scope = data.scope ?? null;

    if (data.params) {
      this.adoptAll(data.params, DocParam);
    }
  }

  /**
   * Returns the formatted name of the property.
   *
   * This includes the parent name, if a parent is present
   * followed by either a `.` or `#` depending on whether this property is static (`.`) or not (`#`).
   * and finally the name of the property itself, followed by `()` because this a method.
   */
  public override get formattedName() {
    return `${this.parent?.name ?? ''}${this.static ? '.' : '#'}${this.name}()`;
  }

  /**
   * Overrides what should be returned when calling `JSON.stringify` on this class
   */
  public override toJSON() {
    const json = super.toJSON();
    const returnType = this.returns ? ((this.returns as DocumentationReturns).types || this.returns).flat(5).join('') : 'void';

    json.returns = { type: returnType };

    if (this.returns && (this.returns as DocumentationReturns).description) {
      json.returns.description = (this.returns as DocumentationReturns).description;
    }

    return json;
  }
}
