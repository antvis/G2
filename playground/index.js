/* global document */
import { Chart } from '../src';

const chart = new Chart({ container: 'container' });
const options = {
  type: 'interval',
  width: 800,
  height: 600,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      defaultSelect: ['Sports'],
      render: (items) => {
        const contaienr = document.createElement('div');
        contaienr.style = 'display: flex; align-items: center';

        items.forEach((item) => {
          const itemDom = document.createElement('div');
          itemDom.setAttribute('role', 'legend-item');
          itemDom.setAttribute('value', item.id);

          itemDom.style =
            'display: inline-flex; align-items: center; margin: 5px;';
          itemDom.innerHTML = `
              <div style="
                width: 8px;
                height: 8px;
                background-color: ${item.color};
                margin-right: 8px;
                border-radius: 2px;
              "></div>
              <span style="font-size: 12px;">${item.label}</span>
            `;
          contaienr.appendChild(itemDom);
        });

        return contaienr;
      },
    },
  },
};

chart.options(options);

chart.render();

setTimeout(() => {
  chart.options({
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
    ],
  });
  chart.render();
}, 2000);
