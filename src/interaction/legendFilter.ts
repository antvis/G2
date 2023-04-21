import { DisplayObject } from '@antv/g';
import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import { useState, setCursor, restoreCursor } from './utils';

export const CATEGORY_LEGEND_CLASS_NAME = 'legend-category';

export const LEGEND_ITEMS_CLASS_NAME = 'items-item';

export const LEGEND_MAKER_CLASS_NAME = 'legend-category-item-marker';

export const LEGEND_LABEL_CLASS_NAME = 'legend-category-item-label';

export function markerOf(item) {
  return item.getElementsByClassName(LEGEND_MAKER_CLASS_NAME)[0];
}

export function labelOf(item) {
  return item.getElementsByClassName(LEGEND_LABEL_CLASS_NAME)[0];
}

export function itemsOf(root) {
  return root.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
}

export function legendsOf(root) {
  return root.getElementsByClassName(CATEGORY_LEGEND_CLASS_NAME);
}

export function dataOf(root) {
  // legend -> layout -> container
  let parent = root.parentNode;
  while (parent && !parent.__data__) {
    parent = parent.parentNode;
  }
  return parent.__data__;
}

export function attributesOf(root) {
  let child = root;
  while (child && !child.attr('class').startsWith('legend')) {
    child = child.children[0];
  }
  return child.attributes;
}

function legendFilter(
  root: DisplayObject,
  {
    legends, // given the root of chart returns legends to be manipulated
    marker: markerOf, // given the legend returns the marker
    label: labelOf, // given the legend returns the label
    datum, // given the legend returns the value
    filter, // invoke when dispatch filter event,
    state = {} as Record<string, any>, // state options
  },
) {
  // Index handler by item.
  const itemClick = new Map();
  const itemPointerenter = new Map();
  const itemPointerout = new Map();

  const {
    unselected = {
      markerStroke: '#aaa',
      markerFill: '#aaa',
      labelFill: '#aaa',
    },
  } = state;
  const markerStyle = { unselected: subObject(unselected, 'marker') };
  const labelStyle = { unselected: subObject(unselected, 'label') };
  const { setState: setM, removeState: removeM } = useState(
    markerStyle,
    undefined,
  );
  const { setState: setL, removeState: removeL } = useState(
    labelStyle,
    undefined,
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

export function LegendFilter() {
  return (context, _, emitter) => {
    const { container, view, options: viewOptions, update } = context;

    const legends = legendsOf(container);

    const filter = async (channel, value) => {
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
    };

    if (!legends.length) {
      const onFilter = (options) => {
        const { values, channel } = options;
        filter(channel, values);
      };
      emitter.on('legend:filter', onFilter);
      return () => {
        emitter.off('legend:filter', onFilter);
      };
    }

    const removes = legends.map((legend) => {
      const { name: channel, domain } = dataOf(legend).scales[0];
      return legendFilter(container, {
        legends: itemsOf,
        marker: markerOf,
        label: labelOf,
        datum: (d) => {
          const { __data__: datum } = d;
          const { index } = datum;
          return domain[index];
        },
        filter: (value) => filter(channel, value),
        state: legend.attributes.state,
      });
    });
    return () => {
      removes.forEach((remove) => remove());
    };
  };
}
