import { group } from 'd3-array';
import { subObject } from '../utils/helper';
import {
  mergeState,
  selectG2Elements,
  useState,
  createValueof,
  createDatumof,
} from './utils';
import { markerOf, labelOf, itemsOf, legendsOf, dataOf } from './legendFilter';

export function LegendHighlight() {
  return (context, _, emitter) => {
    const { container, view, options } = context;
    const legends = legendsOf(container);
    const elements = selectG2Elements(container);
    const channelOf = (legend) => {
      return dataOf(legend).scales[0].name;
    };
    const scaleOf = (channel) => {
      const {
        scale: { [channel]: scale },
      } = view;
      return scale;
    };
    const markState = mergeState(options, ['active', 'inactive']);
    const valueof = createValueof(elements, createDatumof(view));
    const destroys = [];

    // Bind events for each legend.
    for (const legend of legends) {
      const datumOf = (item) => {
        const { data } = legend.attributes;
        const { __data__: datum } = item;
        const { index } = datum;
        return data[index].label;
      };
      const channel = channelOf(legend);
      const items = itemsOf(legend);
      const scale = scaleOf(channel);
      const elementGroup = group<any, any>(elements, (d) =>
        scale.invert(d.__data__[channel]),
      );
      const { state: legendState = {} } = legend.attributes;
      const { inactive = {} } = legendState;
      const { setState, removeState } = useState(markState, valueof);

      // Handle styles of inner item.
      const markerStyle = { inactive: subObject(inactive, 'marker') };
      const labelStyle = { inactive: subObject(inactive, 'label') };
      const { setState: setM, removeState: removeM } = useState(markerStyle);
      const { setState: setL, removeState: removeL } = useState(labelStyle);
      const updateLegendState = (highlight) => {
        for (const item of items) {
          const marker = markerOf(item);
          const label = labelOf(item);
          if (item === highlight || highlight === null) {
            removeM(marker, 'inactive');
            removeL(label, 'inactive');
          } else {
            setM(marker, 'inactive');
            setL(label, 'inactive');
          }
        }
      };
      const highlightItem = (event, item) => {
        // Update UI.
        const value = datumOf(item);
        const elementSet = new Set(elementGroup.get(value));
        for (const e of elements) {
          if (elementSet.has(e)) setState(e, 'active');
          else setState(e, 'inactive');
        }
        updateLegendState(item);

        // Emit events.
        const { nativeEvent = true } = event;
        if (!nativeEvent) return;
        emitter.emit('legend:highlight', {
          ...event,
          nativeEvent,
          data: { channel, value },
        });
      };

      const itemPointerover = new Map();

      // Add listener for the legend items.
      for (const item of items) {
        const pointerover = (event) => {
          highlightItem(event, item);
        };
        item.addEventListener('pointerover', pointerover);
        itemPointerover.set(item, pointerover);
      }

      // Add listener for the legend group.
      const pointerleave = (event) => {
        for (const e of elements) removeState(e, 'inactive', 'active');
        updateLegendState(null);

        // Emit events.
        const { nativeEvent = true } = event;
        if (!nativeEvent) return;
        emitter.emit('legend:unhighlight', { nativeEvent });
      };

      const onHighlight = (event) => {
        const { nativeEvent, data } = event;
        if (nativeEvent) return;
        const { channel: specifiedChannel, value } = data;
        if (specifiedChannel !== channel) return;
        const item = items.find((d) => datumOf(d) === value);
        if (!item) return;
        highlightItem({ nativeEvent: false }, item);
      };

      const onUnHighlight = (event) => {
        const { nativeEvent } = event;
        if (nativeEvent) return;
        pointerleave({ nativeEvent: false });
      };

      legend.addEventListener('pointerleave', pointerleave);
      emitter.on('legend:highlight', onHighlight);
      emitter.on('legend:unhighlight', onUnHighlight);

      const destroy = () => {
        legend.removeEventListener(pointerleave);
        emitter.off('legend:highlight', onHighlight);
        emitter.off('legend:unhighlight', onUnHighlight);
        for (const [item, pointerover] of itemPointerover) {
          item.removeEventListener(pointerover);
        }
      };
      destroys.push(destroy);
    }

    return () => destroys.forEach((d) => d());
  };
}
