import type { DocClass, DocEvent, DocInterface, DocMethod, DocParam, DocProp, DocTypedef } from './elements';

export enum DocTypes {
  CLASS = 'class',
  EVENT = 'event',
  INTERFACE = 'interface',
  METHOD = 'method',
  PARAM = 'param',
  PROP = 'prop',
  TYPEDEF = 'typedef'
}

export interface DocTypesToClassType {
  [DocTypes.CLASS]: DocClass;
  [DocTypes.EVENT]: DocEvent;
  [DocTypes.INTERFACE]: DocInterface;
  [DocTypes.METHOD]: DocMethod;
  [DocTypes.PARAM]: DocParam;
  [DocTypes.PROP]: DocProp;
  [DocTypes.TYPEDEF]: DocTypedef;
}
