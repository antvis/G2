import { get, lowerCase } from '@antv/util';
import { LooseObject } from '../interface';

import { createTheme } from './util';

const defaultTheme = createTheme({});

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
export function registerTheme(theme: string, value: LooseObject) {
  Themes[lowerCase(theme)] = createTheme(value);
}
