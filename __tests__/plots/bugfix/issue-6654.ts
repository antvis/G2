import { Chart } from '../../../src';

export function issue6654(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({ container, canvas });
  chart.options({
    type: 'view',
    scale: {
      color: {
        range: ['black', 'red'],
      },
    },
    children: [
      {
        type: 'interval',
        data: [
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-03',
            '15472cb4-7385-4355-b57b-c530d7424c22': '黄金会员',
            'b6132482-89db-4634-a474-25e364c3a296': 7166326.44,
            $$datum_index$$: 0,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-03',
            '15472cb4-7385-4355-b57b-c530d7424c22': '钻石会员',
            'b6132482-89db-4634-a474-25e364c3a296': 6534156.26,
            $$datum_index$$: 1,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-03',
            '15472cb4-7385-4355-b57b-c530d7424c22': '普通会员',
            'b6132482-89db-4634-a474-25e364c3a296': 6228864.47,
            $$datum_index$$: 2,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-03',
            '15472cb4-7385-4355-b57b-c530d7424c22': '白金会员',
            'b6132482-89db-4634-a474-25e364c3a296': 6588936.09,
            $$datum_index$$: 3,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-04',
            '15472cb4-7385-4355-b57b-c530d7424c22': '黄金会员',
            'b6132482-89db-4634-a474-25e364c3a296': 7257139.86,
            $$datum_index$$: 4,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-04',
            '15472cb4-7385-4355-b57b-c530d7424c22': '钻石会员',
            'b6132482-89db-4634-a474-25e364c3a296': 7595673.03,
            $$datum_index$$: 5,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-04',
            '15472cb4-7385-4355-b57b-c530d7424c22': '普通会员',
            'b6132482-89db-4634-a474-25e364c3a296': 7097732.49,
            $$datum_index$$: 6,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-04',
            '15472cb4-7385-4355-b57b-c530d7424c22': '白金会员',
            'b6132482-89db-4634-a474-25e364c3a296': 7947360.17,
            $$datum_index$$: 7,
          },
        ],
        encode: {
          y: 'b6132482-89db-4634-a474-25e364c3a296',
          series: '15472cb4-7385-4355-b57b-c530d7424c22',
          color: '15472cb4-7385-4355-b57b-c530d7424c22',
        },
      },
      {
        type: 'line',
        data: [
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-03',
            '798557fa-e2c7-42d6-95fd-de571a822584': '男',
            '2826ab40-1697-44c6-8601-7b0e65e784cb': 3308170,
            $$datum_index$$: 0,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-03',
            '798557fa-e2c7-42d6-95fd-de571a822584': '女',
            '2826ab40-1697-44c6-8601-7b0e65e784cb': 3294910,
            $$datum_index$$: 1,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-04',
            '798557fa-e2c7-42d6-95fd-de571a822584': '男',
            '2826ab40-1697-44c6-8601-7b0e65e784cb': 3167799,
            $$datum_index$$: 2,
          },
          {
            '39eb1398-046e-46ea-9323-3d5f673c79b2': '2025-02-04',
            '798557fa-e2c7-42d6-95fd-de571a822584': '女',
            '2826ab40-1697-44c6-8601-7b0e65e784cb': 3293993,
            $$datum_index$$: 3,
          },
        ],
        encode: {
          y: '2826ab40-1697-44c6-8601-7b0e65e784cb',
          series: '798557fa-e2c7-42d6-95fd-de571a822584',
          color: '798557fa-e2c7-42d6-95fd-de571a822584',
        },
      },
    ],
    encode: {
      x: '39eb1398-046e-46ea-9323-3d5f673c79b2',
    },
    axis: {
      x: {
        title: '订单日期',
      },
      y: {
        title: false,
      },
    },
  });

  chart.render();
  const changeColor = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // 更改后，线条颜色并没有更新
        chart.options({
          scale: {
            color: {
              range: ['yellow', 'blue'],
            },
          },
        });
        chart.render().then(resolve);
      }, 2000);
    });
  changeColor();

  return {
    chart,
    changeColor,
  };
}
