import { randomColor, randomText } from '@/utils';
import { Canvas, Circle, Text, Rect, ElementEvent } from '@antv/g';
import { Renderer } from '@antv/g-canvas';

export const g = (container: HTMLElement) => {
  const renderer = new Renderer();
  const canvas = new Canvas({
    container,
    renderer,
    width: 800,
    height: 600,
  });

  const creator = (
    ctor: new (...args: any[]) => Circle | Text | Rect,
    mounted: () => void,
    x: number,
    y: number,
    p1?: number,
    p2?: number,
  ) => {
    const element = new ctor({
      style: {
        x,
        cx: x,
        y,
        cy: y,
        width: p1,
        r: (p1 || 0) / 2,
        height: p2,
        text: randomText(),
        fill: randomColor(),
      },
    });

    element.isMutationObserved = true;
    element.addEventListener(ElementEvent.MOUNTED, () => {
      mounted();
    });
    return element;
  };

  return {
    Circle(cx: number, cy: number, size: number) {
      return new Promise((resolve) => {
        canvas.appendChild(creator(Circle, resolve, cx, cy, size));
      });
    },
    Rect(x: number, y: number, width: number, height: number) {
      return new Promise((resolve) => {
        canvas.appendChild(creator(Rect, resolve, x, y, width, height));
      });
    },
    Text(x: number, y: number) {
      return new Promise((resolve) => {
        canvas.appendChild(creator(Text, resolve, x, y));
      });
    },
  };
};
