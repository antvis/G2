import { Chart } from '../../../src/';
import { createDiv } from '../../util/dom';

const IMAGE = 'https://img.alicdn.com/tfs/TB1M.wKkND1gK0jSZFyXXciOVXa-120-120.png';

export const DATA = [
  { city: '杭州', sale: 100 },
  { city: '广州', sale: 30 },
  { city: '上海', sale: 110 },
  { city: '呼和浩特', sale: 40 },
];

describe('annotation', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 10,
    autoFit: false,
  });

  chart.data(DATA);

  chart.interval().position('city*sale');

  it('image', () => {
    chart.annotation().image({
      start: { city: '广州', sale: 30 },
      end: { city: '广州', sale: 30 },
      src: IMAGE,
      offsetX: -12,
      style: {
        width: 24,
        height: 24,
      },
    });

    chart.render();

    const image = chart.annotationController.getComponents()[0].component;

    expect(image.get('src')).toBe(IMAGE);
    expect(image.get('offsetX')).toBe(-12);
    expect(image.get('style').width).toBe(24);
  });

  it('line', () => {
    chart.annotation().line({
      start: { city: '上海', sale: 110 },
      end: { city: '呼和浩特', sale: 40 },
      style: {
        stroke: 'green',
      },
    });

    chart.render();

    const line = chart.annotationController.getComponents()[1].component;

    // theme
    expect(line.get('style').lineDash).toEqual([2, 2]);
    // pos
    expect(line.get('start').x).toBeCloseTo(510, 0.5);
    expect(line.get('start').y).toBeCloseTo(54.5, 0.5);

    expect(line.get('end').x).toBeCloseTo(696.6, 0.5);
    expect(line.get('end').y).toBeCloseTo(366.3, 0.5);
    // style
    expect(line.get('style').stroke).toBe('green');
  });

  it('region', () => {
    chart.annotation().region({
      start: { city: '上海', sale: 0 },
      end: { city: '呼和浩特', sale: 120 },
      style: {
        fill: 'grey',
      },
    });

    chart.render();

    const region = chart.annotationController.getComponents()[2].component;

    // theme
    expect(region.get('style').fillOpacity).toBe(0.04);
    // pos
    expect(region.get('start').x).toBeCloseTo(510, 0.5);
    expect(region.get('start').y).toBeCloseTo(544.5, 0.5);

    expect(region.get('end').x).toBeCloseTo(696.6, 0.5);
    expect(region.get('end').y).toBeCloseTo(10, 0.5);
    expect(region.get('style').fill).toBe('grey');
  });

  it('text', () => {
    chart.annotation().text({
      position: { city: '杭州', sale: 100 },
      content: '杭州的数据' + 100,
      style: {
        fill: 'red',
        textBaseline: 'bottom',
        textAlign: 'center',
      },
    });

    chart.render();

    const text = chart.annotationController.getComponents()[3].component;
    // theme
    // @ts-ignore
    expect(text.get('style').fontFamily).toEqual(chart.getTheme().fontFamily);
    // pos
    expect(text.get('x')).toBeCloseTo(136.4, 0.5);
    expect(text.get('y')).toBeCloseTo(99, 0.5);
    // style
    expect(text.get('style').fill).toBe('red');
  });
});
