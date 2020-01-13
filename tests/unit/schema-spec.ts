import { Chart } from '../../src';
import { COMPONENT_TYPE } from '../../src/constant';
import { createDiv, removeDom } from '../util/dom';

describe('Schema', () => {
  const div = createDiv();
  let chart;

  it('use schema to create a chart', () => {
    chart = new Chart({
      container: div,
      autoFit: false,
      width: 400,
      height: 300,
      padding: 12,
      options: {
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        scales: {
          genre: { alias: '游戏种类' },
          sold: { alias: '销售量' },
        },
        geometries: [
          {
            type: 'interval',
            position: 'genre*sold',
            color: 'genre',
          },
        ],
        interactions: [{ type: 'active-region' }],
      },
    });

    chart.render();

    expect(chart.geometries.length).toBe(1);
    expect(chart.geometries[0].container.getCount()).toBe(5);
    expect(chart.getXScale().alias).toBe('游戏种类');
    expect(chart.getYScales()[0].alias).toBe('销售量');
    expect(chart.getComponents().length).toBe(4);
    expect(chart.interactions['active-region']).toBeDefined();
  });

  it('create views', () => {
    chart.clear();
    chart.updateOptions({
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
      ],
      scales: {
        sales: { tickInterval: 20 },
      },
      geometries: [
        {
          type: 'interval',
          position: 'year*sales',
          color: '#F6BD16',
        },
      ],
      views: [
        {
          padding: 0,
          options: {
            axes: false,
            tooltip: false,
            geometries: [
              {
                type: 'line',
                position: 'year*sales',
                style: {
                  lineWidth: 4,
                  stroke: '#6DC8EC',
                },
              },
            ],
          },
        },
      ],
    });

    chart.render();

    expect(chart.geometries.length).toBe(1);
    expect(chart.views.length).toBe(1);
    expect(chart.views[0].geometries.length).toBe(1);

    const view = chart.views[0];
    expect(view.getComponents().length).toBe(0);
    expect(view.getYScales()[0].tickInterval).toBe(20);
    expect(chart.geometries[0].data).toEqual(view.geometries[0].data);
  });

  it('coordinate and annotation', () => {
    chart.destroy();

    chart = new Chart({
      container: div,
      autoFit: false,
      width: 400,
      height: 300,
      padding: 12,
      options: {
        data: [
          { country: '巴西', population: 18203 },
          { country: '印尼', population: 23489 },
          { country: '美国', population: 29034 },
          { country: '印度', population: 104970 },
          { country: '中国', population: 131744 },
        ],
        coordinate: {
          type: 'rect',
          actions: [['transpose']],
        },
        geometries: [
          {
            type: 'interval',
            position: 'country*population',
          },
        ],
        annotations: [
          {
            type: 'region',
            start: ['start', 'max'],
            end: ['end', 100000],
            style: {
              lineWidth: 0,
              fill: '#dcdcdc',
              fillOpacity: 0.3,
              stroke: '#ccc',
            },
          },
          {
            type: 'text',
            top: true,
            position: ['end', 'max'],
            content: '达标区间',
            style: {
              fill: '#aaaaaa',
              textAlign: 'end',
              textBaseline: 'top',
              fontWeight: 300,
            },
            offsetX: -10,
            offsetY: 6,
          },
        ],
      },
    });

    chart.render();
    expect(chart.getCoordinate().isTransposed).toBe(true);
    const annotations = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION);
    expect(annotations.length).toBe(2);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
