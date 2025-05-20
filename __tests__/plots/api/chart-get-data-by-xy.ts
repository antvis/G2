import { Canvas, Text } from '@antv/g';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Chart } from '../../../src';

export function chartGetDataByXY(context) {
  const svgRenderer = new SVGRenderer();
  const { container, canvas: originCanvas } = context;

  const canvas =
    originCanvas ||
    new Canvas({
      container,
      width: 600,
      height: 500,
      renderer: svgRenderer,
    });

  // button
  const button1 = document.createElement('button');
  button1.innerText = 'Point200';
  container.appendChild(button1);

  const button2 = document.createElement('button');
  button2.innerText = 'Point400';
  container.appendChild(button2);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'view',
    autoFit: true,
    paddingTop: 80,
    data: [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ],
    encode: { x: 'month', y: 'temperature', color: 'city' },
    scale: { x: { range: [0, 1] }, y: { nice: true } },
    axis: { y: { labelFormatter: (d) => d + '°C' } },
    children: [
      { type: 'line', encode: { shape: 'smooth' } },
      { type: 'point', encode: { shape: 'point' }, tooltip: false },
    ],
  });

  const createText = (text) => {
    const existText = canvas.document.getElementById('point-data');
    if (existText) existText.remove();
    const textElement = new Text({
      id: 'point-data',
      style: {
        x: 12,
        y: 100,
        fontFamily: 'PingFang SC',
        text: text,
        fontSize: 14,
        fill: '#1890FF',
        stroke: '#F04864',
        lineWidth: 1,
      },
    });
    return textElement;
  };

  const finished = chart.render();

  button1.onclick = () => {
    const [x, y] = [200, 100];
    const pointData = chart.getDataByXY({ x, y }, { shared: true });
    const text = createText(
      `X: ${x}, Y: ${y}\n\nEventData: ${JSON.stringify(pointData)}`,
    );
    canvas.appendChild(text);
  };

  button2.onclick = () => {
    const [x, y] = [400, 200];
    const pointData = chart.getDataByXY({ x, y }, { shared: true });
    const text = createText(
      `X: ${x}, Y: ${y}\n\nEventData: ${JSON.stringify(pointData)}`,
    );
    canvas.appendChild(text);
  };

  return { chart, canvas, button1, button2, finished };
}
