export function diff(keyItem: Record<string, any>, keys: string[]) {
  const added = [];
  const updated = [];
  const removed = [];
  const keyIncluded = new Map<string, boolean>();

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (keyItem[key]) {
      updated.push(key);
    } else {
      added.push(key);
    }
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
