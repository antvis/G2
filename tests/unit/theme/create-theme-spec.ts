import { createTheme } from '../../../src/theme/util';

describe('createTheme', () => {
  it('set defaultColor: interval 默认 fill 不生效', () => {
    const theme = createTheme({ defaultColor: 'red' });
    expect(theme.defaultColor).toBe('red');
    expect(theme.geometries.interval.rect.default.style.fill).not.toBe('red');
  });

  it('set styleSheet brandColor: interval 默认 fill 生效', () => {
    const theme = createTheme({ styleSheet: { brandColor: 'red' } });
    expect(theme.defaultColor).toBe('red');
    expect(theme.geometries.interval.rect.default.style.fill).toBe('red');
  });

  it('set styleSheet paletteQualitative: brandColor 默认取分类色板第一个颜色 & interval-shape fill 生效', () => {
    const theme = createTheme({ styleSheet: { paletteQualitative10: ['yellow'] } });
    expect(theme.defaultColor).toBe('yellow');
    expect(theme.geometries.interval.rect.default.style.fill).toBe('yellow');
  });

  it('set styleSheet paletteQualitative & themeObject:  themeObject 优先级高于 styleSheet', () => {
    const theme = createTheme({
      styleSheet: { paletteQualitative10: ['yellow'] },
      geometries: { interval: { rect: { default: { style: { fill: 'red' } } } } },
    });
    expect(theme.defaultColor).toBe('yellow');
    expect(theme.geometries.interval.rect.default.style.fill).toBe('red');
    expect(theme.geometries.interval.line.default.style.stroke).toBe('yellow');
    expect(theme.geometries.interval.funnel.default.style.fill).toBe('yellow');
  });

  it('set styleSheet fontFamily: 作用于全局字体以及组件上', () => {
    const theme = createTheme({ styleSheet: { fontFamily: 'roboto-regular' } });
    expect(theme.fontFamily).toBe('roboto-regular');
    /** 组件 */
    // 图例
    expect(theme.components.legend.common.itemName.style.fontFamily).toBe('roboto-regular');
    expect(theme.components.legend.left.layout).toBe('vertical');
    expect(theme.components.legend.right.layout).toBe('vertical');
    expect(theme.components.legend.bottom.layout).toBe('horizontal');
    // annotation 文本标注
    expect(theme.components.annotation.text.style.fontFamily).toBe('roboto-regular');
    // annotation dataMarker标注
    // expect(theme.components.annotation.dataMarker.text.style.fontFamily).toBe('roboto-regular');
    // expect(theme.components.annotation.dataRegion.text.style.fontFamily).toBe('roboto-regular');
    /** 标签 */
    expect(theme.labels.style.fontFamily).toBe('roboto-regular');
    expect(theme.innerLabels.style.fontFamily).toBe('roboto-regular');
  });

  it('styleSheet legendPadding', () => {
    let theme = createTheme({});
    expect(theme.components.legend.top.padding).toEqual([8, 0, 8, 0]);
    expect(theme.components.legend.bottom.padding).toEqual([8, 0, 8, 0]);
    expect(theme.components.legend.left.padding).toEqual([0, 8, 0, 8]);
    expect(theme.components.legend.right.padding).toEqual([0, 8, 0, 8]);
    expect(theme.components.legend.continuous.padding).toEqual([8, 8, 8, 8]);
  });
});
