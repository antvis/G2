import { Chart } from '../../../../src/index';
import RectMultiMask from '../../../../src/interaction/action/mask/multiple/rect';
import DimRectMultiMask from '../../../../src/interaction/action/mask/multiple/dim-rect';
import CircleMultiMask from '../../../../src/interaction/action/mask/multiple/circle';
import PathMultiMask from '../../../../src/interaction/action/mask/multiple/path';
import SmoothPathMultiMask from '../../../../src/interaction/action/mask/multiple/smooth-path';

import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';
import { IShape } from '../../../../src/dependents';

describe('test multiple mask', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 800,
    height: 800,
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
  chart.interval().position('year*value').color('year');
  chart.render();

  const context = new Context(chart);
  describe('test multiple rect mask', () => {
    const maskAction = new RectMultiMask(context);
    let recordPoints;
    let maskShapes;
    it('start and show', () => {
      context.event = {
        x: 100,
        y: 100,
      };

      maskAction.start();
      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      // @ts-ignore
      recordPoints = maskAction.recordPoints;
      expect(recordPoints).not.toBe(null);
      expect(recordPoints.length).toEqual(1);
      expect(maskShapes.length).toEqual(1);
      let showed = false;
      chart.on('multi-mask:show', () => {
        showed = true;
      });
      maskAction.show();
      expect(showed).toBe(true);
    });

    it('resize', () => {
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();
      expect(maskShapes[0].attr('x')).toBe(100);
      expect(maskShapes[0].attr('y')).toBe(100);
      expect(maskShapes[0].attr('width')).toBe(100);
      expect(maskShapes[0].attr('height')).toBe(100);

      context.event = {
        x: 300,
        y: 300,
      };
      maskAction.resize();
      expect(maskShapes[0].attr('width')).toBe(200);
      expect(maskShapes[0].attr('height')).toBe(200);
    });

    it('end', () => {
      let ended = false;
      chart.on('multi-mask:end', () => {
        ended = true;
      });
      maskAction.end();
      expect(ended).toBe(true);
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
      expect(maskShapes[0].attr('x')).toBe(110);
      expect(maskShapes[0].attr('y')).toBe(110);
      expect(maskShapes[0].attr('width')).toBe(200);
      expect(maskShapes[0].attr('height')).toBe(200);

      context.event = {
        x: 170,
        y: 170,
      };
      maskAction.move();

      expect(maskShapes[0].attr('x')).toBe(120);
      expect(maskShapes[0].attr('y')).toBe(120);
      expect(maskShapes[0].attr('width')).toBe(200);
      expect(maskShapes[0].attr('height')).toBe(200);

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
      expect(maskShapes[0].attr('x')).toBe(130);
      expect(maskShapes[0].attr('y')).toBe(130);

      context.event = {
        x: 170,
        y: 170,
      };
      maskAction.move();
      expect(maskShapes[0].attr('x')).toBe(140);
      expect(maskShapes[0].attr('y')).toBe(140);

      context.event = {
        x: 140,
        y: 140,
      };
      maskAction.move();
      expect(maskShapes[0].attr('x')).toBe(110);
      expect(maskShapes[0].attr('y')).toBe(110);

      context.event = {
        x: 130,
        y: 130,
      };
      maskAction.move();
      expect(maskShapes[0].attr('x')).toBe(100);
      expect(maskShapes[0].attr('y')).toBe(100);

      maskAction.moveEnd();
    });

    it('add multiple mask', () => {
      context.event = {
        x: 400,
        y: 400,
      };
      maskAction.start();
      maskAction.show();
      context.event = {
        x: 420,
        y: 420,
      };
      maskAction.resize();
      context.event = {
        x: 440,
        y: 440,
      };
      maskAction.resize();
      maskAction.end();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(2);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(2);

      context.event = {
        x: 450,
        y: 450,
      };
      maskAction.start();
      maskAction.show();
      context.event = {
        x: 460,
        y: 460,
      };
      maskAction.resize();
      context.event = {
        x: 480,
        y: 480,
      };
      maskAction.resize();
      maskAction.end();

      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(3);
      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      expect(maskShapes.length).toEqual(3);
      expect(maskShapes[0].attr('x')).toBe(100);
      expect(maskShapes[0].attr('y')).toBe(100);
      expect(maskShapes[0].attr('width')).toBe(200);
      expect(maskShapes[0].attr('height')).toBe(200);
      expect(maskShapes[1].attr('x')).toBe(400);
      expect(maskShapes[1].attr('y')).toBe(400);
      expect(maskShapes[1].attr('width')).toBe(40);
      expect(maskShapes[1].attr('height')).toBe(40);
      expect(maskShapes[2].attr('x')).toBe(450);
      expect(maskShapes[2].attr('y')).toBe(450);
      expect(maskShapes[2].attr('width')).toBe(30);
      expect(maskShapes[2].attr('height')).toBe(30);
    });

    it('hide', () => {
      maskAction.hide();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape) => maskShape.get('visible'))).toBe(false);
    });

    it('clear', () => {
      maskAction.show();

      // cursor on first mask, only clear this mask
      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(2);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(2);

      // cursor not on any mask, clear all
      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(0);
    });

    it('destroy', () => {
      maskAction.destroy();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape: IShape) => maskShape.destroyed)).toEqual(true);
    });
  });

  describe('test dim rect mask', () => {
    let maskAction;
    const coord = chart.getCoordinate();
    const { start, end } = coord;
    let recordPoints;
    let maskShapes;

    it('start, resize and end vertical', () => {
      maskAction = new DimRectMultiMask(context);
      maskAction.init();
      context.event = {
        x: 100,
        y: 100,
      };

      maskAction.start();
      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      // @ts-ignore
      recordPoints = maskAction.recordPoints;
      expect(recordPoints).not.toBe(null);
      expect(recordPoints.length).toEqual(1);
      expect(maskShapes.length).toEqual(1);

      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.resize();
      expect(maskShapes[0].attr('x')).toBe(100);
      expect(maskShapes[0].attr('width')).toBe(100);

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

      expect(maskAction.maskShapes[0].attr('x')).toBe(110);
      expect(maskAction.maskShapes[0].attr('width')).toBe(100);
      maskAction.moveEnd();
    });

    it('add multiple mask', () => {
      context.event = {
        x: 220,
        y: 100,
      };
      maskAction.start();
      context.event = {
        x: 260,
        y: 200,
      };
      maskAction.resize();
      maskAction.end();

      context.event = {
        x: 280,
        y: 100,
      };
      maskAction.start();
      context.event = {
        x: 300,
        y: 200,
      };
      maskAction.resize();
      maskAction.end();

      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      expect(maskShapes.length).toEqual(3);
      expect(maskShapes[0].attr('x')).toBe(110);
      expect(maskShapes[0].attr('width')).toBe(100);
      expect(maskShapes[1].attr('x')).toBe(220);
      expect(maskShapes[1].attr('width')).toBe(40);
      expect(maskShapes[2].attr('x')).toBe(280);
      expect(maskShapes[2].attr('width')).toBe(20);
      expect(maskAction.recordPoints.length).toEqual(3);
    });

    it('hide', () => {
      maskAction.hide();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape) => maskShape.get('visible'))).toBe(false);
    });

    it('clear', () => {
      maskAction.show();

      // cursor on first mask, only clear this mask
      context.event = {
        x: 120,
        y: 120,
      };
      maskAction.clear();
      expect(maskAction.maskShapes.length).toEqual(2);
      expect(maskAction.recordPoints.length).toEqual(2);

      // cursor not on any mask, clear all
      context.event = {
        x: 120,
        y: 120,
      };
      maskAction.clear();
      expect(maskAction.maskShapes.length).toEqual(0);
      expect(maskAction.recordPoints.length).toEqual(0);
    });

    it('destroy', () => {
      maskAction.destroy();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape: IShape) => maskShape.destroyed)).toEqual(true);
    });

    it('horizontal', () => {
      maskAction = new DimRectMultiMask(context, { dim: 'y' });
      maskAction.init();
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

      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      expect(maskShapes[0].attr('x')).toBe(start.x);
      expect(maskShapes[0].attr('width')).toBe(end.x - start.x);
    });
  });

  describe('test circle mask', () => {
    const maskAction = new CircleMultiMask(context);
    let recordPoints;
    let maskShapes;
    it('start, resize and end', () => {
      // @ts-ignore
      expect(maskAction.recordPoints).toBe(null);
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.start();
      maskAction.show();
      context.event = {
        x: 200,
        y: 220,
      };
      maskAction.resize();
      // @ts-ignore
      expect(maskAction.maskShapes[0].attr('r')).toBe(10);

      context.event = {
        x: 200,
        y: 240,
      };
      maskAction.resize();
      // @ts-ignore
      expect(maskAction.maskShapes[0].attr('r')).toBe(20);
      maskAction.end();
    });

    it('add multiple mask', () => {
      context.event = {
        x: 300,
        y: 300,
      };
      maskAction.start();
      context.event = {
        x: 320,
        y: 320,
      };
      maskAction.resize();
      maskAction.end();

      context.event = {
        x: 400,
        y: 400,
      };
      maskAction.start();
      context.event = {
        x: 460,
        y: 460,
      };
      maskAction.resize();
      maskAction.end();

      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(3);
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(3);
    });

    it('hide', () => {
      maskAction.hide();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape) => maskShape.get('visible'))).toBe(false);
    });

    it('clear', () => {
      maskAction.show();

      // cursor on first mask, only clear this mask
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(2);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(2);

      // cursor not on any mask, clear all
      context.event = {
        x: 200,
        y: 200,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(0);
    });

    it('destroy', () => {
      maskAction.destroy();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape: IShape) => maskShape.destroyed)).toEqual(true);
    });
  });

  describe('test path mask', () => {
    const maskAction = new PathMultiMask(context);
    let recordPoints;
    let maskShapes;
    it('start and end', () => {
      // @ts-ignore
      expect(maskAction.recordPoints).toBe(null);
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      context.event = {
        x: 100,
        y: 120,
      };
      maskAction.addPoint();

      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(1);
      // @ts-ignore
      expect(maskShapes.length).toEqual(1);
      expect(maskShapes[0].attr('path').length).toBe(3);

      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.addPoint();
      expect(maskShapes[0].attr('path').length).toBe(4);

      context.event = {
        x: 150,
        y: 80,
      };
      maskAction.addPoint();
      expect(maskShapes[0].attr('path').length).toBe(5);
      maskAction.end();
    });

    it('add multiple mask', () => {
      context.event = {
        x: 20,
        y: 10,
      };
      maskAction.start();
      context.event = {
        x: 30,
        y: 10,
      };
      maskAction.addPoint();
      context.event = {
        x: 30,
        y: 20,
      };
      maskAction.addPoint();
      context.event = {
        x: 20,
        y: 20,
      };
      maskAction.addPoint();
      maskAction.end();

      context.event = {
        x: 120,
        y: 10,
      };
      maskAction.start();
      context.event = {
        x: 130,
        y: 10,
      };
      maskAction.addPoint();
      context.event = {
        x: 130,
        y: 20,
      };
      maskAction.addPoint();
      context.event = {
        x: 120,
        y: 20,
      };
      maskAction.addPoint();
      maskAction.end();

      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(3);
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(3);
    });

    it('hide', () => {
      maskAction.hide();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape) => maskShape.get('visible'))).toBe(false);
    });

    it('clear', () => {
      maskAction.show();

      // cursor on first mask, only clear this mask
      context.event = {
        x: 25,
        y: 15,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(2);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(2);

      // cursor not on any mask, clear all
      context.event = {
        x: 25,
        y: 15,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(0);
    });

    it('destroy', () => {
      maskAction.destroy();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape: IShape) => maskShape.destroyed)).toEqual(true);
    });
  });

  describe('test smooth path mask', () => {
    const maskAction = new SmoothPathMultiMask(context);
    let recordPoints;
    let maskShapes;
    it('start and end', () => {
      // @ts-ignore
      expect(maskAction.recordPoints).toBe(null);
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      context.event = {
        x: 100,
        y: 100,
      };
      maskAction.start();
      context.event = {
        x: 100,
        y: 120,
      };
      maskAction.addPoint();

      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(1);
      // @ts-ignore
      maskShapes = maskAction.maskShapes;
      // @ts-ignore
      expect(maskShapes.length).toEqual(1);
      expect(maskShapes[0].attr('path').length).toBe(2);

      context.event = {
        x: 150,
        y: 150,
      };
      maskAction.addPoint();
      expect(maskShapes[0].attr('path').length).toBe(4);

      context.event = {
        x: 150,
        y: 80,
      };
      maskAction.addPoint();
      expect(maskShapes[0].attr('path').length).toBe(5);
      maskAction.end();
    });

    it('add multiple mask', () => {
      context.event = {
        x: 20,
        y: 10,
      };
      maskAction.start();
      context.event = {
        x: 30,
        y: 10,
      };
      maskAction.addPoint();
      context.event = {
        x: 30,
        y: 20,
      };
      maskAction.addPoint();
      context.event = {
        x: 20,
        y: 20,
      };
      maskAction.addPoint();
      maskAction.end();

      context.event = {
        x: 120,
        y: 10,
      };
      maskAction.start();
      context.event = {
        x: 130,
        y: 10,
      };
      maskAction.addPoint();
      context.event = {
        x: 130,
        y: 20,
      };
      maskAction.addPoint();
      context.event = {
        x: 120,
        y: 20,
      };
      maskAction.addPoint();
      maskAction.end();

      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(3);
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(3);
    });

    it('hide', () => {
      maskAction.hide();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape) => maskShape.get('visible'))).toBe(false);
    });

    it('clear', () => {
      maskAction.show();

      // cursor on first mask, only clear this mask
      context.event = {
        x: 25,
        y: 15,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(2);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(2);

      // cursor not on any mask, clear all
      context.event = {
        x: 25,
        y: 15,
      };
      maskAction.clear();
      // @ts-ignore
      expect(maskAction.maskShapes.length).toEqual(0);
      // @ts-ignore
      expect(maskAction.recordPoints.length).toEqual(0);
    });

    it('destroy', () => {
      maskAction.destroy();
      // @ts-ignore
      expect(maskAction.maskShapes.every((maskShape: IShape) => maskShape.destroyed)).toEqual(true);
    });
  });
});
