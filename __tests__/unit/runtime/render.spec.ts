import { render } from '../../../src';
import { createDiv, mount, unmountAll } from './utils';

describe('render', () => {
  it('render({}) returns a canvas wrapped in HTMLElement with default size', () => {
    const chart = render({});
    mount(createDiv(), chart);

    const canvas = chart.childNodes[0] as HTMLCanvasElement;
    expect(canvas.style.width).toBe('640px');
    expect(canvas.style.height).toBe('480px');
  });

  it('render({width, height}) returns a canvas wrapped in HTMLElement with specified size', () => {
    const chart = render({
      width: 800,
      height: 200,
    });
    mount(createDiv(), chart);

    const canvas = chart.childNodes[0] as HTMLCanvasElement;
    expect(canvas.style.width).toBe('800px');
    expect(canvas.style.height).toBe('200px');
  });

  afterAll(() => {
    unmountAll();
  });
});
