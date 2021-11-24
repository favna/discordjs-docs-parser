import type { DocumentationClassEvent } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocParam } from './Param';

/**
 * Represents an event on a {@link DocElement}
 *
 * An example of this is the many events on the `Client` class such as `ready`
 */
export class DocEvent extends DocElement {
  public constructor(parent: DocElement, data: DocumentationClassEvent) {
    super(parent.doc, DocTypes.Event, data, parent);
    this.adoptAll(data.params, DocParam);
  }

  /**
   * Returns the formatted name of the property.
   *
   * This includes the parent name, if a parent is present
   * followed by a `#` and the name of the event.
   */
  public override get formattedName() {
    return `${this.parent?.name ?? ''}#${this.name}`;
  }
}
