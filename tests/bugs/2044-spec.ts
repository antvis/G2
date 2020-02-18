import CoordinateController from '../../src/chart/controller/coordinate';

// 坐标系在 adjust 的时候，需要重新执行 matrix 相关 actions
describe('#2044', () => {
  it('Coordinate', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 1, y: 1 };

    const coordinateController = new CoordinateController();

    // 设置配置
    coordinateController.scale(1, -1);
    coordinateController.rotate(Math.PI);

    // 创建
    coordinateController.create({ x: 0, y: 100 }, { x: 100, y: 0 });

    const matrix1 = coordinateController.getCoordinate().matrix;

    // 更新调整
    coordinateController.adjust({ x: 0, y: 200 }, { x: 200, y: 0 });

    const matrix2 = coordinateController.getCoordinate().matrix;

    // 引用变化
    expect(matrix1).not.toBe(matrix2);
    // 因为 start end 变化，所以 matrix 也不相等
    expect(matrix1).not.toEqual(matrix2);
  });
});
