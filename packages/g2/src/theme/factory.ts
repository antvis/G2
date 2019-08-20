import { DataPointType } from '../interface';

const THEME_MAP = {}; // 主题映射
/**
 * 获取对应的主题
 * @param type
 */
export const getTheme = (type: string): DataPointType => {
  return THEME_MAP[type.toLowerCase()];
};

/**
 * 注册主题
 * @param type
 * @param theme
 */
export const registerTheme = (type: string, theme: DataPointType): void => {
  if (getTheme(type)) {
    throw new Error(`Theme type '${type}' existed.`);
  }
  THEME_MAP[type.toLowerCase()] = theme;
};
