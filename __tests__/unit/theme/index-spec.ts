import { getTheme, registerTheme, LIGHT_STYLESHEET, DARK_STYLESHEET } from '../../../src';

describe('theme', () => {
  it('build-in theme styleSheet', () => {
    expect(LIGHT_STYLESHEET).toBeDefined();
    expect(DARK_STYLESHEET).toBeDefined();
  });

  it('getTheme', () => {
    expect(getTheme('LIGHT')).toBe(LIGHT_STYLESHEET);
    expect(getTheme('dark')).toBe(DARK_STYLESHEET);
  });

  it('registerTheme', () => {
    const theme = { name: 'custom', backgroundColor: '#121212', defaultColor: 'green' };
    registerTheme('custom-theme', theme);

    expect(getTheme('custom-theme')).toBe(theme);
  });
});
