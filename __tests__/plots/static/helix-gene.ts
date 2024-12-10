import { gene } from '../../data/gene';

export function helixGene() {
  return {
    type: 'interval',
    autoFit: true,
    height: 600,
    padding: [50, 50, 50, 50],
    data: gene,
    encode: { x: 'time', y: 'group', color: 'logFPKM' },
    scale: { color: { type: 'linear', range: ['#fff', '#ec4839'] } },
    coordinate: {
      type: 'helix',
      startAngle: 0.2 * Math.PI,
      endAngle: 6.5 * Math.PI,
      innerRadius: 0.1,
    },
    animate: { enter: { type: 'fadeIn', duration: 1000 } },
    tooltip: {
      title: 'time',
      items: [
        { field: 'group', name: '组别' },
        {
          field: 'logFPKM',
          name: 'log(FPKM)',
          valueFormatter: (value) => value.toFixed(2),
        },
      ],
    },
  };
}
