import { Chart } from '@antv/g2';

const colors = [
  '#ff7875',
  '#ffa940',
  '#fadb14',
  '#73d13d',
  '#40a9ff',
  '#b37feb',
  '#ff85c0',
  '#ffc069',
  '#95de64',
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/relationship.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          const { nodes, links } = data;

          const arcData = [];
          links.forEach((link) => {
            const sourceId = parseInt(link.source);
            const targetId = parseInt(link.target);

            const sourceIndex = nodes.findIndex((n) => n.id === sourceId);
            const targetIndex = nodes.findIndex((n) => n.id === targetId);

            if (sourceIndex !== -1 && targetIndex !== -1) {
              const sourceX = sourceIndex * 15 + 50;
              const targetX = targetIndex * 15 + 50;
              const distance = Math.abs(targetX - sourceX);
              const arcHeight = Math.min(150, distance * 0.1);

              for (let i = 0; i <= 15; i++) {
                const t = i / 15;
                const x = sourceX + (targetX - sourceX) * t;
                const y = 600 - arcHeight * Math.sin(Math.PI * t);

                arcData.push({
                  x: x,
                  y: y,
                  linkId: `${sourceId}-${targetId}`,
                  sourceName: nodes[sourceIndex].label,
                  targetName: nodes[targetIndex].label,
                  type: 'link',
                });
              }
            }
          });

          const nodeData = nodes.map((node, i) => ({
            name: node.label,
            group: node.modularity_class,
            size: node.size,
            displaySize: Math.sqrt(node.size) * 4,
            x: i * 15 + 50,
            y: 600,
            type: 'node',
          }));

          return [...arcData, ...nodeData];
        },
      },
    ],
  },
  children: [
    {
      type: 'line',
      data: {
        transform: [{ type: 'filter', callback: (d) => d.type === 'link' }],
      },
      encode: { x: 'x', y: 'y', series: 'linkId' },
      style: { stroke: '#1890ff', strokeWidth: 0.8, strokeOpacity: 0.4 },
    },
    {
      type: 'point',
      data: {
        transform: [{ type: 'filter', callback: (d) => d.type === 'node' }],
      },
      encode: { x: 'x', y: 'y', color: 'group' },
      scale: {
        color: {
          type: 'ordinal',
          range: colors,
        },
      },
      style: {
        r: 4,
        fill: (d) => colors[parseInt(d.group)] || '#40a9ff',
        stroke: 'none',
        fillOpacity: 0.8,
      },
    },
  ],
});

chart.render();
