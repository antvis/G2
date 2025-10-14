import { G2Spec } from '../../../src';

export function alphaBeeswarmShape(): G2Spec {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const data = Array.from({ length: 400 }, (_, i) => {
    return {
      x: `G${(i % 6) + 1}`,
      y: 40 + seededRandom(i * 2) * 600,
      radius: seededRandom(i * 2 + 1),
    };
  });

  return {
    type: 'beeswarm',
    data,
    encode: {
      x: 'x',
      y: 'y',
      size: 'radius',
      color: 'x',
      shape: 'x',
    },
    scale: {
      y: {
        nice: true,
        domainMin: 0,
      },
      size: { range: [2, 5] },
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
