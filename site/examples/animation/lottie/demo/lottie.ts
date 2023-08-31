import { Chart } from '@antv/g2';
import { loadAnimation } from '@antv/g-lottie-player';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .animate('enter', { type: 'fadeIn', duration: 1000 })
  .animate('exit', { type: 'fadeOut', duration: 2000 });

chart.render();

(async () => {
  const { canvas } = chart.getContext();
  await canvas.ready;

  const lottieJSON = await fetch(
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*C9f6TaadHikAAAAAAAAAAAAADmJ7AQ',
  ).then((res) => res.json());
  const animation = loadAnimation(lottieJSON, { loop: true, autoplay: true });
  const wrapper = animation.render(canvas);
  wrapper.scale(0.5);
  wrapper.translate(160, 100);
})();
