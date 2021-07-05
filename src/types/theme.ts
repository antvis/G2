import { PlainObject } from './common';

export type Theme = PlainObject;

/**
 * 主题的样式 token 定义
 * TODO: 新茗
 */
export type Stylesheet = {
  name: string;
  defaultColor: string;
  brandColor: string;
  background: string;
}
