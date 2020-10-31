import { generateTheme } from './light';

const AUTUMN_QUALITATIVE_10 = [
  '#FF6B3B',
  '#626681',
  '#FFC100',
  '#9FB40F',
  '#76523B',
  '#DAD5B5',
  '#0E8E89',
  '#E19348',
  '#F383A2',
  '#247FEA',
];

const AUTUMN_QUALITATIVE_20 = [
  '#FF6B3B',
  '#626681',
  '#FFC100',
  '#9FB40F',
  '#76523B',
  '#DAD5B5',
  '#0E8E89',
  '#E19348',
  '#F383A2',
  '#247FEA',
  '#2BCB95',
  '#B1ABF4',
  '#1D42C2',
  '#1D9ED1',
  '#D64BC0',
  '#255634',
  '#8C8C47',
  '#8CDAE5',
  '#8E283B',
  '#791DC9',
];

export const autumnTheme = generateTheme(AUTUMN_QUALITATIVE_10, AUTUMN_QUALITATIVE_20);
