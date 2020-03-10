import { Chart } from '../../../../src/index';
import CircleMask from '../../../../src/interaction/action/mask/circle';
import PathMask from '../../../../src/interaction/action/mask/path';
import RectMask from '../../../../src/interaction/action/mask/rect';
import SmoothMask from '../../../../src/interaction/action/mask/smooth-path';
import DimMask from '../../../../src/interaction/action/mask/dim-rect';

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
    let maskShape;
    it('start and show', () => {
      maskAction.show(); // 无效
      context.event = {
        x: 100,
        y: 100,
      };

      maskAction.start();
      // @ts-ignore
      maskShape = maskAction.maskShape;
      expect(maskShape).not.toBe(null);
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
      expect(maskShape.attr('x')).toBe(100);
      expect(maskShape.attr('y')).toBe(100);
      expect(maskShape.attr('width')).toBe(100);
      expect(maskShape.attr('height')).toBe(100);
    
      context.event = {
        x: 300,
        y: 300,
      };
      maskAction.resize();
      expect(maskShape.attr('width')).toBe(200);
      expect(maskShape.attr('height')).toBe(200);
    });
    // 停止后不能再 resize
    it('end', () => {
      const width = maskShape.attr('width')
      maskAction.end();
      context.event = {
        x: 400,
        y: 400,
      };
      maskAction.resize();
      // @ts-ignore
      expect(maskShape.attr('width')).toEqual(width);
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
      expect(maskShape.attr('x')).toBe(110);
      expect(maskShape.attr('y')).toBe(110);
      expect(maskShape.attr('width')).toBe(100);
      expect(maskShape.attr('height')).toBe(100);

      context.event = {
        x: 170,
        y: 170,
      };
      maskAction.move();

      expect(maskShape.attr('x')).toBe(120);
      expect(maskShape.attr('y')).toBe(120);
      expect(maskShape.attr('width')).toBe(100);
      expect(maskShape.attr('height')).toBe(100);

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
      expect(maskShape.attr('x')).toBe(130);
      expect(maskShape.attr('y')).toBe(130);

      context.event = {
        x: 170,
        y: 170,
      };
      maskAction.move();
      expect(maskShape.attr('x')).toBe(140);
      expect(maskShape.attr('y')).toBe(140);


      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.move();
      expect(maskShape.attr('x')).toBe(120);
      expect(maskShape.attr('y')).toBe(120);
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

      expect(maskShape.attr('x')).toBe(100);
      expect(maskShape.attr('y')).toBe(100);
      expect(maskShape.attr('width')).toBe(100);
      expect(maskShape.attr('height')).toBe(100);
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
      expect(maskShape.attr('x')).toBe(100);
      expect(maskShape.attr('y')).toBe(100);
      expect(maskShape.attr('width')).toBe(100);
      expect(maskShape.attr('height')).toBe(100);

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
      expect(shape.attr('r')).toBe(10);

      context.event = {
        x: 400,
        y: 200,
      };
      maskAction.resize();
      expect(shape.attr('r')).toBe(100);
    });

    it('end', () => {
      maskAction.end();
      context.event = {
        x: 100,
        y: 200,
      };
      maskAction.resize();
      expect(shape.attr('r')).not.toBe(50);
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

  describe('test vertical rect mask', () => {
    let maskAction;
    const coord = chart.getCoordinate();
    const {start, end} = coord;
    let maskShape;
    
    it('start and resize', () => {
      maskAction = new DimMask(context);
      maskAction.init();
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      // @ts-ignore
      maskShape = maskAction.maskShape;
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();
      expect(maskShape.attr('x')).toBe(100);
      expect(maskShape.attr('width')).toBe(100);

      maskAction.end();
    });
    it('move', () => {
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
      expect(maskShape.attr('x')).toBe(110);
      expect(maskShape.attr('width')).toBe(100);
      maskAction.moveEnd();
    });

    it('inPlot', () => {
      context.event = {
        x: 300,
        y: 300,
      };
      maskAction.start();

      context.event = {
        x: 500,
        y: 500,
      };

      maskAction.resize();
      expect(maskShape.attr('x')).toBe(300);
      expect(maskShape.attr('width')).toBe(end.x - 300);
    });

    it('horizontal', () => {
      maskAction = new DimMask(context, {dim: 'y'});
      maskAction.init();
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      // @ts-ignore
      maskShape = maskAction.maskShape;
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();
      expect(maskShape.attr('x')).toBe(start.x);
      expect(maskShape.attr('width')).toBe(end.x - start.x);
      maskAction.end();
    });
  });
});
