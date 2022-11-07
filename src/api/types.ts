type ValueOf<T> = T[keyof T];

type ElementOf<T> = T extends Array<any> ? T[number] : never;

type Chainable<K, V, N> = K extends undefined ? V : N;

export type ValueAttribute<V, N> = <T extends V>(
  value?: T,
) => Chainable<T, V, N>;

export type ObjectAttribute<V, N> = <
  T extends V extends Record<string, any> ? ValueOf<V> : V,
>(
  key?: V extends Record<string, any> ? V | keyof V : V,
  value?: T,
) => Chainable<T, V, N>;

export type ArrayAttribute<V, N> = <T extends V | ElementOf<V>>(
  value?: T,
) => Chainable<T, V, N>;

export type Concrete<T> = { [Key in keyof T]-?: T[Key] };
