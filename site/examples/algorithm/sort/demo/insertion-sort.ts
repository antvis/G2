import { Chart } from '@antv/g2';

const data = [43, 2, 5, 24, 53, 78, 82, 63, 49, 6];

function* insertionSort(arr) {
  const len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
    yield arr.map((a, index) => ({
      value: a,
      swap: index === preIndex + 1 || index === i,
    }));
  }
  return arr;
}

const chart = new Chart({
  container: 'container',
});

const children = [];

for (const frame of insertionSort(data)) {
  children.push({
    type: 'interval',
    data: frame.map((datum, index) => ({ index, ...datum })),
    encode: {
      x: 'index',
      y: 'value',
      key: 'value',
      color: 'swap',
    },
  });
}

chart.options({ type: 'timingKeyframe', children });

chart.render();
