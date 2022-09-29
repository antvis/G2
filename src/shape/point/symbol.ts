/**
 * ○
 */
export function point(x: number, y: number, r: number) {
  return [
    ['M', x - r, y],
    ['A', r, r, 0, 1, 0, x + r, y],
    ['A', r, r, 0, 1, 0, x - r, y],
    ['Z'],
  ];
}

/**
 * □
 */
export function square(x: number, y: number, r: number) {
  return [
    ['M', x - r, y - r],
    ['L', x + r, y - r],
    ['L', x + r, y + r],
    ['L', x - r, y + r],
    ['Z'],
  ];
}

/**
 * ◇
 */
export function diamond(x: number, y: number, r: number) {
  const hr = r * 0.618;
  return [
    ['M', x - hr, y],
    ['L', x, y - r],
    ['L', x + hr, y],
    ['L', x, y + r],
    ['Z'],
  ];
}

/**
 * △
 */
export function triangle(x: number, y: number, r: number) {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y + diffY],
    ['L', x, y - diffY],
    ['L', x + r, y + diffY],
    ['Z'],
  ];
}

/**
 * ▽
 */
export function triangleDown(x: number, y: number, r: number) {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y - diffY],
    ['L', x + r, y - diffY],
    ['L', x, y + diffY],
    ['Z'],
  ];
}

/**
 * ⬡
 */
export function hexagon(x: number, y: number, r: number) {
  const diffX = (r / 2) * Math.sqrt(3);
  return [
    ['M', x, y - r],
    ['L', x + diffX, y - r / 2],
    ['L', x + diffX, y + r / 2],
    ['L', x, y + r],
    ['L', x - diffX, y + r / 2],
    ['L', x - diffX, y - r / 2],
    ['Z'],
  ];
}

/**
 * ▷◁
 */
export function bowtie(x: number, y: number, r: number) {
  const diffY = r - 1.5;
  return [
    ['M', x - r, y - diffY],
    ['L', x + r, y + diffY],
    ['L', x + r, y - diffY],
    ['L', x - r, y + diffY],
    ['Z'],
  ];
}

/** -- Uncloseable path ------------------------------------------------------------------------------- */

/**
 * |
 */
export function line(x: number, y: number, r: number) {
  return [
    ['M', x, y + r],
    ['L', x, y - r],
  ];
}

/**
 * ✕
 */
export function cross(x: number, y: number, r: number) {
  return [
    ['M', x - r, y - r],
    ['L', x + r, y + r],
    ['M', x + r, y - r],
    ['L', x - r, y + r],
  ];
}

/**
 * 工
 */
export function tick(x: number, y: number, r: number) {
  return [
    ['M', x - r / 2, y - r],
    ['L', x + r / 2, y - r],
    ['M', x, y - r],
    ['L', x, y + r],
    ['M', x - r / 2, y + r],
    ['L', x + r / 2, y + r],
  ];
}

/**
 * +
 */
export function plus(x: number, y: number, r: number) {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
    ['M', x, y - r],
    ['L', x, y + r],
  ];
}

/**
 * -
 */
export function hyphen(x: number, y: number, r: number) {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
  ];
}
