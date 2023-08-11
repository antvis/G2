import { plotlib } from '../../../src/lib';
import {
  Sankey,
  Treemap,
  Pack,
  Boxplot,
  WordCloud,
  Gauge,
} from '../../../src/mark';
import { Venn, Cluster, Arc } from '../../../src/data';

describe('plotlib', () => {
  it('plotlib() should returns expected plot components.', () => {
    expect(plotlib()).toEqual({
      'data.venn': Venn,
      'data.cluster': Cluster,
      'data.arc': Arc,
      'mark.sankey': Sankey,
      'mark.treemap': Treemap,
      'mark.pack': Pack,
      'mark.boxplot': Boxplot,
      'mark.wordCloud': WordCloud,
      'mark.gauge': Gauge,
    });
  });
});
