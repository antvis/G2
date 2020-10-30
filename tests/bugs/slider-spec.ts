import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('When data is empty, slider will throw error', () => {
  it('slider', () => {
    const chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 400,
      height: 400,
      options: {
        animate: false,
        data: [],
        scales: {
          销售额: {
            nice: true
          }
        },
        slider: {
          start: 0.5,
          end: 0.55
        },
        geometries: [
          {
            type: 'area',
            position: {
              fields: ['城市', '销售额']
            },
            shape: {
              values: [ 'smooth' ]
            }
          },
        ]
      }
    });

    chart.render();

    // @ts-ignore
    expect(chart.getController('slider').slider).toBeUndefined();

    // 更新数据
    chart.updateOptions({
      data: [
        { "城市": "七台河", "销售额": 52827.32 },
        { "城市": "万县", "销售额": 16921.576 },
        { "城市": "三亚", "销售额": 22698.396 },
        { "城市": "三岔子", "销售额": 3262.98 },
        { "城市": "三明", "销售额": 1458.8 },
        { "城市": "上梅", "销售额": 11704.476 },
        { "城市": "上海", "销售额": 582450.5679999999 },
        { "城市": "上虞", "销售额": 10672.872 },
        { "城市": "东丰", "销售额": 1785.84 },
        { "城市": "东台", "销售额": 2789.892 },
        { "城市": "东宁", "销售额": 2706.2 },
        { "城市": "东村", "销售额": 13692.14 },
        { "城市": "东海", "销售额": 4508.28 },
        { "城市": "东胜", "销售额": 12766.068 },
        { "城市": "东莞", "销售额": 10165.89 },
        { "城市": "东营", "销售额": 17153.92 },
        { "城市": "中枢", "销售额": 1050.42 },
        { "城市": "丰县", "销售额": 10309.516 },
        { "城市": "丰润", "销售额": 82.04 },
        { "城市": "丰镇", "销售额": 3507.336 },
        { "城市": "临朐", "销售额": 833.7 },
        { "城市": "临水", "销售额": 21443.1 },
        { "城市": "临江", "销售额": 36496.74 },
        { "城市": "临汾", "销售额": 26205.48 },
        { "城市": "临沂", "销售额": 97200.74 },
        { "城市": "临海", "销售额": 7071.456 },
      ]
    });
    chart.render(true);
    // @ts-ignore
    const slider = chart.getController('slider').slider;
    expect(slider).toBeDefined();
    expect(slider.component.get('minText')).toBe('东海');
    expect(slider.component.get('maxText')).toBe('东胜');

    // 数据再为空时，slider 销毁
    chart.updateOptions({
      data: [],
    });
    chart.render(true);

    // @ts-ignore
    expect(chart.getController('slider').slider).toBeUndefined();
  })
});
