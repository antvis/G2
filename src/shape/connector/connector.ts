import { Coordinate } from '@antv/coord';
import type { PathArray } from '@antv/util';
import { PathStyleProps, Path } from '@antv/g';
import { Marker } from '@antv/component';
import { line as d3line } from 'd3-shape';
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
  offset1: number,
  offset2: number,
  length1 = 0,
): Vector2[] {
  const [[x0, y0], [x1, y1]] = points;

  if (isTranspose(coordinate)) {
    const X0 = x0 + offset1;
    const X1 = x1 + offset2;
    const X = X0 + length1;
    return [
      [X0, y0],
      [X, y0],
      [X, y1],
      [X1, y1],
    ];
  }

  const Y0 = y0 - offset1;
  const Y1 = y1 - offset2;
  const Y = Y0 - length1;
  return [
    [x0, Y0],
    [x0, Y],
    [x1, Y],
    [x1, Y1],
  ];
}

export const Connector: SC<ConnectorOptions> = (options, context) => {
  const {
    offset = 0,
    offset1 = offset,
    offset2 = offset,
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
      offset1,
      offset2,
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
