import { DocTypes } from '../utils/enums';
import { DocElement } from './Element';
import { DocEvent } from './Event';
import { DocMethod } from './Method';
import { DocProp } from './Prop';

export class DocClass extends DocElement {
  public readonly extends: any;
  public readonly implements: any;
  public readonly construct: any;

  public constructor(doc: any, data: any) {
    super(doc, DocTypes.Class, data);
    super(doc, DocTypes.Class, data);
    this.extends = data.extends || null;
    this.implements = data.implements || null;
    this.construct = data.construct;

    this.adoptAll(data.props, DocProp);
    this.adoptAll(data.methods, DocMethod);
    this.adoptAll(data.events, DocEvent);
  }
}
