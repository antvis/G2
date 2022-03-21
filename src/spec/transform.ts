import { TransformComponent } from '../runtime';

export type Transform = SortByTransform | FetchTransform | CustomTransform;

export type TransformTypes = 'sortBy' | 'fetch' | TransformComponent;

export type SortByTransform = {
  type?: 'sortBy';
  fields?: string[];
  order?: 'DESC' | 'ASC';
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
