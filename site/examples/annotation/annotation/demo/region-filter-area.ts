/**
 * A recreation of this demo: https://g2-v4.antv.vision/zh/examples/component/annotation#guide-region-filter1
 */
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/tempChange.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart.data(data);

    chart
      .area()
      .encode('x', 'year')
      .encode('y', 'change')
      .encode('shape', 'smooth');

    chart
      .line()
      .encode('x', 'year')
      .encode('y', 'change')
      .encode('shape', 'smooth')
      .style('lineWidth', 2);

    chart.call(annotation([1977, 0.18], '1940年，气温变化首次出现正值。'));
    chart.call(
      annotation(
        [1940, 0.08],
        '时间进入1977年后，全球气\n温开始呈现整体升高趋势。',
      ),
    );

    function annotation(data, text) {
      return (node) =>
        node
          .text()
          .data(data)
          .encode('text', text)
          .style('textAlign', 'right')
          .style('dx', -20)
          .style('dy', -40)
          .style('connector', true)
          .style('startMarker', true)
          .style('startMarkerSize', 6)
          .style('startMarkerLineWidth', 2)
          .style('startMarkerStrokeOpacity', 1)
          .style('startMarkerStroke', '#FF4D4F');
    }

    chart.render();
  });
