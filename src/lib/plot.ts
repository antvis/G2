import { Boxplot, WordCloud, Gauge, Liquid } from '../mark';
import { Venn } from '../data';

export function plotlib() {
  return {
    'data.venn': Venn,
    'mark.boxplot': Boxplot,
    'mark.gauge': Gauge,
    'mark.wordCloud': WordCloud,
    'mark.liquid': Liquid,
  } as const;
}
