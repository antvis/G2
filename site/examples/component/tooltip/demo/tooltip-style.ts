import { Chart } from '@antv/g2';

insetCss(`
  .g2-tooltip {
    background: #eee !important;
    border-radius: 0.25em !important;
  }

  .g2-tooltip-title {
    font-size: 20px !important;
    font-weight: bold !important;
    padding-bottom: 0.25em !important;
  }

  .g2-tooltip-list {
    background: #ddd !important;
    padding: 0.25em !important;
    border-radius: 0.25em !important;
  }

  .g2-tooltip-list-item {
    background: #ccc !important;
    padding: 0.25em !important;
    margin: 0.25em !important;
    border-radius: 0.25em !important;
  }

  .g2-tooltip-list-item-name {
    background: #bbb !important;
    padding: 0 0.25em !important;
    border-radius: 0.25em !important;
  }

  .g2-tooltip-list-item-name-label {
    font-weight: bold !important;
    font-size: 16px !important;
  }

  .g2-tooltip-list-item-marker {
    border-radius: 0.25em !important;
    width: 15px !important;
    height: 15px !important;
  }

  .g2-tooltip-list-item-value {
    font-weight: bold !important;
    font-size: 16px !important;
  }
`);

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
  .transform({ type: 'dodgeX' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .scale('y', { nice: true })
  .axis('y', { labelFormatter: '~s' })
  .interaction('tooltip', { shared: true });

chart.render();

function insetCss(css) {
  const style = document.createElement('style');
  const container = document.getElementById('container');
  style.type = 'text/css';
  style.innerHTML = css;
  container.append(style);
}
