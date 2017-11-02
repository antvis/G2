const G2 = require('../../index');

describe('all data equals null', function() {
  const div = document.createElement('div');
  div.id = 'bug-null';
  document.body.appendChild(div);
  const data = [
    { genre: 'Sports', sold: null },
    { genre: 'Strategy', sold: null },
    { genre: 'Action', sold: null },
    { genre: 'Shooter', sold: null },
    { genre: 'Other', sold: null }
  ];

  const chart = new G2.Chart({
    container: 'bug-null',
    height: 300,
    width: 500,
    animate: false
  });
  chart.source(data, {
    sold: {
      type: 'linear'
    }
  });

  chart.line().position('genre*sold');
  chart.render();

});
