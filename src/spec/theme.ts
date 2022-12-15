import {
  Theme as ThemeOptions,
  ThemeComponent,
} from '../runtime/types/component';

export type Theme = LightTheme | DarkTheme | AcademyTheme | CustomTheme;

export type ThemeTypes = 'light' | 'dark' | 'academy' | ThemeComponent;

export type LightTheme = {
  type?: 'light';
} & ThemeOptions;

export type DarkTheme = {
  type?: 'dark';
} & ThemeOptions;

export type AcademyTheme = {
  type?: 'academy';
} & ThemeOptions;

export type CustomTheme = {
  type?: ThemeComponent;
} & ThemeOptions;
