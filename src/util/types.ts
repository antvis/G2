/**
 * Remove readonly modifier from a type
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
