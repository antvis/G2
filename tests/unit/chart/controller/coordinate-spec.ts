import CoordinateController from '../../../../src/chart/controller/coordinate';

describe('test coordinate controller', () => {
  const controller = new CoordinateController();

  it('init', () => {
    expect(controller.getOption()).toEqual({
      type: 'rect',
      actions: [],
      cfg: {},
    });
  });

  it('action method', () => {
    const { actions } = controller.getOption();

    controller.transpose();
    expect(actions.length).toBe(1);
    expect(actions[0]).toEqual([ 'transpose' ]);

    controller.rotate(180);
    expect(actions.length).toBe(2);
    expect(actions[1]).toEqual([ 'rotate', Math.PI ]);

    controller.scale(1, -1);
    expect(actions.length).toBe(3);
    expect(actions[2]).toEqual([ 'scale', 1, -1 ]);

    controller.reflect('x');
    expect(actions.length).toBe(4);
    expect(actions[3]).toEqual([ 'reflect', 'x' ]);
  });

  it('create coord', () => {
    const coordinate = controller.create({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coordinate.isTransposed).toBe(true);
  });

  it('update', () => {
    controller.update({
      type: 'polar'
    });
    expect(controller.getOption()).toEqual({
      type: 'polar',
      actions: [],
      cfg: {},
    });

    const coordinate = controller.create({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coordinate.isTransposed).toBe(false);
    expect(coordinate.convert({ x: 0, y: 0 })).toEqual({ x: 250, y: 250 });
    expect(coordinate.convert({ x: 0.5, y: 0.5 })).toEqual({ x: 250, y: 375 });
  });

  it('create theta', () => {
    controller.update({
      type: 'theta',
      actions: [[ 'rotate', Math.PI ]]
    });
    const coordinate = controller.create({ x: 0, y: 0 }, { x: 500, y: 500 });
    expect(coordinate.isTransposed).toBe(true);
  });
});
