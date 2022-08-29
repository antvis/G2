import { DataComponent } from '../runtime';
export type Data = FetchConnector | InlineConnector | any;

export type FetchConnector = {
  type?: 'fetch';
  url?: string;
  format?: 'json' | 'csv';
  callback?: (d: any) => any;
  // Useful when format is 'csv'.
  delimiter?: string;
  transform?: DataTransform[];
};

export type InlineConnector = {
  type?: 'inline';
  value?: any;
  transform?: DataTransform[];
};

export type DataTransform =
  | SortByTransform
  | PickTransform
  | RenameTransform
  | SubsetTransform
  | FoldTransform
  | FilterByTransform
  | CustomTransform;

export type DataTransformTypes =
  | 'sortBy'
  | 'fetch'
  | 'filterBy'
  | 'pick'
  | 'fold'
  | 'connector'
  | DataComponent;

export type SortByTransform = {
  type?: 'sortBy';
  fields?: string[];
  order?: 'DESC' | 'ASC';
};

export type PickTransform = {
  type?: 'pick';
  fields?: string[];
};

export type RenameTransform = {
  type?: 'rename';
  map?: Record<string, string>;
};

export type SubsetTransform = {
  type?: 'subset';
  start?: number;
  end?: number;
  fields?: string[];
};

export type FilterByTransform = {
  type?: 'filterBy';
  fields?: string[];
  callback?: (d: any) => boolean;
};

export type FoldTransform = {
  type?: 'fold';
  fields?: string[];
  as?: string[];
};

export type ConnectorTransform = {
  type?: 'connector';
  callback?: (d: any) => any;
};

export type CustomTransform = {
  type?: DataComponent;
  [key: string]: any;
};
