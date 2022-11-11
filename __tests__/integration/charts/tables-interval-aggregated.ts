import { G2Spec } from '../../../src';

export function tablesIntervalAggregated(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 60,
    data: {
      type: 'fetch',
      value: 'data/tables.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['name', (d) => d.startsWith('@antv/s2')]],
        },
        // {
        //   type: 'filterBy',
        //   fields: [['value', (d) => d !== 0]],
        // },
      ],
    },
    encode: {
      x: 'size',
      y: 'value',
      color: 'name',
    },
    transform: [
      { type: 'groupX', y: 'mean' },
      { type: 'dodgeX', orderBy: 'value' },
    ],
    axis: {
      y: { title: '10次平均渲染时间（ms）' },
      x: { title: '规模' },
    },
    legend: {
      color: { title: '名字' },
    },
    labels: [{ text: 'value', textBaseline: 'bottom', dy: -3 }],
  };
  return {
    type: 'facetRect',
    width: 800,
    height: 600,
    paddingLeft: 60,
    paddingRight: 100,
    paddingBottom: 50,
    data: {
      type: 'fetch',
      value: 'data/tables.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['value', (d) => d !== 0]],
        },
      ],
    },
    encode: {
      y: 'size',
    },
    axis: {
      y: { title: '规模' },
    },
    children: [
      {
        type: 'line',
        scale: {
          y: { facet: false, nice: true },
        },
        axis: {
          y: { title: '渲染时间（ms）' },
          x: { title: '测试次数' },
        },
        legend: {
          color: { title: '名字' },
        },
        encode: {
          x: 'time',
          y: 'value',
          color: 'name',
          shape: 'smooth',
        },
        style: {
          strokeWidth: ([d]) => (d.name.startsWith('@antv/s2') ? 3 : 1),
        },
        labels: [
          {
            text: 'name',
            selector: 'last',
            textAlign: 'end',
            transform: [{ type: 'dodgeY' }],
            strokeWidth: 2,
            stroke: '#fff',
            dx: -10,
            fontSize: 10,
          },
        ],
      },
    ],
  };
}
