import { G2Spec } from '../../../src';

export function alphabetIntervalColumnWidthRatio(): G2Spec {
  return {
    type: 'view',
    autoFit: true,
    children: [
      {
        type: 'interval',
        data: [
          { year: '1951 年', sales: 38 },
          { year: '1952 年', sales: 52 },
          { year: '1956 年', sales: 61 },
          { year: '1957 年', sales: 145 },
          { year: '1958 年', sales: 48 },
          { year: '1959 年', sales: 38 },
          { year: '1960 年', sales: 38 },
          { year: '1962 年', sales: 38 },
        ],
        encode: { x: 'year', y: 'sales' },
        style: { columnWidthRatio: 0.2 },
        coordinate: { transform: [{ type: 'transpose' }] },
      },
    ],
  };
}
