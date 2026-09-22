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
  width: 600,
  height: 600,
});

const nodeFilter = {
  transform: [{ type: 'filter', callback: (d) => d.type === 'node' }],
};

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

          const centerX = 300;
          const centerY = 300;
          const radius = 200;
          const nodeCount = nodes.length;

          const nodePositions = nodes.map((node, i) => {
            const angle = (i / nodeCount) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return {
              ...node,
              x,
              y,
              angle,
              index: i,
            };
          });

          const arcData = [];
          links.forEach((link) => {
            const sourceId = parseInt(link.source);
            const targetId = parseInt(link.target);

            const sourceNode = nodePositions.find((n) => n.id === sourceId);
            const targetNode = nodePositions.find((n) => n.id === targetId);

            if (sourceNode && targetNode) {
              const steps = 20;
              for (let i = 0; i <= steps; i++) {
                const t = i / steps;

                const x =
                  Math.pow(1 - t, 2) * sourceNode.x +
                  2 * (1 - t) * t * centerX +
                  Math.pow(t, 2) * targetNode.x;
                const y =
                  Math.pow(1 - t, 2) * sourceNode.y +
                  2 * (1 - t) * t * centerY +
                  Math.pow(t, 2) * targetNode.y;

                arcData.push({
                  x,
                  y,
                  linkId: `${sourceId}-${targetId}`,
                  sourceName: sourceNode.label,
                  targetName: targetNode.label,
                  type: 'link',
                });
              }
            }
          });

          const nodeData = nodePositions.map((node) => ({
            name: node.label,
            group: node.modularity_class,
            size: node.size,
            displaySize: Math.sqrt(node.size) * 4,
            x: node.x,
            y: node.y,
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
      style: {
        stroke: '#1890ff',
        strokeWidth: 1.2,
        strokeOpacity: 0.3,
        lineCap: 'round',
      },
    },
    {
      type: 'point',
      data: nodeFilter,
      encode: { x: 'x', y: 'y', color: 'group' },
      scale: {
        color: {
          type: 'ordinal',
          range: colors,
        },
      },
      style: {
        r: 6,
        fill: (d) => colors[parseInt(d.group)] || '#40a9ff',
        stroke: '#fff',
        strokeWidth: 2,
        fillOpacity: 0.9,
      },
    },
    {
      type: 'text',
      data: nodeFilter,
      encode: { x: 'x', y: 'y', text: 'name' },
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 10,
        fill: '#333',
        fontWeight: 'bold',
        dy: -15,
      },
    },
  ],
});

chart.render();
