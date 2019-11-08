fetch('../data/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
    chart.source(data);
    chart.tooltip({
      showTitle: false,
      crosshairs: {
        type: 'cross'
      },
      itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}<br/>'
        + '{value}'
        + '</li>'
    });
    chart.point().position('height*weight')
      .size(4)
      .shape('circle')
      .opacity(0.65)
      .tooltip('gender*height*weight', (gender, height, weight) => {
        return {
          name: gender,
          value: height + '(cm), ' + weight + '(kg)'
        };
      });
    chart.render();
  });
