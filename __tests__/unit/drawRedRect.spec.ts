import { drawRedRect } from '../../src';

describe('drawRedRect', () => {
  test('drawRedRect', () => {
    const svg = drawRedRect();
    document.body.appendChild(svg);
    expect(svg.getElementsByTagName('rect').length).toBe(1);
  });
});
