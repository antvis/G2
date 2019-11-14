// 极坐标下的柱状图
// 构造数据
const data1 = [];
for (let i = 0; i < 50; i++) {
  const item = {};
  item.type = i + '';
  item.value = 10;
  data1.push(item);
}

const data2 = [];
for (let i = 0; i < 50; i++) {
  const item = {};
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

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 0
});
chart.scale({
  type: {
    range: [ 0, 1 ]
  },
  value: {
    sync: true
  }
});
chart.legend(false);
chart.tooltip(false);
const view1 = chart.view();
view1.source(data1);
view1.axis(false);
view1.coord('polar', {
  startAngle: -9 / 8 * Math.PI,
  endAngle: 1 / 8 * Math.PI,
  innerRadius: 0.75,
  radius: 0.8
});
view1.interval().position('type*value')
  .color('#CBCBCB')
  .size(6);

const view2 = chart.view();
view2.source(data1, {
  type: {
    tickCount: 3
  }
});
view2.axis('value', false);
view2.axis('type', {
  grid: null,
  line: null,
  tickLine: null,
  label: {
    offset: -15,
    textStyle: {
      textAlign: 'center',
      fill: '#CBCBCB',
      fontSize: 18
    },
    formatter: val => {
      if (val === '49') {
        return 50;
      }

      return val;
    }
  }
});
view2.coord('polar', {
  startAngle: -9 / 8 * Math.PI,
  endAngle: 1 / 8 * Math.PI,
  innerRadius: 0.95,
  radius: 0.55
});
view2.interval().position('type*value')
  .color('#CBCBCB')
  .size(6);

const view3 = chart.view();
view3.source(data2);
view3.axis(false);
view3.coord('polar', {
  startAngle: -9 / 8 * Math.PI,
  endAngle: 1 / 8 * Math.PI,
  innerRadius: 0.75,
  radius: 0.8
});
view3.interval().position('type*value')
  .color('value', '#3023AE-#53A0FD')
  .opacity(1)
  .size(6);
view3.guide().text({
  position: [ '50%', '65%' ],
  content: '26°',
  style: {
    fill: '#CBCBCB',
    fontSize: 64,
    textAlign: 'center',
    textBaseline: 'middle'
  }
});

chart.render();
