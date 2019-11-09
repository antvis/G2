
function formatter(value) {
  if (value.length < 6) {
    return value;
  }
  return value.substring(0, 6) + '...';
}
fetch('../data/company_sales.json')
  .then(res => res.json())
  .then(filedata => {
    const data = filedata['家具产品'].children['书架'].children.map(row => {
      row.name = row.name + row.date;
      return row;
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 20, 80, 100 ],
      animate: false
    });
    chart.source(data, {
      name: {
        formatter,
        values: data.slice(0, 20).map(row => row.name)
      },
      value: {
        tickCount: 5
      }
    });
    chart.axis('name', {
      tickLine: {
        alignWithLabel: false,
        length: 0
      }
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.interval().position('name*value').opacity(1);
    chart.render();
    chart
      .interact('drag', {
        type: 'X'
      })
      .interact('scroll-bar', {
        type: 'X'
      });

  });

