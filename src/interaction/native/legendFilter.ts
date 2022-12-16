import { DisplayObject } from '@antv/g';
import { deepMix } from '@antv/util';
import { subObject } from '../../utils/helper';
import { useState, setCursor, restoreCursor } from './utils';

export const CATEGORY_LEGEND_CLASS_NAME = 'legend-category';

export const LEGEND_ITEMS_CLASS_NAME = 'items-item';

export const LEGEND_MAKER_CLASS_NAME = 'legend-category-item-marker';

export const LEGEND_LABEL_CLASS_NAME = 'legend-category-item-label';

function markerOf(item) {
  return item.getElementsByClassName(LEGEND_MAKER_CLASS_NAME)[0];
}

function labelOf(item) {
  return item.getElementsByClassName(LEGEND_LABEL_CLASS_NAME)[0];
}

function legendsOf(root) {
  return root.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
}

function builtInAccessors(selectedLegend) {
  // Get the value and scale type from legend.
  const { data } = selectedLegend.attributes;
  const { __data__ } = selectedLegend.parentNode;
  const { name: channel } = __data__.scale;
  return [
    channel,
    {
      legends: legendsOf,
      marker: labelOf,
      label: markerOf,
      datum: (d) => {
        const { __data__: datum } = d;
        const { index } = datum;
        return data[index].label;
      },
    },
  ] as any;
}

function legendFilter(
  root: DisplayObject,
  {
    legends, // given the root of chart returns legends to be manipulated
    marker: markerOf, // given the legend returns the marker
    label: labelOf, // given the legend returns the label
    datum, // given the legend returns the value
    filter, // invoke when dispatch filter event,
    setAttribute, // setter for set element style,
    ...options // style options
  },
) {
  // Index handler by item.
  const itemClick = new Map();
  const itemPointerenter = new Map();
  const itemPointerout = new Map();

  // State and styles.
  const style =
    Object.keys(options).length === 0
      ? {
          labelUnselectedFill: '#aaa',
          markerUnselectedFill: '#aaa',
        }
      : options;
  const markerStyle = subObject(style, 'marker');
  const labelStyle = subObject(style, 'label');
  const { setState: setM, removeState: removeM } = useState(
    markerStyle,
    undefined,
    setAttribute,
  );
  const { setState: setL, removeState: removeL } = useState(
    labelStyle,
    undefined,
    setAttribute,
  );

  const items: DisplayObject[] = Array.from(legends(root));
  const selectedValues = items.map(datum);
  const updateLegendState = () => {
    for (const item of items) {
      const value = datum(item);
      const marker = markerOf(item);
      const label = labelOf(item);
      if (!selectedValues.includes(value)) {
        setM(marker, 'unselected');
        setL(label, 'unselected');
      } else {
        removeM(marker, 'unselected');
        removeL(label, 'unselected');
      }
    }
  };

  for (const item of items) {
    // Defined handlers.
    const pointerenter = () => {
      setCursor(root, 'pointer');
    };

    const pointerout = () => {
      restoreCursor(root);
    };

    const click = async () => {
      const value = datum(item);
      const index = selectedValues.indexOf(value);
      if (index === -1) selectedValues.push(value);
      else selectedValues.splice(index, 1);
      if (selectedValues.length === 0) selectedValues.push(...items.map(datum));
      await filter(selectedValues);
      updateLegendState();
    };

    // Bind and store handlers.
    item.addEventListener('click', click);
    item.addEventListener('pointerenter', pointerenter);
    item.addEventListener('pointerout', pointerout);
    itemClick.set(item, click);
    itemPointerenter.set(item, pointerenter);
    itemPointerout.set(item, pointerout);
  }

  return () => {
    for (const item of items) {
      item.removeEventListener('click', itemClick.get(item));
      item.removeEventListener('pointerenter', itemPointerenter.get(item));
      item.removeEventListener('pointerout', itemPointerout.get(item));
    }
  };
}

export function LegendFilter({ channel, ...rest }) {
  return (context) => {
    const { container, view, options: viewOptions, update } = context;

    // Use the first legend if channel is not specified,
    // or use the first legend bind to specified channel.
    const legends = container.getElementsByClassName(
      CATEGORY_LEGEND_CLASS_NAME,
    );
    const selectedLegend = !channel
      ? legends[0]
      : legends.find((d) => {
          const { __data__ } = d.parentNode;
          return __data__.scale.name === channel;
        });

    // Skip if there is no legend.
    const [selectedChannel, accessors] = selectedLegend
      ? builtInAccessors(selectedLegend)
      : [null, {}];
    if (selectedChannel) channel = selectedChannel;

    // Apply common legend filter.
    return legendFilter(container, {
      ...accessors,
      filter: async (value) => {
        const { scale } = view;
        const { [channel]: scaleOrdinal } = scale;
        const { marks } = viewOptions;
        // Add filter transform for every marks,
        // which will skip for mark without color channel.
        const newMarks = marks.map((mark) => {
          const { transform = [] } = mark;
          const newTransform = [
            { type: 'filter', [channel]: value },
            ...transform,
          ];
          return deepMix({}, mark, {
            transform: newTransform,
            // Set domain of scale to preserve legends.
            scale: {
              [channel]: {
                domain: scaleOrdinal.getOptions().domain,
              },
            },
          });
        });
        const newOptions = {
          ...viewOptions,
          marks: newMarks,
        };
        return update(newOptions);
      },
      ...rest,
    });
  };
}
