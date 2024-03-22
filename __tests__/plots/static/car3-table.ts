import { Group, Text, Rect } from '@antv/g';
import { G2Spec } from '../../../src';
// import { Text } from '@antv/component';

function Table(options, dimensions) {
  const { data, cell = { height: 30, width: 96 }, text = {} } = options;
  // debugger

  const cellHeight = cell.height;
  const cellWidth = cell.width;

  const keys = Array.from(new Set(data.flatMap(Object.keys)));

  const table = [...data.map((d) => keys.map((key) => d[key as string]))];
  const cells = table.flatMap((row, y) =>
    row.map((col, x) => ({ key: col, x, y, col: keys[x] })),
  );

  const { width, height } = dimensions;
  const rows = data.length;
  const expectedHeight = cell.height * rows;
  const expectedWidth = cell.width * keys.length;
  const range = expectedHeight / height;

  console.log('cells', cells);
  console.log('cell', cell);
  console.log('range', range);

  return [
    {
      type: 'cell',
      data: cells,
      encode: {
        x: 'col',
        y: 'y',
      },
      scale: {
        y: {
          range: [0, range],
        },
      },

      scrollbar: {
        x:
          expectedWidth > width
            ? {
                // scrollable: true
              }
            : false,
        y:
          expectedHeight > height
            ? {
                scrollable: true,
                ratio: range,
                position: 'right',
              }
            : false,
      },

      axis: {
        y: {
          title: false,
        },

        x: {
          tick: false,
          title: false,
          position: 'top',
          background: 'red',
          labelFormatter: (d: any) => {
            const g = new Group();
            const text = new Text({
              style: {
                x: 0,
                y: 0,
                text: d,
                textAlign: 'center',
                fontSize: 12,
                fill: 'black',
                zIndex: 1,
              },
            });

            const bbox = text.getBBox();

            const rect = new Rect({
              style: {
                x: bbox.x,
                y: bbox.y,
                width: bbox.width,
                height: bbox.height,
                // stroke: "green",
                fill: '#e1eafd',
                zIndex: -1,
              },
            });
            g.appendChild(rect);
            g.appendChild(text);
            return g;
          },
        },
      },

      style: {
        fill: (d) => (d.y % 2 === 1 ? '#f6f8fe' : '#ffffff'),
        zIndex: 2,

        ...cell,
      },
      tooltip: false,
      animate: false,
    },
    {
      type: 'text',
      data: cells,
      encode: {
        x: 'col',
        y: 'y',
        text: 'key',
      },

      style: {
        ...text,
      },
      tooltip: false,
      animate: false,
    },
  ];
}

const data = [
  {
    province: '浙江',
    city: '杭州',
    type: '笔',
    price: 1,
  },

  {
    province: '浙江',
    city: '杭州',
    type: '纸张',
    price: 2,
  },
  {
    province: '浙江',
    city: '舟山',
    type: '笔',
    price: 17,
  },

  {
    province: '浙江',
    city: '舟山',
    type: '纸张',
    price: 6,
  },
  {
    province: '吉林',
    city: '长春',
    type: '笔',
    price: 8,
  },
  {
    province: '吉林',
    city: '白山',
    type: '笔',
    price: 12,
  },
  {
    province: '吉林',
    city: '长春',
    type: '纸张',
    price: 3,
  },
  {
    province: '吉林',
    city: '白山',
    type: '纸张',
    price: 25,
  },
  {
    province: '浙江',
    city: '杭州',
    type: '笔',
    price: 20,
  },
  {
    province: '浙江',
    city: '杭州',
    type: '纸张',
    price: 10,
  },
  {
    province: '浙江',
    city: '舟山',
    type: '笔',
    price: 15,
  },

  {
    province: '浙江',
    city: '舟山',
    type: '纸张',
    price: 2,
  },
  {
    province: '吉林',
    city: '长春',
    type: '笔',
    price: 15,
  },

  {
    province: '吉林',
    city: '白山',
    type: '笔',
    price: 30,
  },
  {
    province: '吉林',
    city: '长春',
    type: '纸张',
    price: 40,
  },
  {
    province: '吉林',
    city: '白山',
    type: '纸张',
    price: 50,
  },
  {
    province: '吉林',
    city: '长春',
    type: '纸张',
    price: 40,
  },

  {
    province: '吉林',
    city: '白山',
    type: '纸张',
    price: 50,
  },

  {
    province: '吉林',
    city: '长春',
    type: '纸张',
    price: 60,
  },
  {
    province: '吉林',
    city: '白山',
    type: '纸张',
    price: 70,
  },

  {
    province: '吉林',
    city: '长春',
    type: '纸张',
    price: 80,
  },
  {
    province: '吉林',
    city: '白山',
    type: '纸张',
    price: 90,
  },
];

export function cars3Table(): G2Spec {
  return {
    type: Table,
    // data
    // data: {
    //   type: "fetch",
    //   value: "https://assets.antv.antgroup.com/s2/basic-table-mode.json"
    // },
    data: data,
    cell: {
      // 表格的样式
      height: 30,
      stroke: '#e6e9f5',
      strokeWidth: 1,
      fontSize: 12,
    },
    text: {
      // 文本的样式
      textAlign: 'center',
      textBaseline: 'middle',
      fontSize: 12,
    },
  };
}
