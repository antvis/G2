import 'jest-extended';
import { Chart } from '../../src/chart';
import { COMPONENT_TYPE } from '../../src/constant';
import { delay } from '../util/delay';
import { createDiv } from '../util/dom';

const DATA = [
  {
    Time: '0:00',
    Count: 489,
  },
  {
    Time: '1:00',
    Count: 389,
  },
  {
    Time: '2:00',
    Count: 0,
  },
  {
    Time: '3:00',
    Count: 0,
  },
  {
    Time: '4:00',
    Count: 0,
  },
  {
    Time: '5:00',
    Count: 0,
  },
  {
    Time: '6:00',
    Count: 0,
  },
  {
    Time: '7:00',
    Count: 0,
  },
  {
    Time: '8:00',
    Count: 632,
  },
  {
    Time: '9:00',
    Count: 2250,
  },
  {
    Time: '10:00',
    Count: 2858,
  },
  {
    Time: '11:00',
    Count: 3287,
  },
  {
    Time: '12:00',
    Count: 2899,
  },
];

describe('dataMarker', () => {
  const container = createDiv();

  const chart = new Chart({
    container,
    autoFit: true,
    height: 500,
  });

  chart.data(DATA);
  chart.line().position('Time*Count');

  chart.render();

  it('dataMarker annotation over view', async () => {
    chart.annotation().dataMarker({
      position: ['9:00', 2250],
      text: {
        content: 'value：2250',
        style: {
          textAlign: 'left',
        },
      },
      point: {
        style: {
          fill: 'red',
          stroke: 'red',
        },
      },
      line: {
        length: 20,
      },
    });

    chart.option('slider', {
      start: 0,
      end: 1,
    });

    chart.render();
    let dataMarker = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    await delay(60);
    expect(dataMarker.get('visible')).not.toEqual(false);

    chart.option('slider', {
      start: 0,
      end: 0.5,
    });

    chart.render();

    dataMarker = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    await delay(60);
    expect(dataMarker.get('visible')).toEqual(false);
  });
});