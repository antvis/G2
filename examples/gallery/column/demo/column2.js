import insertCss from 'insert-css';

insertCss(`
  .g2-label-item {
        font-size: 12px;
        text-align: center;
        line-height: 0.4;
    }

    .g2-label-item-value {
        color: #595959
    }

    .g2-label-item-percent {
        color: #8c8c8c
    }}
`);

const data = [
  { type: '未知', value: 654, percent: 0.02 },
  { type: '17 岁以下', value: 654, percent: 0.02 },
  { type: '18-24 岁', value: 4400, percent: 0.2 },
  { type: '25-29 岁', value: 5300, percent: 0.24 },
  { type: '30-39 岁', value: 6200, percent: 0.28 },
  { type: '40-49 岁', value: 3300, percent: 0.14 },
  { type: '50 岁以上', value: 1500, percent: 0.06 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 50, 20 ]
});
chart.source(data);
chart.scale('value', {
  alias: '销售额(万)'
});
chart.axis('type', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    }
  },
  tickLine: {
    alignWithLabel: false,
    length: 0
  }
});
chart.axis('value', false);
chart.tooltip({
  share: true
});

chart.guide().dataMarker({
  top: true,
  content: '因政策调整导致销量下滑',
  position: [ '2014-01', 1750 ],
  style: {
    text: {
      fontSize: 13
    }
  },
  lineLength: 30
});

chart.interval().position('type*value').opacity(1)
  .label('value', {
    useHtml: true,
    htmlTemplate: (text, item) => {
      const a = item.point;
      a.percent = String(parseInt(a.percent * 100)) + '%';
      return '<span class="g2-label-item"><p class="g2-label-item-value">' + a.value + '</p><p class="g2-label-item-percent">' + a.percent + '</p></div>';
    }
  });
chart.render();
