import {
  Theme as ThemeOptions,
  ThemeComponent,
} from '../runtime/types/component';

export type Theme =
  | ClassicTheme
  | ClassicDarkTheme
  | LightTheme
  | DarkTheme
  | AcademyTheme
  | CustomTheme;

export type ThemeTypes =
  | 'classic'
  | 'classicDark'
  | 'light'
  | 'dark'
  | 'academy'
  | ThemeComponent;

export type ClassicTheme = {
  type?: 'classic';
} & ThemeOptions;

export type ClassicDarkTheme = {
  type?: 'classicDark';
} & ThemeOptions;

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
