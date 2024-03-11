import { G2Spec } from '../../../src';

export function flareElementPointMoveAreaNormalizeY(): G2Spec {
  return {
    type: 'area',
    width: 600,
    height: 400,
    data: [
      { year: '1991', value: 3, type: 'type1' },
      { year: '1992', value: 4, type: 'type1' },
      { year: '1993', value: 3.5, type: 'type1' },
      { year: '1994', value: 5, type: 'type1' },
      { year: '1995', value: 4.9, type: 'type1' },
      { year: '1996', value: 2, type: 'type1' },
      { year: '1997', value: 7, type: 'type1' },
      { year: '1998', value: 11, type: 'type1' },
      { year: '1999', value: 13, type: 'type1' },
      { year: '1991', value: 6, type: 'type2' },
      { year: '1992', value: 1, type: 'type2' },
      { year: '1993', value: 4, type: 'type2' },
      { year: '1994', value: 9, type: 'type2' },
      { year: '1995', value: 1.9, type: 'type2' },
      { year: '1996', value: 5, type: 'type2' },
      { year: '1997', value: 4, type: 'type2' },
      { year: '1998', value: 6, type: 'type2' },
      { year: '1999', value: 15, type: 'type2' },
      { year: '1991', value: 6, type: 'type3' },
      { year: '1992', value: 1, type: 'type3' },
      { year: '1993', value: 4, type: 'type3' },
      { year: '1994', value: 9, type: 'type3' },
      { year: '1995', value: 1.9, type: 'type3' },
      { year: '1996', value: 5, type: 'type3' },
      { year: '1997', value: 4, type: 'type3' },
      { year: '1998', value: 6, type: 'type3' },
      { year: '1999', value: 15, type: 'type3' },
    ],
    encode: { x: 'year', y: 'value', key: 'type', color: 'type' },
    transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
    interaction: {
      legendFilter: false,
      elementPointMove: { selection: [1, 4] },
    },
  };
}
