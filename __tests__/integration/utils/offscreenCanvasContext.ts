// Computed as round(measureText(text).width * 10) at 10px system-ui. For
// characters that are not represented in this map, we’d ideally want to use a
// weighted average of what we expect to see. But since we don’t really know
// what that is, using “e” seems reasonable.
const defaultWidthMap = {
  a: 56,
  b: 63,
  c: 57,
  d: 63,
  e: 58,
  f: 37,
  g: 62,
  h: 60,
  i: 26,
  j: 26,
  k: 55,
  l: 26,
  m: 88,
  n: 60,
  o: 60,
  p: 62,
  q: 62,
  r: 39,
  s: 54,
  t: 38,
  u: 60,
  v: 55,
  w: 79,
  x: 54,
  y: 55,
  z: 55,
  A: 69,
  B: 67,
  C: 73,
  D: 74,
  E: 61,
  F: 58,
  G: 76,
  H: 75,
  I: 28,
  J: 55,
  K: 67,
  L: 58,
  M: 89,
  N: 75,
  O: 78,
  P: 65,
  Q: 78,
  R: 67,
  S: 65,
  T: 65,
  U: 75,
  V: 69,
  W: 98,
  X: 69,
  Y: 67,
  Z: 67,
  0: 64,
  1: 48,
  2: 62,
  3: 64,
  4: 66,
  5: 63,
  6: 65,
  7: 58,
  8: 65,
  9: 65,
  ' ': 29,
  '!': 32,
  '"': 49,
  "'": 31,
  '(': 39,
  ')': 39,
  ',': 31,
  '-': 48,
  '.': 31,
  '/': 32,
  ':': 31,
  ';': 31,
  '?': 52,
  '‘': 31,
  '’': 31,
  '“': 47,
  '”': 47,
  '…': 82,
};

export function measureText(text: string, fontSize: number) {
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    sum += ((defaultWidthMap[text[i]] ?? 100) * fontSize) / 100;
  }
  return sum;
}

export class OffscreenCanvasContext {
  private fontSize: number;

  constructor(public canvas: HTMLCanvasElement) {}

  set font(font: string) {
    // `${fontStyle} ${fontVariant} ${fontWeight} ${fontSizeString}
    const [fontStyle, fontVariant, fontWeight, fontSizeString] =
      font.split(' ');
    const fontSize = parseFloat(fontSizeString.replace('px', ''));
    this.fontSize = fontSize;
  }

  fillRect() {}
  fillText() {}
  getImageData(sx: number, sy: number, sw: number, sh: number) {
    return {
      // ignore acsent and descent
      data: new Uint8ClampedArray(sw * sh * 4).fill(0),
    };
  }

  measureText(text: string): TextMetrics {
    return {
      width: measureText(text, this.fontSize),
      actualBoundingBoxAscent: 0,
      actualBoundingBoxDescent: 0,
      actualBoundingBoxLeft: 0,
      actualBoundingBoxRight: 0,
      fontBoundingBoxAscent: 0,
      fontBoundingBoxDescent: 0,
    };
  }
}
