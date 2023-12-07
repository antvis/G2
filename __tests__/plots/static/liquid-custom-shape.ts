import { G2Spec } from '../../../src';

export function liquidCustomShape(): G2Spec {
  return {
    type: 'liquid',
    autoFit: true,
    data: 0.3,
    style: {
      shape: (x, y, r) => {
        const path = [] as any;
        const w = r * 2;
        for (let i = 0; i < 5; i++) {
          path.push([
            i === 0 ? 'M' : 'L',
            (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
            (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
          ]);
          path.push([
            'L',
            (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
            (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
          ]);
        }
        path.push(['Z']);
        return path;
      },
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
}

liquidCustomShape.skip = true;
