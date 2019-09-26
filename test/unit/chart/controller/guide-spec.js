const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Scale = require('@antv/scale');
const Coord = require('@antv/coord/lib/index');
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
    ticks: [ 'a', 'b', 'c', 'd', 'e' ],
    field: 'x'
  });
  const yScale1 = Scale.linear({
    min: 100,
    max: 600,
    values: [ 250, 350, 150, 450, 550 ],
    ticks: [ 250, 350, 150, 450, 550 ],
    field: 'y1'
  });
  const yScale2 = Scale.linear({
    min: 0,
    max: 100,
    values: [ 0, 20, 40, 60, 80, 100 ],
    ticks: [ 0, 20, 40, 60, 80, 100 ],
    field: 'y2'
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

  const data = [
    { x: 'a', y1: 250 },
    { x: 'b', y1: 350 },
    { x: 'c', y1: 150 },
    { x: 'd', y1: 450 },
    { x: 'e', y1: 550 }
  ];

  const view = {
    data,
    get() {
      return this.data;
    }
  };

  let guideController;

  it('Initialization.', () => {
    guideController = new GuideController({
      backContainer,
      frontContainer,
      xScales,
      yScales,
      view
    });
    expect(guideController).to.be.an.instanceof(GuideController);
    expect(guideController.guides).to.be.empty;
  });

  it('添加辅助线, line', () => {
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
      },
      top: true
    };
    guideController.line(lineCfg);

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(1);
    expect(guidesOptions[0]).to.eql({
      type: 'line',
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
      },
      top: true
    });
  });

  it('添加图片, image', () => {
    guideController.image({
      start: {
        x: 'a',
        y1: 250
      },
      src: 'http://gtms02.alicdn.com/tps/i2/TB1LEzAIVXXXXaZXFXXKC07OVXX-160-230.png',
      width: 50,
      height: 50
    });
    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(2);

    expect(guidesOptions[1]).to.eql({
      type: 'image',
      start: {
        x: 'a',
        y1: 250
      },
      src: 'http://gtms02.alicdn.com/tps/i2/TB1LEzAIVXXXXaZXFXXKC07OVXX-160-230.png',
      width: 50,
      height: 50
    });
  });

  it('添加框, region', () => {
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
    expect(guidesOptions.length).to.equal(3);
    expect(guidesOptions[2]).to.eql({
      type: 'region',
      start: {
        x: 'a',
        y1: 250
      },
      end: {
        x: 'e',
        y1: 550
      }
    });
  });

  it('添加文本, text', () => {
    guideController.text({
      position: {
        x: 'b',
        y1: 350
      },
      content: '我是一条美丽的文本。',
      top: true
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(4);
    expect(guidesOptions[3]).to.eql({
      type: 'text',
      position: {
        x: 'b',
        y1: 350
      },
      content: '我是一条美丽的文本。',
      top: true
    });
  });

  it('添加垂直于 x 轴的辅助线', () => {
    guideController.line({
      start: {
        x: 'd',
        y1: 'min'
      },
      end: {
        x: 'd',
        y1: 'max'
      },
      top: true
    });
    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(5);
    expect(guidesOptions[4]).to.eql({
      type: 'line',
      start: {
        x: 'd',
        y1: 'min'
      },
      end: {
        x: 'd',
        y1: 'max'
      },
      top: true
    });
  });

  it('添加中间段水平辅助线', () => {
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
      },
      top: true
    });
    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(6);
    expect(guidesOptions[5]).to.eql({
      type: 'line',
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
      },
      top: true
    });
  });

  it('动态文本', () => {
    guideController.text({
      content: '我是一条动态的文本。',
      style: {
        fill: 'red',
        textAlign: 'center',
        fontSize: 20
      },
      position: (xScales, yScales) => {
        return {
          x: xScales.x.values[0],
          y1: yScales.y1.min
        };
      },
      top: true // 展示在最上层
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(7);
    expect(guidesOptions[6].type).to.equal('text');
    expect(guidesOptions[6].position).to.be.an.instanceOf(Function);
  });

  it('添加html.', () => {
    guideController.html({
      position: {
        x: 'e',
        y1: 550
      },
      alignX: 'left',
      alignY: 'top',
      htmlContent: '<div>哈哈你妹呀</div>'
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(8);
    expect(guidesOptions[7]).to.eql({
      type: 'html',
      position: {
        x: 'e',
        y1: 550
      },
      alignX: 'left',
      alignY: 'top',
      htmlContent: '<div>哈哈你妹呀</div>'
    });
  });

  it('添加 DataRegion', () => {
    guideController.dataRegion({
      start: {
        x: 'b',
        y1: 350
      },
      end: {
        x: 'e',
        y1: 550
      },
      content: '这是一个特殊的区域',
      style: {
        region: {
          lineWidth: 1,
          fill: '#1890ff',
          opacity: 0.5
        },
        text: {
          fontSize: 18
        }
      },
      top: false
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(9);
    expect(guidesOptions[8]).to.eql({
      type: 'dataRegion',
      start: {
        x: 'b',
        y1: 350
      },
      end: {
        x: 'e',
        y1: 550
      },
      content: '这是一个特殊的区域',
      style: {
        region: {
          lineWidth: 1,
          fill: '#1890ff',
          opacity: 0.5
        },
        text: {
          fontSize: 18
        }
      },
      top: false
    });
  });

  it('绘制 DataMarker', () => {
    guideController.dataMarker({
      top: true,
      position: [ '50%', '50%' ],
      content: '请注意这一点'
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(10);
    expect(guidesOptions[9]).to.eql({
      type: 'dataMarker',
      top: true,
      position: [ '50%', '50%' ],
      content: '请注意这一点'
    });
  });

  it('绘制 Arc', () => {
    guideController.arc({
      start: [ 0, 'min' ],
      end: [ 4, 'max' ]
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(11);
    expect(guidesOptions[10]).to.eql({
      type: 'arc',
      start: [ 0, 'min' ],
      end: [ 4, 'max' ]
    });
    guidesOptions.pop();
  });

  it('绘制 RegionFilter', () => {
    // guideController.clear();
    guideController.regionFilter({
      start: [ '0%', '0%' ],
      end: [ '50%', '50%' ],
      color: 'red'
    });

    const guidesOptions = guideController.options;
    expect(guidesOptions.length).to.equal(11);
    expect(guidesOptions[10]).to.eql({
      type: 'regionFilter',
      start: [ '0%', '0%' ],
      end: [ '50%', '50%' ],
      color: 'red'
    });
    guidesOptions.pop();
  });

  it('绘制.', () => {
    guideController.render(coord);
    canvas.draw();

    const dom = div.getElementsByClassName('g-guide');
    expect(dom).not.to.be.empty;
    expect(dom.length).to.equal(1);

    // @2019-01-18 by blue.lb 由于这里我去掉了frontGroup和backGroup，调整一下test直接获取frontContainer和backContainer
    // const frontGroup = guideController.frontContainer;
    // const backGroup = guideController.backContainer;
    const frontGroup = guideController.frontGroup;
    const backGroup = guideController.backGroup;
    expect(frontGroup.get('children').length).to.equal(6); // 文本默认在最上面
    expect(backGroup.get('children').length).to.equal(3);
  });

  it('changeVisible', () => {
    guideController.changeVisible(false);
    canvas.draw();

    const guides = guideController.guides;
    for (let i = 0; i < guides.length; i++) {
      const guide = guides[i];
      expect(guide.get('visible')).to.be.false;
    }
  });

  it('clear', () => {
    guideController.clear();
    const dom = div.getElementsByClassName('g-guide');

    expect(guideController.options.length).to.equal(0);
    expect(dom).to.be.empty;
    expect(canvas.get('children').length).to.equal(2);
    expect(frontContainer.get('children').length).to.equal(0);
    expect(backContainer.get('children').length).to.equal(0);

    const guides = guideController.guides;
    expect(guides.length).to.equal(0);
  });

  it('destroy', () => {
    canvas.destroy();
  });
});
