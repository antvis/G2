export function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`;
}

export function randomText() {
  return Math.random().toString(36);
}
