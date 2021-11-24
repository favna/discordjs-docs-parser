import type { DocumentationClassMethod } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocParam } from './Param';

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

  public override get formattedName() {
    return `${this.parent?.name ?? ''}${this.static ? '.' : '#'}${this.name}()`;
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
