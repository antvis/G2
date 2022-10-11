/**
 * camelCase('foo-bar');
 * // => 'fooBar'
 * @param s
 */
export function camelCase(s: string) {
  return s.replace(/-(\w)/g, function (_, letter) {
    return letter.toUpperCase();
  });
}

/**
 * kebabCase('fooBar');
 * // => 'foo-bar'
 * @param s
 */
export function kebabCase(s: string) {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase();
}
