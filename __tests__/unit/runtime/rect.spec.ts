import { hierarchy, treemap } from 'd3-hierarchy';
import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('rect', () => {
  it.skip('render({...}) should render basic rect', () => {
    const width = 640;
    const height = 480;
    const padding = 3;

    const treeMapLayout = (data) => {
      const root = hierarchy(data);
      root.count();
      // @ts-ignore
      treemap().size([width, height]).padding(padding)(root);
      return root
        .descendants()
        .map((d) =>
          Object.assign(d, {
            x: [d.x0, d.x1],
            y: [d.y0, d.y1],
          }),
        )
        .filter((d) => d.height === 0);
    };

    const chart = render<G2Spec>({
      width: 640,
      height: 480,
      padding: 3,
      type: 'rect',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
        transform: [{ type: 'custom', callback: treeMapLayout }],
      },
      encode: {
        x: 'x',
        y: 'y',
        size: 'r',
        color: (d) => d.parent.data.name,
      },
    });
    mount(createDiv(), chart);
  });
});
