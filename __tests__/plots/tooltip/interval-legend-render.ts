import { G2Spec } from '../../../src';

export function intervalLegendRender(): G2Spec {
  return {
    type: 'point',
    height: 300,
    data: [
      { name: 'A', value: 10, category: 'Type 1' },
      { name: 'B', value: 20, category: 'Type 2' },
      { name: 'C', value: 15, category: 'Type 1' },
      { name: 'D', value: 25, category: 'Type 3' },
    ],
    encode: {
      x: 'name',
      y: 'value',
      color: 'category',
    },
    legend: {
      color: {
        render: (
          items: Array<{ id: string; label: string; color: string }>,
        ) => {
          const container = document.createElement('div');
          container.style.cssText =
            'display: flex; gap: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px;';

          items.forEach(
            (item: { id: string; label: string; color: string }) => {
              const itemEl = document.createElement('div');
              itemEl.style.cssText =
                'display: flex; align-items: center; gap: 5px; cursor: pointer;';
              itemEl.setAttribute('legend-value', item.id);

              const colorBox = document.createElement('div');
              colorBox.style.cssText = `width: 12px; height: 12px; background-color: ${item.color}; border-radius: 2px;`;

              const label = document.createElement('span');
              label.textContent = item.label;
              label.style.cssText = 'font-size: 12px; color: #333;';

              itemEl.appendChild(colorBox);
              itemEl.appendChild(label);
              container.appendChild(itemEl);
            },
          );

          return container;
        },
      },
    },
  };
}

intervalLegendRender.className = 'legend-html';

intervalLegendRender.steps = ({ canvas }) => {
  const { document } = canvas;
  const legend = document
    .getElementsByClassName('legend-html')[0]
    .attributes.innerHTML.querySelector('[legend-value]');

  return [
    {
      changeState: async () => {
        legend?.dispatchEvent(
          new CustomEvent('click', {
            offsetX: 5,
            offsetY: 5,
          }),
        );
      },
    },
    {
      changeState: async () => {
        legend?.dispatchEvent(
          new CustomEvent('click', {
            offsetX: 5,
            offsetY: 5,
          }),
        );
      },
    },
  ];
};
