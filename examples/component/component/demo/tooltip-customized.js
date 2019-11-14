import insertCss from 'insert-css';

insertCss(`
  body {
    background-color: #ebf0f0
  }

  .g2-tooltip {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    color: rgb(87, 87, 87);
    font-size: 12px;
    line-height: 20px;
    padding: 10px 10px 6px 10px;
  }

  .g2-tooltip-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .g2-tooltip-value {
    margin-left: 30px;
    display: inline;
    float: right;
  }

  .g2-tooltip-statistic {
    font-size: 14px;
    padding-bottom: 10px;
    margin-top: 10px;
    list-style-type: none;
  }

  .g2-tooltip-statistic-value {
    font-weight: 'bold';
    display: 'inline-block';
    float: right;
    margin-left: 30px
  }
`);


const colors = [ '#1f9399', '#dcb17f', '#875630', '#fd9833', '#254297', '#d872be', '#185c75', '#52c09c', '#766d58', '#28b8bd', '#f5d08e', '#b68761', '#f69574' ];
fetch('../data/fertility.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 'auto'
    });
    chart.source(data);
    chart.tooltip({
      crosshairs: 'y',
      htmlContent(title, items) {
        const html = '<div class="g2-tooltip">';
        const titleDom = '<div class="g2-tooltip-title" style="margin-bottom: 4px;">' + title + '</div>';
        let listDom = '<ul class="g2-tooltip-list">';
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemDom = '<li data-index={index}>'
            + '<span style="background-color:' + item.color + ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
            + item.name + '<span class="g2-tooltip-value">' + item.value + '</span>'
            + '</li>';
          listDom += itemDom;
          sum += parseFloat(item.value);
        }
        listDom += '</ul>';
        const sumDom = '<li class="g2-tooltip-statistic">总计：<span class="g2-tooltip-statistic-value">' + sum.toFixed(2) + '</span></li>';
        return html + titleDom + sumDom + listDom + '</div>';
      }
    });
    chart.areaStack().position('year*value').color('country', colors);
    chart.lineStack().position('year*value').color('country', colors)
      .opacity('country', country => {
        if (country === 'China') return 1;
        return 0.6;
      })
      .style({ lineCap: 'round' });
    chart.render();
  });

