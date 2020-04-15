import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { simulateMouseEvent, getClientPoint} from '../util/simulate';
describe('#2307', () => {
  const data = [
    { year: '2014', type: 'Sales', sales: 1000 },
    { year: '2015', type: 'Sales', sales: 1170 },
    { year: '2016', type: 'Sales', sales: 660 },
    { year: '2017', type: 'Sales', sales: 1030 },
    { year: '2014', type: 'Expenses', sales: 400 },
    { year: '2015', type: 'Expenses', sales: 460 },
    { year: '2016', type: 'Expenses', sales: 1120 },
    { year: '2017', type: 'Expenses', sales: 540 },
    { year: '2014', type: 'Profit', sales: 300 },
    { year: '2015', type: 'Profit', sales: 300 },
    { year: '2016', type: 'Profit', sales: 300 },
    { year: '2017', type: 'Profit', sales: 350 },
  ];
  
  const chart = new Chart({
    container: createDiv(),
    width: 500,
    height: 400,
  });
  chart.animate(false);
  
  chart.data(data);
  chart.scale({
    sales: {
      max: 2400,
      tickInterval: 600,
      nice: true,
    },
  });
  
  chart.tooltip({
    showMarkers: false
  });
  
  const interval = chart
    .interval()
    .position('year*sales')
    .label('sales')
    .color('type')
    .adjust('stack');
  
  chart.interaction('element-highlight-by-color');
  
  chart.render();
  const canvas = chart.getCanvas();
  const el = canvas.get('el');
  const elements = interval.elements;
  it('element delegation error', () => {
    const point = getClientPoint(canvas, 70, 218);
    
    // 在画布上移动
    simulateMouseEvent(el, 'mousemove', {
      clientX: point.clientX - 10,
      clientY: point.clientY
    });
    // 移动进入第一个 interaval
    simulateMouseEvent(el, 'mousemove', point);
    expect(elements[0].hasState('active')).toBe(true);
    expect(elements[1].hasState('active')).toBe(true);
    expect(elements[4].hasState('inactive')).toBe(true);

    // 移入 第二个
    simulateMouseEvent(el, 'mousemove', {
      clientX: point.clientX,
      clientY: point.clientY + 40
    });

    expect(elements[0].hasState('inactive')).toBe(true);
    expect(elements[4].hasState('active')).toBe(true);
    // 离开
    simulateMouseEvent(el, 'mousemove', {
      clientX: point.clientX - 10,
      clientY: point.clientY
    });
    expect(elements[0].hasState('inactive')).toBe(false);
    expect(elements[4].hasState('active')).toBe(false);
  });
  it('label active', () => {
    const point = getClientPoint(canvas, 441, 63);
    // 移入一个文本
    simulateMouseEvent(el, 'mousemove', {
      clientX: point.clientX,
      clientY: point.clientY
    });
    expect(elements[0].hasState('active')).toBe(true);
    expect(elements[1].hasState('active')).toBe(true);
    expect(elements[4].hasState('inactive')).toBe(true);
    // 移出文本
    simulateMouseEvent(el, 'mousemove', {
      clientX: point.clientX,
      clientY: point.clientY - 20
    });
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(false);
    expect(elements[4].hasState('inactive')).toBe(false);
  });
});