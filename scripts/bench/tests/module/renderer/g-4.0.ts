import { randomColor, randomText } from '@/utils';
import { Canvas } from '@antv/g-old';

export const gOld = (container: HTMLElement) => {
  const canvas = new Canvas({
    containerId: container.id,
    width: 800,
    height: 600,
    pixelRatio: 2,
  });
  return {
    Circle(cx: number, cy: number, r: number) {
      canvas.addShape('circle', {
        attrs: {
          x: cx,
          y: cy,
          r,
          fill: randomColor(),
        },
      });
      canvas.draw();
      return Promise.resolve();
    },
    Rect(x: number, y: number, width: number, height: number) {
      canvas.addShape('rect', {
        attrs: {
          x,
          y,
          width,
          height,
          fill: randomColor(),
        },
      });
      canvas.draw();
      return Promise.resolve();
    },
    Text(x: number, y: number) {
      canvas.addShape('text', {
        attrs: {
          x,
          y,
          text: randomText(),
          fill: randomColor(),
          fontSize: Math.random() * 20,
        },
      });
      canvas.draw();
      return Promise.resolve();
    },
  };
};
