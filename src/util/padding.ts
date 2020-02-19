import { isArray, isNumber } from '@antv/util';
import { Padding, ViewPadding } from '../interface';

/**
 * @ignore
 * 是否是自动 padding
 * @param padding
 */
export function isAutoPadding(padding: ViewPadding): padding is 'auto' {
  return !isNumber(padding) && !isArray(padding);
}

/**
 * @ignore
 * padding 的解析逻辑
 * @param padding
 * @return [ top, right, bottom, left ]
 */
export function parsePadding(padding: number[] | number = 0): Padding {
  let paddingArray = isArray(padding) ? padding : [padding];

  switch (paddingArray.length) {
    case 0:
      paddingArray = [0, 0, 0, 0];
      break;
    case 1:
      paddingArray = new Array(4).fill(paddingArray[0]);
      break;
    case 2:
      paddingArray = [...paddingArray, ...paddingArray];
      break;
    case 3:
      paddingArray = [...paddingArray, paddingArray[1]];
      break;
    default:
      // 其他情况，只去四个
      paddingArray = paddingArray.slice(0, 4);
      break;
  }

  return paddingArray as [number, number, number, number];
}
