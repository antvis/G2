import {
  Theme as ThemeOptions,
  ThemeComponent,
} from '../runtime/types/component';

export type Theme = LightTheme | DarkTheme | CustomTheme;

export type ThemeTypes = 'light' | 'dark' | ThemeComponent;

export type LightTheme = {
  type?: 'light';
} & ThemeOptions;

export type DarkTheme = {
  type?: 'dark';
} & ThemeOptions;

export type CustomTheme = {
  type?: ThemeComponent;
} & ThemeOptions;
