import { antvDark } from '../../../../src/theme/style-sheet/dark';
import { createThemeByStylesheet, createTheme } from '../../../../src/util/theme';

describe('createThemeByStylesheet', () => {
  it('get dark theme', () => {
    const theme = createThemeByStylesheet(antvDark);

    expect(theme.defaultColor).toBe('#5B8FF9');
    expect(theme.geometries).toBeDefined();
  });

  it('createTheme without stylesheet: defaultColor - interval 默认 fill 不生效', () => {
    const theme = createTheme({ defaultColor: 'red' });
    expect(theme.defaultColor).toBe('red');
    expect(theme.geometries.interval.rect.default.style.fill).not.toBe('red');
  });

  it('createTheme with stylesheet: brandColor', () => {
    const theme = createTheme({ styleSheet: { brandColor: 'red' } });
    expect(theme.defaultColor).toBe('red');
    expect(theme.geometries.interval.rect.default.style.fill).toBe('red');
  });
  it('createTheme with stylesheet: paletteQualitative', () => {
    const theme = createTheme({ styleSheet: { brandColor: 'red' } });
    expect(theme.defaultColor).toBe('red');
    expect(theme.geometries.interval.rect.default.style.fill).toBe('red');
  });
  it('createTheme with stylesheet: fontFamily', () => {});
  it('createTheme with stylesheet: defaultColor', () => {});
});
