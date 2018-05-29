const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer2d');
const Scale = require('../../../../src/scale/index');
const Coord = require('../../../../src/coord/index');
const GuideController = require('../../../../src/chart/controller/guide');

const div = document.createElement('div');
div.id = 'guideTest';
document.body.appendChild(div);

describe('GuideController', function() {
  const canvas = new Canvas({
    containerId: 'guideTest',
    width: 200,
    height: 200
  });
  const frontContainer = canvas.addGroup();
  const backContainer = canvas.addGroup();

  const xScale = Scale.cat({
    range: [ 0.1, 0.9 ],
    values: [ 'a', 'b', 'c', 'd', 'e' ],
    ticks: [ 'a', 'b', 'c', 'd', 'e' ]
  });
  const yScale1 = Scale.linear({
    min: 100,
    max: 600,
    values: [ 250, 350, 150, 450, 550 ],
    ticks: [ 250, 350, 150, 450, 550 ]
  });
  const yScale2 = Scale.linear({
    min: 0,
    max: 100,
    values: [ 0, 20, 40, 60, 80, 100 ],
    ticks: [ 0, 20, 40, 60, 80, 100 ]
  });


  const xScales = {
    x: xScale
  };
  const yScales = {
    y1: yScale1,
    y2: yScale2
  };

  const coord = new Coord.Rect({
    start: {
      x: 0,
      y: 200
    },
    end: {
      x: 200,
      y: 0
    }
  });

  let guideController;

  it('Initialization.', function() {
    guideController = new GuideController({
      backContainer,
      frontContainer,
      xScales,
      yScales
    });
    expect(guideController).to.be.an.instanceof(GuideController);
    expect(guideController.guides).to.be.empty;
  });

  it('添加辅助线, line', function() {
    const lineCfg = {
      start: {
        x: 'a',
        y1: 250
      },
      end: {
        x: 'd',
        y2: 50
      },
      text: {
        content: '辅助线的辅助文本'
      }
    };
    guideController.line(lineCfg);

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(1);
    expect(guidesOptions[0].type).to.equal('line');
    expect(lineCfg).to.eql({
      start: {
        x: 'a',
        y1: 250
      },
      end: {
        x: 'd',
        y2: 50
      },
      text: {
        content: '辅助线的辅助文本'
      }
    });
  });

  it('添加图片, image', function() {
    guideController.image({
      start: {
        x: 'a',
        y1: 250
      },
      src: 'http://gtms02.alicdn.com/tps/i2/TB1LEzAIVXXXXaZXFXXKC07OVXX-160-230.png',
      width: 50,
      height: 50
    });

    guideController.image({
      start: {
        x: 'c',
        y1: 150
      },
      end: {
        x: 'e',
        y1: 550
      },
      src: 'http://gtms02.alicdn.com/tps/i2/TB1LEzAIVXXXXaZXFXXKC07OVXX-160-230.png'
    });

    guideController.image({
      start: {
        x: 'c',
        y1: 150
      },
      src: 'http://gtms02.alicdn.com/tps/i2/TB1LEzAIVXXXXaZXFXXKC07OVXX-160-230.png'
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(4);
  });

  it('添加框, region', function() {
    guideController.region({
      start: {
        x: 'a',
        y1: 250
      },
      end: {
        x: 'e',
        y1: 550
      }
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(5);
  });

  it('添加文本, text', function() {
    guideController.text({
      start: {
        x: 'b',
        y1: 350
      },
      content: '我是一条美丽的文本。'
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(6);
  });

  it('添加垂直于 x 轴的辅助线', function() {
    guideController.line({
      start: {
        x: 'd',
        y1: 'min'
      },
      end: {
        x: 'd',
        y1: 'max'
      }
    });
    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(7);
  });

  it('添加中间段水平辅助线', function() {
    guideController.line({
      start: {
        x: 'a',
        y1: 'median'
      },
      end: {
        x: 'd',
        y1: 'median'
      },
      lineStyle: {
        stroke: 'red',
        lineWidth: 3
      }
    });
    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(8);
  });

  it('动态文本', function() {
    guideController.text({
      content: '我是一条动态的文本。',
      style: {
        fill: 'red',
        textAlign: 'center',
        fontSize: 20
      },
      start: (xScales, yScales) => {
        return {
          x: xScales.x.values[0],
          y1: yScales.y1.min
        };
      },
      top: true // 展示在最上层
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(9);
  });


  it('添加html.', function() {
    guideController.html({
      position: {
        x: 'e',
        y1: 550
      },
      alignX: 'left',
      alignY: 'top',
      html: '<div>哈哈你妹呀</div>'
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(10);
  });

  it('绘制.', function() {
    guideController.render(coord);
    canvas.draw();

    const dom = div.getElementsByClassName('g-guide');
    expect(dom).not.to.be.empty;
    expect(dom.length).to.equal(1);
    expect(frontContainer.get('children').length).to.equal(1);
    expect(backContainer.get('children').length).to.equal(8);
  });

  it('clear', function() {
    guideController.clear();
    const dom = div.getElementsByClassName('g-guide');

    expect(guideController.options.length).to.equal(0);
    expect(dom).to.be.empty;
    expect(canvas.get('children').length).to.equal(2);
    expect(frontContainer.get('children').length).to.equal(0);
    expect(backContainer.get('children').length).to.equal(0);
  });

  it('destroy', function() {
    canvas.destroy();
  });
});
