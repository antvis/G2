import { Chart } from '../../../src';
import { createDiv, removeDom } from '../../util/dom';

describe('TooltipCrosshairs', () => {
  const container = createDiv();
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 }
  ];
  const chart = new Chart({
    container,
    autoFit: false,
    width: 400,
    height: 300,
    padding: 50,
  });
  chart.animate(false);
  chart.data(data);
  chart.scale('year', {
    range: [0, 1]
  });
  chart.scale('value', {
    nice: true,
  });
  chart.line().position('year*value');
  chart.point().position('year*value')
    .shape('circle')
    .style({
      stroke: '#fff',
      lineWidth: 1
    });
  chart.render();

  it('default, crosshairs is closed', () => {
    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);
    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(1);
    // @ts-ignore
    expect(tooltipController.yCrosshair).toBeUndefined();
    // @ts-ignore
    expect(tooltipController.xCrosshair).toBeUndefined();
  });

  it('show x crosshairs, but without text', () => {
    chart.tooltip({
      showCrosshairs: true,
    });
    chart.render(true);

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    expect(tooltipController.yCrosshair).toBeUndefined();
    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('start').x).toBe(point.x);
    expect(xCrosshair.get('start').y).toBe(chart.getCoordinate().end.y);
    expect(xCrosshair.get('end').x).toBe(point.x);
    expect(xCrosshair.get('end').y).toBe(chart.getCoordinate().start.y);
    expect(xCrosshair.get('text')).toBeNull();
  });

  it('show y crosshairs, but without text', () => {
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        type: 'y',
        line: {
          style: {
            linDash: [ 2 ],
          },
        },
      },
    });
    chart.render(true);

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    const yCrosshair = tooltipController.yCrosshair;
    expect(yCrosshair).toBeDefined();
    expect(yCrosshair.get('start').x).toBe(chart.getCoordinate().start.x);
    expect(yCrosshair.get('start').y).toBe(point.y);
    expect(yCrosshair.get('end').x).toBe(chart.getCoordinate().end.x);
    expect(yCrosshair.get('end').y).toBe(point.y);
    expect(yCrosshair.get('text')).toBeNull();
    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('visible')).toBeFalsy();
  });

  it('show x crosshairs, with text', () => {
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        text: {
          style: {
            textAlign: 'center'
          }
        },
      }
    });
    chart.render(true);

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    const yCrosshair = tooltipController.yCrosshair;
    expect(yCrosshair).toBeDefined();
    expect(yCrosshair.get('visible')).toBeFalsy();

    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('visible')).toBeTruthy();
    expect(xCrosshair.get('text')).not.toBeNull();
    expect(xCrosshair.get('text').content).toBe('1994');
  });

  it('show y crosshairs, with text', () => {
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        type: 'y',
        text: {
          style: {
            textAlign: 'right',
            fill: 'red',
          }
        },
      }
    });
    chart.render(true);

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    const yCrosshair = tooltipController.yCrosshair;
    expect(yCrosshair).toBeDefined();
    expect(yCrosshair.get('visible')).toBeTruthy();
    expect(yCrosshair.get('text')).not.toBeNull();
    expect(yCrosshair.get('text').content).toBe(5);
    expect(yCrosshair.get('text').style.textAlign).toBe('right');
    expect(yCrosshair.get('text').style.fill).toBe('red');

    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('visible')).toBeFalsy();
  });

  it('transpose coordinate', () => {
    chart.coordinate('rect').transpose();
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
        text: {
          style: {
            textAlign: 'right',
            fill: 'red',
          }
        },
      }
    });
    chart.render(true);

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    const yCrosshair = tooltipController.yCrosshair;
    expect(yCrosshair).toBeDefined();
    expect(yCrosshair.get('visible')).toBeTruthy();
    expect(yCrosshair.get('text')).not.toBeNull();
    expect(yCrosshair.get('text').content).toBe(5);
    expect(yCrosshair.get('text').style.textAlign).toBe('right');
    expect(yCrosshair.get('text').style.fill).toBe('red');
    expect(yCrosshair.get('start').x).toBe(point.x);
    expect(yCrosshair.get('start').y).toBe(chart.getCoordinate().end.y);
    expect(yCrosshair.get('end').x).toBe(point.x);
    expect(yCrosshair.get('end').y).toBe(chart.getCoordinate().start.y);

    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('visible')).toBeTruthy();
    expect(xCrosshair.get('text')).not.toBeNull();
    expect(xCrosshair.get('text').content).toBe('1994');
    expect(xCrosshair.get('start').x).toBe(chart.getCoordinate().start.x);
    expect(xCrosshair.get('start').y).toBe(point.y);
    expect(xCrosshair.get('end').x).toBe(chart.getCoordinate().end.x);
    expect(xCrosshair.get('end').y).toBe(point.y);
  });

  it('polar coordinate', () => {
    chart.clear();
    chart.coordinate('polar');
    chart.axis('value', {
      grid: null,
    });
    chart.data(data);
    chart.scale('year', {
      range: [0, 1]
    });
    chart.scale('value', {
      nice: true,
    });
    chart.line().position('year*value');
    chart.point().position('year*value')
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    const yCrosshair = tooltipController.yCrosshair;
    expect(yCrosshair).toBeDefined();
    expect(yCrosshair.get('visible')).toBeTruthy();
    expect(yCrosshair.get('text').content).toBe(5);
    expect(yCrosshair.get('text').style.textAlign).toBe('right');
    expect(yCrosshair.get('text').style.fill).toBe('red');
    expect(yCrosshair.get('type')).toBe('circle');
    expect(yCrosshair.get('radius')).toBeCloseTo(20);

    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('visible')).toBeTruthy();
    expect(xCrosshair.get('text')).not.toBeNull();
    expect(xCrosshair.get('text').content).toBe('1994');
    expect(xCrosshair.get('start').x).toBe(chart.getCoordinate().getCenter().x);
    expect(xCrosshair.get('start').y).toBe(chart.getCoordinate().getCenter().y);
    expect(xCrosshair.get('end').x).toBeCloseTo(270.71067811865476);
    expect(xCrosshair.get('end').y).toBeCloseTo(220.71067811865476);
  });

  it('follow cursor', () => {
    chart.tooltip({
      follow: true,
      shared: true,
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
        text: (type, defaultValue, a, b) => {
          if (type === 'x') {
            return {
              style: {
                textAlign: 'center',
                fill: 'red',
              },
              content: defaultValue,
            }
          }
          return {
            style: {
              textAlign: 'center',
              fill: 'red',
            },
            content: defaultValue.toFixed(0),
          };
        },
      }
    });
    chart.render(true);

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip({
      x: point.x,
      y: (point.y - 8)
    });

    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.guideGroup.getCount()).toBe(2);
    // @ts-ignore
    const yCrosshair = tooltipController.yCrosshair;
    expect(yCrosshair).toBeDefined();
    expect(yCrosshair.get('visible')).toBeTruthy();
    expect(yCrosshair.get('text').content).toBe('5');
    expect(yCrosshair.get('text').style.textAlign).toBe('center');
    expect(yCrosshair.get('text').style.fill).toBe('red');
    expect(yCrosshair.get('type')).toBe('circle');
    expect(yCrosshair.get('radius')).toBeCloseTo(15.418360159897189);

    // @ts-ignore
    const xCrosshair = tooltipController.xCrosshair;
    expect(xCrosshair).toBeDefined();
    expect(xCrosshair.get('visible')).toBeTruthy();
    expect(xCrosshair.get('text')).not.toBeNull();
    expect(xCrosshair.get('text').content).toBe('1994');
    expect(xCrosshair.get('start').x).toBe(chart.getCoordinate().getCenter().x);
    expect(xCrosshair.get('start').y).toBe(chart.getCoordinate().getCenter().y);
    expect(xCrosshair.get('end').x).toBeCloseTo(291.7226960394552);
    expect(xCrosshair.get('end').y).toBeCloseTo(189.8365037528862);
  });

  it('destroy', () => {
    const tooltipController = chart.getController('tooltip');
    tooltipController.destroy();

    // @ts-ignore
    expect(tooltipController.guideGroup).toBeNull();
    // @ts-ignore
    expect(tooltipController.xCrosshair).toBeNull();
    // @ts-ignore
    expect(tooltipController.yCrosshair).toBeNull();
  });

  afterAll(() => {
    chart.destroy();

    removeDom(container);
  });
});
