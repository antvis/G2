import { DisplayObject } from '@antv/g';
import { deepMix, throttle } from '@antv/util';
import { Base } from '@antv/scale';
import { subObject } from '../utils/helper';
import { ANNOTATION_MARKS } from '../component/constant';
import { useState, setCursor, restoreCursor } from './utils';

export const CATEGORY_LEGEND_CLASS_NAME = 'legend-category';
export const CATEGORY_LEGEND_HTML_CLASS_NAME = 'legend-html-category';

export const CONTINUOUS_LEGEND_CLASS_NAME = 'legend-continuous';

export const LEGEND_ITEMS_CLASS_NAME = 'items-item';

export const LEGEND_MAKER_CLASS_NAME = 'legend-category-item-marker';

export const LEGEND_LABEL_CLASS_NAME = 'legend-category-item-label';

export const LEGEND_FOCUS_ICON_CLASS_NAME = 'legend-category-item-focus-group';

export function markerOf(item) {
  return item.getElementsByClassName(LEGEND_MAKER_CLASS_NAME)[0];
}

export function labelOf(item) {
  return item.getElementsByClassName(LEGEND_LABEL_CLASS_NAME)[0];
}

export function focusIconOf(item) {
  return item.getElementsByClassName(LEGEND_FOCUS_ICON_CLASS_NAME)[0];
}

export function itemsOf(root) {
  return root.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
}

export function legendsOf(root) {
  return root.getElementsByClassName(CATEGORY_LEGEND_CLASS_NAME);
}
export function legendsHtmlOf(root) {
  return root.getElementsByClassName(CATEGORY_LEGEND_HTML_CLASS_NAME);
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

function getScaleByMarkKey(
  scale: Record<string, Base<any>>,
  markKey: string,
  channelName: string,
) {
  const seriesKey = Object.keys(scale).find((channel) => {
    if (channel.startsWith(channelName)) {
      const options = scale[channel].getOptions();
      return options.name === channelName && options.markKey === markKey;
    }
  });

  return scale[seriesKey] ?? scale[channelName];
}

function legendFilterOrdinal(
  root: DisplayObject,
  {
    legends, // given the root of chart returns legends to be manipulated
    marker: markerOf, // given the legend returns the marker
    label: labelOf, // given the legend returns the label
    datum, // given the legend returns the value
    filter, // invoke when dispatch filter event,
    defaultSelect,
    emitter,
    channel,
    state = {} as Record<string, any>, // state options
  },
) {
  // Index handler by item.
  const itemClick = new Map();
  const itemPointerenter = new Map();
  const itemPointerout = new Map();
  const focusIconClick = new Map();

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

    const focusIcon = focusIconOf(item);
    if (focusIcon) {
      const focusClick = async (event) => {
        event.stopPropagation();
        const value = datum(item);
        const index = selectedValues.indexOf(value);
        const { nativeEvent = true } = event;

        if (index !== -1 && selectedValues.length === 1) {
          if (!nativeEvent) return;
          // If the item is already focused, reset to show all items.
          selectedValues = items.map(datum);
          await filter(selectedValues);
          updateLegendState();
          emitter.emit('legend:reset', { nativeEvent });
        } else {
          // Otherwise, focus on the clicked item.
          selectedValues = [value];
          await filter(selectedValues);
          updateLegendState();

          if (!nativeEvent) return;
          emitter.emit('legend:focus', {
            ...event,
            nativeEvent,
            data: {
              channel,
              value,
            },
          });
        }
      };

      // Bind focus icon handlers.
      focusIcon.addEventListener('click', focusClick);
      focusIconClick.set(item, focusClick);
    }
  }

  const onFocus = async (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;

    const { data } = event;
    const { channel: specifiedChannel, value } = data;
    if (specifiedChannel !== channel) return;

    selectedValues = [value];

    await filter(selectedValues);
    updateLegendState();
  };

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
  emitter.on('legend:focus', onFocus);
  emitter.on('legend:reset', onEnd);

  if (defaultSelect) {
    emitter.emit('legend:filter', {
      data: { channel, values: defaultSelect },
    });
  }

  return () => {
    for (const item of items) {
      item.removeEventListener('click', itemClick.get(item));
      item.removeEventListener('pointerenter', itemPointerenter.get(item));
      item.removeEventListener('pointerout', itemPointerout.get(item));
      const focusIcon = focusIconOf(item);
      if (focusIcon) {
        focusIcon.removeEventListener('click', focusIconClick.get(item));
      }
    }
    emitter.off('legend:focus', onFocus);
    emitter.off('legend:filter', onFilter);
    emitter.off('legend:reset', onEnd);
  };
}

function legendFilterOrdinalHtml(
  root: DisplayObject,
  { domain, filter, defaultSelect, emitter, channel },
) {
  // HTML DOM event handlers.
  const htmlItemClick = new Map();
  const htmlItemPointerenter = new Map();
  const htmlItemPointerout = new Map();

  let selectedValues = [...domain];

  // Helper function to get chart container element.
  const getChartContainer = () => {
    // Use the same approach as tooltip.ts to get container.
    const view = root.ownerDocument?.defaultView;
    if (!view) return document.body;

    const canvas: any = view.getContextService().getDomElement();
    return (canvas.parentElement as unknown as HTMLElement) || document.body;
  };

  // Helper function to bind HTML DOM events.
  const bindHtmlDomEvents = () => {
    const chartContainer = getChartContainer();

    // Find HTML legend containers within this chart's container.
    const htmlContainer = chartContainer.querySelector('.legend-html');

    const htmlClick = async (event) => {
      // Find the element with legend-value attribute by traversing up from the target.
      let targetElement = event.target as Element;
      while (targetElement && !targetElement.hasAttribute('legend-value')) {
        targetElement = targetElement.parentElement;
        if (targetElement === htmlContainer) break; // Stop if we reach the container.
      }

      if (!targetElement || !targetElement.hasAttribute('legend-value')) return;

      event.preventDefault();
      event.stopPropagation();

      const value = targetElement.getAttribute('legend-value');
      if (!value) return;

      const index = selectedValues.indexOf(value);
      if (index === -1) selectedValues.push(value);
      else selectedValues.splice(index, 1);

      await filter(selectedValues);
      updateHtmlLegendState();

      if (selectedValues.length === domain.length) {
        emitter.emit('legend:reset', { nativeEvent: true });
      } else {
        emitter.emit('legend:filter', {
          nativeEvent: true,
          data: {
            channel,
            values: selectedValues,
          },
        });
      }
    };

    // Bind HTML DOM events to the container using event delegation.
    htmlContainer.addEventListener('click', htmlClick);

    // Store handlers for cleanup.
    htmlItemClick.set(htmlContainer, htmlClick);
  };

  // Helper function to update HTML legend visual state.
  const updateHtmlLegendState = () => {
    const chartContainer = getChartContainer();
    const htmlLegendItems = chartContainer.querySelectorAll('[legend-value]');

    htmlLegendItems.forEach((htmlItem) => {
      const value = htmlItem.getAttribute('legend-value');
      if (!value) return;

      // Check if this value exists in the domain (belongs to this chart instance).
      if (!domain.includes(value)) return;

      const isSelected = selectedValues.includes(value);
      const htmlElement = htmlItem as HTMLElement;

      if (!isSelected) {
        // Apply unselected style.
        // User can override style via CSS.
        htmlElement.style.opacity = '0.4';
        htmlElement.classList.add('legend-item-inactive');
      } else {
        // Apply selected style.
        htmlElement.style.opacity = '1';
        htmlElement.classList.remove('legend-item-inactive');
      }
    });
  };

  // Bind HTML DOM events.
  bindHtmlDomEvents();

  const onFocus = async (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;

    const { data } = event;
    const { channel: specifiedChannel, value } = data;
    if (specifiedChannel !== channel) return;

    selectedValues = [value];

    await filter(selectedValues);
    updateHtmlLegendState();
  };

  const onFilter = async (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;
    const { data } = event;
    const { channel: specifiedChannel, values } = data;
    if (specifiedChannel !== channel) return;
    selectedValues = values;
    await filter(selectedValues);
    updateHtmlLegendState();
  };

  const onEnd = async (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) return;
    selectedValues = [...domain];
    await filter(selectedValues);
    updateHtmlLegendState();
  };

  emitter.on('legend:filter', onFilter);
  emitter.on('legend:focus', onFocus);
  emitter.on('legend:reset', onEnd);

  if (defaultSelect) {
    emitter.emit('legend:filter', {
      data: { channel, values: defaultSelect },
    });
  }

  return () => {
    // Clean up HTML DOM event listeners.
    const chartContainer = getChartContainer();
    const htmlLegendItems = chartContainer.querySelectorAll('[legend-value]');

    htmlLegendItems.forEach((htmlItem) => {
      const value = htmlItem.getAttribute('legend-value');
      if (!value) return;

      // Only clean up items that belong to this chart instance.
      if (!domain.includes(value)) return;

      const clickHandler = htmlItemClick.get(htmlItem);
      const pointerenterHandler = htmlItemPointerenter.get(htmlItem);
      const pointeroutHandler = htmlItemPointerout.get(htmlItem);

      if (clickHandler) {
        htmlItem.removeEventListener('click', clickHandler);
      }
      if (pointerenterHandler) {
        htmlItem.removeEventListener('pointerenter', pointerenterHandler);
      }
      if (pointeroutHandler) {
        htmlItem.removeEventListener('pointerout', pointeroutHandler);
      }
    });

    // Clear HTML DOM handler maps.
    htmlItemClick.clear();
    htmlItemPointerenter.clear();
    htmlItemPointerout.clear();

    // Clean up emitter listeners.
    emitter.off('legend:filter', onFilter);
    emitter.off('legend:focus', onFocus);
    emitter.off('legend:reset', onEnd);
  };
}

function legendFilterContinuous(_, { legend, filter, emitter, channel }) {
  const { attributes } = legend;
  const onValueChange = (data) => {
    const { value } = data.detail;
    const domainValue = value.map((d) => {
      const matchRealValue = attributes.data?.find((item) => item.value === d);
      // For threshold/quantile scale, use domain value instead of threshold index.
      if (matchRealValue) return matchRealValue.domainValue ?? d;

      return d;
    });

    filter(domainValue);
    emitter.emit({
      nativeEvent: true,
      data: {
        channel,
        values: domainValue,
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

    const channelScale = legend.attributes?.scales?.find(
      (s) => s.name === channel,
    );
    const newMarks = marks.map((mark) => {
      // Only filter marks with the same scale key.
      if (
        // if key is not defined, use default channel name.
        (mark.scale[channel].key ?? channel) !==
        (channelScale?.key ?? channelScale?.name)
      )
        return mark;

      if (mark.type === 'legends') return mark;
      // Skip Annotation marks.
      if (ANNOTATION_MARKS.includes(mark.type)) return mark;

      // Inset after aggregate transform, such as group, and bin.
      const { transform = [], data = [] } = mark;
      const index = transform.findIndex(
        ({ type }) => type.startsWith('group') || type.startsWith('bin'),
      );
      const newTransform = [...transform];
      if (data.length) {
        newTransform.splice(index + 1, 0, {
          type: 'filter',
          [channel]: {
            value,
            ordinal,
          },
        });
      }

      // Set domain of scale to preserve encoding.
      const newScale = Object.fromEntries(
        channels.map((channel) => {
          const matchScale = getScaleByMarkKey(
            view.scale,
            viewOptions.key,
            channel,
          );

          return [channel, { domain: matchScale.getOptions().domain }];
        }),
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
      ...legendsHtmlOf(container),
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
        return legendFilterOrdinal(legend, {
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
          defaultSelect: legend.attributes.defaultSelect,
          channel,
          emitter,
        });
      } else if (legend.className === CATEGORY_LEGEND_HTML_CLASS_NAME) {
        return legendFilterOrdinalHtml(container, {
          domain,
          filter: (value) => {
            const options = { ...common, value, ordinal: true };
            if (isFacet) filter(facets, options);
            else filter(context, options);
          },
          defaultSelect: legend.attributes.defaultSelect,
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
