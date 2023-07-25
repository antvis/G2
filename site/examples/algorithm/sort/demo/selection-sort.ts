import { Chart } from '@antv/g2';

const data = [43, 2, 5, 24, 53, 78, 82, 63, 49, 6];

function* selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }
    if (lowest !== i) {
      [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
    }
    yield arr.map((a, index) => ({
      value: a,
      swap: index === lowest || index === i,
    }));
  }
  return arr;
}

const chart = new Chart({
  container: 'container',
});

const keyframe = chart.timingKeyframe();

for (const frame of selectionSort(data)) {
  keyframe
    .interval()
    .data(frame.map((datum, index) => ({ index, ...datum })))
    .encode('x', 'index')
    .encode('y', 'value')
    .encode('key', 'value')
    .encode('color', 'swap');
}

chart.render();
