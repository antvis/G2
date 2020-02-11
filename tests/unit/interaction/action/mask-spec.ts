import { Chart } from '../../../../src/index';
import CircleMask from '../../../../src/interaction/action/mask/circle';
import PathMask from '../../../../src/interaction/action/mask/path';
import RectMask from '../../../../src/interaction/action/mask/rect';
import SmoothMask from '../../../../src/interaction/action/mask/smooth-path';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test mask', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  chart
    .interval()
    .position('year*value')
    .color('year');
  chart.render();

  const context = new Context(chart);
  describe('test rect mask', () => {
    const maskAction = new RectMask(context);

    it('start and show', () => {
      maskAction.show(); // 无效
      context.event = {
        x: 100,
        y: 100,
      };

      maskAction.start();
      // @ts-ignore
      expect(maskAction.maskShape).not.toBe(null);
      let called = false;
      chart.on('mask:show', () => {
        called = true;
      });
      maskAction.show();
      expect(called).toBe(true);
    });

    it('resize', () => {
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();

      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 100, 100],
        ['L', 200, 100],
        ['L', 200, 200],
        ['L', 100, 200],
        ['Z'],
      ]);
      context.event = {
        x: 300,
        y: 300,
      };
      maskAction.resize();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 100, 100],
        ['L', 300, 100],
        ['L', 300, 300],
        ['L', 100, 300],
        ['Z'],
      ]);
    });
    // 停止后不能再 resize
    it('end', () => {
      // @ts-ignore
      const path = maskAction.maskShape.attr('path');
      maskAction.end();
      context.event = {
        x: 400,
        y: 400,
      };
      maskAction.resize();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual(path);
    });

    it('move', () => {
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();

      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();
      maskAction.end();
      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.moveStart();
      context.event = {
        x: 160,
        y: 160,
      };
      maskAction.move();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 110, 110],
        ['L', 210, 110],
        ['L', 210, 210],
        ['L', 110, 210],
        ['Z'],
      ]);

      context.event = {
        x: 170,
        y: 170,
      };
      maskAction.move();

      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 120, 120],
        ['L', 220, 120],
        ['L', 220, 220],
        ['L', 120, 220],
        ['Z'],
      ]);
      maskAction.moveEnd();

      // move again
      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.moveStart();
      context.event = {
        x: 160,
        y: 160,
      };
      maskAction.move();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 130, 130],
        ['L', 230, 130],
        ['L', 230, 230],
        ['L', 130, 230],
        ['Z'],
      ]);

      context.event = {
        x: 170,
        y: 170,
      };
      maskAction.move();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 140, 140],
        ['L', 240, 140],
        ['L', 240, 240],
        ['L', 140, 240],
        ['Z'],
      ]);

      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.move();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 120, 120],
        ['L', 220, 120],
        ['L', 220, 220],
        ['L', 120, 220],
        ['Z'],
      ]);
      maskAction.moveEnd();
    });

    it('move not correct', () => {
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();

      // move again
      context.event = {
        x: 150,
        y: 150,
      };
      // not move start, but move
      maskAction.move();

      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 100, 100],
        ['L', 200, 100],
        ['L', 200, 200],
        ['L', 100, 200],
        ['Z'],
      ]);
      maskAction.end();

      // move again
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.moveStart();
      maskAction.start();

      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();
      // @ts-ignore
      expect(maskAction.maskShape.attr('path')).toEqual([
        ['M', 100, 100],
        ['L', 200, 100],
        ['L', 200, 200],
        ['L', 100, 200],
        ['Z'],
      ]);

    });

    it('hide', () => {
      maskAction.hide();
      // @ts-ignore
      expect(maskAction.maskShape.get('visible')).toBe(false);
    });

    it('destroy', () => {
      // @ts-ignore
      const shape = maskAction.maskShape;
      maskAction.destroy();
      expect(shape.destroyed).toEqual(true);
    });
  });

  describe('test circle mask', () => {
    const maskAction = new CircleMask(context);
    let shape = null;
    it('start', () => {
      // @ts-ignore
      expect(maskAction.maskShape).toBe(null);
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.start();
      maskAction.show();
      // @ts-ignore
      shape = maskAction.maskShape;
      context.event = {
        x: 200,
        y: 220,
      };
      maskAction.resize();
      expect(shape.attr('path')[1][1]).toBe(10);

      context.event = {
        x: 400,
        y: 200,
      };
      maskAction.resize();
      expect(shape.attr('path')[1][1]).toBe(100);
    });

    it('end', () => {
      maskAction.end();
      context.event = {
        x: 100,
        y: 200,
      };
      maskAction.resize();
      expect(shape.attr('path')[1][1]).not.toBe(50);
      maskAction.hide();
      expect(shape.get('visible')).toBe(false);
    });

    it('destroy', () => {
      maskAction.destroy();
      expect(shape.destroyed).toBe(true);
    });
  });

  describe('test path mask', () => {
    const maskAction = new PathMask(context);
    let shape = null;
    it('start', () => {
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      // @ts-ignore
      shape = maskAction.maskShape;
      context.event = {
        x: 100,
        y: 120,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(3);

      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(4);

      context.event = {
        x: 150,
        y: 80,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(5);
    });

    it('end', () => {
      const length = shape.attr('path').length;
      maskAction.end();
      context.event = {
        x: 30,
        y: 80,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(length);
    });

    it('start again', () => {
      context.event = {
        x: 10,
        y: 10,
      };
      maskAction.start();
      expect(shape.attr('path').length).toBe(2);
      context.event = {
        x: 100,
        y: 10,
      };
      maskAction.addPoint();
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.addPoint();
    });

    it('destroy', () => {
      maskAction.destroy();
      expect(shape.get('destroyed')).toBe(true);
    });
  });

  describe('test smooth path mask', () => {
    const maskAction = new SmoothMask(context);
    let shape = null;
    it('start', () => {
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      // @ts-ignore
      shape = maskAction.maskShape;
      context.event = {
        x: 100,
        y: 120,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(2);

      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(4);

      context.event = {
        x: 150,
        y: 80,
      };
      maskAction.addPoint();
      expect(shape.attr('path').length).toBe(5);
    });

    it('destroy', () => {
      maskAction.destroy();
      expect(shape.get('destroyed')).toBe(true);
    });
  });

  // describe('test vertical rect mask', () => {

  // });

  // describe('test horizontal rect mask', () => {

  // });
});
