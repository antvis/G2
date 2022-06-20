import { Coordinate } from '@antv/coord';
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
import { applyStyle, PathCommand } from '../utils';

// todo: use type define which exported from G.
type PathCommand = any;

export type ConnectorOptions = ConnectorPathStyleProps & Record<string, any>;

type MarkerStyleProps = {
  size?: number;
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
    const { connectorPath, ...style } = this.attributes;
    this.connector = select(this.connector || this.appendChild(new Path({})))
      .style('path', connectorPath)
      .call(applyStyle, style)
      .node() as Path;
  }

  private drawEndMarker() {
    const { stroke, endMarker } = this.style;
    this.endMarker = this.endMarker || this.appendChild(new Marker({}));
    this.endMarker.update({ size: 8, fill: stroke, ...endMarker });
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
  const { direction = 'upward', offset = 12, endMarker, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;

    const P = getPoints(coordinate, points, direction, offset);
    const path = getPath(P, coordinate);
    const [, , , p3] = P;

    return select(new ConnectorPath({}))
      .style('connectorPath', path)
      .style('stroke', color)
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
