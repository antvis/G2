import * as _ from '@antv/util';
import { getTheme } from '../theme';

/**
 * 合并成行的 theme 主题配置
 * @param themeObject
 * @param theme
 */
export function mergeTheme(themeObject: object, theme: string | object): object {
  const newThemeObject: object = _.isObject(theme) ? theme : getTheme(theme);

  return _.deepMix(themeObject, newThemeObject);
}
