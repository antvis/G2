/**
 * Calls a defined callback function on each key:value of a object,
 * and returns a object contains the result.
 */
export function mapObject<T>(
  object: Record<string, T>,
  callbackfn: (value: T, key: string, object: Record<string, T>) => T,
): Record<string, T> {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = callbackfn(value, key, object);
    return obj;
  }, {});
}

export function group<T>(array: T[], key: (d: T) => any) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const group = keyGroups.get(k);
    if (group) {
      group.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}
