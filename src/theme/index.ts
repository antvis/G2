/**
 * 主题的方案，包含：
 * 1. token 约束
 * 2. 生成浅色、暗色两套内置主题
 */

import { Theme } from '../types/theme';
import { LIGHT, LIGHT_STYLESHEET } from './light';
import { DARK, DARK_STYLESHEET } from './dark';

const THEME_MAP: Record<string, Theme> = {
  light: LIGHT,
  dark: DARK,
};

export { LIGHT, LIGHT_STYLESHEET, DARK, DARK_STYLESHEET };

/**
 * 注册一个自定义的主题
 * @param name
 * @param theme
 */
export function registerTheme(name: string, theme: Theme) {
  THEME_MAP[name.toLowerCase()] = theme;
}

/**
 * // todo 根据主题颜色，获取最后的 theme object
 * @param name
 * @returns
 */
export function getTheme(name: string): Theme {
  return THEME_MAP[name.toLowerCase()];
}
