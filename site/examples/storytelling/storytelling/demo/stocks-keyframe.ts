import { Chart } from '@antv/g2';

fetch('https://assets.antv.antgroup.com/g2/stocks2.json')
  .then((res) => res.json())
  .then((data) => {
    const keyframes = [
      facetLine,
      facetArea,
      stackArea,
      layerArea,
      streamgraph,
      normalizeArea,
      normalizeBar,
      groupBar,
      stackBar,
      bar,
      pie,
      rose,
    ];

    const chart = new Chart({ container: 'container' });

    chart.options({
      type: 'timingKeyframe',
      width: 800,
      children: keyframes.map((plot) => {
        const { children, ...options } = plot(data);
        return {
          theme: 'dark',
          paddingLeft: 40,
          paddingBottom: 50,
          paddingRight: 50,
          ...options,
          ...(children && {
            children: children.map((d) => ({ ...d, theme: 'dark' })),
          }),
        };
      }),
    });

    chart.render();
  });

const timeSeriesEncode = {
  x: (d) => new Date(d.date),
  y: 'price',
  color: 'symbol',
  key: 'symbol',
};

function facetLine(data) {
  return {
    type: 'facetRect',
    data,
    encode: { y: 'symbol' },
    axis: { y: { title: false } },
    children: [
      {
        type: 'line',
        key: 'line',
        encode: timeSeriesEncode,
        frame: false,
        scale: { y: { zero: true, tickCount: 3 } },
        axis: { x: { title: false }, y: { title: false } },
        animate: { enter: { type: 'pathIn' } },
        style: { shape: 'smooth' },
      },
    ],
  };
}

function facetArea(data) {
  return {
    type: 'facetRect',
    data,
    encode: { y: 'symbol' },
    axis: { y: { title: false } },
    children: [
      {
        type: 'line',
        key: 'line',
        frame: false,
        encode: timeSeriesEncode,
        style: { shape: 'smooth' },
        axis: { x: { title: false }, y: { title: false } },
        scale: { y: { zero: true, facet: false, tickCount: 3 } },
      },
      {
        type: 'area',
        key: 'area',
        class: 'area',
        frame: false,
        encode: timeSeriesEncode,
        style: { shape: 'smooth' },
        scale: { y: { facet: false, zero: true, tickCount: 3 } },
        axis: { x: { title: false }, y: { title: false } },
        animate: { exit: { type: 'fadeOut' } },
      },
    ],
  };
}

function stackArea(data) {
  return {
    type: 'area',
    data,
    key: 'area',
    class: 'area',
    transform: [{ type: 'stackY', reverse: true }],
    axis: { y: { title: false } },
    encode: timeSeriesEncode,
    style: { shape: 'smooth' },
  };
}

function layerArea(data) {
  return {
    type: 'area',
    key: 'area',
    class: 'area',
    data,
    axis: { y: { title: false } },
    encode: timeSeriesEncode,
    style: { fillOpacity: 0.5, shape: 'smooth' },
  };
}

function streamgraph(data) {
  return {
    type: 'area',
    key: 'area',
    class: 'area',
    data,
    axis: { y: { title: false } },
    transform: [{ type: 'stackY', reverse: true }, { type: 'symmetryY' }],
    encode: timeSeriesEncode,
    style: { fillOpacity: 1, shape: 'smooth' },
  };
}

function normalizeArea(data) {
  return {
    type: 'area',
    key: 'area',
    class: 'area',
    data,
    axis: { y: { title: false } },
    transform: [{ type: 'stackY', reverse: true }, { type: 'normalizeY' }],
    encode: timeSeriesEncode,
    style: { fillOpacity: 1, shape: 'smooth' },
  };
}

function normalizeBar(data) {
  return {
    type: 'interval',
    data,
    encode: {
      y: 'price',
      color: 'symbol',
      key: 'symbol',
    },
    transform: [
      { type: 'groupColor', y: 'sum' },
      { type: 'stackY', reverse: true },
      { type: 'normalizeY' },
    ],
    scale: { x: { padding: 0 } },
    axis: { y: { title: false }, x: { title: false } },
  };
}

const groupedStockEncode = {
  x: 'date',
  y: 'price',
  color: 'symbol',
  groupKey: 'symbol',
  key: (_, i) => i,
};

function groupBar(data) {
  return {
    type: 'interval',
    data,
    transform: [{ type: 'dodgeX' }],
    encode: groupedStockEncode,
    scale: { y: { nice: true } },
    axis: { x: false, y: { title: false } },
  };
}

function stackBar(data) {
  return {
    type: 'interval',
    data,
    transform: [{ type: 'stackY' }],
    encode: groupedStockEncode,
    axis: { x: false, y: { title: false } },
  };
}

const stockEncode = {
  x: 'symbol',
  y: 'price',
  color: 'symbol',
  key: 'symbol',
};

function bar(data) {
  return {
    type: 'interval',
    data,
    transform: [{ type: 'groupX', y: 'sum' }],
    encode: stockEncode,
    axis: {
      y: { labelFormatter: '~s', title: false },
      x: { title: false },
    },
  };
}

function pie(data) {
  return {
    type: 'interval',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    data,
    transform: [{ type: 'groupX', y: 'sum' }, { type: 'stackY' }],
    coordinate: { type: 'theta' },
    encode: {
      y: 'price',
      color: 'symbol',
      key: 'symbol',
    },
    legend: { color: { layout: { justifyContent: 'center' } } },
    style: { radius: 10 },
  };
}

function rose(data) {
  return {
    type: 'interval',
    data,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    transform: [{ type: 'groupX', y: 'sum' }],
    coordinate: { type: 'polar' },
    encode: stockEncode,
    scale: { x: { padding: 0 } },
    style: { radius: 10 },
    legend: { color: { layout: { justifyContent: 'center' } } },
    axis: { y: false },
  };
}
