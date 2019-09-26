import { Canvas } from '@antv/g';

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
export function createCanvas(args: object): Canvas {
  return new Canvas({
    width: 800,
    height: 600,
    renderer: 'canvas',
    pixelRatio: 2,
    ...args,
  });
}
