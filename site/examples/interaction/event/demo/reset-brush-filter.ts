import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  })
  .encode('x', 'height')
  .encode('y', 'weight')
  .encode('color', 'gender')
  .scale({
    x: {
      domain: [140, 200],
    },
    y: {
      domain: [0, 150],
    },
  })
  .interaction('brushFilter', true);

chart.render();

// 刷选之后重置选区
const createButton = () => {
  const container = document.querySelector('#container');
  const button = document.createElement('button');
  button.innerText = 'reset';
  button.onclick = () => {
    chart.emit('brush:filter', {
      data: {
        selection: [
          [140, 200],
          [0, 150],
        ],
      },
    });
  };
  container.insertBefore(button, container.firstChild);
};

createButton();
