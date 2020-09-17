import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';
import { delay } from '../../../util/delay';
import { removeDom } from '../../../../src/util/dom';
import { SliderCfg } from '../../../../src/interface';

const Data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

describe('Slider', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    height: 500,
    width: 600,
    autoFit: false,
    padding: 'auto',
    appendPadding: [8, 8, 8, 8],
  });

  chart.data(Data);

  chart.scale('value', {
    nice: true,
  });

  chart.legend('name', {
    position: 'top',
  });

  chart.option('slider', {
    height: 24,
    trendCfg: {
      isArea: false,
    },
    start: 0.3,
    end: 0.7,
  });

  chart.interval().position('year*value');
  chart.render();
  const { coordinateBBox } = chart;

  it('initial state', async () => {
    await delay(1);
    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    const { component: sliderComponent } = slider;
    expect(sliderComponent.get('height')).toBe(24);
    expect(sliderComponent.get('width')).toBe(coordinateBBox.width);
    // @ts-ignore
    expect(sliderComponent.minHandler.get('x')).toBe(0.3 * coordinateBBox.width - 5);
    // @ts-ignore
    expect(sliderComponent.maxHandler.get('x')).toBe(0.7 * coordinateBBox.width - 5);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(4);
  });

  it('padding', async () => {
    chart.option('slider', {
      padding: [20, 20, 20, 0],
      height: 24,
      trendCfg: {
        isArea: false,
      },
      start: 0.3,
      end: 0.7,
    });
    chart.render();
    await delay(1);
    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    expect(slider.component.getBBox().maxY <= chart.height - 19).toBe(true); // padding bottom = 20px
  });

  it('slider cfg', () => {
    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    expect(slider.component.get('height')).toBe(24);
    expect(slider.component.get('trendCfg').isArea).toBe(false);

    expect(slider.component.get('start')).toBe(0.3);
    expect(slider.component.get('end')).toBe(0.7);
  });

  it('slider filter', async () => {
    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    expect(slider.component.get('minText')).toBe('1993');
    expect(slider.component.get('maxText')).toBe('1996');

    // view 过滤规则
    expect(chart.filterFieldData('year', Data).map((d) => d.year)).toEqual(['1993', '1994', '1995', '1996']);
  });

  it('slider update', async () => {
    chart.option('slider', {
      padding: [8, 0, 8, 0],
      height: 16,
      start: 0.4,
      end: 0.8,
    });

    chart.render();

    await delay(1);

    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    const others = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);

    expect(slider.component.get('start')).toBe(0.4);
    expect(slider.component.get('end')).toBe(0.8);
    expect(slider.component.get('minText')).toBe('1994');
    expect(slider.component.get('maxText')).toBe('1997');

    expect(others.length).toBe(1);

    // 保持引用
    expect(others[0].component).toBe(slider.component);

    expect(slider.component.get('height')).toBe(16);
  });

  it('changeData', () => {
    chart.changeData(Data.slice(0, 3));
    chart.render(true);

    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    expect(slider.component.get('minText')).toBe('1991');
    expect(slider.component.get('maxText')).toBe('1992');
  });

  it('changeSize', async () => {
    await delay(1);
    chart.changeSize(500, 500);
    await delay(1);
    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    expect(slider).toBeDefined();
  });

  it('formatter', () => {
    chart.option('slider', {
      formatter: ((v, datum, idx) => `${v}-${datum.value}-${idx}`) as SliderCfg['formatter'],
    });
    chart.changeData(Data.slice(0, 3));
    chart.render(true);

    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    expect(slider.component.get('minText')).toBe(`1991-3-0`);
    expect(slider.component.get('maxText')).toBe(`1993-3.5-2`);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
