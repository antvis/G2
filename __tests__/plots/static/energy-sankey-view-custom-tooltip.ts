import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';

export async function energySankeyViewCustomTooltip(): Promise<G2Spec> {
  const links = await csv('data/energy.csv', autoType);
  return {
    type: 'view',
    children: [
      {
        type: 'sankey',
        data: { value: { links } },
        interaction: {
          tooltip: {
            render: (e, { title, items }) => {
              const iconStyle =
                'display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 2px;';
              let tooltip = title ? `<p style="margin: 0">${title}</p>` : '';
              items.forEach((item) => {
                tooltip += `<div>
                <span style="${iconStyle} background-color: ${item.color}"></span>
                ${item.name}: ${item.value}
                </div>`;
              });
              return tooltip;
            },
          },
        },
      },
    ],
  };
}
