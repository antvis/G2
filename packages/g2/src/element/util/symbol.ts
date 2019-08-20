/**
 * 为不同的 element shape 定义对应的 marker symbol
 */
const SQRT_3 = Math.sqrt(3);

// Line shape 对应的 symbols
export const LineSymbols = {
  line(x: number, y: number, r: number) {
    return [
      [ 'M', x - r, y ],
      [ 'L', x + r, y ],
    ];
  },
  smooth(x: number, y: number, r: number) {
    return [
      [ 'M', x - r, y ],
      [ 'A', r / 2, r / 2, 0, 1, 1, x, y ],
      [ 'A', r / 2, r / 2, 0, 1, 0, x + r, y ],
    ];
  },
  hv(x: number, y: number, r: number) {
    return [
      [ 'M', x - r - 1, y - 2.5 ],
      [ 'L', x, y - 2.5 ],
      [ 'L', x, y + 2.5 ],
      [ 'L', x + r + 1, y + 2.5 ],
    ];
  },
  vh(x: number, y: number, r: number) {
    return [
      [ 'M', x - r - 1, y + 2.5 ],
      [ 'L', x, y + 2.5 ],
      [ 'L', x, y - 2.5 ],
      [ 'L', x + r + 1, y - 2.5 ],
    ];
  },
  hvh(x: number, y: number, r: number) {
    return [
      [ 'M', x - (r + 1), y + 2.5 ],
      [ 'L', x - r / 2, y + 2.5 ],
      [ 'L', x - r / 2, y - 2.5 ],
      [ 'L', x + r / 2, y - 2.5 ],
      [ 'L', x + r / 2, y + 2.5 ],
      [ 'L', x + r + 1, y + 2.5 ],
    ];
  },
  vhv(x: number, y: number) {
    // 宽 13px，高 8px
    return [
      [ 'M', x - 5, y + 2.5 ],
      [ 'L', x - 5, y ],
      [ 'L', x, y ],
      [ 'L', x, y - 3 ],
      [ 'L', x, y + 3 ],
      [ 'L', x + 6.5, y + 3 ],
    ];
  },
};

// Point shape 对应的 symbols
export const PointSymbols = {
  hexagon(x, y, r) {
    const diffX = (r / 2) * SQRT_3;
    return [
      [ 'M', x, y - r ],
      [ 'L', x + diffX, y - r / 2 ],
      [ 'L', x + diffX, y + r / 2 ],
      [ 'L', x, y + r ],
      [ 'L', x - diffX, y + r / 2 ],
      [ 'L', x - diffX, y - r / 2 ],
      [ 'Z' ],
    ];
  },
  bowtie(x, y, r) {
    const diffY = r - 1.5;
    return [
      [ 'M', x - r, y - diffY ],
      [ 'L', x + r, y + diffY ],
      [ 'L', x + r, y - diffY ],
      [ 'L', x - r, y + diffY ],
      [ 'Z' ],
    ];
  },
  cross(x, y, r) {
    return [
      [ 'M', x - r, y - r ],
      [ 'L', x + r, y + r ],
      [ 'M', x + r, y - r ],
      [ 'L', x - r, y + r ],
    ];
  },
  tick(x, y, r) {
    return [
      [ 'M', x - r / 2, y - r ],
      [ 'L', x + r / 2, y - r ],
      [ 'M', x, y - r ],
      [ 'L', x, y + r ],
      [ 'M', x - r / 2, y + r ],
      [ 'L', x + r / 2, y + r ],
    ];
  },
  plus(x, y, r) {
    return [
      [ 'M', x - r, y ],
      [ 'L', x + r, y ],
      [ 'M', x, y - r ],
      [ 'L', x, y + r ],
    ];
  },
  hyphen(x, y, r) {
    return [
      [ 'M', x - r, y ],
      [ 'L', x + r, y ],
    ];
  },
  line(x, y, r) {
    return [
      [ 'M', x, y - r ],
      [ 'L', x, y + r ],
    ];
  },
};

// interval 对应的 symbols
export const IntervalSymbols = {
  tick(x, y, r) {
    return [
      [ 'M', x - r / 2, y - r ],
      [ 'L', x + r / 2, y - r ],
      [ 'M', x, y - r ],
      [ 'L', x, y + r ],
      [ 'M', x - r / 2, y + r ],
      [ 'L', x + r / 2, y + r ],
    ];
  },
  line(x, y, r) {
    return [
      [ 'M', x, y - r ],
      [ 'L', x, y + r ],
    ];
  },
};
