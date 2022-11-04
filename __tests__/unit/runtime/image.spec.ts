import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('image', () => {
  it('render({...}) should render basic image', () => {
    const chart = render<G2Spec>({
      type: 'image',
      data: [
        {
          name: 'Internet Explorer',
          value: 26,
          url: 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
        },
        {
          name: 'Chrome',
          value: 40,
          url: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
        },
        {
          name: 'Firefox',
          value: 30,
          url: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
        },
        {
          name: 'Safari',
          value: 24,
          url: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
        },
        {
          name: 'Opera',
          value: 15,
          url: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
        },
        {
          name: 'Undetectable',
          value: 8,
          url: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
        },
      ],
      encode: {
        x: 'name',
        y: 'value',
        src: 'url',
      },
      scale: {
        x: { type: 'band' },
        y: { domain: [0, 50] },
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render image with size', () => {
    const chart = render<G2Spec>({
      type: 'image',
      data: [
        {
          x: 0,
          y: 0.241,
          type: 'x',
        },
        {
          x: 1,
          y: 0.367,
          type: 'x',
        },
        {
          x: 2,
          y: 0.036,
          type: 'x',
        },
        {
          x: 3,
          y: 0.112,
          type: 'o',
        },
        {
          x: 4,
          y: 0.382,
          type: 'x',
        },
        {
          x: 5,
          y: 0.594,
          type: 'o',
        },
        {
          x: 6,
          y: 0.516,
          type: 'o',
        },
        {
          x: 7,
          y: 0.634,
          type: 'x',
        },
        {
          x: 8,
          y: 0.612,
          type: 'x',
        },
        {
          x: 9,
          y: 0.271,
          type: 'o',
        },
        {
          x: 10,
          y: 0.241,
          type: 'o',
        },
        {
          x: 11,
          y: 0.955,
          type: 'o',
        },
        {
          x: 12,
          y: 0.336,
          type: 'x',
        },
        {
          x: 13,
          y: 0.307,
          type: 'x',
        },
        {
          x: 14,
          y: 0.747,
          type: 'x',
        },
      ],
      encode: {
        x: 'x',
        y: 'y',
        size: 'y',
        src: (d) =>
          d.type === 'x'
            ? 'https://gw.alipayobjects.com/zos/antfincdn/xYAYJ3T969/94c968a3f33eac63c63b87b2f0f6cd97e2db624c65646d6839a5eb4d9c1b5543e922befd040cc5d55deaaa1c7e57c0075a186aa25874490616f2652d11f08592.svg'
            : 'https://gw.alipayobjects.com/zos/antfincdn/JtFvbgBbjN/3917899b7468c526a5bfe18f94d3cf1cfedf7a7c808976870a866d71d4a322af778ffb34fd3c06783be80ff60b10be3279d5dbc82f07a7201f4978130bc8edd6.svg',
      },
      scale: {
        x: { type: 'band' },
        y: { domain: [0, 1] },
        size: { type: 'linear', range: [12, 32] },
      },
    });

    mount(createDiv(), chart);
  });
});
