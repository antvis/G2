import { Chart } from '../../../src';

export function chartChangeDataFacet(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Data';
  button.style.display = 'block';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({ container: div, canvas });

  const view = chart
    .facetRect()
    .data([
      { name: 'CPU', percent: 27, color: 'rgba(90, 132, 226, 1)' },
      { name: '内存', percent: 81, color: 'rgba(250, 57, 57, 1)' },
      { name: '硬盘', percent: 68, color: 'rgba(253, 192, 45, 1)' },
    ])
    .encode('x', 'name')
    .axis(false)
    .legend(false)
    .view()
    .attr('frame', false)
    .coordinate({ type: 'radial', innerRadius: 0.7, outerRadius: 0.95 });

  view
    .interval()
    .encode('y', 100)
    .encode('size', 52)
    .scale('y', { zero: true })
    .axis(false)
    .style('fill', 'rgba(232, 232, 232, 1)')
    .animate(false);

  view
    .interval()
    .encode('y', 'percent')
    .encode('color', 'color')
    .encode('size', 80)
    .scale('color', { type: 'identity' })
    .tooltip({ name: '已使用', channel: 'y' })
    .axis(false)
    .style('radius', 26)
    .style('shadowColor', 'color')
    .style('shadowBlur', 10)
    .style('shadowOffsetX', -1)
    .style('shadowOffsetY', -1)
    .animate('enter', { type: 'waveIn', duration: 1000 });

  view
    .text()
    .encode('text', (d) => `${d.name} ${d.percent}%`)
    .style('textAlign', 'center')
    .style('textBaseline', 'middle')
    .style('fontSize', 15)
    .style('color', 'rgba(74, 74, 74, 1)')
    .style('x', '50%')
    .style('y', '50%');

  const finished = chart.render();

  let resolve;
  const refreshed = new Promise((r) => (resolve = r));

  button.onclick = () => {
    chart
      .changeData([
        { name: 'CPU', percent: 40, color: 'rgba(90, 132, 226, 1)' },
        { name: '内存', percent: 60, color: 'rgba(250, 57, 57, 1)' },
        { name: '硬盘', percent: 20, color: 'rgba(253, 192, 45, 1)' },
      ])
      ?.then(resolve);
  };

  return { chart, button, finished, refreshed };
}
