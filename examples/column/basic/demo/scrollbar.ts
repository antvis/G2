import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
  .then((res) => res.json())
  .then((data) => {
    // step1: 创建 Chart 图表对象，指定图表所在的容器 ID、指定图表的宽高、边距等信息
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    // step2: 载入图表数据源
    chart.data(data);
    chart.scale('销售额', {
      nice: true,
    });
    chart.axis('城市', {
      label: {
        autoRotate: false,
      },
    });

    chart.tooltip({
      showMarkers: false,
    });

    chart.interaction('active-region');

    // step3: 使用图形语法进行图表的绘制
    chart.interval().position('城市*销售额');

    // step4: 开启滚动条组件
    chart.option('scrollbar', {
      type: 'horizontal',
    });

    // step5: 渲染图表
    chart.render();
  });
