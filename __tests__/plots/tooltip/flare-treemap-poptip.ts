import { schemeTableau10 } from '@antv/vendor/d3-scale-chromatic';
import { CustomEvent, DisplayObject } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';

export function flareTreemapPoptip(): G2Spec {
  return {
    type: 'view',
    height: 600,
    width: 800,
    children: [
      {
        type: 'treemap',
        data: {
          type: 'fetch',
          value: 'data/flare.csv',
        },
        layout: {
          path: (d) => d.name.replace(/\./g, '/'),
          tile: 'treemapBinary',
        },
        scale: {
          color: { range: schemeTableau10 },
        },
        encode: {
          value: 'size',
          color: (d) => d.parent.data.name.split('.')[1],
        },
        style: {
          labelText: (d) => {
            const name = d.data.name
              .split('.')
              .pop()
              .split(/(?=[A-Z][a-z])/g)[0];
            return name;
          },
          labelFill: '#000',
          labelPosition: 'top-left',
          labelDx: 3,
          labelDy: 3,
          fillOpacity: 0.5,
        },
      },
    ],
    interaction: {
      poptip: true,
    },
  };
}

flareTreemapPoptip.className = 'poptip';

flareTreemapPoptip.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  const texts: DisplayObject[] = Array.from(plot.getElementsByTagName('text'));
  const node = texts.find((d) => d.style.text === 'Node');
  const rectangle = texts.find((d) => d.style.text === 'Rectangle');
  const spring = texts.find((d) => d.style.text === 'Spring');
  return [
    {
      changeState: async () => {
        node?.dispatchEvent(new CustomEvent('pointerover'));
      },
    },
    {
      changeState: async () => {
        rectangle?.dispatchEvent(new CustomEvent('pointerover'));
      },
    },
    {
      changeState: async () => {
        rectangle?.dispatchEvent(new CustomEvent('pointerleave'));
      },
      skip: true,
    },
    {
      changeState: async () => {
        spring?.dispatchEvent(new CustomEvent('pointerover'));
      },
    },
  ];
};
