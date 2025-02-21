import { group } from '@antv/vendor/d3-array';
import { incomeStatementByRegion } from '../../data/incomeStatementByRegion';

export function incomeStatementByRegionIntervalCustom() {
  const linkData = (data) =>
    data.reduce((r, d, idx) => {
      if (idx > 0) {
        return r.concat({
          x1: data[idx - 1].x,
          x2: d.x,
          value: d.isTotal ? d.end : d.start,
        });
      }
      return r;
    }, []);
  const groupData = (data) => {
    const groups = group(data, (d: any) => d.x);
    return Array.from(groups.entries()).reduce((r, [k, v]) => {
      const y = (v[v.length - 1] as any).end;
      return r.concat({
        x: k,
        y,
        value: v.length <= 1 ? y : y - (r.length ? r[r.length - 1].y : 0),
      });
    }, [] as any[]);
  };

  return {
    type: 'view',
    width: 800,
    height: 420,
    data: incomeStatementByRegion,
    axis: {
      x: {
        labelAutoEllipsis: true,
        title: false,
        labelFontSize: 10,
      },
      y: { labelFormatter: '~s', title: false },
    },
    scale: {
      color: {
        domain: ['Texas', 'Oklahoma', 'Iowa', 'Total'],
        range: ['#3c5e79', '#5686ad', '#7bc0f7', '#d6d6d6'],
      },
      x: {
        padding: 0.5,
      },
    },
    legend: {
      color: {
        position: 'bottom',
        layout: { justifyContent: 'center' },
        title: false,
      },
    },
    children: [
      {
        type: 'link',
        data: { transform: [{ type: 'custom', callback: linkData }] },
        encode: {
          x: ['x1', 'x2'],
          y: ['value'],
        },
        style: { stroke: '#979797', lineWidth: 0.5 },
      },
      {
        type: 'interval',
        encode: {
          x: 'x',
          y: ['start', 'end'],
          color: 'type',
        },
        style: { stroke: '#979797', lineWidth: 0.5 },
      },
      {
        type: 'text',
        data: { transform: [{ type: 'custom', callback: groupData }] },
        encode: {
          x: 'x',
          text: 'value',
          y: 'y',
        },
        style: {
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          dy: (d) => (d.value > 0 ? -12 : 12),
          background: true,
          backgroundStroke: '#416180',
          backgroundStrokeOpacity: 0.45,
          backgroundLineWidth: 0.5,
          backgroundRadius: 2,
        },
      },
    ],
  };
}
