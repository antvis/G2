import { Primitive } from '../../runtime';

export function column(value: Primitive[], field?: string) {
  if (value === null) return undefined;
  return { type: 'column', value, field };
}

export function visualColumn(value: Primitive[], field?: string) {
  if (value === null) return undefined;
  return { type: 'column', value, field, visual: true };
}

export function constant(I: number[], value: any) {
  return new Array(I.length).fill(value);
}

export function columnOf(encode, key: string): [Primitive[], string] {
  const channel = encode[key];
  if (!channel) return [null, null];
  const { value, field = null } = channel;
  return [value, field];
}

export function maybeColumnOf(
  encode,
  ...K: (string | Primitive[])[]
): [Primitive[], string] {
  for (const key of K) {
    if (typeof key === 'string') {
      const [KV, fv] = columnOf(encode, key);
      if (KV !== null) return [KV, fv];
    } else {
      return [key, null];
    }
  }
  return [null, null];
}
