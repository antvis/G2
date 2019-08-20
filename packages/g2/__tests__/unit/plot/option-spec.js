import { expect } from 'chai';
import { Plot } from '../../../src/';
import LineData from '../../data/line';

describe('Options test', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  let plot;
  afterEach(() => {
    plot.destroy();
  });

  after(() => {
    document.body.removeChild(div);
  });

  it('create a bar chart', () => {
    plot = new Plot({
      containerDOM: div,
      width: 400,
      height: 300,
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      options: {
        scales: {
          genre: {
            alias: '游戏种类',
          },
          sold: {
            alias: '销售量',
          }
        },
        elements: [
          {
            type: 'interval',
            position: {
              fields: [ 'genre', 'sold' ],
            },
            color: {
              fields: [ 'genre' ],
            },
          }
        ]
      },
    });

    plot.render();

    const elements = plot.get('elements');
    expect(elements.length).to.equal(1);
    expect(elements[0].get('shapeContainer').get('children').length).to.equal(5);
  });

  it('create view', () => {
    plot = new Plot({
      containerDOM: div,
      width: 400,
      height: 300,
      padding: 0,
      options: {
        coord: {
          type: 'polar',
          cfg: {
            innerRadius: 0.2,
          },
        },
        axes: false,
      },
    });

    // 创建 view
    plot.createView({
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      options: {
        elements: [ {
          type: 'interval',
          position: {
            fields: [ 'genre', 'sold' ],
          },
          color: {
            fields: [ 'genre' ],
          },
          label: {
            fields: [ 'sold' ],
            callback: () => {
              return {
                labelLine: true,
              };
            }
          }
        } ]
      }
    });

    plot.render();

    const views = plot.get('views');
    expect(views.length).to.equal(1);

    const view = views[0];
    expect(view.get('options').axes).to.be.false;
    expect(view.get('options').coord).to.eql({
      type: 'polar',
      cfg: {
        innerRadius: 0.2,
      },
    });

    const elements = view.get('elements');
    expect(elements.length).to.equal(1);
    expect(elements[0].get('shapeContainer').get('children').length).to.equal(5);
  });

  describe('guides options', () => {
    plot = new Plot({
      containerDOM: div,
      width: 400,
      height: 300,
      padding: [ 80, 50, 50 ],
      data: LineData,
      options: {
        scales: {
          year: {
            range: [ 0, 1 ],
            ticks: [ 1997, 1999, 2001, 2003, 2005, 2007, 2009, 2011, 2013, 2015, 2017 ],
          },
          value: {
            tickCount: 7,
            formatter: (val) => {
              return val.toFixed(1) + '%';
            }
          }
        },
        axes: {
          fields: {
            year: {
              tickLine: null,
            },
          }
        },
        legends: {
          position: 'top-center',
          fields: {
            type: {
              itemWidth: 80,
              layout: 'vertical',
            },
          },
        },
        annotations: [
          {
            type: 'region',
            top: false,
            start: [ 2011, 'max' ],
            end: [ 'max', 'min' ],
            style: {
              fill: '#1890ff',
              opacity: 0.3,
            }
          },
          {
            type: 'text',
            top: true,
            position: [ '2014', 'max' ],
            content: 'Scott administratio\n(2011 to present)',
            style: {
              fontSize: 12,
              textBaseline: 'top',
              textAlign: 'center',
            },
          },
        ],
        tooltip: {
          showTitle: false,
        },
        elements: [
          {
            type: 'line',
            position: {
              fields: [ 'year', 'value' ],
            },
            color: {
              fields: [ 'type' ],
              callback: (val) => {
                if (val === 'United States') {
                  return '#ccc';
                }
              },
            }
          }
        ]
      }
    });

    plot.render();

    const annotationsController = plot.get('annotationController');
    expect(annotationsController.annotations.length).to.equal(2);
    expect(annotationsController.frontgroundGroup.get('children').length).to.equal(1);
    expect(annotationsController.backgroundGroup.get('children').length).to.equal(1);

    const tooltipController = plot.get('tooltipController');
    expect(tooltipController.tooltip.get('showTitle')).to.be.false;

    plot.clear();
    expect(annotationsController.frontgroundGroup.destroyed).to.be.false;
    expect(annotationsController.backgroundGroup.destroyed).to.be.false;
  });
});
