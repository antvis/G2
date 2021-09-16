/**
 * 对比当前元素和之前的元素，返回 added, updated, removed
 * @param keyItem 之前的元素的，按照 key-item 的 object 的形式存储
 * @param keys 现在的元素，按照 array 的形式存储
 * @returns 由 added, updated, removed array 构成的 object
 */
export function diff(keyItem: Record<string, any>, keys: string[]) {
  const added = [];
  const updated = [];
  const removed = [];
  const keyIncluded = new Map<string, boolean>();

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (keyItem[key]) updated.push(key);
    else added.push(key);
    keyIncluded.set(key, true);
  }

  Object.keys(keyItem).forEach((key) => {
    if (!keyIncluded.has(key)) removed.push(key);
  });

  return {
    added,
    updated,
    removed,
  };
}
