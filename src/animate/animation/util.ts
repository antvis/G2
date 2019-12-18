import { transform } from '@antv/matrix-util';
import { Coordinate, IGroup, IShape } from '../../dependents';
import { Point } from '../../interface';
import { getSectorPath } from '../../util/graphics';
import { AnimateCfg } from '../interface';

/**
 * 获取同坐标系范围相同的剪切区域
 * @param coordinate
 * @returns
 */
export function getCoordinateClipCfg(coordinate: Coordinate) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();
  const margin = 20;

  if (coordinate.isPolar) {
    const { startAngle, endAngle } = coordinate;
    const center = coordinate.getCenter();
    // @ts-ignore 需要 coordinate 基类上支持
    const radius = coordinate.getRadius();

    return {
      type: 'path',
      attrs: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, startAngle),
      },
      endState: (ratio) => {
        const diff = (endAngle - startAngle) * ratio + startAngle;
        const path = getSectorPath(center.x, center.y, radius + margin, startAngle, diff);
        return {
          path,
        };
      },
    };
  }

  let endState;
  if (coordinate.isTransposed) {
    endState = {
      height: height + margin * 2,
    };
  } else {
    endState = {
      width: width + margin * 2,
    };
  }

  return {
    type: 'rect',
    attrs: {
      x: start.x - margin,
      y: end.y - margin,
      width: coordinate.isTransposed ? width + margin * 2 : 0,
      height: coordinate.isTransposed ? 0 : height + margin * 2,
    },
    endState,
  };
}

/**
 * 对图形元素进行矩阵变换，同时返回变换前的图形矩阵
 * @param shape 进行矩阵变换的图形
 * @param vector 矩阵变换的中心点
 * @param direct 矩阵变换的类型
 */
export function transformShape(shape: IShape | IGroup, vector: [number, number], direct: string): number[] {
  let scaledMatrix;

  const [x, y] = vector;
  shape.applyToMatrix([x, y, 1]);
  if (direct === 'x') {
    shape.setMatrix(
      transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 0.01, 1],
        ['t', x, y],
      ])
    );
    scaledMatrix = transform(shape.getMatrix(), [
      ['t', -x, -y],
      ['s', 100, 1],
      ['t', x, y],
    ]);
  } else if (direct === 'y') {
    shape.setMatrix(
      transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 1, 0.01],
        ['t', x, y],
      ])
    );
    scaledMatrix = transform(shape.getMatrix(), [
      ['t', -x, -y],
      ['s', 1, 100],
      ['t', x, y],
    ]);
  } else if (direct === 'xy') {
    shape.setMatrix(
      transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 0.01, 0.01],
        ['t', x, y],
      ])
    );
    scaledMatrix = transform(shape.getMatrix(), [
      ['t', -x, -y],
      ['s', 100, 100],
      ['t', x, y],
    ]);
  }
  return scaledMatrix;
}

/**
 * 对图形元素进行剪切动画
 * @param element 进行动画的图形元素
 * @param animateCfg 动画配置
 * @param coordinate 当前坐标系
 * @param yMinPoint y 轴的最小值对应的图形坐标点
 * @param type 剪切动画的类型
 */
export function doClipScaleAnimate(
  element: IGroup | IShape,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  yMinPoint: Point,
  type: string
) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();
  let x: number;
  let y: number;

  let clipShape;
  if (coordinate.isRect) {
    clipShape = element.setClip({
      type: 'rect',
      attrs: {
        x: start.x,
        y: end.y,
        width,
        height,
      },
    }) as IShape;
  } else {
    // 如果非直角坐标系，则剪切图形为圆形
    const center = coordinate.getCenter();
    clipShape = element.setClip({
      type: 'circle',
      attrs: {
        ...center,
        // @ts-ignore
        r: coordinate.getRadius(),
      },
    });
  }

  if (type === 'y') {
    x = start.x + width / 2;
    y = yMinPoint.y < start.y ? yMinPoint.y : start.y;
  } else if (type === 'x') {
    x = yMinPoint.x > start.x ? yMinPoint.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coordinate.isPolar) {
      x = coordinate.getCenter().x;
      y = coordinate.getCenter().y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  const endMatrix = transformShape(clipShape, [x, y], type);
  clipShape.animate(
    {
      matrix: endMatrix,
    },
    {
      ...animateCfg,
      callback: () => {
        if (element && !element.get('destroyed')) {
          element.set('clipShape', null);
        }
        clipShape.remove(true); // 动画结束需要将剪切图形销毁
      },
    }
  );
}
