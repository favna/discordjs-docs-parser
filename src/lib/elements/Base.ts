import type { Constructor } from '@sapphire/utilities';
import type { DocIterateeUnion, Documentation } from '../types/DocgenOutput';
import { DocTypes } from '../utils/enums';
import type { DocTypesToClassType } from '../utils/interfaces';
import type { DocClass } from './Class';
import type { DocElement } from './Element';
import type { DocEvent } from './Event';
import type { DocInterface } from './Interface';
import type { DocMethod } from './Method';
import type { DocParam } from './Param';
import type { DocProp } from './Prop';
import type { DocTypedef } from './Typedef';

export class DocBase {
  public originalJSON: DocIterateeUnion | Documentation;
  public children: Map<string, DocEvent | DocMethod | DocParam | DocProp>;
  public docType: DocTypes | null;
  public name: string | null;

  public constructor(json: DocIterateeUnion | Documentation, docType: DocTypes | null = null, name: string | null = null) {
    this.originalJSON = json;
    this.children = new Map();
    this.docType = docType;
    this.name = name;
  }

  /** @internal */
  public adoptAll(
    iterable: DocIterateeUnion[],
    Constructor: Constructor<DocClass | DocTypedef | DocInterface | DocProp | DocMethod | DocEvent | DocParam>
  ) {
    if (!iterable) return;
    for (const iteratee of iterable) {
      this.addChild(new Constructor(this, iteratee));
    }
  }

  /** @internal */
  public findChild(query: string, exclude: (DocElement | null)[] = []): DocElement | undefined {
    query = query.toLowerCase();

    let docType: DocTypes | null = null;
    if (query.endsWith('()')) {
      query = query.slice(0, -2);
      docType = DocTypes.Method;
    } else if (query.startsWith('e-')) {
      query = query.slice(2);
      docType = DocTypes.Event;
    }

    return [...this.children.values()].find(
      (child) => !exclude.includes(child) && child.name?.toLowerCase() === query && (!docType || child.docType === docType)
    );
  }

  /**
   * @internal
   */
  private addChild(child: DocClass | DocTypedef | DocInterface | DocProp | DocMethod | DocEvent | DocParam) {
    this.children.set(`${child.name?.toLowerCase()}-${child.docType}`, child);
  }

  /** @internal */
  private childrenOfType<T extends DocTypes>(type: T): DocTypesToClassType[T][] | null {
    const filtered = Array.from(this.children.values()).filter((child) => child.docType === type);

    return filtered.length ? (filtered as unknown as DocTypesToClassType[T][]) : null;
  }

  /**
   * The stored Classes for this current documentation source
   */
  public get classes() {
    return this.childrenOfType(DocTypes.Class);
  }

  /**
   * The stored Typedefs for this current documentation source
   */

  public get typedefs() {
    return this.childrenOfType(DocTypes.Typedef);
  }

  /**
   * The stored Interfaces for this current documentation source
   */

  public get interfaces() {
    return this.childrenOfType(DocTypes.Interface);
  }

  /**
   * The stored Props for this current documentation source
   */

  public get props() {
    return this.childrenOfType(DocTypes.Prop);
  }

  /**
   * The stored Methods for this current documentation source
   */

  public get methods() {
    return this.childrenOfType(DocTypes.Method);
  }

  /**
   * The stored Events for this current documentation source
   */

  public get events() {
    return this.childrenOfType(DocTypes.Event);
  }

  /**
   * The stored Params for this current documentation source
   */

  public get params() {
    return this.childrenOfType(DocTypes.Param);
  }
}
