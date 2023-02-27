import { randomColor, randomText } from '@/utils';

export const svg = (container: HTMLElement) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.addEventListener('onload', () => {
    console.log('onload');
  });
  container.appendChild(svg);
  svg.setAttribute('width', '800');
  svg.setAttribute('height', '600');
  return {
    Circle(cx: number, cy: number, r: number) {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );
      circle.setAttribute('cx', cx.toString());
      circle.setAttribute('cy', cy.toString());
      circle.setAttribute('r', r.toString());
      circle.setAttribute('fill', randomColor());
      svg.appendChild(circle);
      return Promise.resolve();
    },
    Rect(x: number, y: number, w: number, h: number) {
      const rect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      );
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', w.toString());
      rect.setAttribute('height', h.toString());
      rect.setAttribute('fill', randomColor());
      svg.appendChild(rect);
      return Promise.resolve();
    },
    Text(x: number, y: number) {
      const textElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text',
      );
      textElement.setAttribute('x', x.toString());
      textElement.setAttribute('y', y.toString());
      textElement.setAttribute('fill', randomColor());
      textElement.setAttribute('font-size', (Math.random() * 20).toString());
      textElement.textContent = randomText();
      svg.appendChild(textElement);
      return Promise.resolve();
    },
  };
};
