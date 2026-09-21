import * as G2 from '@antv/g2';

const { Chart, PLOT_CLASS_NAME, ELEMENT_CLASS_NAME, register } = G2;

register('interaction.customElementHighlight', () => {
  return (context, _, emitter) => {
    const { container } = context;
    const plotArea = container.querySelector(`.${PLOT_CLASS_NAME}`);
    const elements = plotArea.querySelectorAll(`.${ELEMENT_CLASS_NAME}`);
    const elementSet = new Set(elements);

    const pointerover = (e) => {
      const { target: element } = e;
      if (!elementSet.has(element)) return;
      element.style.stroke = 'red';
      element.style.lineWidth = 2;
    };

    const pointerout = (e) => {
      const { target: element } = e;
      if (!elementSet.has(element)) return;
      element.style.stroke = null;
    };

    plotArea.addEventListener('pointerover', pointerover);
    plotArea.addEventListener('pointerout', pointerout);
    return () => {
      plotArea.removeEventListener('pointerover', pointerover);
      plotArea.removeEventListener('pointerout', pointerout);
    };
  };
});

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ],
  transform: [{ type: 'dodgeX' }],
  encode: { x: '月份', y: '月均降雨量', color: 'name' },
  interaction: { customElementHighlight: true },
});

chart.render();
