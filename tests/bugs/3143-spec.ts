import { registerTheme, getTheme } from '../../src';

describe('#3143', () => {
  it('default', () => {
    registerTheme('newTheme', {
      defaultColor: 'red',
    });
    const theme = getTheme('newTheme');
    expect(theme.geometries.line.dot.default.style.lineCap).toBe(null);
    expect(theme.geometries.line.dot.default.style.lineDash).toEqual([1, 1]);
  });

  it('modify', () => {
    registerTheme('newTheme', {
      defaultColor: 'red',
      geometries: {
        line: {
          dot: {
            default: {
              style: {
                lineCap: 'round',
                lineDash: [1, 2],
              },
            },
          },
        },
      },
    });
    const theme = getTheme('newTheme');
    expect(theme.geometries.line.dot.default.style.lineCap).toBe('round');
    expect(theme.geometries.line.dot.default.style.lineDash).toEqual([1, 2]);
  });
});
