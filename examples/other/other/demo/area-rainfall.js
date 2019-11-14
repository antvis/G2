// 插入 Slider 滑块组件需要的 DOM
const sliderDiv = document.createElement('div');
sliderDiv.id = 'slider';
const container = document.getElementById('container');
container.parentNode.appendChild(sliderDiv);

fetch('../data/rain-flow.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet({
      state: {
        start: new Date('2009/7/20 0:00').getTime(),
        end: new Date('2009/9/9 0:00').getTime()
      }
    });
    const dv = ds.createView('origin').source(data);
    dv.transform({
      type: 'filter',
      callback(obj) {
        const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
        return time >= ds.state.start && time <= ds.state.end;
      }
    });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 40, 40, 40, 80 ],
      animate: false
    });
    const scale = {
      time: {
        type: 'time',
        tickCount: 8,
        mask: 'm/dd hh:MM'
      },
      flow: {
        alias: '流量(m^3/s)'
      },
      rain: {
        alias: '降雨量(mm)'
      }
    };

    chart.axis('rain', {
      grid: null
    });
    chart.axis('flow', {
      title: true
    });
    chart.legend(false);

    const view1 = chart.view();
    view1.source(dv, scale);
    view1.area()
      .position('time*flow')
      .color('l(100) 0:#a50f15 1:#fee5d9')
      .opacity(0.85);

    const view2 = chart.view();
    view2.axis('rain', {
      position: 'right'
    });
    view2.source(dv, scale);
    view2.coord().reflect();
    view2.area()
      .position('time*rain')
      .color('l(100) 0:#293c55 1:#f7f7f7')
      .opacity(0.85);

    chart.render();

    // 创建 Slider
    chart.interact('slider', {
      container: 'slider',
      data: dv.rows,
      start: ds.state.start, // 和状态量对应
      end: ds.state.end,
      scales: scale,
      xAxis: 'time',
      yAxis: 'flow',
      backgroundChart: {
        type: 'line',
        color: 'grey'
      },
      onChange(ev) {
        const { startValue, endValue } = ev;
        ds.setState('start', startValue);
        ds.setState('end', endValue);
      }
    });
  });
