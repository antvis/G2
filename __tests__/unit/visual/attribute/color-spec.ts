import { ScaleDef } from '../../../../src/visual/scale';
import { Color } from '../../../../src/visual/attribute/color';

describe('color attribute', () => {
  test('test for category scale', () => {
    const scaleCat = new ScaleDef({
      type: 'cat',
      domain: ['a', 'b', 'c', 'd'],
    });

    const colorAttr = new Color({
      value: ['#409eff', '#6340ff', '#c1d5e8'],
      scales: [scaleCat],
    });

    expect(colorAttr.mapping('a')).toStrictEqual(['#409eff']);
    expect(colorAttr.mapping('b')).toStrictEqual(['#6340ff']);
    expect(colorAttr.mapping('c')).toStrictEqual(['#c1d5e8']);
  });

  test('test for linear mapping', () => {
    const scaleLinear = new ScaleDef({
      type: 'linear',
      domain: [0, 10],
    });

    const colorAttr = new Color({
      scales: [scaleLinear],
      value: ['#000000', '#0000ff', '#00ff00', '#ff0000', '#ffffff'],
    });

    expect(colorAttr.mapping(0)).toStrictEqual(['#000000']);
    expect(colorAttr.mapping(2.5)).toStrictEqual(['#0000ff']);
    expect(colorAttr.mapping(5)).toStrictEqual(['#00ff00']);
    expect(colorAttr.mapping(10)).toStrictEqual(['#ffffff']);
    expect(colorAttr.mapping(4)).toStrictEqual(['#009966']);
  });

  test('test for single color string', () => {
    const scaleCat = new ScaleDef({
      type: 'cat',
      domain: ['a', 'b', 'c', 'd'],
    });

    const colorAttr = new Color({
      scales: [scaleCat],
      value: 'red',
    });
    expect(colorAttr.mapping('a')).toStrictEqual(['#ff0000']);
    expect(colorAttr.mapping('b')).toStrictEqual(['#ff0000']);
  });

  test('test for color like #xxxxxx-#xxxxxx', () => {
    const scaleCat = new ScaleDef({
      type: 'cat',
      domain: ['a', 'b', 'c', 'd'],
    });

    const scaleLinear = new ScaleDef({
      type: 'linear',
      domain: [0, 10],
    });

    const colorAttr = new Color({
      scales: [scaleCat, scaleLinear],
      value: '#000000-#0000ff',
    });

    // 0%
    expect(colorAttr.mapping('a', 0)).toStrictEqual(['#000000', '#000000']);
    // 33%
    expect(colorAttr.mapping('b', 3.3333)).toStrictEqual(['#000055', '#000055']);
    // 66%
    expect(colorAttr.mapping('c', 6.6666)).toStrictEqual(['#0000aa', '#0000aa']);
    // 100%
    expect(colorAttr.mapping('d', 10)).toStrictEqual(['#0000ff', '#0000ff']);
  });

  test('invalid value', () => {
    const scaleCat = new ScaleDef({
      type: 'cat',
      domain: ['a', 'b', 'c', 'd'],
    });

    const colorAttr = new Color({
      scales: [scaleCat],
      value: 6,
    });

    expect(colorAttr.mapping('a')).toStrictEqual([6]);
  });
});
