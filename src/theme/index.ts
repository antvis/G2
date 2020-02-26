import { get, isString, lowerCase } from '@antv/util';
import { LooseObject, StyleSheet } from '../interface';

import { getDefaultTheme } from './default';
import { antvLight as DefaultStyleSheet } from './style-sheet/light';

const defaultTheme = getDefaultTheme(DefaultStyleSheet as StyleSheet);

// 所有已经存在的主题
const Themes: Record<string, LooseObject> = {
  default: defaultTheme,
};

/**
 * 获取主题配置信息。
 * @param theme 主题名
 */
export function getTheme(theme?: string): LooseObject {
  return get(Themes, lowerCase(theme), Themes.default);
}

/**
 * 注册新的主题配置信息。
 * @param theme 主题名。
 * @param value 具体的主题配置。
 */
export function registerTheme(theme: string, value: LooseObject | string) {
  if (isString(value)) {
    // 在默认样式的基础上，修改主题样式表
    const styleSheet = getStyleSheet(value);
    Themes[lowerCase(theme)] = getDefaultTheme(styleSheet);
  } else {
    Themes[lowerCase(theme)] = value;
  }
}

const StyleSheets: Record<string, StyleSheet> = {
  default: DefaultStyleSheet,
};

/**
 * 获取对应主题样式表
 * @param name 样式表名
 */
export function getStyleSheet(name?: string): StyleSheet {
  return get(StyleSheets, lowerCase(name), StyleSheets.default);
};

/**
 * 注册主题样式表
 * @param name 样式表名
 * @param styleSheet 样式表定义
 */
export function registerStyleSheet(name: string, styleSheet: StyleSheet) {
  StyleSheets[lowerCase(name)] = styleSheet;
};
