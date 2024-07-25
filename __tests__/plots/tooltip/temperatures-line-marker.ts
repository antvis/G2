import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { temperatures } from '../../data/temperatures';

export function temperatureLineMarker(): G2Spec {
  return {
    type: 'line',
    data: temperatures,
    encode: {
      x: 'month',
      y: 'temperature',
      color: 'city',
    },
    interaction: {
      tooltip: {
        render: (event, { items }) => {
          const target = event.target;
          const format = (item) => `${item.name}: ${item.value}`;
          if (target.className === 'g2-tooltip-marker') {
            const color = target.style.fill;
            const item = items.find((i) => i.color === color);
            return format(item);
          }
          return items.map(format).join('<br>');
        },
      },
    },
  };
}

temperatureLineMarker.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: async () => {
        plot.dispatchEvent(
          new CustomEvent('pointermove', {
            offsetX: 200,
            offsetY: 300,
          }),
        );
      },
    },
    {
      changeState: async () => {
        const marker = plot.getElementsByClassName('g2-tooltip-marker')[0];
        const bbox = marker.getBBox();
        const x = bbox.x + bbox.width / 2;
        const y = bbox.y + bbox.height / 2;
        marker.dispatchEvent(
          new CustomEvent('pointermove', {
            offsetX: x,
            offsetY: y,
          }),
        );
      },
    },
  ];
};
