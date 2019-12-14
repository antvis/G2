/**
 * @description 全局变量
 */
import * as _ from '@antv/util';
// @ts-ignore
import * as pkg from '../package.json';
import { DataPointType } from './interface';
import { getTheme } from './theme';

const Global = {
  version: pkg.version,
  renderer: 'canvas',
  width: 640,
  height: 480,
  pixelRatio: null,
  animate: true,
  widthRatio: {
    // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.9999999, // 玫瑰图柱状占比 1
    multiplePie: 1 / 1.3, // 多层的饼图、环图
  },
  theme: getTheme('default'),
  setTheme: (type: string | DataPointType): void => {
    let newTheme = {};
    if (_.isObject(type)) {
      newTheme = type;
    } else if (getTheme(type as string)) {
      newTheme = getTheme(type as string);
    } else {
      newTheme = getTheme('default');
    }
    // @ts-ignore
    _.deepMix(Global.theme, newTheme);
  },
};

export default Global;
export const setTheme = Global.setTheme;
export const version = Global.version;
