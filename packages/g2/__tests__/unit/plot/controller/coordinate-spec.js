import { expect } from 'chai';
import CoordController from '../../../../src/plot/controller/coordinate';

describe('CoordController', () => {
  const controller = new CoordController({
    type: 'rect',
  });

  it('init', function() {
    expect(controller.type).equal('rect');
    expect(controller.actions.length).equal(0);
  });

  it('action method', function() {
    const actions = controller.actions;
    controller.transpose();
    expect(actions.length).equal(1);
    expect(actions[0]).eqls([ 'transpose' ]);

    controller.rotate(180);
    expect(actions.length).equal(2);
    expect(actions[1]).eqls([ 'rotate', Math.PI ]);

    controller.scale(1, -1);
    expect(actions.length).equal(3);
    expect(actions[2]).eqls([ 'scale', 1, -1 ]);

    controller.reflect('x');
    expect(actions.length).equal(4);
    expect(actions[3]).eqls([ 'reflect', 'x' ]);
  });

  it('create coord', function() {
    const coord = controller.createCoord({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coord.isTransposed).equal(true);
  });

  it('reset', function() {
    controller.reset({
      type: 'polar',
      cfg: {
        radius: 0.45,
      }
    });
    expect(controller.type).equal('polar');
    expect(controller.actions.length).equal(0);
    expect(controller.cfg).eql({
      radius: 0.45,
    });

    const coord = controller.createCoord({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coord.isTransposed).equal(false);
  });

  it('create theta', function() {
    controller.reset({
      type: 'theta',
      actions: [ [ 'rotate', Math.PI ] ],
    });

    expect(controller.actions).to.eql([ [ 'rotate', Math.PI ] ]);
    const coord = controller.createCoord({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coord.isTransposed).equal(true);
  });

  it('create default coordinate', () => {
    const coordController = new CoordController();
    const coordinate = coordController.createCoord({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coordinate.type).to.equal('cartesian');
  });
});
