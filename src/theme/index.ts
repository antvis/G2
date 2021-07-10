/**
 * 主题的方案，包含：
 * 1. token 约束
 * 2. 生成浅色、暗色两套内置主题
 */

import { StyleSheet } from '../types/theme';
import { LIGHT_STYLESHEET } from './light';
import { DARK_STYLESHEET } from './dark';

const THEME_MAP: Record<string, StyleSheet> = {
  light: LIGHT_STYLESHEET,
  dark: DARK_STYLESHEET,
};

export { LIGHT_STYLESHEET, DARK_STYLESHEET };

/**
 * 注册一个自定义的主题
 * @param name
 * @param theme
 */
export function registerTheme(name: string, theme: StyleSheet) {
  THEME_MAP[name.toLowerCase()] = theme;
}

/**
 * 根据主题名称，获取主题样式表（应用到各个区域的时候，再去进行 parse）
 * @param name
 * @returns
 */
export function getTheme(name: string): StyleSheet {
  return THEME_MAP[name.toLowerCase()];
}
