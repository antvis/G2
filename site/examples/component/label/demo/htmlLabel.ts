import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { repo: 'G', star: 918 },
  { repo: 'G2', star: 11688 },
  { repo: 'G6', star: 10045 },
  { repo: 'L7', star: 3125 },
  { repo: 'F2', star: 7820 },
  { repo: 'S2', star: 1231 },
  { repo: 'X6', star: 4755 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'repo')
  .encode('y', 'star')
  .encode('color', 'repo')
  .label({
    text: 'star',
    render: (text, datum) => {
      return `
        <div style="left:-50%;top:-20px;position:relative;font-size:14px;">
          <span>${datum.repo}</span>
          :
          <a href="https://github.com/antvis/${datum.repo}" target="_blank">${datum.star}</a>
        </div>
      `;
    },
  })
  .legend(false);

chart.render();
