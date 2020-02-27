import { Chart } from '@antv/g2';

// 极坐标下的柱状图
// 构造数据
const data1 = [];
for (let i = 0; i < 50; i++) {
  data1.push({
    type: i + '',
    value: 10,
  });
}

const data2 = [];
for (let i = 0; i < 50; i++) {
  const item: any = {};
  item.type = i + '';
  item.value = 10;
  if (i === 25) {
    item.value = 14;
  }
  if (i > 25) {
    item.value = 0;
  }
  data2.push(item);
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 0,
});
chart.scale({
  type: {
    range: [0, 1],
  },
  value: {
    sync: true,
  },
});
chart.legend(false);
chart.tooltip(false);

const view1 = chart.createView();
view1.data(data1);
view1.axis(false);
view1.coordinate('polar', {
  startAngle: (-9 / 8) * Math.PI,
  endAngle: (1 / 8) * Math.PI,
  innerRadius: 0.75,
  radius: 0.8,
});
view1
  .interval()
  .position('type*value')
  .color('#CBCBCB')
  .size(6);

const view2 = chart.createView();
view2.data(data1);
view2.axis('value', false);
view2.axis('type', {
  grid: null,
  line: null,
  tickLine: null,
  label: {
    offset: -25,
    style: {
      textAlign: 'center',
      fill: '#CBCBCB',
      fontSize: 18,
    },
    formatter: (val) => {
      if (+val % 7 !== 0) {
        return '';
      }

      return val;
    },
  },
});
view2.coordinate('polar', {
  startAngle: (-9 / 8) * Math.PI,
  endAngle: (1 / 8) * Math.PI,
  innerRadius: 0.95,
  radius: 0.55,
});
view2
  .interval()
  .position('type*value')
  .color('#CBCBCB')
  .size(6);

const view3 = chart.createView();
view3.data(data2);
view3.axis(false);
view3.coordinate('polar', {
  startAngle: (-9 / 8) * Math.PI,
  endAngle: (1 / 8) * Math.PI,
  innerRadius: 0.75,
  radius: 0.8,
});
view3
  .interval()
  .position('type*value')
  .color('value', '#3023AE-#53A0FD')
  .size(6);

view3.annotation().text({
  position: ['50%', '65%'],
  content: '26°',
  style: {
    fill: '#CBCBCB',
    fontSize: 64,
    textAlign: 'center',
    textBaseline: 'middle',
  },
});

chart.render();
