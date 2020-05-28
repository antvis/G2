import { MIN_CHART_HEIGHT, MIN_CHART_WIDTH } from '../constant';
import { Size } from '../interface';

/**
 * get the element's bounding size
 * @param ele dom element
 * @returns the element width and height
 */
function getElementSize(ele: HTMLElement): Size {
  const style = getComputedStyle(ele);

  return {
    width:
      (ele.clientWidth || parseInt(style.width, 10)) -
      parseInt(style.paddingLeft, 10) -
      parseInt(style.paddingRight, 10),
    height:
      (ele.clientHeight || parseInt(style.height, 10)) -
      parseInt(style.paddingTop, 10) -
      parseInt(style.paddingBottom, 10),
  };
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
 * @ignore
 * calculate the chart size
 * @param ele DOM element
 * @param autoFit should auto fit
 * @param width chart width which is set by user
 * @param height chart height which is set by user
 * @returns the chart width and height
 */
export function getChartSize(ele: HTMLElement, autoFit: boolean, width: number, height: number): Size {
  let w = width;
  let h = height;

  if (autoFit) {
    const size = getElementSize(ele);

    w = size.width ? size.width : w;
    h = size.height ? size.height : h;
  }

  return {
    width: Math.max(isNumber(w) ? w : MIN_CHART_WIDTH, MIN_CHART_WIDTH),
    height: Math.max(isNumber(h) ? h : MIN_CHART_HEIGHT, MIN_CHART_HEIGHT),
  };
}

/**
 * @ignore
 * remove html element from its parent
 * @param dom
 */
export function removeDom(dom: HTMLElement) {
  const parent = dom.parentNode;

  if (parent) {
    parent.removeChild(dom);
  }
}

/** @ignore */
export { createDom, modifyCSS } from '@antv/dom-util';
