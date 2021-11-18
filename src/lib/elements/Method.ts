import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocParam } from './Param';

export class DocMethod extends DocElement {
  public readonly scope: any;

  public constructor(parent: any, data: any) {
    super(parent.doc, DocTypes.Method, data, parent);

    this.examples = data.examples || null;
    this.returns = data.returns;
    this.scope = data.scope;
    this.adoptAll(data.params, DocParam);
  }

  public get formattedName() {
    return [this.parent.name, this.static ? '.' : '#', this.name, '()'].join('');
  }

  public get formattedReturn() {
    if (!this.returns) return '**Void**';
    console.log();
    const returnTypes = (this.returns.types || this.returns).map((type: any) => this.doc.formatType(type.flat(5))).join(' or ');

    return [returnTypes, this.formatText(this.returns.description)].filter((text) => text).join('\n');
  }

  public override toJSON() {
    const json = super.toJSON();
    const returnType = this.returns ? (this.returns.types || this.returns).flat(5).join('') : 'void';

    json.returns = { type: returnType };

    if (this.returns && this.returns.description) {
      json.returns.description = this.returns.description;
    }

    return json;
  }
}
