import { COMPONENT_TYPE } from '../../src/constant';
import { Chart } from '../../src/index';
import { delay } from '../util/delay';
import { createDiv, removeDom } from '../util/dom';

const Data = [
  { year: 1999, value: 13 },
  { year: 1992, value: 4 },
  { year: 1993, value: 3.5 },
  { year: 1994, value: 5 },
  { year: 1995, value: 4.9 },
  { year: 1996, value: 6 },
  { year: 1997, value: 7 },
  { year: 1998, value: 9 },
  { year: 1991, value: 3 },
];

describe('Slider', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    height: 500,
    width: 600,
  });

  chart.data(Data);

  chart.option('slider', {});

  chart.interval().position('year*value');
  chart.render();

  it('xScale linear', async () => {
    await delay(1);
    const [slider] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SLIDER);
    const { component: sliderComponent } = slider;
    
    expect(sliderComponent.get('minText')).toBe(1991);
    expect(sliderComponent.get('maxText')).toBe(1999);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
