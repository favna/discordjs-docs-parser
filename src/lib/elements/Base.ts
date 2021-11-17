import { DocTypes, DocTypesToClassType } from '../constants';

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

  public addChild(child: any) {
    this.children.set(`${child.name.toLowerCase()}-${child.docType}`, child);
  }

  public adoptAll(enumerable: any, Constructor: any) {
    if (!enumerable) return;
    for (const elem of enumerable) {
      this.addChild(new Constructor(this, elem));
    }
  }

  public childrenOfType<T extends DocTypes>(type: T): DocTypesToClassType[T][] | null {
    const filtered = Array.from(this.children.values()).filter((child) => child.docType === type);

    return filtered.length ? (filtered as unknown as DocTypesToClassType[T][]) : null;
  }

  public findChild(query: any, exclude: any[] = []) {
    query = query.toLowerCase();

    let docType: any = null;
    if (query.endsWith('()')) {
      query = query.slice(0, -2);
      docType = DocTypes.METHOD;
    } else if (query.startsWith('e-')) {
      query = query.slice(2);
      docType = DocTypes.EVENT;
    }

    return Array.from(this.children.values()).find(
      (child) => !exclude.includes(child) && child.name?.toLowerCase() === query && (!docType || child.docType === docType)
    );
  }

  public get classes() {
    return this.childrenOfType(DocTypes.CLASS);
  }

  public get typedefs() {
    return this.childrenOfType(DocTypes.TYPEDEF);
  }

  public get interfaces() {
    return this.childrenOfType(DocTypes.INTERFACE);
  }

  public get props() {
    return this.childrenOfType(DocTypes.PROP);
  }

  public get methods() {
    return this.childrenOfType(DocTypes.METHOD);
  }

  public get events() {
    return this.childrenOfType(DocTypes.EVENT);
  }

  public get params() {
    return this.childrenOfType(DocTypes.PARAM);
  }

  public static get types() {
    return DocTypes;
  }
}
