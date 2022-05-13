import {
  CustomElement,
  DisplayObjectConfig,
  Text as GText,
  BaseStyleProps,
} from '@antv/g';
import { Marker } from '@antv/gui';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { select } from '../../utils/selection';

export type AnnotationBadgeOptions = BadgeShapeStyleProps;

/**
 * Get the path to draw a built-in badge, which is like a balloon.
 */
function getPath(r: number) {
  const offset = r / Math.sqrt(2);
  const dy = r * Math.sqrt(2);
  const [p0x, p0y] = [-offset, offset - dy];
  const [p1x, p1y] = [0, 0];
  const [p2x, p2y] = [offset, offset - dy];
  return [
    ['M', p0x, p0y],
    ['A', r, r, 0, 1, 1, p2x, p2y],
    ['L', p1x, p1y],
    ['Z'],
  ];
}

function getCenter(shape: Marker) {
  const { min, max } = shape.getLocalBounds();
  return { x: (min[0] + max[0]) / 2, y: (min[1] + max[1]) / 2 };
}

type BadgeShapeStyleProps = BaseStyleProps & {
  size?: number;
  symbol?: string | ((x: number, y: number, r: number) => string);
  content?: string;
  textStyle?: {
    fontSize?: number;
    fill?: string;
  };
};

class BadgeShape extends CustomElement<BadgeShapeStyleProps> {
  constructor(config: DisplayObjectConfig<BadgeShapeStyleProps>) {
    super(config);
  }

  // Callback after connected with canvas, should trigger render.
  connectedCallback() {
    this.draw();
  }

  attributeChangedCallback() {
    this.draw();
  }

  private badgeMarker!: Marker;
  private badgeText!: GText;

  protected draw() {
    this.drawMarker();
    this.drawText();
  }

  private drawMarker() {
    const { size = 24, ...style } = this.attributes;
    const symbol = () => getPath(size / 2);

    this.badgeMarker = this.badgeMarker || this.appendChild(new Marker({}));
    this.badgeMarker.className = 'badge-marker';
    this.badgeMarker.update({ symbol, size, ...style, x: 0, y: 0 });
  }

  private drawText() {
    const center = getCenter(this.badgeMarker);
    const { content: text = '', textStyle } = this.style;
    const { fontSize = 10, fill = '#333' } = textStyle || {};

    this.badgeText = this.badgeText || this.appendChild(new GText({}));
    select(this.badgeText)
      .attr('className', 'badge-text')
      .style('x', center.x)
      .style('y', center.y)
      .style('textAlign', 'center')
      .style('textBaseline', 'middle')
      .call(applyStyle, { fill, fontSize, text })
      .node() as GText;
  }
}

export const AnnotationBadge: SC<AnnotationBadgeOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, text = '' } = value;
    const [[x0, y0]] = points;
    return select(new BadgeShape({}))
      .style('x', x0)
      .style('y', y0)
      .style('text', String(text))
      .style('stroke', color)
      .style('fill', color)
      .call(applyStyle, style)
      .node();
  };
};

AnnotationBadge.props = {
  defaultEnterAnimation: 'fadeIn',
};
