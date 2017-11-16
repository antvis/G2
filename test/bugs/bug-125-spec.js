const G2 = require('../../index');

describe('null data draw point', function() {
  const div = document.createElement('div');
  div.id = 'bug-125';
  document.body.appendChild(div);
  const data = [

  ];
  const chart = new G2.Chart({
    container: 'bug-125',
    height: 500,
    width: 800,
    animate: false
  });
  chart.source(data, {
    sold: {
      type: 'linear'
    }
  });

  chart.area().position('time*temperature')
    .color('type')
    .shape('smooth');
  chart.line().position('time*temperature')
    .color('type')
    .shape('smooth');

  chart.render();

  setInterval(function() {
    const now = new Date();
    const time = now.getTime();
    const temperature1 = ~~(Math.random() * 5) + 22;
    const temperature2 = ~~(Math.random() * 7) + 17;
    if (data.length >= 200) {
      data.shift();
      data.shift();
    }
    data.push({ time, temperature: temperature1, type: '记录1' });
    data.push({ time, temperature: temperature2, type: '记录2' });
    chart.changeData(data);
  }, 1000);

});
