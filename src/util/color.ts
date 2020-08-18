import { each } from '@antv/util';

export function rgb2arr(str: string) {
  const colorStr: string = str.indexOf('#') === 0 ? str.substr(1) : str;
  const arr = [];
  arr.push(parseInt(colorStr.substr(0, 2), 16));
  arr.push(parseInt(colorStr.substr(2, 2), 16));
  arr.push(parseInt(colorStr.substr(4, 2), 16));
  return arr;
}

export function toHex(value) {
  let v;
  v = Math.round(value);
  v = v.toString(16);
  if (v.length === 1) {
    v = `0${value}`;
  }
  return v;
}

export function arr2rgb(arr) {
  return `#${toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2])}`;
}

export function mappingColor(band, gray) {
  let reflect;
  each(band, (b) => {
    const map = b;
    if (gray >= map.from && gray < map.to) {
      reflect = map.color;
    }
  });
  return reflect;
}

// 根据YIQ亮度判断指定颜色取反色是不是白色
// http://24ways.org/2010/calculating-color-contrast
export const isContrastColorWhite = (rgb: string): boolean => {
  const [r, g, b] = rgb2arr(rgb);
  const isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128;

  return isDark;
};
