import { TransformComponent } from '../runtime';
import { SortByOptions, FetchOptions } from '../transform';

export type Transform = SortByTransform | FetchTransform;

export type TransformTypes = 'sortBy' | 'fetch';

export type BaseTransform<T, O> = { type?: T | TransformComponent } & O;

export type SortByTransform = BaseTransform<'sortBy', SortByOptions>;

export type FetchTransform = BaseTransform<'fetch', FetchOptions>;
