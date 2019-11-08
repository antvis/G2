import insertCss from 'insert-css';

insertCss(`
  .g2-label {
    font-size: 12px;
    text-align: center;
    line-height: 0.5;
    color: #595959;
  }

  .g2-label-spec {
    font-size: 12px;
    text-align: center;
    line-height: 0.5;
    color: #595959;
    width: 400px !important;
  }

  .g2-label-spec-value {
    color: #ff5250;
    font-weight: bold;
  }
`);

const data = [
  { year: '2013', value: -3.1 },
  { year: '2014', value: 0.8 },
  { year: '2015', value: 2.3 },
  { year: '2016', value: 3.5 },
  { year: '2017', value: 5.4 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data);
chart.scale('value', {
  alias: '现金流(亿)'
});
chart.axis('year', {
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

chart.axis('value', {
  label: null,
  title: {
    offset: 30
  }
});
chart.legend(false);
chart.interval().position('year*value').opacity(1)
.color('year', val => {
  if (val === '2013') {
    return '#36c361';
  }
  return '#ff5957';
})
.label('year*value', (year, value) => {
  let offset = 15;
  if (value < 0) {
    offset *= -1;
  }
  return {
    useHtml: true,
    htmlTemplate: (text, item) => {
      const d = item.point;
      if (d.year === '2014') {
        return '<div class="g2-label-spec">新产品上市破局，现金流<span class="g2-label-spec-value"> ' + d.value + ' </span>亿</div>';
      }
      return '<span class="g2-label">' + d.value + '</span>';
    },
    offset
  };
});

chart.render();
