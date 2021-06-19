import { Chart, registerInteraction } from '../../../src/index';
import { createDiv } from '../../util/dom';

registerInteraction('element-link', {
  start: [{ trigger: 'element:mouseenter', action: 'element-link-by-color:link', arg: { style: { fill: 'red' } } }],
  end: [{ trigger: 'element:mouseleave', action: 'element-link-by-color:unlink' }],
});

describe('test element interaction', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data([
    { year: '2014', type: 'Sales', sales: 1000 },
    { year: '2015', type: 'Sales', sales: 1170 },
    { year: '2016', type: 'Sales', sales: 660 },
    { year: '2017', type: 'Sales', sales: 1030 },
    { year: '2014', type: 'Expenses', sales: 400 },
    { year: '2015', type: 'Expenses', sales: 460 },
    { year: '2016', type: 'Expenses', sales: 1120 },
    { year: '2017', type: 'Expenses', sales: 540 },
    { year: '2014', type: 'Profit', sales: 300 },
    { year: '2015', type: 'Profit', sales: 300 },
    { year: '2016', type: 'Profit', sales: 300 },
    { year: '2017', type: 'Profit', sales: 350 },
  ]);
  chart.animate(true);
  chart.tooltip(false);
  chart.interval().position('year*sales').color('type').adjust('stack');
  chart.interaction('element-link');

  chart.render();
  const elements = chart.geometries[0].elements;
  const first = elements[0];

  let linkGroup;

  it('active', () => {
    chart.emit('element:mouseenter', {
      target: first.shape,
    });

    linkGroup = chart.foregroundGroup.findById('link-by-color-group');
    expect(linkGroup).not.toBeNull();
    expect(linkGroup.getCount()).toBe(1);

    expect(linkGroup.getChildren()[0].getChildren()[0].attr('fill')).toBe('red');
    chart.emit('element:mouseleave', {
      target: first.shape,
    });
    expect(linkGroup.getCount()).toBe(0);
  });

  it('modify', () => {
    chart.interaction('element-link', {
      start: [
        { trigger: 'element:mouseenter', action: 'element-link-by-color:link', arg: { style: { fill: 'yellow' } } },
      ],
    });
    chart.emit('element:mouseenter', {
      target: first.shape,
    });
    linkGroup = chart.foregroundGroup.findById('link-by-color-group');
    expect(linkGroup.getChildren()[0].getChildren()[0].attr('fill')).toBe('yellow');
    chart.emit('element:mouseleave', {
      target: first.shape,
    });
    expect(linkGroup.getCount()).toBe(0);
  });

  it('remove interaction', () => {
    chart.removeInteraction('element-link');
    chart.emit('element:mouseenter', {
      target: first.shape,
    });

    linkGroup = chart.foregroundGroup.findById('link-by-color-group');
    expect(linkGroup).toBeNull();
  });
  afterAll(() => {
    chart.destroy();
  });
});
