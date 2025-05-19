import { Coordinate } from '@antv/coord';
import type { PathArray } from '@antv/util';
import { PathStyleProps, Path } from '@antv/g';
import { Marker } from '@antv/component';
import { line as d3line } from '@antv/vendor/d3-shape';
import { ShapeComponent as SC, Vector2, WithPrefix } from '../../runtime';
import { isTranspose } from '../../utils/coordinate';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { applyStyle } from '../utils';

export type ConnectorOptions = ConnectorPathStyleProps & Record<string, any>;

type MarkerStyleProps<P extends string> = WithPrefix<Record<string, any>, P>;

type ConnectorPathStyleProps = Omit<PathStyleProps, 'path'> &
  MarkerStyleProps<'endMarker'> & {
    connectorPath?: PathArray[];
    endMarker?: boolean;
  };

function inferSymbol(x: number, y: number, r: number) {
  return [['M', x, y], ['L', x + 2 * r, y - r], ['L', x + 2 * r, y + r], ['Z']];
}

/**
 * @todo support polar later.
 */
function inferConnectorPath(points: Vector2[]) {
  return d3line()
    .x((d) => d[0])
    .y((d) => d[1])(points);
}

function getPoints(
  coordinate: Coordinate,
  points: Vector2[],
  sourceOffsetY: number,
  targetOffsetY: number,
  sourceOffsetX: number,
  targetOffsetX: number,
  length1 = 0,
): Vector2[] {
  const [[x0, y0], [x1, y1]] = points;

  if (isTranspose(coordinate)) {
    const X0 = x0 + sourceOffsetY;
    const X1 = x1 + targetOffsetY;
    const X = X0 + length1;
    const Y0 = y0 + sourceOffsetX;
    const Y1 = y1 + targetOffsetX;
    return [
      [X0, Y0],
      [X, Y0],
      [X, Y1],
      [X1, Y1],
    ];
  }

  const Y0 = y0 - sourceOffsetY;
  const Y1 = y1 - targetOffsetY;
  const Y = Y0 - length1;
  const X0 = x0 - sourceOffsetX;
  const X1 = x1 - targetOffsetX;
  return [
    [X0, Y0],
    [X0, Y],
    [X1, Y],
    [X1, Y1],
  ];
}

export const Connector: SC<ConnectorOptions> = (options, context) => {
  const {
    offsetX = 0,
    sourceOffsetX = offsetX,
    targetOffsetX = offsetX,
    offsetY = 0,
    sourceOffsetY = offsetY,
    targetOffsetY = offsetY,
    connectLength1: length1,
    endMarker = true,
    ...style
  } = options;
  const { coordinate } = context;

  return (points, value, defaults) => {
    const { color: defaultColor, connectLength1, ...rest } = defaults;
    const { color, transform } = value;
    const P = getPoints(
      coordinate,
      points,
      sourceOffsetY,
      targetOffsetY,
      sourceOffsetX,
      targetOffsetX,
      length1 ?? connectLength1,
    );
    const makerStyle = subObject({ ...style, ...defaults }, 'endMarker');

    return select(new Path())
      .call(applyStyle, rest)
      .style('d', inferConnectorPath(P))
      .style('stroke', color || defaultColor)
      .style('transform', transform)
      .style(
        'markerEnd',
        endMarker
          ? new Marker({
              className: 'marker',
              style: {
                ...makerStyle,
                symbol: inferSymbol,
              },
            })
          : null,
      )
      .call(applyStyle, style)
      .node();
  };
};

Connector.props = {
  defaultMarker: 'line',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
