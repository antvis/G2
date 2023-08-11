import { Sankey, Treemap, Pack, Boxplot, WordCloud, Gauge } from '../mark';
import { Arc, Cluster, Venn } from '../data';

export function plotlib() {
  return {
    'data.venn': Venn,
    'data.arc': Arc,
    'data.cluster': Cluster,
    'mark.sankey': Sankey,
    'mark.treemap': Treemap,
    'mark.boxplot': Boxplot,
    'mark.pack': Pack,
    'mark.gauge': Gauge,
    'mark.wordCloud': WordCloud,
  } as const;
}
