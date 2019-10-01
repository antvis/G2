const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoordinate } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Annotation } = require('@antv/component');
const Controller = require('../../../../src/plot/controller/annotation').default;

const Cat = getScale('cat');
const Linear = getScale('linear');
const Rect = getCoordinate('Rect');

describe('Annotation Controller', () => {
  const xScales = {
    x: new Cat({
      range: [0.1, 0.9],
      values: ['a', 'b', 'c', 'd', 'e'],
      ticks: ['a', 'b', 'c', 'd', 'e'],
      field: 'x',
    }),
  };
  const yScales = {
    y1: new Linear({
      min: 100,
      max: 600,
      values: [250, 350, 150, 450, 550],
      ticks: [250, 350, 150, 450, 550],
      field: 'y1',
    }),
    y2: new Linear({
      min: 0,
      max: 100,
      values: [0, 20, 40, 60, 80, 100],
      ticks: [0, 20, 40, 60, 80, 100],
      field: 'y2',
    }),
  };
  const coord = new Rect({
    start: { x: 0, y: 200 },
    end: { x: 200, y: 0 },
  });
  const data = [
    { x: 'a', y1: 250 },
    { x: 'b', y1: 350 },
    { x: 'c', y1: 150 },
    { x: 'd', y1: 450 },
    { x: 'e', y1: 550 },
  ];
  const view = {
    filteredData: data,
    get(key) {
      return this[key];
    },
  };
  let controller, canvas, div;

  before(() => {
    div = document.createElement('div');
    div.id = 'test';
    document.body.appendChild(div);

    canvas = new Canvas({
      containerId: 'test',
      width: 200,
      height: 200,
    });
    view.canvas = canvas;
    controller = new Controller({
      xScales,
      yScales,
      view,
      frontgroundGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('init', () => {
    expect(controller).to.be.an.instanceOf(Controller);
    expect(controller.annotations).to.be.empty;
  });

  it('add null', () => {
    controller.add(null);
    expect(controller.annotations).to.be.empty;
  });

  it('add line', () => {
    controller.add(
      'line',
      {
        start: {
          x: 'a',
          y1: 250,
        },
        end: {
          x: 'd',
          y2: 50,
        },
        text: {
          content: '辅助线的辅助文本',
        },
      },
      true
    );
    expect(controller.options.length).to.equal(1);
    expect(controller.frontgroundGroup.get('children')).to.be.empty;
  });

  it('add image + region + text', () => {
    controller
      .add(
        'image',
        {
          start: {
            x: 'a',
            y1: 250,
          },
          src: 'http://gtms02.alicdn.com/tps/i2/TB1LEzAIVXXXXaZXFXXKC07OVXX-160-230.png',
          width: 50,
          height: 50,
        },
        false
      )
      .add(
        'region',
        {
          start: {
            x: 'a',
            y1: 250,
          },
          end: {
            x: 'e',
            y1: 550,
          },
        },
        false
      )
      .add(
        'text',
        {
          position: {
            x: 'b',
            y1: 350,
          },
          content: '我是一条美丽的文本。',
        },
        true
      )
      .add(
        'html',
        {
          position: {
            x: 'e',
            y1: 550,
          },
          alignX: 'left',
          alignY: 'top',
          html: '<div>哈哈你妹呀</div>',
        },
        false
      )
      .add(
        'dataRegion',
        {
          start: {
            x: 'b',
            y1: 350,
          },
          end: {
            x: 'e',
            y1: 550,
          },
          content: '这是一个特殊的区域',
          region: {
            style: {
              lineWidth: 1,
              fill: '#1890ff',
              opacity: 0.5,
            },
          },
          text: {
            style: {
              fontSize: 18,
            },
          },
        },
        false
      )
      .add(
        'dataMarker',
        {
          position: ['50%', '50%'],
          text: {
            content: '请注意这一点',
          },
        },
        true
      );
    // arc只在极坐标系下才有意义就不加入了
    expect(controller.options.length).to.equal(7);
  });

  it('render', () => {
    controller.render(coord);
    expect(controller.annotations).to.have.lengthOf(7);
    expect(controller.get(0)).to.be.an.instanceOf(Annotation.Line);
    expect(controller.get(1)).to.be.an.instanceOf(Annotation.Image);
    expect(controller.get(2)).to.be.an.instanceOf(Annotation.Region);
    expect(controller.get(3)).to.be.an.instanceOf(Annotation.Text);
    expect(controller.get(4)).to.be.an.instanceOf(Annotation.Html);
    expect(controller.get(5)).to.be.an.instanceOf(Annotation.DataRegion);
    expect(controller.get(6)).to.be.an.instanceOf(Annotation.DataMarker);
    canvas.draw();
    expect(controller.frontgroundGroup.get('children')).to.have.lengthOf(3);
    expect(controller.backgroundGroup.get('children')).to.have.lengthOf(3);
    // html
    const dom = document.querySelector('.guide-annotation');
    expect(dom).to.be.an.instanceOf(HTMLElement);
  });

  it('hide', () => {
    controller.changeVisible(false);
    canvas.draw();
    for (const ann of controller.annotations) {
      expect(ann.get('visible')).to.be.false;
    }
  });

  it('clear', () => {
    controller.clear();
    expect(document.querySelector('.guide-annotation')).to.be.null;
    expect(controller.frontgroundGroup.get('children')).to.be.undefined;
    expect(controller.backgroundGroup.get('children')).to.be.undefined;
    expect(controller.annotations).to.be.empty;
    expect(controller.options).to.be.empty;
  });

  it('repaint', () => {
    controller = new Controller({
      xScales,
      yScales,
      view,
      theme: {
        annotation: {
          line: {
            line: {
              style: {
                stroke: 'red',
              },
            },
          },
        },
      },
      frontgroundGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
    });
    controller.add('line', {
      start: {
        x: 'a',
        y1: 'median',
      },
      end: {
        x: 'd',
        y1: 'median',
      },
    });
    expect(() => controller.repaint()).to.throw('need render first');
    controller.render(coord);
    canvas.draw();
    expect(controller.annotations.length).to.equal(1);

    const line = controller.get(0);
    expect(line.get('line').style).to.eql({ stroke: 'red' });
    expect(line.get('el').get('children').length).to.equal(1);
    expect(
      line
        .get('el')
        .get('children')[0]
        .attr('path')
    ).to.eql([['M', 20, 100], ['L', 140, 100]]);
    line.change({
      start: {
        x: 'a',
        y1: 500,
      },
      end: {
        x: 'd',
        y1: 500,
      },
    });
    controller.repaint();
    const newLine = controller.get(0);
    expect(controller.annotations.length).to.equal(1);
    expect(newLine.get('el').get('children').length).to.equal(1);
    expect(
      newLine
        .get('el')
        .get('children')[0]
        .attr('path')
    ).to.eql([['M', 20, 40], ['L', 140, 40]]);
  });
});
