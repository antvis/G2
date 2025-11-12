import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data([
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
]);

chart
  .interval()
  .encode('x', 'year')
  .encode('y', 'value')
  .encode('color', 'year')
  .axis({
    x: {
      animate: false,
      transform: [],
      labelRender: (datum) => {
        return `<div style="background: #fff; height: 30px;">
            <div style="width: 60px; transform: translateX(-50%); background: #ddd; font-weight: bold;">${datum.label}</div>
          </div>`;
      },
    },
  })
  .style({
    maxWidth: 60,
  })
  .legend(false);

chart.render();
