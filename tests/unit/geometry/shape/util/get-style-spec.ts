import { getStyle, getBackgroundRectStyle } from '../../../../../src/geometry/shape/util/get-style';

describe('getStyle()', () => {
  it('getStyle()', () => {
    expect(
      getStyle(
        {
          x: 100,
          y: 100,
          color: '#000',
          style: {
            fill: 'red',
          },
        },
        true,
        false
      )
    ).toEqual({
      stroke: '#000',
      fill: 'red',
    });

    expect(
      getStyle(
        {
          x: 100,
          y: 100,
          color: '#000',
          style: {
            stroke: 'red',
          },
        },
        true,
        true
      )
    ).toEqual({
      stroke: 'red',
      fill: '#000',
    });

    expect(
      getStyle(
        {
          x: 100,
          y: 100,
          color: '#000',
          size: 4,
          style: {
            stroke: 'red',
            lineWidth: 3,
          },
        },
        true,
        false,
        'lineWidth'
      )
    ).toEqual({
      stroke: 'red',
      lineWidth: 3,
    });

    expect(
      getStyle(
        {
          x: 100,
          y: 100,
          color: '#000',
          size: 4,
          style: {
            stroke: 'red',
          },
        },
        true,
        false,
        'lineWidth'
      )
    ).toEqual({
      stroke: 'red',
      lineWidth: 4,
    });

    expect(
      getStyle(
        {
          x: 100,
          y: 100,
          color: '#000',
          style: {
            fill: 'red',
            lineWidth: 3,
          },
        },
        false,
        true,
        'lineWidth'
      )
    ).toEqual({
      fill: 'red',
      lineWidth: 3,
    });

    expect(
      getStyle(
        {
          x: 100,
          y: 100,
          color: '#000',
          size: 0,
        },
        false,
        true,
        'r'
      )
    ).toEqual({
      fill: '#000',
      r: 0,
    });
  });

  it('获取 shape 的矩形背景样式: getBackgroundRectStyle', () => {
    // 默认填充色不为空
    expect(getBackgroundRectStyle().fill).toBeDefined();
    expect(
      getBackgroundRectStyle({
        x: 0,
        y: 0,
        background: { style: { fill: 'red', stroke: 'green' } },
      })
    ).toMatchObject({ fill: 'red', stroke: 'green' });
  });
});
