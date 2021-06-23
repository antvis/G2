type DiffResult = {
  added: string[];
  removed: string[];
  updated: string[];
};

/**
 * 做 diff，返回 新增，删除，更新
 * @param keys 当前的
 * @param keyMap 之前的
 */
export function diff(keys: string[], keyMap: Map<string, any>): DiffResult {
  const added = [];
  const removed = [];
  const updated = [];

  const tempMap = new Map<string, any>();

  // added, updated
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (keyMap.has(key)) {
      updated.push(key);
    } else {
      added.push(key);
    }

    // 另存一份为 map，提升获取 removed 的性能
    tempMap.set(key, true);
  }

  // removed
  keyMap.forEach((_, key: string) => {
    if (!tempMap.has(key)) {
      removed.push(key);
    }
  });

  return {
    added,
    removed,
    updated,
  };
}
