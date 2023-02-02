export function kebabCase(s: string) {
  return s.replace(/[A-Z]/g, (d) => '-' + d.toLowerCase());
}
