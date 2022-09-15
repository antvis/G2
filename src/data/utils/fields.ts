/**
 *
 * @description Converts a random format array into a regular two-dimensional array
 * @example ['a', 'b', ['c', value]] => [['a', defaultValue], ['b', defaultValue], ['c', value]]
 */
export function normalizeFields(
  fields: any[],
  defaultValue: boolean | ((d: any) => boolean),
) {
  return fields.map((d) => {
    if (Array.isArray(d)) {
      const [field, value = defaultValue] = d;
      return [field, value];
    }
    return [d, defaultValue];
  });
}
