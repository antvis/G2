import { MIN_CHART_HEIGHT, MIN_CHART_WIDTH } from '../constant';
import { Size } from '../interface';

/**
 * get the element's bounding size
 * @param ele dom element
 * @returns the element width and height
 */
function getElementSize(ele: HTMLElement): Size {
  const { width, height } = ele.getBoundingClientRect();
  return { width, height };
}

/**
 * is value a valid number
 * @param v the input value
 * @returns whether it is a number
 */
function isNumber(v: any): boolean {
  return typeof v === 'number' && !isNaN(v);
}

/**
 * calculate the chart size
 * @param ele DOM element
 * @param autoFit should auto fit
 * @param width chart width which is set by user
 * @param height chart height which is set by user
 * @returns the chart width and height
 */
export function getChartSize(ele: HTMLElement, autoFit: boolean, width: number, height: number): Size {
  const size = autoFit ? getElementSize(ele) : { width, height };

  const t = {
    width: Math.max(isNumber(size.width) ? size.width : MIN_CHART_WIDTH, MIN_CHART_WIDTH),
    height: Math.max(isNumber(size.height) ? size.height : MIN_CHART_HEIGHT, MIN_CHART_HEIGHT),
  };

  return t;
}
