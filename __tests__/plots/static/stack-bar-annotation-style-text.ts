import { G2Spec } from '../../../src';

export const data = [
  {
    time: '1991/01',
    value: 0,
    type: 'Lon',
  },
  {
    time: '1992/01',
    value: 4,
    type: 'Lon',
  },
  {
    time: '1993/01',
    value: 3.5,
    type: 'Lon',
  },
  {
    time: '1994/01',
    value: 1,
    type: 'Lon',
  },
  {
    time: '1995/01',
    value: 2,
    type: 'Lon',
  },
  {
    time: '1996/01',
    value: 3,
    type: 'Lon',
  },
  {
    time: '1997/01',
    value: 4,
    type: 'Lon',
  },
  {
    time: '1998/01',
    value: 9,
    type: 'Lon',
  },
  {
    time: '1999/01',
    value: 1,
    type: 'Lon',
  },
  {
    time: '1991/01',
    value: 3,
    type: 'Bor',
  },
  {
    time: '1992/01',
    value: 4,
    type: 'Bor',
  },
  {
    time: '1993/01',
    value: 3.5,
    type: 'Bor',
  },
  {
    time: '1994/01',
    value: 5,
    type: 'Bor',
  },
  {
    time: '1995/01',
    value: 2,
    type: 'Bor',
  },
  {
    time: '1996/01',
    value: 6,
    type: 'Bor',
  },
  {
    time: '1997/01',
    value: 7,
    type: 'Bor',
  },
  {
    time: '1998/01',
    value: 9,
    type: 'Bor',
  },
  {
    time: '1999/01',
    value: 1,
    type: 'Bor',
  },
];

export function stackBarAnnotationStyleText(): G2Spec {
  const groupData = data.reduce((acc, item) => {
    if (acc[item.time]) {
      acc[item.time] = [...acc[item.time], item];
    } else {
      acc[item.time] = [item];
    }
    return acc;
  }, {});

  const annotations = Object.keys(groupData).map((key) => {
    const val = groupData[key].reduce((a, b) => a + b.value, 0);
    return {
      type: 'text',
      data: [key, val],
      encode: {
        x: 'time',
        y: 'value',
      },
      style: {
        text: `${val}`,
        textBaseline: 'bottom',
        position: 'top',
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      tooltip: false,
    };
  });
  return {
    type: 'view',
    height: 300,
    width: 640,
    data,
    children: [
      {
        type: 'interval',
        axis: { x: { labelAutoHide: true } },
        encode: {
          x: 'time',
          y: 'value',
          color: 'type',
        },
        transform: [
          {
            type: 'stackY',
          },
        ],
        labels: [
          {
            text: 'value',
            textBaseline: 'bottom',
            position: 'inside',
          },
        ],
      },
      ...annotations,
    ],
  };
}
