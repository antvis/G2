export function diff(keyItem: Record<string, any>, keys: string[]) {
  const enter = [];
  const update = [];
  const exit = [];
  const keyIncluded = new Map<string, boolean>();

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (keyItem[key]) {
      update.push(key);
    } else {
      enter.push(key);
    }
    keyIncluded.set(key, true);
  }

  Object.keys(keyItem).forEach((key) => {
    if (!keyIncluded.has(key)) exit.push(key);
  });

  return {
    enter,
    update,
    exit,
  };
}
