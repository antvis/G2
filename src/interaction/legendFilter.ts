import { DisplayObject } from '@antv/g';
import { deepMix, throttle } from '@antv/util';
import { subObject } from '../utils/helper';
import { useState, setCursor, restoreCursor } from './utils';

export const CATEGORY_LEGEND_CLASS_NAME = 'legend-category';

export const CONTINUOUS_LEGEND_CLASS_NAME = 'legend-continuous';

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

export function legendsContinuousOf(root) {
  return root.getElementsByClassName(CONTINUOUS_LEGEND_CLASS_NAME);
}

export function legendClearSetState(root, setState) {
  const legends = [...legendsOf(root), ...legendsContinuousOf(root)];

  legends.forEach((legend) => {
    setState(legend, (v) => v);
  });
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

function legendFilterOrdinal(
  root: DisplayObject,
  {
    legends, // given the root of chart returns legends to be manipulated
    marker: markerOf, // given the legend returns the marker
    label: labelOf, // given the legend returns the label
    datum, // given the legend returns the value
    filter, // invoke when dispatch filter event,
    emitter,
    channel,
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
  let selectedValues = items.map(datum);
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

    const click = async (event) => {
      const value = datum(item);
      const index = selectedValues.indexOf(value);
      if (index === -1) selectedValues.push(value);
      else selectedValues.splice(index, 1);
      await filter(selectedValues);
      updateLegendState();

      const { nativeEvent = true } = event;
      if (!nativeEvent) return;
      if (selectedValues.length === items.length) {
        emitter.emit('legend:reset', { nativeEvent });
      } else {
        // Emit events.
        emitter.emit('legend:filter', {
          ...event,
          nativeEvent,
          data: {
            channel,
            values: selectedValues,
          },
        });
      }
    };

    // Bind and store handlers.
    item.addEventListener('click', click);
    item.addEventListener('pointerenter', pointerenter);
    item.addEventListener('pointerout', pointerout);
    itemClick.set(item, click);
    itemPointerenter.set(item, pointerenter);
    itemPointerout.set(item, pointerout);
  }

  const onFilter = async (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;
    const { data } = event;
    const { channel: specifiedChannel, values } = data;
    if (specifiedChannel !== channel) return;
    selectedValues = values;
    await filter(selectedValues);
    updateLegendState();
  };

  const onEnd = async (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;
    selectedValues = items.map(datum);
    await filter(selectedValues);
    updateLegendState();
  };

  emitter.on('legend:filter', onFilter);
  emitter.on('legend:reset', onEnd);

  return () => {
    for (const item of items) {
      item.removeEventListener('click', itemClick.get(item));
      item.removeEventListener('pointerenter', itemPointerenter.get(item));
      item.removeEventListener('pointerout', itemPointerout.get(item));
      emitter.off('legend:filter', onFilter);
      emitter.off('legend:reset', onEnd);
    }
  };
}

function legendFilterContinuous(_, { legend, filter, emitter, channel }) {
  const onValueChange = ({ detail: { value } }) => {
    filter(value);
    emitter.emit({
      nativeEvent: true,
      data: {
        channel,
        values: value,
      },
    });
  };
  legend.addEventListener('valuechange', onValueChange);
  return () => {
    legend.removeEventListener('valuechange', onValueChange);
  };
}

async function filterView(
  context, // View instance,
  {
    legend, // Legend instance.
    channel, // Filter Channel.
    value, // Filtered Values.
    ordinal, // Data type of the legend.
    channels, // Channels for this legend.
    allChannels, // Channels for all legends.
    facet = false, // For facet.
  },
) {
  const { view, update, setState } = context;
  setState(legend, (viewOptions) => {
    const { marks } = viewOptions;
    // Add filter transform for every marks,
    // which will skip for mark without color channel.
    const newMarks = marks.map((mark) => {
      if (mark.type === 'legends') return mark;

      // Inset after aggregate transform, such as group, and bin.
      const { transform = [], data = [] } = mark;
      const index = transform.findIndex(
        ({ type }) => type.startsWith('group') || type.startsWith('bin'),
      );
      const newTransform = [...transform];
      if (data.length) {
        newTransform.splice(index + 1, 0, {
          type: 'filter',
          [channel]: { value, ordinal },
        });
      }

      // Set domain of scale to preserve encoding.
      const newScale = Object.fromEntries(
        channels.map((channel) => [
          channel,
          { domain: view.scale[channel].getOptions().domain },
        ]),
      );
      return deepMix({}, mark, {
        transform: newTransform,
        scale: newScale,
        ...(!ordinal && { animate: false }),
        legend: facet
          ? false
          : Object.fromEntries(allChannels.map((d) => [d, { preserve: true }])),
      });
    });
    return { ...viewOptions, marks: newMarks };
  });
  await update();
}

function filterFacets(facets, options) {
  for (const facet of facets) {
    filterView(facet, { ...options, facet: true });
  }
}

export function LegendFilter() {
  return (context, contexts, emitter) => {
    const { container } = context;
    const facets = contexts.filter((d) => d !== context);
    const isFacet = facets.length > 0;

    const channelsOf = (legend) => {
      return dataOf(legend).scales.map((d) => d.name);
    };
    const legends = [
      ...legendsOf(container),
      ...legendsContinuousOf(container),
    ];
    const allChannels = legends.flatMap(channelsOf);

    const filter = isFacet
      ? throttle(filterFacets, 50, { trailing: true })
      : throttle(filterView, 50, { trailing: true });

    const removes = legends.map((legend) => {
      const { name: channel, domain } = dataOf(legend).scales[0];
      const channels = channelsOf(legend);
      const common = {
        legend,
        channel,
        channels,
        allChannels,
      };
      if (legend.className === CATEGORY_LEGEND_CLASS_NAME) {
        return legendFilterOrdinal(container, {
          legends: itemsOf,
          marker: markerOf,
          label: labelOf,
          datum: (d) => {
            const { __data__: datum } = d;
            const { index } = datum;
            return domain[index];
          },
          filter: (value) => {
            const options = { ...common, value, ordinal: true };
            if (isFacet) filter(facets, options);
            else filter(context, options);
          },
          state: legend.attributes.state,
          channel,
          emitter,
        });
      } else {
        return legendFilterContinuous(container, {
          legend,
          filter: (value) => {
            const options = { ...common, value, ordinal: false };
            if (isFacet) filter(facets, options);
            else filter(context, options);
          },
          emitter,
          channel,
        });
      }
    });
    return () => {
      removes.forEach((remove) => remove());
    };
  };
}
