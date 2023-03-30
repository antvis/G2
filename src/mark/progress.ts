import { deepMix } from '@antv/util';
import { CompositionComponent as CC } from '../runtime';
import { ProgressMark } from '../spec';
import { subObject } from '../utils/helper';
import { dataNormalizeForProgress } from './utils';

export type ProgressOptions = Omit<ProgressMark, 'type'>;

const generateDataOption = (colorScale) => {
  const { domain, range = [] } = colorScale;
  return domain.map((d, i) => ({
    y: i > 0 ? d - domain[i - 1] : d,
    color: range[i] ?? range[range.length - 1],
  }));
};

export const Progress: CC<ProgressOptions> = (options) => {
  const DEFAULT_OPTIONS = {
    axis: {
      y: false,
    },
    legend: false,
    tooltip: false,
    encode: {
      y: 'y',
      color: 'color',
    },
  };

  const DEFAULT_BAR_OPTIONS = {
    coordinate: {
      transform: [
        {
          type: 'transpose',
        },
      ],
    },
    ...DEFAULT_OPTIONS,
  };

  const DEFAULT_ARC_OPTIONS = {
    coordinate: {
      type: 'radial',
      innerRadius: 0.9,
      outerRadius: 1,
    },
    ...DEFAULT_OPTIONS,
  };

  const DEFAULT_TEXT_OPTIONS = {
    type: 'text',
    style: {
      x: '50%',
      y: '50%',
      textAlign: 'center',
      textBaseline: 'middle',
      fontSize: 20,
      fontWeight: 800,
      fill: '#888',
    },
  };

  const DEFAULT_COLOR_FORE = '#30BF78';
  const DEFAULT_COLOR_BACK = '#D0D0D0';

  return () => {
    const {
      style = {},
      scale = {},
      data = {},
      animate = {},
      transform = [],
      ...resOptions
    } = options;

    const markOptions = [];

    const { arc = true } = style;

    const { color } = scale;

    // prepare
    const { current, target } = dataNormalizeForProgress(data);

    const _assembleIntervalOption = (pkgOptions, pos: 'fore' | 'back') => {
      const intervalDefaultOption = arc
        ? DEFAULT_ARC_OPTIONS
        : DEFAULT_BAR_OPTIONS;
      return deepMix({}, intervalDefaultOption, {
        type: 'interval',
        ...pkgOptions,
        animate:
          typeof animate === 'object' ? subObject(animate, pos) : animate,
        ...resOptions,
      });
    };

    // add interval option.
    markOptions.push(
      // back interval
      _assembleIntervalOption(
        {
          data: generateDataOption({
            domain: [target],
            range: [DEFAULT_COLOR_BACK],
          }),
          scale: {
            ...scale,
            color: {
              independent: true,
              ...(color || {}),
            },
          },
          style: {
            fill: DEFAULT_COLOR_BACK,
            ...subObject(style, 'back'),
          },
          transform,
        },
        'back',
      ),

      // fore interval
      _assembleIntervalOption(
        {
          data: generateDataOption({
            domain: color?.domain?.length ? color.domain : [current],
            range: color?.range?.length ? color.range : [DEFAULT_COLOR_FORE],
          }),
          transform:
            color?.domain?.length > 1
              ? [...(transform || []), { type: 'stackY' }]
              : transform,
          scale: {
            color: {
              range: [DEFAULT_COLOR_FORE],
            },
            ...scale,
          },
          style: subObject(style, 'fore'),
        },
        'fore',
      ),
    );

    // add text option.
    if (arc) {
      const textStyle = subObject(style, 'text');
      markOptions.push(
        deepMix({}, DEFAULT_TEXT_OPTIONS, {
          style: {
            text: textStyle.content?.(current, target) || current.toString(),
            ...textStyle,
          },
          animate:
            typeof animate === 'object' ? subObject(animate, 'text') : animate,
        }),
      );
    }

    return markOptions;
  };
};

Progress.props = {};
