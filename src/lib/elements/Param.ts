import type { DocumentationParameter } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';

export class DocParam extends DocElement {
  public optional: boolean;
  public variable: boolean;

  public constructor(parent: DocElement, data: DocumentationParameter) {
    super(parent.doc, DocTypes.Param, data, parent);
    this.type = data.type.flat(5);
    this.optional = data.optional ?? false;
    this.variable = data.variable ?? false;
  }

  public override get formattedName() {
    return this.optional ? `\`[${this.name}]\`` : `\`${this.name}\``;
  }

  public override get formattedType() {
    if (!this.variable) return super.formattedType;
    return super.formattedType
      .split('|')
      .map((param) => `...${param}`)
      .join('|');
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  public override get url() {
    return null;
  }
}
