import { Chart } from '../../../src/index';
import { createDiv } from '../../util/dom';
import { delay } from '../../util/delay';

describe('interaction: active-region', () => {
  const data = [
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
  ];

  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data(data);
  chart.scale({
    sales: {
      maxLimit: 1800,
      tickInterval: 600,
      nice: true,
    },
  });

  chart.tooltip({
    showMarkers: false,
    shared: true,
  });

  chart.interval().position('year*sales').color('type').adjust('stack');
  chart.interaction('active-region');
  chart.render();

  let activeRegion;

  it('active test', () => {
    const point = chart.getXY(data[0]);
    chart.emit('plot:mousemove', point);

    activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    expect(activeRegion).not.toBeNull();
    expect(activeRegion.get('visible')).toBe(true);

    chart.emit('plot:mouseleave', point);
    expect(activeRegion.get('visible')).toBe(false);
  });

  it('tooltip: false, not effect actvie-region', async () => {
    chart.tooltip(false);

    await delay(100);
    const point = chart.getXY(data[2]);
    chart.emit('plot:mousemove', point);

    await delay(100);
    activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    expect(activeRegion).not.toBeNull();
    expect(activeRegion.get('visible')).toBe(true);

    chart.emit('plot:mouseleave', point);
    expect(activeRegion.get('visible')).toBe(false);
  });

  it('custom appendRatio & appendWidth', async () => {
    const point = chart.getXY(data[0]);
    chart.emit('plot:mousemove', point);
    let activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    // 默认 appendRatio: 0.25
    expect(activeRegion.getBBox().width).toBe(chart.geometries[0].elements[0].shape.getBBox().width * (1 + 0.25 * 2));
    chart.emit('plot:mouseleave', point);

    chart.interaction('active-region', {
      start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { appendRatio: 0.1 } }],
    });
    chart.emit('plot:mousemove', point);
    activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    expect(activeRegion.getBBox().width).toBe(chart.geometries[0].elements[0].shape.getBBox().width * (1 + 0.1 * 2));
    chart.emit('plot:mouseleave', point);

    chart.interaction('active-region', {
      start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { appendRatio: 0 } }],
    });
    chart.emit('plot:mousemove', point);
    activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    expect(activeRegion.getBBox().width).toBe(chart.geometries[0].elements[0].shape.getBBox().width);
    chart.emit('plot:mouseleave', point);

    chart.interaction('active-region', {
      start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { appendRatio: 0.4, appendWidth: 4 } }],
    });
    chart.emit('plot:mousemove', point);
    activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    expect(activeRegion.getBBox().width).toBe(chart.geometries[0].elements[0].shape.getBBox().width + 4 * 2);
    chart.emit('plot:mouseleave', point);
  });

  it('remove interaction', () => {
    let activeRegion = chart.backgroundGroup.findAllByName('active-region')[0];
    expect(activeRegion).not.toBeUndefined();

    chart.removeInteraction('active-region');
    activeRegion = chart.backgroundGroup.findAllByName('active-region')?.[0];
    expect(activeRegion).toBeUndefined();
  });
  afterAll(() => {
    chart.destroy();
  });
});
