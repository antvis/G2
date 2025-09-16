import { G2Spec } from '../../../src';

export function alphabetSwarm(): G2Spec {
  const data = Array.from({ length: 300 }, (_, i) => {
    return {
      x: `G${(i % 6) + 1}`,
      y: 40 + Math.random() * 220,
      radius: Math.random(),
    };
  });

  return {
    type: 'swarm',
    data,
    encode: {
      x: 'x',
      y: 'y',
      size: 'radius',
      color: 'x',
    },
    scale: {
      y: {
        nice: true,
        domainMin: 0,
      },
      size: { range: [3, 6] },
    },
    legend: {
      size: false,
    },
    axis: {
      x: { title: false },
      y: { title: false },
    },
  };
}
