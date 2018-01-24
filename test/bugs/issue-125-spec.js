const G2 = require('../../src/index');

describe('#125', () => {
  it('null data draw point', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [];
    const chart = new G2.Chart({
      container: div,
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

    setInterval(() => {
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
});
