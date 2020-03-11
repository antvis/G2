import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2146', () => {
  const data = [
    { type: '未知', value: 654, percent: 0.02 },
    { type: '17 岁以下', value: 654, percent: 0.02 },
    { type: '18-24 岁', value: 4400, percent: 0.2 },
    { type: '25-29 岁', value: 5300, percent: 0.24 },
    { type: '30-39 岁', value: 6200, percent: 0.28 },
    { type: '40-49 岁', value: 3300, percent: 0.14 },
    { type: '50 岁以上', value: 1500, percent: 0.06 },
  ];

  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
    padding: 40
  });
  chart.data(data);
  chart.legend({
    animate: true,
    animateOption: {
      appear: {
        delay: 1000,
        duration: 1000,
      },
    },
  });
  chart.axis('value', {
    grid: null,
    animateOption: {
      update: {
        delay: 1000,
        duration: 1000,
      },
    },
  });
  chart.axis('type', false);
  chart.interval().position('type*value').color('type');
  // 添加文本标注
  chart
    .annotation()
    .text({
      position: [data[0].type, data[0].value],
      content: data[0].value,
      style: {
        textAlign: 'center',
      },
      offsetY: -30,
      animateOption: {
        appear: {
          delay: 1000,
          duration: 1000,
        }
      }
    });
  chart.render();

  it('component animateOption', () => {
    // 保证所有 animateOption
    const components = chart.getComponents();
    expect(components.length).toBe(3);
    expect(components[0].component.get('animateOption')).toEqual({
      appear: null,
      update: { duration: 1000, easing: 'easeQuadInOut', delay: 1000 },
      enter: { duration: 400, easing: 'easeQuadInOut' },
      leave: { duration: 350, easing: 'easeQuadIn' },
    });
    expect(components[1].component.get('animateOption')).toEqual({
      appear: { duration: 1000, easing: 'easeQuadOut', delay: 1000 },
      update: { duration: 400, easing: 'easeQuadInOut' },
      enter: { duration: 400, easing: 'easeQuadInOut' },
      leave: { duration: 350, easing: 'easeQuadIn' },
    });
    expect(components[2].component.get('animateOption')).toEqual({
      appear: { duration: 1000, easing: 'easeQuadOut', delay: 1000 },
      update: { duration: 400, easing: 'easeQuadInOut' },
      enter: { duration: 400, easing: 'easeQuadInOut' },
      leave: { duration: 350, easing: 'easeQuadIn' },
    });
  });

  afterAll(() => {
    chart.destroy();
  });
});
