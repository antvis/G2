type ElementOf<T> = T extends Array<any> ? T[number] : never;

type ValueOf<T> = T[keyof T];

export type Concrete<T> = { [Key in keyof T]-?: T[Key] };

/**
 * If typeof `Value` is value, returns `Node`.
 * Otherwise returns the value.
 */
export type ValueAttribute<Value, Node> = (() => Value) &
  ((value: Value) => Node);

/**
 * If no params, returns `Value`.
 * Otherwise returns the `Node`.
 */
export type ObjectAttribute<Value, Node> = (() => Value) &
  (<K extends Value extends Record<string, any> ? Value : never>(
    key: K | keyof K | boolean,
  ) => Node) &
  (<
    K extends Value extends Record<string, any> ? keyof Value : never,
    V extends Value extends Record<string, any> ? ValueOf<Value> : never,
  >(
    key: K,
    value: V | boolean,
  ) => Node);

/**
 * If typeof `Value` is an array or an element of array, returns `Node`.
 * Otherwise returns the array.
 */
export type ArrayAttribute<Value, Node> = (() => Value) &
  ((value: Value | ElementOf<Value>) => Node);

/**
 * Filter Object keys with the specified prefix.
 * @example
 * type A = { 'mark.a': number, 'composition.b': number }
 * type B = FilterKey<A, 'mark'>; // { 'a': number }
 */
export type FilterKey<
  T extends string | symbol | number,
  Prefix extends string,
> = T extends `${Prefix}.${infer Key}` ? Key : never;

/**
 * Filter Object keys with `mark` as prefix.
 * @example
 * type A = { 'mark.a': number, 'composition.b': number }
 * type B = FilterKey<A, 'mark'>; // { 'a': number }
 * @todo Remove component.xxxx
 */
export type FilterMark<T extends string | symbol | number> =
  T extends 'component.axisX'
    ? 'axisX'
    : T extends 'component.axisY'
    ? 'axisY'
    : T extends 'component.legends'
    ? 'legends'
    : FilterKey<T, 'mark'>;

/**
 * Filter Object keys with `composition` as prefix.
 * @example
 * type A = { 'mark.a': number, 'composition.b': number }
 * type B = FilterComposition<A>; // { 'b': number }
 */
export type FilterComposition<T extends string | symbol | number> = FilterKey<
  T,
  'composition'
>;

/**
 * Map marks of library to Nodes.
 */
export type MarkOf<Library extends Record<string, any>, Node> = {
  [Key in keyof Library as FilterMark<Key>]: Node;
};

/**
 * Map compositions of library to Nodes.
 */
export type CompositionOf<Library extends Record<string, any>, Node> = {
  [Key in keyof Library as FilterComposition<Key>]: Node;
};

/**
 * Map descriptors to props of Nodes.
 */
export type PropsOf<
  Descriptor extends Record<string, any>,
  Spec extends Record<any, any>,
  Node,
> = {
  [Key in keyof Descriptor]: Descriptor[Key] extends { type: 'object' }
    ? ObjectAttribute<Spec[Key], Node>
    : Descriptor[Key] extends { type: 'value' }
    ? ValueAttribute<Spec[Key], Node>
    : ArrayAttribute<Spec[Key], Node>;
};
