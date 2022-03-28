import { TransformComponent } from '../runtime';

export type Transform =
  | SortByTransform
  | PickTransform
  | FetchTransform
  | CustomTransform;

export type TransformTypes = 'sortBy' | 'pick' | 'fetch' | TransformComponent;

export type SortByTransform = {
  type?: 'sortBy';
  fields?: string[];
  order?: 'DESC' | 'ASC';
};

export type PickTransform = {
  type?: 'pick';
  fields?: string[];
};

export type FetchTransform = {
  type?: 'fetch';
  url?: string;
  format?: 'json';
};

export type CustomTransform = {
  type?: TransformComponent;
  [key: string]: any;
};
