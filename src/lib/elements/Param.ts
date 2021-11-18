import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';

export class DocParam extends DocElement {
  public type: any;
  public optional: boolean;
  public variable: boolean;

  public constructor(parent: any, data: any) {
    super(parent.doc, DocTypes.Param, data, parent);
    this.type = data.type.flat(5);
    this.optional = data.optional;
    this.variable = data.variable;
  }

  public get formattedName() {
    return this.optional ? `\`[${this.name}]\`` : `\`${this.name}\``;
  }

  public get formattedType() {
    if (!this.variable) return super.formattedType;
    return super.formattedType
      .split('|')
      .map((param) => `...${param}`)
      .join('|');
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  public get url() {
    return null;
  }
}
