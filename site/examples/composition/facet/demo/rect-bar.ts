import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  paddingLeft: 40,
  paddingBottom: 40,
});

const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
const mockData = () => {
  const names = ['Eat', 'Play', 'Sleep'];
  const week = (date) => {
    const currentDate = date.getDate();
    const newDate = new Date(date);
    const firstDay = new Date(newDate.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
  };
  const day = (date) => date.getDay();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2022, 5, i + 1);
    return names.map((name) => ({
      activity: name,
      value: Math.random(),
      week: `${week(date)}`,
      day: days[day(date)],
    }));
  }).flat(Infinity);
};

const facetRect = chart
  .facetRect()
  .data(mockData())
  .encode('x', 'day')
  .encode('y', 'week')
  .scale('x', { domain: days })
  .legend('color', { position: 'right' })
  .attr('paddingRight', 100);

facetRect
  .interval()
  .transform({ type: 'stackY' })
  .axis('x', { labelAutoRotate: false })
  .encode('x', 'activity')
  .encode('y', 'value')
  .encode('color', 'activity');

chart.render();
