import { Chart, registerShape } from '../../src';
import { createDiv } from '../util/dom';

registerShape('interval', '2798-shape', {
  draw(cfg, container) {
    const center = this.parsePoint({ x: 0.5, y: 0.5 });
    container.setClip({
      type: 'circle',
      attrs: {
        x: center.x,
        y: center.y,
        r: 50,
      },
    });

    container.addShape('rect', {
      name: 'rect',
      attrs: {
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        fill: 'red',
      },
    });

    return container;
  }
})

describe('2798', () => {
  it('2798', () => {
    const data = [
      { type: '一线城市', value: 0.19 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: false,
    });
    chart.data(data);
    chart
      .interval()
      .position('type*value')
      .shape('2798-shape')

    chart.legend(false);
    chart.axis(false);
    chart.tooltip(false);
    chart.animate(false);

    chart.render();

    expect(chart.middleGroup.getChildren()[0].get('clipShape').attr('x')).toBe(200);

    chart.changeSize(600, 300);

    expect(chart.middleGroup.getChildren()[0].get('clipShape').attr('x')).toBe(300);
  });
});
