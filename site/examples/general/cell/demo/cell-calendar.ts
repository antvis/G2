import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      paddingTop: 150,
      paddingRight: 30,
      paddingBottom: 150,
      paddingLeft: 70,
    });

    chart
      .scale('x', { type: 'band' })
      .scale('y', { type: 'band' })
      .scale('color', {
        domain: [0, 10, 20],
        range: ['#BAE7FF', '#1890FF', '#0050B3'],
      });

    // Configure axes
    chart.axis('x', {
      title: false,
      tick: false,
      line: false,
      label: true,
      labelFontSize: 12,
      labelFill: '#666',
      labelFormatter: (val: string) => {
        if (val === '2') return 'MAY';
        if (val === '6') return 'JUN';
        if (val === '10') return 'JUL';
        if (val === '15') return 'AUG';
        if (val === '19') return 'SEP';
        if (val === '24') return 'OCT';
        return '';
      },
    });

    chart.axis('y', {
      title: false,
      label: true,
      tick: false,
      grid: false,
      labelFormatter: (val: string) => {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return days[parseInt(val)];
      },
    });

    chart.legend(false);

    chart.interaction('tooltip', {
      title: 'date',
      showMarkers: false,
    });

    chart
      .cell()
      .data(data)
      .encode('x', 'week')
      .encode('y', 'day')
      .encode('color', 'commits')
      .style('inset', 0.5)
      .style('stroke', (d: any) => {
        if (d.lastWeek && d.lastDay) return '#404040';
        if (d.lastWeek) return '#404040';
        return '#fff';
      })
      .style('lineWidth', (d: any) => {
        if (d.lastWeek || d.lastDay) return 2;
        return 1;
      })
      .state('active', { stroke: '#000', lineWidth: 2 })
      .state('inactive', { opacity: 0.6 });

    chart.interaction('elementHighlight', true);

    chart.render();
  });
