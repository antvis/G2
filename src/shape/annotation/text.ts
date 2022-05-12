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

export type AnnotationTextOptions = TextShapeStyleProps & Record<string, any>;

type MarkerStyleProps = {
  size?: number;
  symbol?: string | ((x: number, y: number, r: number) => number);
};

interface TextShapeStyleProps extends Omit<TextStyleProps, 'text'> {
  // [todo] Support connector controlPoints config later.
  connector?: Omit<PathStyleProps, 'x' | 'y'>;
  // [todo] Use Marker to replace.
  startMarker?: MarkerStyleProps;
  endMarker?: MarkerStyleProps;
  background?: Omit<RectStyleProps, 'width' | 'height' | 'x' | 'y'> & {
    // Padding between background bounds and the text block.
    padding?: number[];
  };
  rotate?: number;
}

class TextShape extends CustomElement<TextShapeStyleProps> {
  constructor(config: DisplayObjectConfig<TextShapeStyleProps>) {
    super(config);
    this.draw();
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

  protected drawText() {
    const {
      connector,
      startMarker,
      endMarker,
      background,
      x: x0,
      y: y0,
      rotate = 0,
      transform = '',
      ...style
    } = this.attributes;
    const { x, y } = this.endPoint;
    this.textShape = select(this.textShape || this.appendChild(new GText({})))
      .style('x', +x)
      .style('y', +y)
      .style('textAlign', x < 0 ? 'right' : x > 0 ? 'left' : 'center')
      .style('transform', `${transform}rotate(${+rotate}deg)`)
      .call(applyStyle, style)
      .node() as GText;
  }

  protected drawBackground() {
    const { background, rotate } = this.style;
    if (!background) {
      this.background && this.removeChild(this.background, true);
      this.background = undefined;
      return;
    }

    const { padding, ...style } = background;
    const [top = 0, right = 0, bottom = top, left = right] = padding || [];
    const angle = this.textShape.getEulerAngles();
    this.textShape.setEulerAngles(0);
    const bbox = this.textShape.getBBox();
    const [x, y] = this.textShape.getLocalBounds().min;
    this.textShape.setEulerAngles(angle);
    this.background = select(this.background || this.appendChild(new Rect({})))
      .style('zIndex', -1)
      .style('x', x - left)
      .style('y', y - top)
      .style('width', bbox.width + left + right)
      .style('height', bbox.height + top + bottom)
      .style('transformOrigin', 'top center')
      .style('transform', `rotate(${+rotate}deg)`)
      .call(applyStyle, style)
      .node() as Rect;
  }

  protected drawConnector() {
    const { connector } = this.style;
    if (!connector) {
      this.connector && this.removeChild(this.connector, true);
      this.connector = undefined;
      return;
    }

    let { path = [] } = connector;
    if (!path?.length && this.textShape) {
      const { min, max } = this.background
        ? this.background.getLocalBounds()
        : this.textShape.getLocalBounds();
      let x = (min[0] + max[0]) / 2;
      let y = max[1];
      if (max[0] < 0) {
        x = max[0];
      } else if (min[0] > 0) {
        x = min[0];
      }

      if (min[1] > 0) {
        y = min[1];
      } else if (max[1] < 0) {
        y = max[1];
      }
      path = [
        ['M', 0, 0],
        ['L', x, y],
      ];
    }
    this.connector = select(this.connector || this.appendChild(new Path({})))
      .style('zIndex', -1)
      .style('stroke', 'black')
      .style('lineWidth', 1)
      .call(applyStyle, connector)
      .style('path', path)
      .node() as Path;
  }

  protected drawPoints() {
    const { startMarker, endMarker } = this.style;
    this.drawPoint('start', startMarker);
    this.drawPoint('end', endMarker && { ...endMarker, ...this.endPoint });
  }

  protected drawPoint(type: string, style?: MarkerStyleProps) {
    const shape =
      type === 'start' ? this.startMarkerPoint : this.endMarkerPoint;
    if (!style) {
      shape && this.removeChild(shape, true);
      this[`${type}MarkerPoint`] = undefined;
      return;
    }
    if (shape) {
      shape.update(style);
    } else {
      this[`${type}MarkerPoint`] = this.appendChild(
        new Marker({ style: { symbol: 'circle', size: 4, ...style } }),
      );
    }
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
      .style('rotate', rotate)
      .style('transform', `${transform}`)
      .call(applyStyle, style)
      .node();
  };
};

AnnotationText.props = {
  defaultEnterAnimation: 'fadeIn',
};
