import { Chart } from '@antv/g2';

const colorMap = {
  Asia: '#1890FF',
  Americas: '#2FC25B',
  Europe: '#FACC14',
  Oceania: '#223273',
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);
    // 为各个字段设置别名
    chart.scale({
      LifeExpectancy: {
        alias: '人均寿命（年）',
        nice: true,
      },
      Population: {
        type: 'pow',
        alias: '人口总数'
      },
      GDP: {
        alias: '人均国内生产总值($)',
        nice: true,
      },
      Country: {
        alias: '国家/地区'
      }
    });
    chart.axis('GDP', {
      label: {
        formatter(value) {
          return (+value / 1000).toFixed(0) + 'k';
        } // 格式化坐标轴的显示
      }
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });
    chart.legend('Population', false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
    chart.point().position('GDP*LifeExpectancy')
      .size('Population', [4, 65])
      .color('continent', val => {
        return colorMap[val];
      })
      .shape('circle')
      .tooltip('Country*Population*GDP*LifeExpectancy')
      .style('continent', (val) => {
        return {
          lineWidth: 1,
          strokeOpacity: 1,
          fillOpacity: 0.3,
          opacity: 0.65,
          stroke: colorMap[val],
        };
      });
    chart.interaction('element-active');
    chart.render();
  });
