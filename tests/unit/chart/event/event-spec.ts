import { Chart, Event, View } from '../../../../src';
import { Event as GEvent } from '../../../../src/dependents';
import { CITY_SALE } from '../../../util/data';
import { createDiv } from '../../../util/dom';

const div = createDiv();

const chart = new Chart({
  container: div,
  width: 800,
  height: 600,
  padding: 10,
});

chart.data(CITY_SALE);

chart
  // @ts-ignore
  .interval()
  .position('city*sale')
  .color('category');

chart.render();

describe('Event', () => {
  it('component event', () => {
    // 等待联调
    expect(1).toBe(1);
  });

  it('geometry event', () => {
    // 等待联调
    expect(1).toBe(1);
  });

  it('plot event', () => {
    chart.on('*', function(e) {
      console.log(e);
    });
    chart.on('plotenter', (e) => {
      console.log(1, e);
    });
    chart.on('plotmove', (e) => {
      console.log(2, e);
    });
    chart.on('plotleave', (e) => {
      console.log(3, e);
    });
  });

  it('event bubbling', () => {});
});
