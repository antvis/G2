import { Chart } from '@antv/g2';

const layout = (data) => {
  return data.features.map(({ id, geometry }) => {
    const arr = geometry?.coordinates?.[0] || [];
    const value = {
      x: [],
      y: [],
      value: Math.random() * 100,
      id,
    };
    if (arr?.length) {
      arr.forEach((v) => {
        v.forEach((i, index) => {
          if (index % 2) {
            value.y.push(i);
          } else {
            value.x.push(i);
          }
        });
      });
    }
    return value;
  });
};

const chart = new Chart({
  container: 'container',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
});

chart
  .polygon()
  .data({
    type: 'fetch',
    value:
      'https://raw.githubusercontent.com/python-visualization/folium/main/examples/data/us-states.json',
    transform: [
      {
        type: 'custom',
        callback: layout,
      },
    ],
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', (d) => d?.value)
  .scale('x', { domain: [-130, -60] })
  .scale('y', { domain: [10, 50] })
  .axis(false)
  .style('stroke', 'red')
  .style('fillOpacity', 0.65);

chart.render();
