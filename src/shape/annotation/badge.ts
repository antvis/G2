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

export type AnnotationBadgeOptions = BadgeShapeStyleProps & Record<string, any>;

interface BadgeShapeStyleProps extends BaseStyleProps {
  position?: 'top' | 'top-left' | 'top-right';
  size?: number;
  symbol?: string | ((x: number, y: number, r: number) => number);
  content?: string;
  textStyle?: {
    fontSize?: number;
    fill?: string;
  };
}

const { cos, sin, sqrt, PI } = Math;
class BadgeShape extends CustomElement<BadgeShapeStyleProps> {
  constructor(config: DisplayObjectConfig<BadgeShapeStyleProps>) {
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

  private badgeMarker!: Marker;
  private badgeText!: GText;

  protected draw() {
    this.drawMarker();
    this.drawText();
  }

  protected drawMarker() {
    const {
      x: x0,
      y: y0,
      size = 24,
      position = 'top',
      ...style
    } = this.attributes;
    const radius = size / 2;
    const cornerOffset = radius * sqrt(2) * 0.72;
    const symbol = () => {
      const sign = position.includes('right') ? -1 : 1;
      const offset = radius / sqrt(2);
      const points = [];
      if (position === 'top') {
        points.push([-offset, offset], [0, radius * sqrt(2)], [offset, offset]);
      } else {
        const theta = (Math.atan(cornerOffset / radius) / PI) * 180;
        const dx = radius * cos(((180 - theta * 2) / 180) * PI);
        const dy = radius * sin(((180 - theta * 2) / 180) * PI);
        points.push(
          [sign * dx, dy],
          [sign * radius, cornerOffset],
          [sign * radius, 0],
        );
      }
      const sweepFlag = sign === -1 ? 0 : 1;
      return [
        ['M', ...points[0]],
        ['A', radius, radius, 0, 1, sweepFlag, ...points[2]],
        ['L', ...points[1]],
        ['L', ...points[0]],
      ];
    };

    this.badgeMarker =
      this.badgeMarker ||
      this.appendChild(new Marker({ className: 'badge-marker' }));
    let x = 0;
    let y = 0;
    if (!this.style.symbol) {
      const signX = position.includes('right')
        ? -1
        : position.includes('left')
        ? 1
        : 0;
      const offset = position !== 'top' ? cornerOffset : radius * sqrt(2);
      x = -signX * offset;
      y = -offset;
    }
    this.badgeMarker.update({ x, y, symbol, size, ...style });
  }

  protected drawText() {
    if (!this.badgeMarker) return;

    const { content: text = '' } = this.style;
    const { fontSize = 10, fill = '#333' } = this.style.textStyle || {};
    this.badgeText = select(
      this.badgeText || this.badgeMarker.appendChild(new GText({})),
    )
      .attr('className', 'badge-text')
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
