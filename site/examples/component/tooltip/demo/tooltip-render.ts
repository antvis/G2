import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .transform([{ type: 'sortX', by: 'y', reverse: true }])
  .encode('x', 'letter')
  .encode('y', 'frequency');

chart.interaction('tooltip', {
  render: (event, { title, items }) => `
  <div
    style="
      width: 300px;
      background: #f2f2f2;
      border-radius: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      margin: -12px;
    "
  >
    <h2
      style="
        margin-bottom: 9px; 
        font-size: 18px; 
        line-height: 30px; 
        font-weight: 500px"
    >
      Letter: ${title}
    </h2>
    ${items
      .map(
        (item) =>
          `<div style="font-size: 16px; color: #666">name: ${item.name}
          <br/>
          value: 
          <div style="width:${
            item.value * 1000
          }px;height:10px;display:inline-block;background:${item.color}"></div>
          ${item.value}
        </div>`,
      )
      .join('')}
  </div>
  `,
});

chart.render();
