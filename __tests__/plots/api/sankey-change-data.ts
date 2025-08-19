import { Chart } from '../../../src';

export function sankeyChangeData(context) {
  const { container, canvas } = context;

  const button1 = document.createElement('button');
  button1.innerText = 'Switch to Data B (Array Format)';
  button1.style.marginRight = '10px';
  container.appendChild(button1);

  const button2 = document.createElement('button');
  button2.innerText = 'Switch to Data A (Object Format)';
  button2.style.marginRight = '10px';
  container.appendChild(button2);

  const button3 = document.createElement('button');
  button3.innerText = 'Switch to Data C (Empty)';
  container.appendChild(button3);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({ container: div, canvas });

  // Data A - Object format (original format)
  const dataA = {
    links: [
      { source: 'A', target: 'B', value: 10 },
      { source: 'A', target: 'C', value: 15 },
      { source: 'B', target: 'D', value: 8 },
      { source: 'C', target: 'D', value: 12 },
    ],
  };

  // Data B - Array format (newly supported format)
  const dataB = [
    { source: 'X', target: 'Y', value: 20 },
    { source: 'X', target: 'Z', value: 25 },
    { source: 'Y', target: 'W', value: 18 },
    { source: 'Z', target: 'W', value: 22 },
    { source: 'W', target: 'V', value: 30 },
  ];

  // Data C - Empty data
  const dataC = [];

  chart
    .sankey()
    .data({
      type: 'inline',
      value: dataA,
    })
    .layout({
      nodeAlign: 'justify',
      nodePadding: 0.1,
    })
    .encode('source', 'source')
    .encode('target', 'target')
    .encode('value', 'value')
    .style({
      labelSpacing: 3,
      labelFontWeight: 'bold',
      nodeLineWidth: 1,
      linkFillOpacity: 0.6,
    });
  // .interaction('tooltip', false);

  const finished = chart.render();

  let currentData = 'A';

  button1.onclick = () => {
    if (currentData !== 'B') {
      chart.changeData(dataB);
      currentData = 'B';
      button1.style.backgroundColor = '#007bff';
      button1.style.color = 'white';
      button2.style.backgroundColor = '';
      button2.style.color = '';
      button3.style.backgroundColor = '';
      button3.style.color = '';
    }
  };

  button2.onclick = () => {
    if (currentData !== 'A') {
      chart.changeData({ type: 'inline', value: dataA });
      currentData = 'A';
      button2.style.backgroundColor = '#007bff';
      button2.style.color = 'white';
      button1.style.backgroundColor = '';
      button1.style.color = '';
      button3.style.backgroundColor = '';
      button3.style.color = '';
    }
  };

  button3.onclick = () => {
    if (currentData !== 'C') {
      chart.changeData(dataC);
      currentData = 'C';
      button3.style.backgroundColor = '#007bff';
      button3.style.color = 'white';
      button1.style.backgroundColor = '';
      button1.style.color = '';
      button2.style.backgroundColor = '';
      button2.style.color = '';
    }
  };

  // Initial state: Data A is active
  button2.style.backgroundColor = '#007bff';
  button2.style.color = 'white';

  return {
    chart,
    finished,
    button1,
    button2,
    button3,
    canvas: chart.getContext().canvas,
  };
}
