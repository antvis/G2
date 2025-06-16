import { Chart } from '@antv/g2';
const chart = new Chart({
  container: 'container',
  width: 1000,
  height: 600,
});

const rawData = {
  left: [
    45, 47, 48, 52, 53, 55, 56, 57, 59, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72,
    73, 74, 75, 76, 77, 78,
  ],
  right: [
    43, 44, 46, 51, 54, 55, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74,
    75, 76, 77, 79, 82,
  ],
};
// process data
function processDualStemLeaf(data) {
  const stemMap = new Map();
  ['left', 'right'].forEach((side) => {
    data[side].forEach((score) => {
      const stem = Math.floor(score / 10);
      const leaf = score % 10;
      if (!stemMap.has(stem)) {
        stemMap.set(stem, { left: [], right: [] });
      }
      stemMap.get(stem)[side].push(leaf);
    });
  });
  // sort
  Array.from(stemMap.values()).forEach((group) => {
    group.left.sort((a, b) => b - a);
    group.right.sort((a, b) => a - b);
  });
  const stems = Array.from(stemMap.keys()).sort((a, b) => a - b);
  const chartData = [];

  stems.forEach((stem, index) => {
    const yPos = stems.length - index - 1;
    const { left, right } = stemMap.get(stem);
    chartData.push({
      x: 0.5,
      y: yPos,
      text: `${stem}`,
      type: 'stem',
      color: '#333',
    });
    left.forEach((leaf, i) => {
      chartData.push({
        x: 0.45 - (i + 1) * 0.035, // 右侧起始位置递减
        y: yPos,
        text: `${leaf}`,
        type: 'leaf-left',
        color: '#1f77b4',
      });
    });
    right.forEach((leaf, i) => {
      chartData.push({
        x: 0.55 + i * 0.035, // 左侧起始位置递增
        y: yPos,
        text: `${leaf}`,
        type: 'leaf-right',
        color: '#ff7f0e',
      });
    });
  });
  return { chartData, maxY: stems.length };
}
const { chartData, maxY } = processDualStemLeaf(rawData);
// stem and leaf
chart
  .text()
  .data(chartData)
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('text', 'text')
  .encode('fill', 'color')
  .style('textAlign', 'center')
  .style('textBaseline', 'middle')
  .style('fontSize', (d) => {
    if (d.type === 'stem') return 18;
    return d.type.includes('leaf') ? 14 : 16;
  })
  .style('fontWeight', (d) => (d.type === 'stem' ? 'bold' : 'normal'))
  .style('dx', (d) => (d.type === 'stem' ? -10 : 0))
  .scale('x', { domain: [0, 1], nice: false })
  .scale('y', { domain: [-1, maxY], nice: false })
  .axis(false);
// title
chart
  .text()
  .data([
    { x: 0.4, y: maxY, text: 'A班', color: '#1f77b4' },
    { x: 0.55, y: maxY, text: 'B班', color: '#ff7f0e' },
  ])
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('text', 'text')
  .encode('fill', 'color')
  .style('fontWeight', 'bold')
  .style('fontSize', 14);
// dividing line
chart.lineX().data([0.46, 0.52]).style({
  lineWidth: 2,
  stroke: '#000',
  strokeOpacity: 0.8,
});
chart.render();
