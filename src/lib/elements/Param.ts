import type { DocumentationParameter } from '../types/DocgenOutput';
import { DocTypes } from '../utils/constants';
import { DocElement } from './Element';

/**
 * Represents a parameter of a {@link DocElement}.
 */
export class DocParam extends DocElement {
  public optional: boolean;
  public variable: boolean;

  public constructor(parent: DocElement, data: DocumentationParameter) {
    super(parent.doc, DocTypes.Param, data, parent);
    this.type = data.type.flat(5);
    this.optional = data.optional ?? false;
    this.variable = data.variable ?? false;
  }

  /**
   * Returns the formatted name of the parameter.
   *
   * If this parameter is optional it will be wrapped in square brackets.
   * Otherwise just the name will be returned.
   * Furthermore, in both cases, inline code backticks will be wrapped around the parameter.
   */
  public override get formattedName() {
    return this.optional ? `\`[${this.name}]\`` : `\`${this.name}\``;
  }

  /**
   * Method Parameters cannot be navigated to on the [discord.js docs](https://discord.js.org/) so this always returns `null`.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  public override get url() {
    return null;
  }
}
