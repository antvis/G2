import { G2Spec } from '../../../src';

export function alphaBeeswarmTranspose(): G2Spec {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const data = Array.from({ length: 400 }, (_, i) => {
    return {
      x: `G${(i % 6) + 1}`,
      y: 60 + seededRandom(i * 2) * 570,
      radius: seededRandom(i * 2 + 1),
    };
  });

  return {
    type: 'beeswarm',
    data,
    encode: {
      x: 'x',
      y: 'y',
      size: 4,
      color: 'x',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
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

alphaBeeswarmTranspose.skip = true;
