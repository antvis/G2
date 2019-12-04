import 'jest-extended';
import { Chart } from '../../../src/';
import { createDiv, removeDom } from '../../util/dom';

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
  // chart.tooltip(false);
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
    expect(line.get('start').x).toBeWithin(508, 512);
    expect(line.get('start').y).toBeWithin(53, 56);

    expect(line.get('end').x).toBeWithin(697, 698);
    expect(line.get('end').y).toBeWithin(364, 368);
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
    expect(region.get('start').x).toBeWithin(508, 512);
    expect(region.get('start').y).toBeWithin(542, 546);

    expect(region.get('end').x).toBeWithin(694, 698);
    expect(region.get('end').y).toBeWithin(8, 12);
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
    expect(text.get('x')).toBeWithin(138, 143);
    expect(text.get('y')).toBeWithin(97, 101);
    // style
    expect(text.get('style').fill).toBe('red');
  });

  it('use percentage position', () => {
    chart.annotation().text({
      position: ['50%', '50%'],
      content: '坐标系中心点',
      style: {
        fill: 'red',
        textBaseline: 'bottom',
        textAlign: 'center',
      },
    });

    chart.render();

    const text = chart.annotationController.getComponents()[4].component;
    const coordinateCenter = chart.getCoordinate().getCenter();
    // pos
    expect(text.get('x')).toBe(coordinateCenter.x);
    expect(text.get('y')).toBe(coordinateCenter.y);
  });

  it('use array', () => {
    chart.annotation().text({
      position: ['杭州', 100],
      content: '杭州杭州',
      style: {
        fill: 'red',
        textBaseline: 'bottom',
        textAlign: 'center',
      },
    });

    chart.render();

    const text = chart.annotationController.getComponents()[5].component;
    const coordinateCenter = chart.getCoordinate().getCenter();
    // // pos
    expect(text.get('x')).toBeWithin(138, 142);
    expect(text.get('y')).toBeWithin(97, 101);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
