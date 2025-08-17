import { Coordinate } from '@antv/coord';
import { Linear } from '@antv/scale';
import { isNumber, lowerFirst } from '@antv/util';
import { extent } from '@antv/vendor/d3-array';
import { Path as D3Path } from '@antv/vendor/d3-path';
import { Primitive, Vector2, Vector3 } from '../runtime';
import { indexOf } from '../utils/array';
import { isPolar, isTranspose } from '../utils/coordinate';
import { G2Element, Selection } from '../utils/selection';
import { angle, angleWithQuadrant, dist, sub } from '../utils/vector';

export function applyStyle(
  selection: Selection,
  style: Record<string, Primitive>,
) {
  for (const [key, value] of Object.entries(style)) {
    selection.style(key, value);
  }
}

/**
 * Draw polygon path with points.
 * @param path
 * @param points
 */
export function appendPolygon(path: D3Path, points: Vector2[]) {
  points.forEach((p, idx) =>
    idx === 0 ? path.moveTo(p[0], p[1]) : path.lineTo(p[0], p[1]),
  );
  path.closePath();
  return path;
}

export type ArrowOptions = {
  /**
   * Whether show arrow of line.
   */
  arrow?: boolean;
  /**
   * Arrow size, can be a px number, or a percentage string. Default: '40%'
   */
  arrowSize?: number | string;
};

/**
 * Draw arrow between `from` and `to`.
 * @param from
 * @param to
 * @returns
 */
export function arrowPoints(
  from: Vector2,
  to: Vector2,
  options: ArrowOptions,
): [Vector2, Vector2] {
  const { arrowSize } = options;
  const size =
    typeof arrowSize === 'string'
      ? (+parseFloat(arrowSize) / 100) * dist(from, to)
      : arrowSize;
  // TODO Use config from style.
  // Default arrow rotate is 30°.
  const arrowAngle = Math.PI / 6;

  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);

  const arrowAngle1 = Math.PI / 2 - angle - arrowAngle;
  const arrow1: Vector2 = [
    to[0] - size * Math.sin(arrowAngle1),
    to[1] - size * Math.cos(arrowAngle1),
  ];

  const arrowAngle2 = angle - arrowAngle;
  const arrow2: Vector2 = [
    to[0] - size * Math.cos(arrowAngle2),
    to[1] - size * Math.sin(arrowAngle2),
  ];

  return [arrow1, arrow2];
}

/**
 * Draw arc by from -> to, with center and radius.
 * @param path
 * @param from
 * @param to
 * @param center
 * @param radius
 */
export function appendArc(
  path: D3Path,
  from: Vector2,
  to: Vector2,
  center: Vector2,
  radius: number,
) {
  const startAngle = angle(sub(center, from)) + Math.PI;
  const endAngle = angle(sub(center, to)) + Math.PI;

  path.arc(
    center[0],
    center[1],
    radius,
    startAngle,
    endAngle,
    endAngle - startAngle < 0,
  );

  return path;
}

/**
 * @todo Fix wrong key point.
 */
export function computeGradient(
  C: string[],
  X: number[],
  Y: number[],
  from: string | boolean = 'y',
  mode: 'between' | 'start' | 'end' = 'between',
  tpShape = false,
): string {
  // The angles of gradients rendering are varies when 'from' and 'tpShape' are different.
  const getTheta = (from: string | boolean, tpShape: boolean) => {
    if (from === 'y' || from === true) {
      if (tpShape) {
        return 180;
      } else {
        return 90;
      }
    } else {
      if (tpShape) {
        return 90;
      } else {
        return 0;
      }
    }
  };

  const P = from === 'y' || from === true ? Y : X;
  const theta = getTheta(from, tpShape);
  const I = indexOf(P);

  const [min, max] = extent(I, (i) => P[i]);
  // This need to improve for non-uniform distributed colors.
  const p = new Linear({
    domain: [min, max],
    range: [0, 100],
  });

  const percentage = (i) =>
    isNumber(P[i]) && !Number.isNaN(P[i]) ? p.map(P[i]) : 0;

  const gradientMode = {
    // Interpolate the colors for this segment.
    between: (i: number) => `${C[i]} ${percentage(i)}%`,
    // Use the color of the start point as the color for this segment.
    start: (i: number) =>
      i === 0
        ? `${C[i]} ${percentage(i)}%`
        : `${C[i - 1]} ${percentage(i)}%, ${C[i]} ${percentage(i)}%`,
    // Use the color of the end point as the color for this segment.
    end: (i: number) =>
      i === C.length - 1
        ? `${C[i]} ${percentage(i)}%`
        : `${C[i]} ${percentage(i)}%, ${C[i + 1]} ${percentage(i)}%`,
  };

  const gradient = I.sort((a, b) => percentage(a) - percentage(b))
    .map(gradientMode[mode] || gradientMode['between'])
    .join(',');
  return `linear-gradient(${theta}deg, ${gradient})`;
}

export function reorder(points: Vector2[]): Vector2[] {
  const [p0, p1, p2, p3] = points;
  return [p3, p0, p1, p2];
}

export function getArcObject(
  coordinate: Coordinate,
  points: Vector2[],
  Y: [number, number],
) {
  const [p0, p1, , p3] = isTranspose(coordinate) ? reorder(points) : points;

  const [y, y1] = Y;
  const center = coordinate.getCenter() as Vector2;
  const a1 = angleWithQuadrant(sub(p0, center));
  const a2 = angleWithQuadrant(sub(p1, center));
  // There are two situations that a2 === a1:
  // 1. a1 - a2 = 0
  // 2. |a1 - a2| = Math.PI * 2
  // Distinguish them by y and y1:
  const a3 = a2 === a1 && y !== y1 ? a2 + Math.PI * 2 : a2;
  const epsilon = 1e-4;
  return {
    startAngle: a1 + epsilon,
    endAngle: (a3 - a1 >= 0 ? a3 : Math.PI * 2 + a3) - epsilon,
    innerRadius: dist(p3, center),
    outerRadius: dist(p0, center),
  };
}

/**
 * Pick connectStyle from style.
 * @param style
 */
export function getConnectStyle(
  style: Record<string, any>,
): Record<string, any> {
  const PREFIX = 'connect';
  return Object.fromEntries(
    Object.entries(style)
      .filter(([key]) => key.startsWith(PREFIX))
      .map(([key, value]) => [
        lowerFirst(key.replace(PREFIX, '').trim()),
        value,
      ])
      .filter(([key]) => key !== undefined),
  );
}

export function toOpacityKey(options) {
  const { colorAttribute, opacityAttribute = colorAttribute } = options;
  return `${opacityAttribute}Opacity`;
}

export function getTransform(coordinate, value) {
  if (!isPolar(coordinate)) return '';
  const center = coordinate.getCenter() as Vector2;
  const { transform: suffix } = value;
  return `translate(${center[0]}, ${center[1]}) ${suffix || ''}`;
}

export function getOrigin(points: (Vector2 | Vector3)[]) {
  if (points.length === 1) return points[0];
  const [[x0, y0, z0 = 0], [x2, y2, z2 = 0]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2, (z0 + z2) / 2];
}

/**
 * 表示一条边
 */
interface Edge {
  start: Vector2;
  end: Vector2;
  direction: Vector2; // 单位方向向量
  length: number;
}

/**
 * 根据坐标自动识别四边形的顶点位置,无需考虑坐标的顺序
 */
export function identifyVertices(points: Vector2[]) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const identifiedPoints = points.map((point, index) => {
    const [x, y] = point;
    const distToTopLeft = Math.sqrt((x - minX) ** 2 + (y - minY) ** 2);
    const distToTopRight = Math.sqrt((x - maxX) ** 2 + (y - minY) ** 2);
    const distToBottomRight = Math.sqrt((x - maxX) ** 2 + (y - maxY) ** 2);
    const distToBottomLeft = Math.sqrt((x - minX) ** 2 + (y - maxY) ** 2);

    const distances = {
      topLeft: distToTopLeft,
      topRight: distToTopRight,
      bottomRight: distToBottomRight,
      bottomLeft: distToBottomLeft,
    };

    const closestCorner = Object.keys(distances).reduce((a, b) =>
      distances[a as keyof typeof distances] <
      distances[b as keyof typeof distances]
        ? a
        : b,
    ) as keyof typeof distances;

    return {
      point,
      originalIndex: index,
      position: closestCorner,
    };
  });

  const sortedPoints = {
    topLeft:
      identifiedPoints.find((p) => p.position === 'topLeft')?.point ||
      points[0],
    topRight:
      identifiedPoints.find((p) => p.position === 'topRight')?.point ||
      points[1],
    bottomRight:
      identifiedPoints.find((p) => p.position === 'bottomRight')?.point ||
      points[2],
    bottomLeft:
      identifiedPoints.find((p) => p.position === 'bottomLeft')?.point ||
      points[3],
  };

  return {
    topLeft: sortedPoints.topLeft,
    topRight: sortedPoints.topRight,
    bottomRight: sortedPoints.bottomRight,
    bottomLeft: sortedPoints.bottomLeft,
  };
}

/**
 * 创建边对象
 */
function createEdge(start: Vector2, end: Vector2): Edge {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.sqrt(dx * dx + dy * dy);

  return {
    start,
    end,
    direction: length > 0 ? [dx / length, dy / length] : [0, 0],
    length,
  };
}

/**
 * 计算边上的圆角信息
 */
function calculateEdgeCorner(
  edge: Edge,
  radius: number,
  isStartCorner: boolean, // true表示在边的起点，false表示在边的终点
): {
  cornerPoint: Vector2; // 圆角在边上的位置
  hasRadius: boolean;
  actualRadius: number;
} {
  if (radius <= 0) {
    return {
      cornerPoint: isStartCorner ? edge.start : edge.end,
      hasRadius: false,
      actualRadius: 0,
    };
  }

  // 限制圆角半径不超过边长的一半
  const maxRadius = edge.length / 2;
  const actualRadius = Math.min(radius, maxRadius);

  if (actualRadius <= 0) {
    return {
      cornerPoint: isStartCorner ? edge.start : edge.end,
      hasRadius: false,
      actualRadius: 0,
    };
  }

  // 计算圆角在边上的位置
  let cornerPoint: Vector2;
  if (isStartCorner) {
    // 从起点沿边方向移动radius距离
    cornerPoint = [
      edge.start[0] + edge.direction[0] * actualRadius,
      edge.start[1] + edge.direction[1] * actualRadius,
    ];
  } else {
    // 从终点沿边反方向移动radius距离
    cornerPoint = [
      edge.end[0] - edge.direction[0] * actualRadius,
      edge.end[1] - edge.direction[1] * actualRadius,
    ];
  }

  return {
    cornerPoint,
    hasRadius: true,
    actualRadius,
  };
}
/**
 * 生成基于边的圆角路径
 */
export function createEdgeBasedRoundedPath(
  points: Vector2[],
  borderRadius:
    | number
    | {
        topLeft?: number;
        topRight?: number;
        bottomLeft?: number;
        bottomRight?: number;
      },
): string {
  // 1. 识别顶点位置
  const vertices = identifyVertices(points);

  // 2. 获取圆角配置
  const getRadius = (corner: string) => {
    if (typeof borderRadius === 'number') {
      return borderRadius;
    }
    return (borderRadius as any)?.[corner] || 0;
  };

  const radii = {
    topLeft: getRadius('topLeft'),
    topRight: getRadius('topRight'),
    bottomRight: getRadius('bottomRight'),
    bottomLeft: getRadius('bottomLeft'),
  };

  // 3. 如果所有圆角都为0，返回简单路径
  if (Object.values(radii).every((r) => r === 0)) {
    const { topLeft, topRight, bottomRight, bottomLeft } = vertices;
    return `M ${topLeft[0]} ${topLeft[1]} L ${topRight[0]} ${topRight[1]} L ${bottomRight[0]} ${bottomRight[1]} L ${bottomLeft[0]} ${bottomLeft[1]} Z`;
  }

  // 4. 创建四条边
  const edges = [
    createEdge(vertices.topLeft, vertices.topRight), // 上边
    createEdge(vertices.topRight, vertices.bottomRight), // 右边
    createEdge(vertices.bottomRight, vertices.bottomLeft), // 下边
    createEdge(vertices.bottomLeft, vertices.topLeft), // 左边
  ];

  const edgeNames = ['top', 'right', 'bottom', 'left'];
  const cornerNames = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

  // 5. 计算每条边上的圆角点
  const edgeCorners = edges.map((edge, edgeIndex) => {
    const startCornerName = cornerNames[edgeIndex]; // 边起点对应的角
    const endCornerName = cornerNames[(edgeIndex + 1) % 4]; // 边终点对应的角

    const startRadius = radii[startCornerName as keyof typeof radii];
    const endRadius = radii[endCornerName as keyof typeof radii];

    return {
      edge,
      edgeName: edgeNames[edgeIndex],
      startCorner: calculateEdgeCorner(edge, startRadius, true), // 边起点的圆角
      endCorner: calculateEdgeCorner(edge, endRadius, false), // 边终点的圆角
      startCornerName,
      endCornerName,
    };
  });

  // 6. 生成SVG路径
  const pathCommands: string[] = [];

  // 从第一条边的起点圆角开始
  const firstEdge = edgeCorners[0];
  pathCommands.push(
    `M ${firstEdge.startCorner.cornerPoint[0]} ${firstEdge.startCorner.cornerPoint[1]}`,
  );

  for (let i = 0; i < 4; i++) {
    const currentEdge = edgeCorners[i];
    const nextEdge = edgeCorners[(i + 1) % 4];

    // 沿着当前边绘制到终点圆角
    pathCommands.push(
      `L ${currentEdge.endCorner.cornerPoint[0]} ${currentEdge.endCorner.cornerPoint[1]}`,
    );

    // 在角点处绘制圆角弧线
    const cornerVertex = edges[i].end; // 当前边的终点就是角点
    const hasCornerRadius = currentEdge.endCorner.hasRadius;

    if (hasCornerRadius) {
      // 绘制圆角弧线：从当前边的终点圆角到下一条边的起点圆角
      const controlPoint = cornerVertex; // 使用角点作为控制点
      pathCommands.push(
        `Q ${controlPoint[0]} ${controlPoint[1]} ${nextEdge.startCorner.cornerPoint[0]} ${nextEdge.startCorner.cornerPoint[1]}`,
      );
    } else {
      // 没有圆角，直接连到下一条边的起点
      pathCommands.push(
        `L ${nextEdge.startCorner.cornerPoint[0]} ${nextEdge.startCorner.cornerPoint[1]}`,
      );
    }
  }
  pathCommands.push('Z');
  const finalPath = pathCommands.join(' ');
  return finalPath;
}
