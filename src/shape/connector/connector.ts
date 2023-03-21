import { Coordinate } from '@antv/coord';
import type { PathArray } from '@antv/util';
import { PathStyleProps } from '@antv/g';
import { Marker } from '@antv/gui';
import { line as d3line } from 'd3-shape';
import { ShapeComponent as SC, Vector2, WithPrefix } from '../../runtime';
import { createElement } from '../../shape/createElement';
import { isTranspose } from '../../utils/coordinate';
import { subObject } from '../../utils/helper';
import { select } from '../../utils/selection';
import { applyStyle, getShapeTheme } from '../utils';

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

const ConnectorPath = createElement((g) => {
  // Do not copy className to path.
  const {
    points,
    class: className,
    endMarker = true,
    direction,
    ...rest
  } = g.attributes;

  const markerStyle = subObject(rest, 'endMarker');
  const path = inferConnectorPath(points);

  select(g)
    .maybeAppend('connector', 'path')
    .style('path', path)
    .style(
      'markerEnd',
      endMarker
        ? new Marker({
            className: 'marker',
            style: {
              ...markerStyle,
              symbol: inferSymbol,
            },
          })
        : null,
    )
    .call(applyStyle, rest);
});

function getPoints(
  coordinate: Coordinate,
  points: Vector2[],
  offset: number,
  length1 = 0,
): Vector2[] {
  const [[x0, y0], [x1, y1]] = points;

  if (isTranspose(coordinate)) {
    const OFFSET = offset;
    const X0 = x0 + OFFSET;
    const X1 = x1 + OFFSET;
    const X = X0 + length1;

    return [
      [X0, y0],
      [X, y0],
      [X, y1],
      [X1, y1],
    ];
  }

  const OFFSET = -offset;
  const Y0 = y0 + OFFSET;
  const Y1 = y1 + OFFSET;
  const Y = Y0 + -length1;
  return [
    [x0, Y0],
    [x0, Y],
    [x1, Y],
    [x1, Y1],
  ];
}

export const Connector: SC<ConnectorOptions> = (options) => {
  const { offset = 0, connectLength1: length1, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const {
      defaultColor,
      connectLength1 = length1,
      ...shapeTheme
    } = getShapeTheme(theme, mark, shape, defaultShape);
    const { color, transform } = value;

    const P = getPoints(coordinate, points, offset, connectLength1);

    return select(new ConnectorPath())
      .call(applyStyle, shapeTheme)
      .style('points', P)
      .style('stroke', color || defaultColor)
      .style('transform', transform)
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
