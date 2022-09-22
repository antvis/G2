import { Coordinate } from '@antv/coord';
import { deepMix } from '@antv/util';
import {
  CustomElement,
  DisplayObjectConfig,
  Path,
  PathStyleProps,
} from '@antv/g';
import { Marker } from '@antv/gui';
import { line as d3line } from 'd3-shape';
import { isTranspose } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle, getShapeTheme, PathCommand } from '../utils';

export type ConnectorOptions = ConnectorPathStyleProps & Record<string, any>;

type MarkerStyleProps = {
  r?: number;
  fill?: string;
  fillOpacity?: number;
  symbol?: string | ((x: number, y: number, r: number) => string);
};

type ConnectorPathStyleProps = Omit<PathStyleProps, 'path'> & {
  connectorPath?: PathCommand[];
  direction?: 'upward' | 'downward';
  endMarker?: MarkerStyleProps;
};

class ConnectorPath extends CustomElement<ConnectorPathStyleProps> {
  constructor(config: DisplayObjectConfig<ConnectorPathStyleProps>) {
    super(config);
  }

  // Callback after connected with canvas, should trigger render.
  connectedCallback() {
    this.draw();
  }

  attributeChangedCallback() {
    this.draw();
  }

  private connector!: Path;
  private endMarker!: Marker;

  protected draw() {
    this.drawPath();
    this.drawEndMarker();
  }

  private drawPath() {
    // Do not copy className to path.
    const { connectorPath, class: className, ...style } = this.attributes;
    this.connector = select(this.connector || this.appendChild(new Path({})))
      .style('path', connectorPath)
      .call(applyStyle, style)
      .node() as Path;
  }

  private drawEndMarker() {
    const { stroke, endMarker = {} } = this.style;
    const { r = 4, ...style } = endMarker;
    this.endMarker = this.endMarker || this.appendChild(new Marker({}));
    this.endMarker.update({ size: r * 2, fill: stroke, ...style });
  }
}

/**
 * todo support polar later.
 */
function getPath(points: Vector2[], coordinate: Coordinate) {
  return d3line()
    .x((d) => d[0])
    .y((d) => d[1])(points);
}

function getPoints(
  coordinate: Coordinate,
  points: Vector2[],
  direction: string,
  offset: number,
): Vector2[] {
  const [from, to] = points;
  if (isTranspose(coordinate)) {
    const x =
      direction === 'downward'
        ? Math.min(from[0], to[0]) - offset
        : Math.max(from[0], to[0]) + offset;
    return [from, [x, from[1]], [x, to[1]], to];
  }
  const y =
    direction === 'downward'
      ? Math.max(from[1], to[1]) + offset
      : Math.min(from[1], to[1]) - offset;
  return [from, [from[0], y], [to[0], y], to];
}

function toTopArrow(x: number, y: number, r: number) {
  return [['M', x - r, y + 2 * r], ['L', x, y], ['L', x + r, y + 2 * r], ['Z']];
}
function toDownArrow(x: number, y: number, r: number) {
  return [['M', x, y], ['L', x - r, y - 2 * r], ['L', x + r, y - 2 * r], ['Z']];
}
function toLeftArrow(x: number, y: number, r: number) {
  return [['M', x, y], ['L', x + 2 * r, y - r], ['L', x + 2 * r, y + r], ['Z']];
}

function getSymbol(points: Vector2[]) {
  const [, , p2, p3] = points;
  return p3[0] < p2[0] ? toLeftArrow : p2[1] > p3[1] ? toTopArrow : toDownArrow;
}

export const Connector: SC<ConnectorOptions> = (options) => {
  const {
    direction = 'upward',
    offset = 12,
    endMarker: endMarkerOptions,
    ...style
  } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const {
      fill,
      stroke = fill,
      endMarker: endMarkerTheme,
      ...shapeTheme
    } = getShapeTheme(theme, mark, shape, defaultShape);
    const { color, transform } = value;

    const P = getPoints(coordinate, points, direction, offset);
    const path = getPath(P, coordinate);
    const [, , , p3] = P;
    const endMarker = deepMix({}, endMarkerTheme, endMarkerOptions);

    return select(new ConnectorPath({}))
      .call(applyStyle, shapeTheme)
      .style('connectorPath', path)
      .style('stroke', color || stroke)
      .style('transform', transform)
      .style('endMarker', {
        x: p3[0],
        y: p3[1],
        symbol: getSymbol(P),
        ...endMarker,
      })
      .call(applyStyle, style)
      .node();
  };
};

Connector.props = {
  defaultEnterAnimation: 'fadeIn',
};
