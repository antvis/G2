export type Literal2Object<Literal extends { type?: any }> = Partial<{
  [Type in Literal['type']]: Literal extends { type?: Type }
    ? Omit<Literal, 'type'> | boolean
    : never;
}>;

export type UsePrefix<
  Prefix extends string,
  Obj extends Record<string, unknown>,
> = {
  [Property in keyof Obj as `${Prefix}${Capitalize<
    string & Property
  >}`]: Obj[Property];
};

export type Closeable<T> = T | boolean | null;

export type Padding = number | 'auto';
