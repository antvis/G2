const G2 = require('../../src/index');
const DataSet = require('@antv/data-set');
const expect = require('chai').expect;

describe('#557', () => {
  it('tooltip background rect width for histogram', () => {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.left = 0;
    document.body.appendChild(div);

    const values = [ 1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5, 9.7, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 13.9, 14.0, 14.2, 14.5, 15, 15.2, 15.6, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6, 21, 23.4 ];
    const data = [];
    for (let i = 0; i < values.length; i++) {
      const obj = {};
      obj.value = values[i];
      data.push(obj);
    }
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'value',
      binWidth: 2,
      as: [ 'value', 'count' ]
    });
    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: false
    });
    chart.source(dv, {
      value: {
        nice: false,
        min: 0,
        tickInterval: 1
      },
      count: {
        max: 14
      }
    });
    chart.tooltip({
      inPlot: false,
      position: 'top'
    });
    chart.axis('value', {
      label: {
        formatter: val => {
          if ((val % 2)) {
            return val;
          }
          return '';
        }
      }
    });
    chart.interval().position('value*count');
    chart.render();

    chart.showTooltip({ x: 319, y: 445 });
    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const crosshairs = tooltip.get('crosshairsRectShape');
    expect(crosshairs.attr('width')).to.equal(33.33333333333326);
    document.body.removeChild(div);
  });
});
