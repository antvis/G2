import { isContrastColorWhite } from '../../../src/util/color';

describe('color', () => {
  it('isContrastColorWhite', () => {
    // hex
    expect(isContrastColorWhite('#000000')).toBe(true);
    expect(isContrastColorWhite('#000')).toBe(true);
    expect(isContrastColorWhite('#ffffff')).toBe(false);
    expect(isContrastColorWhite('#fff')).toBe(false);
    expect(isContrastColorWhite('#232323')).toBe(true);
    expect(isContrastColorWhite('#cecece')).toBe(false);

    // rgb
    expect(isContrastColorWhite('rgb(0,0,0)')).toBe(true);
    expect(isContrastColorWhite('rgba(0,0,0,0.5)')).toBe(true);
    expect(isContrastColorWhite('rgb(255,255,255')).toBe(false);
    expect(isContrastColorWhite('rgba(255,255,255,0.5')).toBe(false);
    expect(isContrastColorWhite('rgb(35,35,35)')).toBe(true);
    expect(isContrastColorWhite('rgb(206,206,206)')).toBe(false);

    // css color names
    expect(isContrastColorWhite('black')).toBe(true);
    expect(isContrastColorWhite('white')).toBe(false);
    expect(isContrastColorWhite('red')).toBe(true);
    expect(isContrastColorWhite('yellow')).toBe(false);
    expect(isContrastColorWhite('green')).toBe(true);
    expect(isContrastColorWhite('lightGreen')).toBe(false);
    expect(isContrastColorWhite('darkGreen')).toBe(true);
  });
});
