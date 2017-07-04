const expect = require('chai').expect;
const CoordController = require('../../../../src/chart/controller/coord-controller.js');

describe('test coord controller', function() {

  const controller = new CoordController({
    type: 'rect'
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
      type: 'polar'
    });
    expect(controller.type).equal('polar');
    expect(controller.actions.length).equal(0);
    const coord = controller.createCoord({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coord.isTransposed).equal(false);
    expect(coord.convert({ x: 0, y: 0 })).eqls({ x: 250, y: 250 });
    expect(coord.convert({ x: 0.5, y: 0.5 })).eqls({ x: 250, y: 375 });
  });

  it('create theta', function() {
    controller.reset({
      type: 'theta',
      actions: [[ 'rotate', Math.PI ]]
    });
    const coord = controller.createCoord({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coord.isTransposed).equal(true);
  });
});
