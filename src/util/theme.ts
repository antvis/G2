import { deepMix, isObject } from '@antv/util';
import { getTheme } from '../theme';

/**
 * 合并成行的 theme 主题配置
 * @param themeObject
 * @param theme
 */
export function mergeTheme(themeObject: object, theme: string | object): object {
  const newThemeObject: object = isObject(theme) ? theme : getTheme(theme);

  return deepMix(themeObject, newThemeObject);
}
