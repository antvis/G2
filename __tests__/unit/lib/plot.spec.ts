import { plotlib } from '../../../src/lib';
import { Boxplot, WordCloud, Gauge, Liquid } from '../../../src/mark';
import { Venn } from '../../../src/data';

describe('plotlib', () => {
  it('plotlib() should returns expected plot components.', () => {
    expect(plotlib()).toEqual({
      'data.venn': Venn,
      'mark.boxplot': Boxplot,
      'mark.wordCloud': WordCloud,
      'mark.gauge': Gauge,
      'mark.liquid': Liquid,
    });
  });
});
