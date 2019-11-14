const data = [
  { country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 },
  { country: '乌拉圭', type: '2016 年耕地总面积', value: 1.8 },

  { country: '巴拉圭', type: '2016 年转基因种植面积', value: 3.6 },
  { country: '巴拉圭', type: '2016 年耕地总面积', value: 5.5 },

  { country: '南非', type: '2016 年转基因种植面积', value: 3.7 },
  { country: '南非', type: '2016 年耕地总面积', value: 12.1 },

  { country: '巴基斯坦', type: '2016 年转基因种植面积', value: 2.9 },
  { country: '巴基斯坦', type: '2016 年耕地总面积', value: 22.0 },

  { country: '阿根廷', type: '2016 年转基因种植面积', value: 23.8 },
  { country: '阿根廷', type: '2016 年耕地总面积', value: 38.6 },

  { country: '加拿大', type: '2016 年转基因种植面积', value: 11.6 },
  { country: '加拿大', type: '2016 年耕地总面积', value: 46.9 },

  { country: '巴西', type: '2016 年转基因种植面积', value: 49.1 },
  { country: '巴西', type: '2016 年耕地总面积', value: 73.2 },

  { country: '中国', type: '2016 年转基因种植面积', value: 2.8 },
  { country: '中国', type: '2016 年耕地总面积', value: 108.4 },

  { country: '美国', type: '2016 年转基因种植面积', value: 72.9 },
  { country: '美国', type: '2016 年耕地总面积', value: 165.2 },

  { country: '印度', type: '2016 年转基因种植面积', value: 49.1 },
  { country: '印度', type: '2016 年耕地总面积', value: 175.4 }

];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data, {
  value: {
    nice: false,
    alias: '销售额（万）'
  }
});

chart.axis('value', false);
chart.legend({
  position: 'top-center'
});
chart.coord().transpose();
chart.facet('mirror', {
  fields: [ 'type' ],
  autoSetAxis: false,
  transpose: true,
  showTitle: false,
  padding: [ 0, 10, 0, 0 ],
  eachView: function eachView(view, facet) {
    const facetIndex = facet.colIndex;
    if (facetIndex === 0) {
      view.axis('country', {
        position: 'top',
        label: {
          textStyle: {
            fill: '#aaaaaa',
            fontSize: 12
          }
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        },
        line: {
          lineWidth: 0
        }
      });
    } else {
      view.axis('country', false);
    }
    const color = (facetIndex === 0) ? '#1890ff' : '#2fc25b';
    view.interval().position('country*value').color(color)
      .size(30)
      .opacity(1)
      .label('value', function(val) {
        let offset = -4;
        let shadowBlur = 2;
        let textAlign = (facetIndex === 1) ? 'end' : 'start';
        let fill = 'white';
        if (val < 15) {
          offset = 4;
          textAlign = (facetIndex === 1) ? 'start' : 'end';
          fill = '#666666';
          shadowBlur = 0;
        }
        return {
          // position: 'middle',
          offset,
          textStyle: {
            fill,
            shadowBlur,
            shadowColor: 'rgba(0, 0, 0, .45)',
            textAlign
          }
        };
      });
  }
});

chart.render();
