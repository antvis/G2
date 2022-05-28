import {
  Transform,
  Primitive,
  TransformContext,
  ColumnValue,
} from '../../runtime';

export function applyDefaults<T>(
  source: Record<string, T>,
  defaults: Record<string, T>,
) {
  const target = { ...source };
  for (const [key, value] of Object.entries(defaults)) {
    target[key] = target[key] ?? value;
  }
  return target;
}

export function merge(
  transform: (
    context: TransformContext,
  ) => Partial<TransformContext> | Promise<Partial<TransformContext>>,
): Transform {
  return async (options) => {
    const newOptions = await transform(options);
    const { encode: newEncode = {} } = newOptions;
    const { encode: oldEncode = {} } = options;
    return {
      ...options,
      ...newOptions,
      encode: {
        ...oldEncode,
        ...newEncode,
      },
    };
  };
}

export function column(value: ColumnValue) {
  if (value === null) return undefined;
  return { type: 'column', value };
}

export function constant(value: Primitive) {
  return { type: 'constant', value };
}

export function field(target: ColumnValue, source: ColumnValue) {
  if (!source) return target;
  target.field = source.field;
  return target;
}
