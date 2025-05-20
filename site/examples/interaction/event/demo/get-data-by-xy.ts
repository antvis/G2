import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', city: 'Tokyo', temperature: 7 },
  { month: 'Jan', city: 'London', temperature: 3.9 },
  { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
  { month: 'Feb', city: 'London', temperature: 4.2 },
  { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
  { month: 'Mar', city: 'London', temperature: 5.7 },
  { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
  { month: 'Apr', city: 'London', temperature: 8.5 },
  { month: 'May', city: 'Tokyo', temperature: 18.4 },
  { month: 'May', city: 'London', temperature: 11.9 },
  { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
  { month: 'Jun', city: 'London', temperature: 15.2 },
  { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
  { month: 'Jul', city: 'London', temperature: 17 },
  { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
  { month: 'Aug', city: 'London', temperature: 16.6 },
  { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
  { month: 'Sep', city: 'London', temperature: 14.2 },
  { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
  { month: 'Oct', city: 'London', temperature: 10.3 },
  { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
  { month: 'Nov', city: 'London', temperature: 6.6 },
  { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
  { month: 'Dec', city: 'London', temperature: 4.8 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data(data)
  .encode('x', 'month')
  .encode('y', 'temperature')
  .encode('color', 'city')
  .scale('x', {
    range: [0, 1],
  })
  .scale('y', {
    nice: true,
  })
  .axis('y', { labelFormatter: (d) => d + '°C' });

chart.line().encode('shape', 'smooth');

chart.point().encode('shape', 'point').tooltip(false);

const initContainer = () => {
  const container = document.getElementById('container');
  container.style.position = 'relative';
  const p = document.createElement('p');
  p.id = 'point-data';
  p.style.position = 'absolute';
  p.style.left = `10px`;
  p.style.top = `10px`;
  p.style.padding = '12px';
  p.style.borderRadius = '4px';
  p.style.backgroundColor = '#eee';
  container.insertBefore(p, container.firstChild);
  return p;
};

chart.on('plot:pointermove', (evt) => {
  const { x, y } = evt;
  const p = document.getElementById('point-data') || initContainer();
  const pointData = chart.getDataByXY({ x, y }, { shared: true });
  p.innerText = `X: ${x}, Y: ${y}\n\nEventData: ${JSON.stringify(pointData)}`;
});

chart.render();
