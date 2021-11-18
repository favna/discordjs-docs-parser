import { DocTypes } from '../utils/enums';
import type { DocTypesToClassType } from '../utils/interfaces';

export class DocBase {
  public originalJSON: any;
  public children: Map<string, DocBase>;
  public docType: DocTypes | null;
  public name: string | null;

  public constructor(json: any, docType: DocTypes | null = null, name: string | null = null) {
    this.originalJSON = json;
    this.children = new Map();
    this.docType = docType;
    this.name = name;
  }

  /**
   * @internal
   */
  public addChild(child: any) {
    this.children.set(`${child.name.toLowerCase()}-${child.docType}`, child);
  }

  /**
   * @internal
   */
  public adoptAll(enumerable: any, Constructor: any) {
    if (!enumerable) return;
    for (const elem of enumerable) {
      this.addChild(new Constructor(this, elem));
    }
  }

  /**
   * @internal
   */
  public childrenOfType<T extends DocTypes>(type: T): DocTypesToClassType[T][] | null {
    const filtered = Array.from(this.children.values()).filter((child) => child.docType === type);

    return filtered.length ? (filtered as unknown as DocTypesToClassType[T][]) : null;
  }

  /**
   * @internal
   */
  public findChild(query: any, exclude: any[] = []) {
    query = query.toLowerCase();

    let docType: any = null;
    if (query.endsWith('()')) {
      query = query.slice(0, -2);
      docType = DocTypes.Method;
    } else if (query.startsWith('e-')) {
      query = query.slice(2);
      docType = DocTypes.Event;
    }

    return Array.from(this.children.values()).find(
      (child) => !exclude.includes(child) && child.name?.toLowerCase() === query && (!docType || child.docType === docType)
    );
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
