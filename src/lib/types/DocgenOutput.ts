/**
 * Copyright 2015-2021 Amish Shah
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface DocumentationMeta {
  generator: string;
  format: number;
  date: number;
}

export interface DocumentationClassMeta {
  line: number;
  file: string;
  path: string;
}
type DocumentationClassMethodMeta = DocumentationClassMeta;
type DocumentationClassMethodParameterMeta = DocumentationClassMeta;
type DocumentationClassMethodPropertyMeta = DocumentationClassMeta;
type DocumentationClassEventMeta = DocumentationClassMeta;
type DocumentationExternalMeta = DocumentationClassMeta;
type DocumentationTypeDefinitionMeta = DocumentationClassMeta;
type DocumentationTypeDefinitionParameterMeta = DocumentationClassMeta;

export interface DocumentationParameter {
  name: string;
  description?: string;
  default: string;
  abstract?: boolean;
  deprecated?: boolean | string;
  access?: string;
  readonly?: boolean;
  optional?: boolean;
  variable?: boolean;
  nullable?: boolean;
  scope?: string;
  see?: string[];
  type: string[][][];
}
type DocumentationClassConstructorParameter = DocumentationParameter;
type DocumentationClassEventParameter = DocumentationParameter;

interface DocumentationClassMethodParameter extends DocumentationParameter {
  meta: DocumentationClassMethodParameterMeta;
}

interface DocumentationTypeDefinitionParameter extends DocumentationParameter {
  meta: DocumentationTypeDefinitionParameterMeta;
}

interface DocumentationProperty extends DocumentationParameter {}
type DocumentationTypeDefinitionProperty = DocumentationProperty;
type DocumentationClassPropertyProperty = DocumentationProperty;

export interface DocumentationClassProperty extends DocumentationProperty {
  props: DocumentationClassPropertyProperty[];
  meta: DocumentationClassMethodPropertyMeta;
}

export interface DocumentationClassConstructor {
  name: string;
  params?: DocumentationClassConstructorParameter[];
}

export interface DocumentationReturns {
  description: string;
  types: string[][][];
  variable: boolean;
  nullable: boolean;
}

export interface DocumentationClassMethod {
  name: string;
  description?: string;
  access?: string;
  async?: boolean;
  abstract?: boolean;
  deprecated?: boolean | string;
  inherited?: boolean;
  scope?: string;
  params?: DocumentationClassMethodParameter[];
  examples?: string[];
  returns?: DocumentationReturns;
  returnsDescription?: string;
  throws?: string[];
  see?: string[];
  meta: DocumentationClassMethodMeta;
}

export type DocumentationFunction = DocumentationClassMethod;

export interface DocumentationClassEvent {
  name: string;
  description: string;
  access?: string;
  deprecated?: boolean | string;
  params: DocumentationClassEventParameter[];
  see?: string[];
  meta: DocumentationClassEventMeta;
}

export interface DocumentationClass {
  name: string;
  description: string;
  construct: DocumentationClassConstructor;
  abstract: boolean;
  access?: string;
  extends: string[] | string[][];
  implements: string[] | string[][];
  props: DocumentationClassProperty[];
  methods: DocumentationClassMethod[];
  events: DocumentationClassEvent[];
  meta: DocumentationClassMeta;
}

export interface DocumentationCustomFile {
  name: string;
  content: string;
  type: string;
  path: string;
}

export interface DocumentationCustom {
  [key: string]: {
    name: string;
    files: {
      [key: string]: DocumentationCustomFile;
    };
  };
}

export interface DocumentationExternal {
  name: string;
  see: string[];
  meta: DocumentationExternalMeta;
}

export type DocumentationInterface = DocumentationClass;

enum DocumentationLinkParams {
  class = 'class',
  typedef = 'typedef'
}
export interface DocumentationLink {
  [key: string]:
    | {
        name: string;
        params: {
          [key in DocumentationLinkParams]: string;
        };
      }
    | string;
}

export interface DocumentationTypeDefinition {
  name: string;
  description: string;
  access?: string;
  props: DocumentationTypeDefinitionProperty[];
  params?: DocumentationTypeDefinitionParameter[];
  see?: string[];
  type?: string[][][];
  returns?: DocumentationReturns;
  meta: DocumentationTypeDefinitionMeta;
}

export type DocIterateeUnion =
  | DocumentationClass
  | DocumentationExternal
  | DocumentationInterface
  | DocumentationTypeDefinition
  | DocumentationClassEventParameter
  | DocumentationClassProperty
  | DocumentationClassMethod
  | DocumentationClassMethodParameter
  | DocumentationClassEvent;

export interface Documentation {
  classes: DocumentationClass[];
  functions: DocumentationFunction[];
  custom: DocumentationCustom[];
  externals: DocumentationExternal[];
  interfaces: DocumentationInterface[];
  links: DocumentationLink[];
  meta: DocumentationMeta;
  typedefs: DocumentationTypeDefinition[];
}
