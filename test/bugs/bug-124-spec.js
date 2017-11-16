const G2 = require('../../index');

describe('null data draw point', function() {
  const div = document.createElement('div');
  div.id = 'bug-124';
  document.body.appendChild(div);
  const data = [
    { genre: 'Sports', sold: null },
    { genre: 'Strategy', sold: null },
    { genre: 'Action', sold: null },
    { genre: 'Shooter', sold: null },
    { genre: 'Other', sold: null }
  ];

  const chart = new G2.Chart({
    container: 'bug-124',
    height: 300,
    width: 500,
    animate: false
  });
  chart.source(data, {
    sold: {
      type: 'linear'
    }
  });

  chart.point().position('genre*sold')
    .size(20)
    .shape('circle');
  chart.render();

});
