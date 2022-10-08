import { hierarchy, pack } from 'd3-hierarchy';
import { interpolateHcl } from 'd3-interpolate';
import { G2Spec } from '../../../src';

export function flarePointCirclePack(): G2Spec {
  const width = 800;
  const height = 800;
  const layout = (data) => {
    const root = hierarchy(data);
    root.count();
    // @ts-ignore
    pack().size([width, height]).padding(5)(root);
    return root.descendants();
  };
  return {
    type: 'point',
    width,
    height,
    padding: 0,
    data: {
      type: 'fetch',
      value: 'data/flare.json',
      transform: [{ type: 'custom', callback: layout }],
    },
    scale: {
      x: { domain: [0, width] },
      y: { domain: [0, height] },
      size: { type: 'identity' },
      color: {
        domain: [0, 5],
        range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
        interpolate: interpolateHcl,
      },
    },
    axis: false,
    legend: false,
    encode: {
      x: 'x',
      y: 'y',
      size: 'r',
      color: 'depth',
      shape: 'point',
    },
  };
}
