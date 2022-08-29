type Flow = {
  set(key: string, normalize?, callback?): Flow;
  setAsync(key: string, normalize?, callback?): Promise<Flow>;
};
/**
 * @todo Combine with the `Container` util
 */
export function flow(
  target: Record<keyof any, any>,
  source: Record<keyof any, any>,
): Flow {
  return {
    set(key: string, normalize?, callback?) {
      if (source[key] === undefined) return this;

      const value = normalize ? normalize.call(null, source[key]) : source[key];
      if (callback) callback.call(null, value);
      else if (typeof target[key] === 'function') target[key](value);
      else target[key] = value;

      return this;
    },
    async setAsync(key: string, normalize?, callback?) {
      if (source[key] === undefined) return this;

      const value = normalize
        ? await normalize.call(null, source[key])
        : source[key];
      if (callback) callback.call(null, value);
      else if (typeof target[key] === 'function') target[key](value);
      else target[key] = value;

      return this;
    },
  };
}
