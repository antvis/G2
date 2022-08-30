export function weight(a, b) {
  return b.value - a.value;
}

export function frequency(a, b) {
  return b.frequency - a.frequency;
}

export function id(a, b) {
  return `${a.id}`.localeCompare(`${b.id}`);
}

export function name(a, b) {
  return `${a.name}`.localeCompare(`${b.name}`);
}
