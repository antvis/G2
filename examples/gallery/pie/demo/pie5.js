import insertCss from 'insert-css';

insertCss(`
    .g2-guide-html {
        width: 100px;
        height: 80px;
        vertical-align: middle;
        text-align: center;
        line-height: 0.2;
    }

    .g2-guide-html .title {
        font-size: 12px;
        color: #8c8c8c;
        font-weight: 300;
    }

    .g2-guide-html .value {
        font-size: 32px;
        color: #000;
        font-weight: bold;
    }
`);

const data = [
  { type: '评估中', percent: 0.23 },
  { type: '设计中', percent: 0.28 },
  { type: '正在开发', percent: 0.30 },
  { type: '已上线', percent: 0.19 }
];
const sum = 500;
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'map',
  callback(row) {
    row.value = parseInt(sum * row.percent);
    return row;
  }
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(dv);
chart.tooltip(false);
chart.legend({
  position: 'right-center',
  offsetX: -100
});
chart.coord('theta', {
  radius: 0.75,
  innerRadius: 0.6
});
chart.intervalStack().position('percent').color('type', [ '#0a7aca', '#0a9afe', '#4cb9ff', '#8ed1ff' ])
  .opacity(1)
  .label('percent', {
    offset: -18,
    textStyle: {
      fill: 'white',
      fontSize: 12,
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)'
    },
    rotate: 0,
    autoRotate: false,
    formatter: (text, item) => {
      return String(parseInt(item.point.percent * 100)) + '%';
    }
  });
chart.guide().html({
  position: [ '50%', '50%' ],
  html: '<div class="g2-guide-html"><p class="title">项目总计</p><p class="value">500</p></div>'
});
chart.on('interval:mouseenter', function(ev) {
  const data = ev.data._origin;
  $('.g2-guide-html').css('opacity', 1);
  $('.g2-guide-html .title').text(data.type);
  $('.g2-guide-html .value').text(data.value);
});

chart.on('interval:mouseleave', function() {
  $('.g2-guide-html .title').text('项目总计');
  $('.g2-guide-html .value').text(500);
});
chart.render();
