import { Chart, registerInteraction } from '../../../../src/index';
import { isPointInCoordinate } from '../../../../src/util/coordinate';
import { createDiv } from '../../../util/dom';

describe('test active region', () => {
  const dom = createDiv();
  const chart = new Chart({
    container: dom,
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.animate(false);
  chart.interaction('active-region');
  chart.interval().position('year*value');
  chart.render();

  let regionShape = null;
  it('show', () => {
    const point = chart.getXY({ year: '1999', value: 3 });
    chart.emit('plot:mousemove', point);
    regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];
    expect(regionShape).not.toBe(null);
    const bbox = regionShape.getBBox();
    expect(bbox.minX < 56);
    expect(bbox.maxX > 56);
  });

  it('hide', () => {
    chart.emit('plot:mouseleave', {});
    expect(regionShape.get('visible')).toBe(false);
  });

  it('transpose', () => {
    chart.coordinate('rect').transpose();
    chart.render();

    const point = chart.getXY({ year: '1999', value: 3 });
    chart.emit('plot:mousemove', point);
    expect(regionShape.get('visible')).toBe(true);
    chart.emit('plot:mouseleave', {});
    expect(regionShape.get('visible')).toBe(false);
  });

  it('polar', () => {
    chart.coordinate('polar');
    chart.render();

    const point = chart.getXY({ year: '1999', value: 3 });
    chart.emit('plot:mousemove', point);
    expect(regionShape.get('visible')).toBe(true);
    chart.emit('plot:mouseleave', {});
    expect(regionShape.get('visible')).toBe(false);
  });

  it('region-path style', () => {
    const point = chart.getXY({ year: '1999', value: 3 });
    chart.emit('plot:mousemove', point);
    expect(regionShape.get('visible')).toBe(true);
    expect(regionShape.attr('fill')).toBe('#CCD6EC');
    chart.emit('plot:mouseleave', {});

    // 方式1: 覆盖注册, 且需要 chart 重新绑定交互
    registerInteraction('active-region', {
      start: [
        { trigger: 'plot:mousemove', action: 'active-region:show', arg: { style: { fill: 'rgba(255,0,0,0.25)' } } },
      ],
      end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
    });
    chart.interaction('active-region');
    chart.emit('plot:mousemove', point);
    const regionShape2 = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];
    expect(regionShape2.get('visible')).toBe(true);
    expect(regionShape2.attr('fill')).toBe('rgba(255,0,0,0.25)');
    chart.emit('plot:mouseleave', {});
    expect(regionShape2.get('visible')).toBe(false);

    chart.removeInteraction('active-region');
    // multiple actions with args
    registerInteraction('custom', {
      start: [{ trigger: 'plot:mousemove', action: ['tooltip:show', 'active-region:show'] }],
      end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
    });

    chart.interaction('custom', {
      start: [
        {
          trigger: 'plot:mousemove',
          action: ['tooltip:show', 'active-region:show'],
          arg: [null, { style: { fill: 'blue' } }],
        },
      ],
    });
    chart.emit('plot:mousemove', point);
    const regionShape3 = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];
    // @ts-ignore
    expect(chart.getController('tooltip').isVisible()).toBe(true);
    expect(regionShape3.attr('fill')).toBe('blue');
    chart.emit('plot:mouseleave', {});
    chart.removeInteraction('custom');

    // 方式2: 重新绑定交互，且传入参数
    chart.interaction('active-region', {
      start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { style: { fill: 'pink' } } }],
    });
    chart.emit('plot:mousemove', point);
    expect(chart.backgroundGroup.findAll((el) => el.get('name') === 'active-region')[0].attr('fill')).toBe('pink');
    chart.emit('plot:mouseleave', {});
  });

  it('change trigger', () => {
    chart.coordinate('rect');
    chart.render();

    const point = chart.getXY({ year: '1999', value: 3 });
    chart.interaction('active-region', {
      start: [
        {
          trigger: 'click',
          action: 'active-region:show',
          isEnable(context) {
            const view = context.view;
            const event = context.event;
            const coordinate = view.getCoordinate();
            return isPointInCoordinate(coordinate, { x: event.x, y: event.y });
          },
        },
      ],
      end: [
        {
          trigger: 'click',
          action: 'active-region:hide',
          isEnable(context) {
            const view = context.view;
            const event = context.event;
            const coordinate = view.getCoordinate();
            return !isPointInCoordinate(coordinate, { x: event.x, y: event.y });
          },
        },
      ],
    });
    expect(regionShape.destroyed).toBe(true);
    chart.emit('plot:mousemove', point);
    regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];
    expect(regionShape).toBe(undefined);
    chart.emit('click', point);
    regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];
    expect(regionShape).not.toBe(undefined);
    expect(regionShape.get('visible')).toBe(true);
    chart.emit('click', {
      x: 120,
      y: 390,
    });
    expect(regionShape.get('visible')).toBe(false);
  });

  it('remove interaction', () => {
    expect(chart.interactions['active-region']).not.toBe(undefined);
    chart.removeInteraction('active-region');
    expect(chart.interactions['active-region']).toBe(undefined);
    expect(regionShape.destroyed).toBe(true);
  });
  afterAll(() => {
    chart.destroy();
  });
});
