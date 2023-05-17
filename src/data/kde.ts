import pdf from 'pdfast';
import { group } from 'd3-array';
import { DataComponent as DC } from '../runtime';
import { KDEDataTransform } from '../spec';

export type KDEOptions = Omit<KDEDataTransform, 'type'>;

export function defined(d: any): boolean {
  return d !== undefined && d !== null && !Number.isNaN(d);
}

/**
 * Kernel Density Estimation base on [pdfast](https://www.npmjs.com/package/pdfast),
 * generating probability density function (pdf) using triangular kernel,
 * optimized to run in O(N + K).
 */
export const KDE: DC<KDEOptions> = (options) => {
  const {
    field,
    groupBy,
    as = ['y', 'size'],
    min,
    max,
    size = 10,
    width,
  } = options;
  const [yField, sizeField] = as;
  return (data) => {
    const gs = Array.from(
      group(data, (d) => groupBy.map((gb) => d[gb]).join('-')).values(),
    );
    return gs.map((g) => {
      const pdfResult = pdf.create(
        g.map((i) => i[field]),
        {
          min,
          max,
          size,
          width,
        },
      );
      const _y = pdfResult.map((result) => result.x);
      const _size = pdfResult.map((result) => result.y);
      return {
        ...(g[0] as Record<string, unknown>),
        [yField]: _y,
        [sizeField]: _size,
      };
    });
  };
};

KDE.props = {};
