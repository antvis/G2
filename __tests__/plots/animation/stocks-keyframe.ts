import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

const facetLine = (data) => ({
  type: 'facetRect',
  paddingLeft: 60,
  data,
  encode: {
    y: 'symbol',
  },
  children: [
    {
      type: 'line',
      key: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      frame: false,
      scale: { y: { zero: true, tickCount: 3 } },
      animate: {
        enter: { type: 'pathIn' },
      },
    },
  ],
});

const facetArea = (data) => ({
  type: 'facetRect',
  paddingLeft: 60,
  data,
  encode: {
    y: 'symbol',
  },
  children: [
    {
      type: 'line',
      key: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      frame: false,
      scale: { y: { zero: true, facet: false, tickCount: 3 } },
    },
    {
      type: 'area',
      key: 'area',
      class: 'area',
      frame: false,
      encode: {
        x: (d) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        key: 'symbol',
      },
      scale: { y: { facet: false, zero: true, tickCount: 3 } },
      animate: {
        exit: { type: 'fadeOut' },
      },
    },
  ],
});

const stackArea = (data) => ({
  type: 'area',
  key: 'area',
  class: 'area',
  data,
  transform: [{ type: 'stackY', reverse: true }],
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
});

const layerArea = (data) => ({
  type: 'area',
  key: 'area',
  class: 'area',
  data,
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
  style: {
    fillOpacity: 0.5,
  },
});

const streamgraph = (data) => ({
  type: 'area',
  key: 'area',
  class: 'area',
  data,
  transform: [{ type: 'stackY', reverse: true }, { type: 'symmetryY' }],
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
  style: {
    fillOpacity: 1,
  },
});

const normalizeArea = (data) => ({
  type: 'area',
  key: 'area',
  class: 'area',
  data,
  transform: [{ type: 'stackY', reverse: true }, { type: 'normalizeY' }],
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
  style: {
    fillOpacity: 1,
  },
});

const groupBar = (data) => ({
  type: 'interval',
  data,
  transform: [{ type: 'dodgeX' }],
  encode: {
    x: 'date',
    y: 'price',
    color: 'symbol',
    groupKey: 'symbol',
    key: (_, i) => i,
  },
  axis: {
    x: { tickFilter: (_) => false },
  },
});

const stackBar = (data) => ({
  type: 'interval',
  data,
  transform: [{ type: 'stackY' }],
  encode: {
    x: 'date',
    y: 'price',
    color: 'symbol',
    groupKey: 'symbol',
    key: (_, i) => i,
  },
  axis: {
    x: { tickFilter: (_) => false },
  },
});

const bar = (data) => ({
  type: 'interval',
  data,
  transform: [{ type: 'groupX', y: 'sum' }],
  encode: {
    x: 'symbol',
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
  axis: {
    y: { labelFormatter: '~s' },
  },
});

const pie = (data) => ({
  type: 'interval',
  data,
  transform: [{ type: 'groupX', y: 'sum' }, { type: 'stackY' }],
  coordinate: { type: 'theta' },
  encode: {
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
  legend: {
    color: { layout: { justifyContent: 'center' } },
  },
  style: {
    radius: 10,
  },
});

const rose = (data) => ({
  type: 'interval',
  data,
  transform: [{ type: 'groupX', y: 'sum' }],
  coordinate: { type: 'polar' },
  encode: {
    x: 'symbol',
    y: 'price',
    color: 'symbol',
    key: 'symbol',
  },
  scale: { x: { padding: 0 } },
  style: { radius: 10 },
  legend: {
    color: { layout: { justifyContent: 'center' } },
  },
  axis: { y: false },
});

const keyframes = [
  facetLine,
  facetArea,
  stackArea,
  layerArea,
  streamgraph,
  normalizeArea,
  groupBar,
  stackBar,
  bar,
  pie,
  rose,
];

/**
 * @see https://bl.ocks.org/mbostock/1256572
 */
export async function stocksKeyframe(): Promise<G2Spec> {
  const data = await csv('data/stocks2.csv', autoType);
  // @ts-ignore
  return {
    type: 'timingKeyframe',
    width: 800,
    // @ts-ignore
    children: keyframes.map((plot) => plot(data)),
  };
}

// Only test the first three keyframes.
// The tests point of rest of the keyframes will be test in other test cases.
const intervals = keyframes.map((_, i) => (i <= 2 ? [500] : false));
stocksKeyframe.intervals = [false, ...intervals];
