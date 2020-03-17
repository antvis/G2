import { Chart } from '../../../../src/index';
import Translate from '../../../../src/interaction/action/view/scale-translate';
import Zoom from '../../../../src/interaction/action/view/scale-zoom';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test scale trasform', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  const data = [
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ];
  chart.data(data);
  chart.animate(false);
  chart.tooltip(false);
  chart
    .interval()
    .position('year*value')
    .color('year');
  chart.render();

  const context = new Context(chart);

  describe('test translate', () => {
    const xScale = chart.getXScale();
    const yScale = chart.getYScales()[0];
    const { min, max } = yScale;
    const { values } = xScale;
    const transAction = new Translate(context);
    it('start', () => {
      context.event = {
        x: 100,
        y: 100,
      };
      // start 前调用，无效
      transAction.reset();
      transAction.end();
      transAction.translate();
      // @ts-ignore
      expect(transAction.starting).toBe(false);
      transAction.start();
      // @ts-ignore
      expect(transAction.starting).toBe(true);
      context.event = {
        x: 100,
        y: 115,
      };
      transAction.translate();
      expect(yScale.min > min).toBe(true);
      expect(yScale.max > max).toBe(true);
      context.event = {
        x: 100,
        y: 85,
      };
      transAction.translate();
      expect(yScale.min < min).toBe(true);
      expect(yScale.max < max).toBe(true);
    });

    it('end', () => {
      transAction.end();
      // @ts-ignore
      expect(transAction.starting).toBe(false);
      context.event = {
        x: 100,
        y: 55,
      };
      transAction.translate();
      // @ts-ignore
      expect(transAction.starting).toBe(false);
    });

    it('reset', () => {
      transAction.reset();
      expect(yScale.min).toBe(min);
      expect(yScale.max).toBe(max);
    });

    it('translate x', () => {
      // @ts-ignore
      transAction.dims = ['x'];
      context.event = {
        x: 100,
        y: 100,
      };
      transAction.start();
      context.event = {
        x: 110,
        y: 100,
      };
      transAction.translate();
      expect(xScale.values).toEqual(values);
    });
    afterAll(() => {
      transAction.destroy();
    });
  });

  describe('test zoom', () => {
    it('zoom in, zoom out', () => {
      const zoomAction = new Zoom(context, {
        dims: ['y'],
      });
      zoomAction.init();
      // @ts-ignore
      expect(zoomAction.dims).toEqual(['y']);
      chart.clear();
      chart
        .interval()
        .position('year*value')
        .color('year');
      chart.render();
      const yScale = chart.getYScales()[0];
      const { min, max } = yScale;
      const range = max - min;
      zoomAction.zoomIn();
      // @ts-ignore
      const ratio = zoomAction.zoomRatio;

      expect(yScale.min).toBe(min - range * ratio);
      expect(yScale.max).toBe(max + range * ratio);

      zoomAction.zoomIn();
      expect(yScale.min).toBeCloseTo(min - range * ratio * 2);
      expect(yScale.max).toBeCloseTo(max + range * ratio * 2);

      zoomAction.zoomOut();
      expect(yScale.min).toBeCloseTo(min - range * ratio);
      expect(yScale.max).toBeCloseTo(max + range * ratio);

      zoomAction.zoomOut();
      zoomAction.zoomOut();
      expect(yScale.min).toBeCloseTo(min + range * ratio);
      expect(yScale.max).toBeCloseTo(max - range * ratio);
      zoomAction.reset();
      expect(yScale.min).toBeCloseTo(min);
      expect(yScale.max).toBeCloseTo(max);
      zoomAction.destroy();
    });

    it('x zoom', () => {
      const zoomAction = new Zoom(context, {
        dims: ['x'],
      });
      zoomAction.init();
      // @ts-ignore
      expect(zoomAction.dims).toEqual(['x']);
    });
  });
});
