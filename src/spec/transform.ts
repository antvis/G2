import { TransformComponent } from '../runtime';

export type Transform =
  | SortByTransform
  | PickTransform
  | RenameTransform
  | SubsetTransform
  | FetchTransform
  | FilterByTransform
  | CustomTransform;

export type TransformTypes =
  | 'sortBy'
  | 'fetch'
  | 'filterBy'
  | 'pick'
  | TransformComponent;

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

export type FetchTransform = {
  type?: 'fetch';
  url?: string;
  format?: 'json';
  callback?: (d: any) => any;
};

export type FilterByTransform = {
  type?: 'filterBy';
  fields?: string[];
  callback?: (d: any) => boolean;
};

export type CustomTransform = {
  type?: TransformComponent;
  [key: string]: any;
};
