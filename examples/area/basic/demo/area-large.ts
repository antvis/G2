// TODO
// 1. Slider 组件
// 2. 自定义图例交互
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

// 插入 Slider 滑块组件需要的 DOM
// const sliderDiv = document.createElement('div');
// sliderDiv.id = 'slider';
// const container = document.getElementById('container');
// container.parentNode.appendChild(sliderDiv);

fetch('../data/rain-flow.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet({
      state: {
        start: new Date('2009/7/20 0:00').getTime(),
        end: new Date('2009/9/9 0:00').getTime(),
      },
    });
    const dv = ds.createView('origin').source(data);
    dv.transform({
      type: 'filter',
      callback: function callback(obj) {
        const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
        return time >= ds.state.start && time <= ds.state.end;
      },
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 440,
      padding: [40, 40, 40, 80],
    });

    chart.data(dv.rows);
    chart.scale({
      time: {
        type: 'time',
        tickCount: 8,
        mask: 'm/dd hh:MM'
      },
      flow: {
        alias: '流量(m^3/s)',
      },
      rain: {
        alias: '降雨量(mm)',
      },
    });

    chart.axis('rain', {
      grid: null,
    });
    chart.axis('flow', {
      title: {},
    });

    chart.legend({
      items: [
        {
          name: 'flow',
          value: 'flow',
          marker: { symbol: 'circle', style: { fill: 'l(100) 0:#a50f15 1:#fee5d9', r: 5 } },
        },
        {
          name: 'rain',
          value: 'rain',
          marker: { symbol: 'circle', style: { fill: 'l(100) 0:#293c55 1:#f7f7f7', r: 5 } },
        },
      ],
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart
      .area()
      .position('time*flow')
      .color('l(100) 0:#a50f15 1:#fee5d9');
    chart
      .area()
      .position('time*rain')
      .color('l(100) 0:#293c55 1:#f7f7f7');
    chart.render();

    // chart.interact('slider', {
    //   container: 'slider',
    //   onChange(ev) {
    //     const { startValue, endValue } = ev;
    //     ds.setState('start', startValue);
    //     ds.setState('end', endValue);
    //   }
    // });
  });
