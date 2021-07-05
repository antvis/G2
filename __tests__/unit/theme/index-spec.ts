import { getTheme, registerTheme, LIGHT, DARK, createThemeByStylesheet } from '../../../src';

describe('theme', () => {
  it('build-in theme', () => {
    expect(LIGHT).toBeDefined();
    expect(DARK).toBeDefined();
  });

  it('getTheme', () => {
    expect(getTheme('LIGHT')).toBe(LIGHT);
    expect(getTheme('dark')).toBe(DARK);
  });

  it('registerTheme', () => {
    const theme = { a: 1 };
    registerTheme('custom-theme', theme);

    expect(getTheme('custom-theme')).toBe(theme);
  });

  it('createThemeByStylesheet', () => {
    expect(createThemeByStylesheet).toBeDefined();
  });
});
