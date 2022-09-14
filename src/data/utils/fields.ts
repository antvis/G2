/**
 *
 * @example1 ['a', 'b', ['c', cb]] => [['a', cb], ['b', cb], ['c', cb]]
 * @example2 ['a', ['b', cb1], 'c', ['d', cb2]] => [['a', cb1], ['b', cb1], ['c', cb2], ['d', cb2]]
 * @returns Converts a random format array into a regular two-dimensional array
 */
export function normalizeFields(array: any[]) {
  let count = 0;
  const processArray = array.reduce((acc, cur, idx, array) => {
    if (typeof cur === 'string') {
      count += 1;
      return acc;
    } else if (Array.isArray(cur)) {
      const [_, callback] = cur;
      // Add the current callback to previous items.
      const newArr = [];
      for (let i = idx - count; i < idx; i++) {
        // [field, callback]
        newArr.push([array[i], callback]);
      }
      newArr.push(cur);
      count = 0;
      return acc.concat(newArr);
    }
  }, []);

  return processArray;
}
