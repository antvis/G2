import { deepMix } from '@antv/util';
import { LegendFilterInteraction } from '../../spec';
import { createInteraction } from '../create';

export type LegendFilterOptions = Omit<LegendFilterInteraction, 'type'>;

export function FilterIndexTransform(options) {
  const { type, ...rest } = options;
  const [[channel, value]] = Object.entries(rest);
  return (I, mark) => {
    const { encode } = mark;
    const { value: V } = encode[channel];
    const filteredIndex = I.filter((i) => V[i] === value);
    return [filteredIndex, mark];
  };
}

export function FilterDataAction() {
  return (context) => {
    const { shared, options: plotOptions } = context;
    const { triggerInfo: selectedItems, updatedOptions = {} } = shared;
    const transform = selectedItems.map(({ id, scaleType }) => ({
      type: FilterIndexTransform,
      [scaleType]: id,
    }));
    const { marks } = plotOptions;
    const newOptions = deepMix({}, plotOptions, {
      marks: marks.map((d) => ({ ...d, transform: transform })),
    });
    shared.updatedOptions = deepMix({}, updatedOptions, newOptions);
    return context;
  };
}

export const InteractionDescriptor = (options?: LegendFilterOptions) => ({
  start: [
    {
      trigger: 'legend-item:pointerdown',
      action: [
        { type: 'triggerInfoSelection' },
        { type: 'legendItemSelection', trigger: 'triggerInfo' },
        { type: 'setItemState', items: 'legendItem', state: 'active' },
        { type: FilterDataAction },
        { type: 'plot' },
        // { type: 'elementSelection', trigger: 'triggerInfo' },
        // { type: 'activeElement' },
      ],
    },
  ],
  // end: [
  //   {
  //     trigger: 'legend-item:pointerleave',
  //     action: [
  //       { type: 'triggerInfoSelection' },
  //       { type: 'legendItemSelection', trigger: 'triggerInfo' },
  //       { type: 'setItemState', items: 'legendItem', state: 'active' },
  //       { type: 'elementSelection', trigger: 'triggerInfo' },
  //       { type: 'activeElement' },
  //     ],
  //   },
  // ],
});

export const LegendFilter = createInteraction<LegendFilterOptions>(
  InteractionDescriptor,
);

LegendFilter.props = {};
