import colorUtil from '@antv/color-util';

// 内置的一些特殊设置
const preset = {
  '#5B8FF9': true,
};

// 根据YIQ亮度判断指定颜色取反色是不是白色
// http://24ways.org/2010/calculating-color-contrast
// http://www.w3.org/TR/AERT#color-contrast
export const isContrastColorWhite = (color: string): boolean => {
  const rgb = colorUtil.toRGB(color).toUpperCase();
  if (preset[rgb]) {
    return preset[rgb];
  }

  const [r, g, b] = colorUtil.rgb2arr(rgb);
  const isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128;

  return isDark;
};
