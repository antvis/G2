import { get, lowerCase } from '@antv/util';
import Default from './antv';

// 所有已经存在的主题
const Themes: Record<string, object> = {
  default: Default,
};

/**
 * 获取主题配置信息
 * @param theme
 */
export function getTheme(theme?: string): object {
  return get(Themes, lowerCase(theme), Themes.default);
}

/**
 * 注册新的主题配置信息
 * @param theme
 * @param value
 */
export function registerTheme(theme: string, value: object) {
  Themes[lowerCase(theme)] = value;
}
