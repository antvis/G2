import { randomColor, randomText } from '@/utils';

export const canvas = (container: HTMLElement) => {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  canvas.style.width = `${800}px`;
  canvas.style.height = `${600}px`;
  const scale = window.devicePixelRatio;
  canvas.width = 800 * scale;
  canvas.height = 600 * scale;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.scale(scale, scale);
  return {
    Circle(cx: number, cy: number, size: number) {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = randomColor();
      ctx.fill();
      ctx.closePath();
      return Promise.resolve();
    },
    Rect(x: number, y: number, w: number, h: number) {
      ctx.fillStyle = randomColor();
      ctx.fillRect(x, y, w, h);
      return Promise.resolve();
    },
    Text(x: number, y: number) {
      ctx.fillStyle = randomColor();
      ctx.font = `${Math.random() * 20}px serif`;
      ctx.fillText(randomText(), x, y);
      return Promise.resolve();
    },
  };
};
