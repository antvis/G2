import { getEngine } from '../../src/';
import { ICanvas } from '../../src/dependents';

/**
 * 创建一个 div 节点，并放到 container，默认放到 body 上
 * @param container
 */
export function createDiv(container: HTMLElement = document.body): HTMLElement {
  const div = document.createElement('div');

  container.appendChild(div);

  return div;
}

/**
 * 创建一个 G.Canvas
 */
export function createCanvas(args: any): ICanvas {
  const { renderer = 'canvas' } = args;

  const G = getEngine(renderer);

  return new G.Canvas({
    width: 800,
    height: 600,
    pixelRatio: 2,
    autoDraw: false,
    ...args,
  });
}

export function removeDom(dom: HTMLElement) {
  const parent = dom.parentNode;

  if (parent) {
    parent.removeChild(dom);
  }
}
