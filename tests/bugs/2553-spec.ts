import { Chart } from '../../src/';
import { createDiv } from '../util/dom';
import { isEqual } from '@antv/util';
import { COMPONENT_TYPE } from '../../src/constant';

describe('2505', () => {
  const data = [
    { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
    { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
    { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
    { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
    { name: "London", 月份: "May", 月均降雨量: 47 },
    { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
    { name: "London", 月份: "Jul.", 月均降雨量: 24 },
    { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
    { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
    { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
    { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
    { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
    { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
    { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
    { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
    { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 }
  ];

  const chart = new Chart({
    container: createDiv(),
    autoFit: true,
    height: 500
  });

  chart.data(data);
  chart.scale("月均降雨量", {
    nice: true
  });
  chart.tooltip({
    shared: true,
    showMarkers: false
  });

  chart.option("slider", {
    start: 0,
    end: 1,
    trendCfg: {
      isArea: false
    }
  });

  chart
    .interval()
    .position("月份*月均降雨量")
    .color("name")
    .adjust("stack");

  chart.interaction("active-region");

  chart.render();

  it('change slider should filter all same xScale data', () => {
    chart.option("slider", {
      start: 0.5,
      end: 1,
      trendCfg: {
        isArea: false
      }
    });
    chart.render(true);
    setTimeout(() => {
      expect(chart.geometries[0].data.length).toBe(8);
    }, 1000);
  })
});
