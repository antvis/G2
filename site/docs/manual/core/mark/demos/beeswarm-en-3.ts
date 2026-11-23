import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
// 可选的itemMarker形状
const shapeList = [
  'hollow',
  'hollowDiamond',
  'hollowHexagon',
  'hollowSquare',
  'hollowTriangleDown',
  'hollowTriangle',
  'hollowBowtie',
  'point',
  'plus',
  'diamond',
  'square',
  'triangle',
  'triangleDown',
  'hexagon',
  'cross',
  'bowtie',
  'hyphen',
  'line',
  'tick',
  'circle',
];
const shapeMap = shapeList.map((p) => {
  return {
    label: p,
    value: p,
  };
});

const data = Array.from({ length: 300 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
    radius: Math.random(),
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
    shape: 'hollow',
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
    size: { range: [3, 6] },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

const handleSetShape = (shape) => {
  chart.options({
    encode: {
      x: 'x',
      y: 'y',
      size: 10,
      shape,
    },
  });
  chart.render(); // 重新渲染图表
};

const selectorContainer = document.createElement('div');
selectorContainer.textContent = '选择beeswarm标记的形状 ';
const selector = document.createElement('select');
selector.innerHTML = shapeMap.map(
  (shape, index) =>
    `<option value="${shape.value}" ${index === 0 ? 'selected' : ''}>${
      shape.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetShape(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
