import { deepMix, isNumber } from '@antv/util';
import { Vector2 } from '@antv/coord';
import { Group } from '@antv/g';
import { filterPrefixObject, isUnset, subObject } from '../utils/helper';
import { CompositeMarkComponent as CC, ShapeComponent as SC } from '../runtime';
import { ColorOptions } from '../shape/point/color';
import { GaugeMark } from '../spec';
import { getTransformOptions } from '../utils/coordinate';
import { Radial } from '../coordinate';
import { applyStyle, getOrigin } from '../shape/utils';
import { select } from '../utils/selection';
import { GaugeRound } from '../shape';

const indicatorShape: SC<ColorOptions> = (options, context) => {
  const { shape, radius, ...style } = options;
  const pointerStyle = subObject(style, 'pointer');
  const pinStyle = subObject(style, 'pin');
  const { shape: pointerShape, ...resPointerStyle } = pointerStyle;
  const { shape: pinShape, ...resPinStyle } = pinStyle;
  const { coordinate, theme } = context;
  return (points, value) => {
    // Invert points.
    const invertedPoints = points.map((p) => coordinate.invert(p));
    // Get new coordinate.
    const [startAngle, endAngle, innerRadius] = getTransformOptions(
      coordinate,
      'polar',
    ) as number[];
    const newCoordinate = coordinate.clone();
    const { color: stroke } = value;
    const newTransformations = Radial({
      startAngle,
      endAngle,
      innerRadius,
      outerRadius: radius,
    });
    newTransformations.push(['cartesian']);
    newCoordinate.update({
      transformations: newTransformations,
    });
    const newPoints = invertedPoints.map((p) => newCoordinate.map(p));
    const [x, y] = getOrigin(newPoints as Vector2[]);
    const [cx, cy] = coordinate.getCenter();
    const pointerAttrs = {
      x1: x,
      y1: y,
      x2: cx,
      y2: cy,
      stroke,
      ...resPointerStyle,
      ...style,
    };
    const pinAttrs = {
      cx,
      cy,
      stroke,
      ...resPinStyle,
      ...style,
    };
    const indicatorGroup = select(new Group());
    if (!isUnset(pointerShape)) {
      typeof pointerShape === 'function'
        ? indicatorGroup.append(() =>
            pointerShape(newPoints, value, newCoordinate, theme),
          )
        : indicatorGroup.append('line').call(applyStyle, pointerAttrs).node();
    }
    if (!isUnset(pinShape)) {
      typeof pinShape === 'function'
        ? indicatorGroup.append(() =>
            pinShape(newPoints, value, newCoordinate, theme),
          )
        : indicatorGroup.append('circle').call(applyStyle, pinAttrs).node();
    }
    return indicatorGroup.node();
  };
};

const DEFAULT_OPTIONS = {
  coordinate: {
    type: 'radial',
    innerRadius: 0.9,
    outerRadius: 1,
    startAngle: (-11 / 10) * Math.PI,
    endAngle: (1 / 10) * Math.PI,
  },
  axis: {
    x: false,
  },
  legend: false,
  tooltip: false,
  encode: {
    x: 'x',
    y: 'y',
    color: 'color',
  },
  scale: {
    color: {
      range: ['#30BF78', '#D0D0D0'],
    },
  },
};

const DEFAULT_INDICATOR_OPTIONS = {
  style: {
    shape: indicatorShape,
    lineWidth: 4,
    pointerLineCap: 'round',
    pinR: 10,
    pinFill: '#fff',
    radius: 0.6,
  },
};

const DEFAULT_TEXT_OPTIONS = {
  type: 'text',
  style: {
    x: '50%',
    y: '60%',
    textAlign: 'center',
    textBaseline: 'middle',
    fontSize: 20,
    fontWeight: 800,
    fill: '#888',
  },
};

export type GaugeData =
  | {
      target?: number;
      total?: number;
      percent?: number;
      name?: string;
      thresholds?: number[];
    }
  | number;

function getGaugeData(data: GaugeData) {
  if (isNumber(data)) {
    // Percent range [0, 1].
    const percent = Math.max(0, Math.min(data, 1));
    return {
      percent,
      target: percent,
      total: 1,
    };
  }
  return data;
}

function dataTransform(data: GaugeData, scale) {
  const {
    name = 'score',
    target,
    total,
    percent,
    thresholds = [],
  } = getGaugeData(data);
  const _target = percent || target;
  const _total = percent ? 1 : total;
  const newScale = {
    y: {
      domain: [0, _total],
    },
    ...scale,
  };
  if (!thresholds.length) {
    return {
      targetData: [{ x: name, y: _target, color: 'target' }],
      totalData: [
        { x: name, y: _target, color: 'target' },
        { x: name, y: _total - _target, color: 'total' },
      ],
      target: _target,
      total: _total,
      scale: newScale,
    };
  }
  return {
    targetData: [{ x: name, y: _target, color: 'target' }],
    totalData: thresholds.map((d, i) => ({
      x: name,
      y: i >= 1 ? d - thresholds[i - 1] : d,
      color: i,
    })),
    target: _target,
    total: _total,
    scale: newScale,
  };
}

function getTextContent(textStyle, { target, total }) {
  const { content } = textStyle;
  return content ? content(target, total) : target.toString();
}

export type GaugeOptions = Omit<GaugeMark, 'type'>;

export const Gauge: CC<GaugeOptions> = (options) => {
  const {
    data = {},
    scale = {},
    style = {},
    animate = {},
    transform = [],
    ...resOptions
  } = options;
  const {
    targetData,
    totalData,
    target,
    total,
    scale: newScale,
  } = dataTransform(data, scale);
  const textStyle = subObject(style, 'text');
  // pointer + pin
  const indicatorStyle = filterPrefixObject(style, ['pointer', 'pin']);

  const arcStyle = subObject(style, 'arc');
  const shape = arcStyle.shape;

  return [
    deepMix({}, DEFAULT_OPTIONS, {
      type: 'interval',
      transform: [{ type: 'stackY' }],
      data: totalData,
      scale: newScale,
      style: shape === 'round' ? { ...arcStyle, shape: GaugeRound } : arcStyle,
      animate:
        typeof animate === 'object' ? subObject(animate, 'arc') : animate,
      ...resOptions,
    }),
    deepMix({}, DEFAULT_OPTIONS, DEFAULT_INDICATOR_OPTIONS, {
      type: 'point',
      data: targetData,
      scale: newScale,
      style: indicatorStyle,
      animate:
        typeof animate === 'object' ? subObject(animate, 'indicator') : animate,
      ...resOptions,
    }),
    deepMix({}, DEFAULT_TEXT_OPTIONS, {
      style: {
        text: getTextContent(textStyle, { target, total }),
        ...textStyle,
      },
      animate:
        typeof animate === 'object' ? subObject(animate, 'text') : animate,
    }),
  ];
};

Gauge.props = {};
