import { Chart } from '../../../../src/index';
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
  chart.tooltip(false);
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
