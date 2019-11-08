import insertCss from 'insert-css';

insertCss(`
  .g2-label-item-inner {
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    text-shadow: 0px 0px 2px #595959;
  }

  .g2-label-item-outer {
    width:60px;
    font-size: 12px;
    color: #595959;
  }
`);

const data = [
  { type: '硕士', value: 0.4 },
  { type: '本科', value: 0.21 },
  { type: '博士', value: 0.17 },
  { type: '初中', value: 0.009 },
  { type: '专科', value: 0.013 },
  { type: '未知', value: 0.08 }
];

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent'
});

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 14
});
chart.source(dv);
chart.legend(false);
chart.coord('theta', {
  radius: 0.75
});
chart.intervalStack().position('value').color('type', [ '#2593fc', '#38c060', '#27c1c1', '#705dc8', '#3b4771', '#f9cb34' ])
  .opacity(1)
  .label('value', function(val) {
    const offset = (val > 0.02) ? -30 : 30;
    const label_class = (val > 0.02) ? 'g2-label-item-inner' : 'g2-label-item-outer';
    return {
      offset,
      useHtml: true,
      htmlTemplate: (text, item) => {
        const d = item.point;
        const percent = String(parseInt(d.percent * 100)) + '%';
        return '<div class=' + label_class + '>' + d.type + percent + '</div>';
      }
    };
  });
chart.render();
