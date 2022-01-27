import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import _ from 'lodash';

const nagativeData = [
  {abscissa: "202101", name: "万元薪酬净利润"},
  {abscissa: "202102", name: "万元薪酬净利润"},
  {abscissa: "202103", name: "万元薪酬净利润"},
  {abscissa: "202104", value: -398.6,name: "万元薪酬净利润"},
  {abscissa: "202106", value: -397.6, name: "万元薪酬净利润"},
  {abscissa: "202107" , name: "万元薪酬净利润"},
  {abscissa: "202108", name: "万元薪酬净利润"},
  {abscissa: "202109", name: "万元薪酬净利润"},
  {abscissa: "202110", name: "万元薪酬净利润"},
  {abscissa: "202111", name: "万元薪酬净利润"},
  {abscissa: "202101", name: "同期万元薪酬净利润"},
  {abscissa: "202102", name: "同期万元薪酬净利润"},
  {abscissa: "202103", name: "同期万元薪酬净利润"},
  {abscissa: "202104", name: "同期万元薪酬净利润"},
  {abscissa: "202105", name: "同期万元薪酬净利润"},
  {abscissa: "202106", name: "同期万元薪酬净利润"},
  {abscissa: "202107", name: "同期万元薪酬净利润"},
  {abscissa: "202108", name: "同期万元薪酬净利润"},
  {abscissa: "202109", name: "同期万元薪酬净利润"},
  {abscissa: "202110", name: "同期万元薪酬净利润"},
  {abscissa: "202111", name: "同期万元薪酬净利润"}
];

const positiveData = [
  {abscissa: "202101", name: "万元薪酬净利润"},
  {abscissa: "202102", name: "万元薪酬净利润"},
  {abscissa: "202103", name: "万元薪酬净利润"},
  {abscissa: "202104", value: 398.6,name: "万元薪酬净利润"},
  {abscissa: "202106", value: 397.6, name: "万元薪酬净利润"},
  {abscissa: "202107" , name: "万元薪酬净利润"},
  {abscissa: "202108", name: "万元薪酬净利润"},
  {abscissa: "202109", name: "万元薪酬净利润"},
  {abscissa: "202110", name: "万元薪酬净利润"},
  {abscissa: "202111", name: "万元薪酬净利润"},
  {abscissa: "202101", name: "同期万元薪酬净利润"},
  {abscissa: "202102", name: "同期万元薪酬净利润"},
  {abscissa: "202103", name: "同期万元薪酬净利润"},
  {abscissa: "202104", name: "同期万元薪酬净利润"},
  {abscissa: "202105", name: "同期万元薪酬净利润"},
  {abscissa: "202106", name: "同期万元薪酬净利润"},
  {abscissa: "202107", name: "同期万元薪酬净利润"},
  {abscissa: "202108", name: "同期万元薪酬净利润"},
  {abscissa: "202109", name: "同期万元薪酬净利润"},
  {abscissa: "202110", name: "同期万元薪酬净利润"},
  {abscissa: "202111", name: "同期万元薪酬净利润"}
];

const mixData = [
  {abscissa: "202101", name: "万元薪酬净利润"},
  {abscissa: "202102", name: "万元薪酬净利润"},
  {abscissa: "202103", name: "万元薪酬净利润"},
  {abscissa: "202104", value: 398.6,name: "万元薪酬净利润"},
  {abscissa: "202106", value: -200.6, name: "万元薪酬净利润"},
  {abscissa: "202107" , name: "万元薪酬净利润"},
  {abscissa: "202108", name: "万元薪酬净利润"},
  {abscissa: "202109", name: "万元薪酬净利润"},
  {abscissa: "202110", name: "万元薪酬净利润"},
  {abscissa: "202111", name: "万元薪酬净利润"},
  {abscissa: "202101", name: "同期万元薪酬净利润"},
  {abscissa: "202102", name: "同期万元薪酬净利润"},
  {abscissa: "202103", name: "同期万元薪酬净利润"},
  {abscissa: "202104", name: "同期万元薪酬净利润"},
  {abscissa: "202105", name: "同期万元薪酬净利润"},
  {abscissa: "202106", name: "同期万元薪酬净利润"},
  {abscissa: "202107", name: "同期万元薪酬净利润"},
  {abscissa: "202108", name: "同期万元薪酬净利润"},
  {abscissa: "202109", name: "同期万元薪酬净利润"},
  {abscissa: "202110", name: "同期万元薪酬净利润"},
  {abscissa: "202111", name: "同期万元薪酬净利润"}
];



describe('G2Plot #2968', () => {
  it('point negative', () => {
    const negativeChart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });
  
    negativeChart.data(nagativeData);
  
    negativeChart.line().position('abscissa*value').color('name');
  
    negativeChart.option('slider', {
      trendCfg: {
        isArea: true
      }
    });
  
    negativeChart.render();
    expect(negativeChart.getController('slider').getComponents()[0].component.getBBox().height).toBe(25);
  });
  it('point positive', () => {
    const positiveChart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });
  
    positiveChart.data(positiveData);
  
    positiveChart.line().position('abscissa*value').color('name');
  
    positiveChart.option('slider', {
      trendCfg: {
        isArea: true
      }
    })
  
    positiveChart.render();
    expect(positiveChart.getController('slider').getComponents()[0].component.getBBox().height).toBe(25);
  });
  it('point mix', () => {
    const mixChart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });
  
    mixChart.data(mixData);
  
    mixChart.line().position('abscissa*value').color('name');
  
    mixChart.option('slider', {
      trendCfg: {
        isArea: true
      }
    })
  
    mixChart.render();
    expect(mixChart.getController('slider').getComponents()[0].component.getBBox().height).toBe(25);
  });
});
