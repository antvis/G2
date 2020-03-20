import { Chart } from '../../../../src';
import { createDiv } from '../../../util/dom';

describe('statechange', () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const chart = new Chart({
    container: createDiv(),
    autoFit: true,
    height: 500,
  });

  chart.data(data);

  chart.tooltip({
    showMarkers: false,
  });

  const interval = chart.interval().position('year*value');
  chart.render();

  it('emit element:statechange', () => {
    let eventObj;
    const fn = jest.fn();
    chart.on('element:statechange', (e) => {
      eventObj = e;
      fn();
    });

    const element = interval.elements[0];
    element.setState('active', true);
    expect(eventObj.gEvent.originalEvent.state).toBe('active');
    expect(eventObj.gEvent.originalEvent.stateStatus).toBe(true);
    expect(eventObj.gEvent.originalEvent.element).toEqual(element);

    element.setState('active', false);
    expect(eventObj.gEvent.originalEvent.state).toBe('active');
    expect(eventObj.gEvent.originalEvent.stateStatus).toBe(false);

    // 状态未变化
    element.setState('active', false);
    expect(fn).toBeCalledTimes(2);
  });

  afterAll(() => {
    chart.destroy();
  });
});
