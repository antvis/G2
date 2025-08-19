import { Chart } from '../../../src';

export function chartEmitItemTooltipWithFlex(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.width = '800px';
  wrapperDiv.style.height = '400px';
  container.appendChild(wrapperDiv);

  // button
  const button = document.createElement('button');
  button.innerText = 'Tooltip Show';
  container.appendChild(button);

  const chart = new Chart({
    container: wrapperDiv,
    autoFit: true,
    canvas,
  });

  chart
    .interval()
    .data([
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1953 年', sales: 61 },
      { year: '1954 年', sales: 205 },
      { year: '1955 年', sales: 48 },
    ])
    .transform({ type: 'flexX', field: 'sales' })
    .encode('x', 'year')
    .encode('y', 'sales');

  const finished = chart.render();

  button.onclick = () => {
    const tooltipData = chart.getDataByXY({ x: 400, y: 100 });
    chart.emit('tooltip:show', {
      data: {
        data: tooltipData[0],
      },
    });
  };

  return {
    chart,
    button,
    finished,
  };
}
