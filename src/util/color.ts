import colorUtil from '@antv/color-util';

// 根据YIQ亮度判断指定颜色取反色是不是白色
// http://24ways.org/2010/calculating-color-contrast
export const isContrastColorWhite = (rgb: string): boolean => {
  const [r, g, b] = colorUtil.rgb2arr(rgb);
  const isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128;

  return isDark;
};
