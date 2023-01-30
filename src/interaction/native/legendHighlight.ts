import { group } from 'd3-array';
import { subObject } from '../../utils/helper';
import { selectG2Elements, useState } from './utils';
import { markerOf, labelOf, itemsOf, legendsOf } from './legendFilter';

export function LegendHighlight({ channel, ...rest }) {
  return (context) => {
    const { container, view } = context;
    const legends = legendsOf(container);
    const elements = selectG2Elements(container);
    const channelOf = (legend) => {
      const { __data__ } = legend.parentNode;
      return __data__.scale.name;
    };
    const scaleOf = (channel) => {
      const {
        scale: { [channel]: scale },
      } = view;
      return scale;
    };
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
      const { setState, removeState } = useState(rest);
      const markerStyle = subObject(rest, 'marker');
      const labelStyle = subObject(rest, 'label');
      const { setState: setM, removeState: removeM } = useState(markerStyle);
      const { setState: setL, removeState: removeL } = useState(labelStyle);
      const updateLegendState = (highlight) => {
        for (const item of items) {
          const marker = markerOf(item);
          const label = labelOf(item);
          if (item === highlight || highlight === null) {
            removeM(marker, 'unhighlighted');
            removeL(label, 'unhighlighted');
          } else {
            setM(marker, 'unhighlighted');
            setL(label, 'unhighlighted');
          }
        }
      };

      const itemPointerover = new Map();

      // Add listener for the legend items.
      for (const item of items) {
        const pointerover = () => {
          const value = datumOf(item);
          const elementSet = new Set(elementGroup.get(value));
          for (const e of elements) {
            if (elementSet.has(e)) setState(e, 'highlighted');
            else setState(e, 'unhighlighted');
          }
          updateLegendState(item);
        };
        item.addEventListener('pointerover', pointerover);
        itemPointerover.set(item, pointerover);
      }

      // Add listener for the legend group.
      const pointerleave = () => {
        for (const e of elements) {
          removeState(e, 'unhighlighted', 'highlighted');
        }
        updateLegendState(null);
      };
      legend.addEventListener('pointerleave', pointerleave);

      return () => {
        legend.removeEventListener(pointerleave);
        for (const [item, pointerover] of itemPointerover) {
          item.removeEventListener(pointerover);
        }
      };
    }
  };
}
