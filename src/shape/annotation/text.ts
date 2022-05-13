import {
  CustomElement,
  DisplayObjectConfig,
  Text as GText,
  TextStyleProps,
  Rect,
  RectStyleProps,
  Path,
  PathStyleProps,
} from '@antv/g';
import { Marker } from '@antv/gui';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { select } from '../../utils/selection';

export type AnnotationTextOptions = TextShapeStyleProps;

type MarkerStyleProps = {
  size?: number;
  symbol?: string | ((x: number, y: number, r: number) => string);
};

type TextShapeStyleProps = Omit<TextStyleProps, 'text'> & {
  // [todo] Support connector controlPoints config later.
  connector?: Omit<PathStyleProps, 'x' | 'y'>;
  // [todo] Use Marker to replace.
  startMarker?: MarkerStyleProps;
  endMarker?: MarkerStyleProps;
  background?: Omit<RectStyleProps, 'width' | 'height' | 'x' | 'y'> & {
    // Padding between background bounds and the text block.
    padding?: number[];
  };
};

function getConnectorPath(shape: GText | Rect) {
  const {
    min: [x0, y0],
    max: [x1, y1],
  } = shape.getLocalBounds();
  let x = 0;
  let y = 0;
  if (x0 > 0) x = x0;
  if (x1 < 0) x = x1;
  if (y0 > 0) y = y0;
  if (y1 < 0) y = y1;

  return [
    ['M', 0, 0],
    ['L', x, y],
  ];
}

class TextShape extends CustomElement<TextShapeStyleProps> {
  constructor(config: DisplayObjectConfig<TextShapeStyleProps>) {
    super(config);
  }

  // Callback after connected with canvas, should trigger render.
  connectedCallback() {
    this.draw();
  }

  attributeChangedCallback() {
    this.draw();
  }

  private textShape!: GText;
  private background!: Rect;
  private connector!: Path;
  private startMarkerPoint!: Marker;
  private endMarkerPoint!: Marker;

  protected draw() {
    this.drawText();
    this.drawBackground();
    this.drawConnector();
    this.drawPoints();
  }

  private get endPoint() {
    const { connector } = this.style;
    if (connector?.path?.length > 0) {
      const [[, x, y]] = connector.path.slice(-1);
      return { x, y };
    }
    return { x: 0, y: 0 };
  }

  private drawText() {
    const {
      connector,
      startMarker,
      endMarker,
      background,
      transform,
      textAlign,
      ...style
    } = this.attributes;
    const { x, y } = this.endPoint;
    this.textShape = select(this.textShape || this.appendChild(new GText({})))
      .call(applyStyle, style)
      .style('x', +x)
      .style('y', +y)
      .style(
        'textAlign',
        textAlign || (x < 0 ? 'right' : x > 0 ? 'left' : 'center'),
      )
      .node() as GText;
  }

  private drawBackground() {
    const { background } = this.style;
    if (!background) {
      this.background && this.removeChild(this.background, true);
      this.background = undefined;
      return;
    }

    const { padding, ...style } = background;
    const [top = 0, right = 0, bottom = top, left = right] = padding || [];
    const angle = this.textShape.getEulerAngles();
    this.textShape.setEulerAngles(0);
    const {
      min: [x, y],
      halfExtents: [hw, hh],
    } = this.textShape.getLocalBounds();
    this.textShape.setEulerAngles(angle);
    this.background = select(this.background || this.appendChild(new Rect({})))
      .style('zIndex', -1)
      .style('x', x - left)
      .style('y', y - top)
      .style('width', hw * 2 + left + right)
      .style('height', hh * 2 + top + bottom)
      .call(applyStyle, style)
      .node() as Rect;
  }

  private drawConnector() {
    const { connector } = this.style;
    if (!connector) {
      this.connector && this.removeChild(this.connector, true);
      this.connector = undefined;
      return;
    }

    const path =
      connector.path || getConnectorPath(this.background || this.textShape);
    this.connector = select(this.connector || this.appendChild(new Path({})))
      .style('zIndex', -1)
      .style('stroke', 'black')
      .style('lineWidth', 1)
      .call(applyStyle, connector)
      .style('path', path)
      .node() as Path;
  }

  private drawPoints() {
    const { startMarker, endMarker } = this.style;
    this.drawStartMarker(startMarker);
    this.drawEndMarker(endMarker && { ...endMarker, ...this.endPoint });
  }

  private drawStartMarker(style?: MarkerStyleProps) {
    const shape = this.startMarkerPoint;
    if (!style) {
      shape && this.removeChild(shape, true);
      this.startMarkerPoint = undefined;
      return;
    }
    if (!shape) {
      this.startMarkerPoint = this.appendChild(
        new Marker({ style: { symbol: 'circle', size: 4 } }),
      );
    }
    this.startMarkerPoint.update(style);
  }

  private drawEndMarker(style?: MarkerStyleProps) {
    const shape = this.endMarkerPoint;
    if (!style) {
      shape && this.removeChild(shape, true);
      this.endMarkerPoint = undefined;
      return;
    }
    if (!shape) {
      this.endMarkerPoint = this.appendChild(
        new Marker({ style: { symbol: 'circle', size: 4 } }),
      );
    }
    this.endMarkerPoint.update(style);
  }
}

/**
 * todo autoRotate when in polar coordinate
 */
export const AnnotationText: SC<AnnotationTextOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const {
      color = defaultColor,
      text = '',
      fontSize = 12,
      rotate = 0,
      transform = '',
    } = value;
    const [[x0, y0]] = points;
    return select(new TextShape({}))
      .style('x', x0)
      .style('y', y0)
      .style('text', String(text))
      .style('stroke', color)
      .style('fill', color)
      .style('fontSize', fontSize as any)
      .style('transform', `${transform}rotate(${+rotate}deg)`)
      .call(applyStyle, style)
      .node();
  };
};

AnnotationText.props = {
  defaultEnterAnimation: 'fadeIn',
};
