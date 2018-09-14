const expect = require('chai').expect;
const G2 = require('../../src/index');
const { DataView } = require('@antv/data-set');

describe('#838 tooltip enterable', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const data = [{
    time: '00:00',
    calorie: 91
  }, {
    time: '01:00',
    calorie: 108
  }, {
    time: '02:00',
    calorie: 93.7
  }, {
    time: '03:00',
    calorie: 80.7
  }, {
    time: '04:00',
    calorie: 85.8
  }, {
    time: '05:00',
    calorie: 61.7
  }, {
    time: '06:00',
    calorie: 83
  }, {
    time: '07:00',
    calorie: 96
  }, {
    time: '08:00',
    calorie: 205.8
  }, {
    time: '09:00',
    calorie: 121.7
  }, {
    time: '10:00',
    calorie: 233
  }, {
    time: '11:00',
    calorie: 146
  }, {
    time: '12:00',
    calorie: 323
  }, {
    time: '13:00',
    calorie: 100
  }, {
    time: '14:00',
    calorie: 92.5
  }, {
    time: '15:00',
    calorie: 130.3
  }, {
    time: '16:00',
    calorie: 125.8
  }, {
    time: '17:00',
    calorie: 367
  }, {
    time: '18:00',
    calorie: 133
  }, {
    time: '19:00',
    calorie: 146
  }, {
    time: '20:00',
    calorie: 138.3
  }, {
    time: '21:00',
    calorie: 128
  }, {
    time: '22:00',
    calorie: 142.5
  }, {
    time: '23:00',
    calorie: 130.3
  }, {
    time: '24:00',
    calorie: 80.3
  }];
  it('label rotate', done => {
    const dv = new DataView().source(data);
    dv.transform({
      type: 'map',
      callback: row => {
        row.percent = 100 / 24;
        return row;
      }
    });
    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      width: 400,
      height: 400
    });

    const outerView = chart.view({});
    outerView.source(dv);
    outerView.coord('theta', {
      innerRadius: 0.75,
      radius: 1,
      startAngle: -Math.PI / 2 - Math.PI / 24,
      endAngle: Math.PI * 1.5 - Math.PI / 24
    });
    outerView.intervalStack()
      .position('percent')
      .color('time')
      .label('time', { offset: -10 })
      .tooltip(false)
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.legend(false);
    chart.render();
    let labels = chart.getAllGeoms()[0].get('labelContainer')._cfg.children[0]._cfg.children;
    let label = labels[0];
    const formerMatrix = [].concat(labels[0].attr('matrix'));
    expect(label.attr('rotate')).to.be.undefined;
    chart.changeSize(500, 500);
    setTimeout(() => {
      labels = chart.getAllGeoms()[0].get('labelContainer')._cfg.children[0]._cfg.children;
      label = labels[0];
      const matrix = labels[0].attr('matrix');
      expect(label.attr('rotate')).to.be.undefined;
      expect(formerMatrix[0] === matrix[0]);
      expect(formerMatrix[1] === matrix[1]);
      expect(formerMatrix[3] === matrix[3]);
      expect(formerMatrix[4] === matrix[4]);
      expect(formerMatrix[6] !== matrix[6]);
      expect(formerMatrix[7] !== matrix[7]);
      done();
    }, 1000);
  });
});
