import { Token as G2Token } from '../../runtime';
import { ColorToken } from './color';
import { FontToken } from './font';
import { AnimateToken } from './animate';
import { StyleToken } from './style';
import { PaletteToken } from './palette';

export const getToken = (options: G2Token): G2Token => {
  const { font, color, palette, animate, style } = options;
  return {
    font: FontToken(font),
    color: ColorToken(color),
    animate: AnimateToken(animate),
    style: StyleToken(style),
    palette: PaletteToken(palette),
  };
};
