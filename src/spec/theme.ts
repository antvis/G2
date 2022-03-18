import {
  Theme as ThemeOptions,
  ThemeComponent,
} from '../runtime/types/component';

export type Theme = LightTheme | DarkTheme;

export type ThemeTypes = 'light' | 'dark';

export type BaseTheme<T extends ThemeTypes> = {
  type?: T | ThemeComponent;
} & ThemeOptions;

export type LightTheme = BaseTheme<'light'>;

export type DarkTheme = BaseTheme<'dark'>;
