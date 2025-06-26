import { G2Spec } from '../../../src';

export function labelExceedAdjustBoundsMain(): G2Spec {
  const data = [
    {
      date: '2025-07-01',
      price: 600,
      showLabel: 1,
      tooltip: '最低价 ￥600',
    },
    {
      date: '2025-07-02',
      price: 660,
    },
    {
      date: '2025-07-03',
      price: 778,
    },
    {
      date: '2025-07-04',
      price: 780,
    },
    {
      date: '2025-07-05',
      price: 810,
    },
    {
      date: '2025-07-06',
      price: 815,
    },
    {
      date: '2025-07-07',
      price: 778,
    },
    {
      date: '2025-07-08',
      price: 778,
    },
    {
      date: '2025-07-09',
      price: 778,
    },
    {
      date: '2025-07-10',
      price: 778,
    },
    {
      date: '2025-07-11',
      price: 890,
    },
    {
      date: '2025-07-12',
      price: 814,
    },
    {
      date: '2025-07-13',
      price: 890,
    },
    {
      date: '2025-07-14',
      price: 820,
    },
    {
      date: '2025-07-15',
      price: 790,
    },
    {
      date: '2025-07-16',
      price: 810,
    },
    {
      date: '2025-07-17',
      price: 790,
    },
    {
      date: '2025-07-18',
      price: 860,
    },
    {
      date: '2025-07-19',
      price: 780,
    },
    {
      date: '2025-07-20',
      price: 860,
    },
    {
      date: '2025-07-21',
      price: 860,
    },
    {
      date: '2025-07-22',
      price: 860,
    },
    {
      date: '2025-07-23',
      price: 860,
    },
    {
      date: '2025-07-24',
      price: 860,
    },
    {
      date: '2025-07-25',
      price: 860,
    },
    {
      date: '2025-07-26',
      price: 860,
    },
    {
      date: '2025-07-27',
      price: 860,
    },
    {
      date: '2025-07-28',
      price: 860,
    },
    {
      date: '2025-07-29',
      price: 860,
    },
    {
      date: '2025-07-30',
      price: 860,
    },
    {
      date: '2025-07-31',
      price: 860,
    },
    {
      date: '2025-08-01',
      price: 860,
    },
    {
      date: '2025-08-02',
      price: 860,
    },
    {
      date: '2025-08-03',
      price: 860,
    },
    {
      date: '2025-08-04',
      price: 860,
    },
    {
      date: '2025-08-05',
      price: 860,
    },
    {
      date: '2025-08-06',
      price: 860,
    },
    {
      date: '2025-08-07',
      price: 860,
    },
    {
      date: '2025-08-08',
      price: 860,
    },
    {
      date: '2025-08-09',
      price: 860,
    },
    {
      date: '2025-08-10',
      price: 860,
    },
    {
      date: '2025-08-11',
      price: 860,
    },
    {
      date: '2025-08-12',
      price: 860,
    },
    {
      date: '2025-08-13',
      price: 860,
    },
    {
      date: '2025-08-14',
      price: 860,
    },
    {
      date: '2025-08-15',
      price: 860,
    },
    {
      date: '2025-08-16',
      price: 740,
    },
    {
      date: '2025-08-17',
      price: 740,
    },
    {
      date: '2025-08-18',
      price: 740,
    },
    {
      date: '2025-08-19',
      price: 740,
    },
    {
      date: '2025-08-20',
      price: 740,
    },
    {
      date: '2025-08-21',
      price: 740,
    },
    {
      date: '2025-08-22',
      price: 740,
    },
    {
      date: '2025-08-23',
      price: 740,
    },
    {
      date: '2025-08-24',
      price: 740,
    },
    {
      date: '2025-08-25',
      price: 740,
    },
    {
      date: '2025-08-26',
      price: 740,
    },
    {
      date: '2025-08-27',
      price: 740,
    },
    {
      date: '2025-08-28',
      price: 740,
    },
    {
      date: '2025-08-29',
      price: 740,
    },
    {
      date: '2025-08-30',
      price: 740,
    },
    {
      date: '2025-08-31',
      price: 740,
      showLabel: 1,
      tooltip: '最高价 ￥740',
    },
  ];
  const result = (data.filter((item) => item.showLabel) || []).map((item) => {
    return {
      type: 'lineX',
      data: [item],
      encode: {
        x: 'date',
        y: 'price',
        color: 'linear-gradient(-90deg, #1677FF5B 0%,#1677FF 100%)',
      },
      style: {
        lineWidth: 3,
        lineDash: [3, 3],
      },
      labels: item.tooltip
        ? [
            {
              text: 'tooltip',
              fill: '#000000',
              stroke: '#fff',
              lineWidth: 2,
              fillOpacity: 1,
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 30,
              textAlign: 'center',
              transform: [
                { type: 'exceedAdjust', bounds: 'main', offsetX: 25 },
              ],
            },
          ]
        : [],
    };
  });
  return {
    width: 654,
    height: 310,
    type: 'view',
    margin: 20,
    marginLeft: 10,
    insetLeft: 24,
    insetRight: 24,
    insetBottom: 24,
    animate: false,
    axis: {
      x: {
        title: '',
        size: 16,
        line: true,
        lineLineWidth: 1.5,
        lineStroke: '#DEE3EB',
        tick: false,
        labelFontSize: 22,
        labelFill: '#545C67',
        labelFontWeight: 500,
        labelDy: 8,
        labelFormatter: (str) => {
          if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
            const [year, month, day] = str.split('-');
            return `${+month}月${+day}日`;
          }
          return str;
        },
        tickFilter: (d, index) => {
          if (data[index]?.showLabel) {
            return true;
          }
          return false;
        },
      },
      y: {
        title: '',
        tick: false,
        line: true,
        lineStroke: '#DEE3EB',
        lineLineWidth: 1.5,
        labelDx: -8,
        labelFontSize: 22,
        labelFill: '#545C67',
        labelFontWeight: 500,
        grid: false,
      },
    },
    scale: {
      y: {
        type: 'linear',
        tickCount: 5,
        domain: [600, 860],
        nice: true,
      },
    },
    children: [
      {
        type: 'area',
        data: data,
        encode: {
          x: 'date',
          y: 'price',
          shape: 'smooth',
        },
        style: {
          fill: `linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%,rgba(105, 168, 255, 0.61) 100%)`,
        },
      },
      {
        type: 'line',
        data: data,
        encode: {
          x: 'date',
          y: 'price',
          shape: 'smooth',
        },
        style: {
          stroke:
            'linear-gradient(0deg, #91BDFF 0%, #1777FF 24.148%, #1777FF 75.172%,#1677FF32 100%)',
          lineWidth: 6,
        },
      },
      ...result,
    ],
  };
}
