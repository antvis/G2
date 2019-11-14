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

    const originDv = ds.createView('origin');
    originDv.source(data)
      .transform({
        type: 'fold',
        fields: [ 'rain', 'flow' ],
        key: 'type',
        value: 'value',
        retains: [ 'rain', 'flow', 'time' ]
      });

    const chartDv = ds.createView();
    chartDv.source(originDv)
      .transform({
        type: 'fold',
        fields: [ 'rain', 'flow' ],
        key: 'type',
        value: 'value',
        retains: [ 'rain', 'flow', 'time' ]
      })
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        }
      });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 400,
      padding: [ 20, 20, 0, 80 ],
      animate: false
    });
    chart.source(chartDv, {
      time: {
        type: 'time',
        tickCount: 10,
        mask: 'M/DD H:mm'
      }
    });
    chart.facet('mirror', {
      fields: [ 'type' ],
      showTitle: false, // 显示标题
      padding: [ 0, 0, 40, 0 ],
      eachView(view, facet) {
        const { colValue } = facet;
        let color;
        let alias;
        if (colValue === 'rain') {
          color = '#1890ff';
          alias = '降雨量(mm)';

        } else if (colValue === 'flow') {
          color = '#2FC25B';
          alias = '流量(m^3/s)';
        }

        view.source(data, {
          [`${colValue}`]: {
            alias
          }
        });
        view.axis(colValue, {
          title: {
            autoRotate: false,
            offset: -10,
            position: 'end',
            textStyle: {
              textAlign: 'start'
            }
          }
        });
        view.line().position('time*' + colValue).color(color);
      }
    });
    chart.render();

    // 创建 Slider
    chart.interact('slider', {
      container: 'slider',
      start: ds.state.start, // 和状态量对应
      end: ds.state.end,
      xAxis: 'time',
      yAxis: 'value',
      data: originDv,
      backgroundChart: {
        type: 'line',
        color: 'grey'
      },
      onChange({ startValue, endValue }) {
        ds.setState('start', startValue);
        ds.setState('end', endValue);
      }
    });
  });
