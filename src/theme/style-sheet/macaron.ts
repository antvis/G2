import { generateTheme } from './light';

const MACARON_QUALITATIVE_10 = [
  '#025DF4',
  '#DB6BCF',
  '#2498D1',
  '#BBBDE6',
  '#4045B2',
  '#21A97A',
  '#FF745A',
  '#007E99',
  '#FFA8A8',
  '#2391FF',
];

const MACARON_QUALITATIVE_20 = [
  '#025DF4',
  '#DB6BCF',
  '#2498D1',
  '#BBBDE6',
  '#4045B2',
  '#21A97A',
  '#FF745A',
  '#007E99',
  '#FFA8A8',
  '#2391FF',
  '#FFC328',
  '#A0DC2C',
  '#946DFF',
  '#626681',
  '#EB4185',
  '#CD8150',
  '#36BCCB',
  '#327039',
  '#803488',
  '#83BC99',
];

export const macaronTheme = generateTheme(MACARON_QUALITATIVE_10, MACARON_QUALITATIVE_20);
