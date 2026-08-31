export function escapePointer(value: string): string {
  return value.replace(/~/g, '~0').replace(/\//g, '~1');
}

export function joinPath(path: string, key: string | number): string {
  return `${path}/${escapePointer(String(key))}`;
}

function unescapePointer(value: string): string {
  return value.replace(/~1/g, '/').replace(/~0/g, '~');
}

export function valueAtPath(value: unknown, path: string): unknown {
  if (!path) return value;
  return path
    .slice(1)
    .split('/')
    .map(unescapePointer)
    .reduce<unknown>((current, key) => {
      if (current === null || typeof current !== 'object') return undefined;
      return (current as Record<string, unknown>)[key];
    }, value);
}
