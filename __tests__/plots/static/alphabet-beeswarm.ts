import { G2Spec } from '../../../src';

export function alphabetBeeswarm(): G2Spec {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const data = Array.from({ length: 300 }, (_, i) => {
    return {
      x: `G${(i % 6) + 1}`,
      y: 40 + seededRandom(i * 2) * 220,
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

alphabetBeeswarm.skip = true;
