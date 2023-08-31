import {
  Sankey,
  Treemap,
  Pack,
  Boxplot,
  WordCloud,
  Gauge,
  Liquid,
} from '../mark';
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
    'mark.liquid': Liquid,
  } as const;
}
