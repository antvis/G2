import { stdlib } from '@antv/g2';
import { tokens as lightSeedTokens } from '../../../../src/theme/light';
import { tokens as darkSeedTokens } from '../../../../src/theme/dark';
import { tokens as academySeedTokens } from '../../../../src/theme/academy';

function normalizePalette(palette) {
  if (Array.isArray(palette)) return palette;
  const library = stdlib();
  const colors = library[`palette.${palette}`]();
  return colors;
}

export function getG2Tokens(theme: string | Record<string, any>) {
  if (typeof theme === 'object') return theme;
  const library = stdlib();
  const themeToken = library[`theme.${theme}`]();
  const { category10, category20 } = themeToken;
  return {
    ...themeToken,
    category10: normalizePalette(category10),
    category20: normalizePalette(category20),
  };
}

export function getG2SeedTokens(theme) {
  const map = {
    light: lightSeedTokens,
    dark: darkSeedTokens,
    academy: academySeedTokens,
  };
  return map[theme] || lightSeedTokens;
}
