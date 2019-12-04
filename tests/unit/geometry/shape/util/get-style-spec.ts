import { getStyle } from '../../../../../src/geometry/shape/util/get-style';

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
        true
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
        true
      )
    ).toEqual({
      stroke: 'red',
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
          size: 10,
        },
        false,
        'r'
      )
    ).toEqual({
      fill: '#000',
      r: 10,
    });
  });
});
