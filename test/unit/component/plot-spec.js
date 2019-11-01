const expect = require('chai').expect;
const PlotBack = require('../../../src/component/plot');
const { Canvas } = require('../../../src/renderer');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'c1',
  width: 500,
  height: 500,
  pixelRatio: 1
});

describe('绘制区域 plotRange', () => {
  const plotback = canvas.addGroup(PlotBack, {
    padding: 30,
    background: {
      stroke: '#ededed'
    },
    plotBackground: {
      fill: '#eee',
      stroke: '#fff'
    }
  });
  canvas.draw();

  it('plotrange', () => {
    const plotRange = plotback.get('plotRange');
    expect(plotRange).not.to.be.undefined;
    expect(plotRange.tl.x).to.equal(30);
    expect(plotRange.tl.y).to.equal(30);
    expect(plotRange.br.x).to.equal(470);
    expect(plotRange.br.y).to.equal(470);
  });

  it('border', () => {
    const rect = plotback.get('backgroundShape');
    expect(rect).not.to.be.undefined;
    expect(rect.attr('x')).to.equal(0);
    expect(rect.attr('y')).to.equal(0);
    expect(rect.attr('width')).to.equal(canvas.get('width'));
  });

  it('background', () => {
    const plotBackShape = plotback.get('plotBackShape');
    expect(plotBackShape.attr('x')).to.equal(30);
    expect(plotBackShape.attr('y')).to.equal(30);
    expect(plotBackShape.attr('width')).to.equal(canvas.get('width') - 30 * 2);
  });

  it('change margin', done => {
    setTimeout(() => {
      plotback.set('padding', [ 20, 40 ]);
      plotback.repaint();
      canvas.draw();
      const plotRange = plotback.get('plotRange');
      expect(plotRange.tl.x).to.equal(40);
      expect(plotRange.tl.y).to.equal(20);
      expect(plotRange.br.x).to.equal(460);
      expect(plotRange.br.y).to.equal(480);
      done();
    }, 500);
  });

  it('padding is an array like [ 20, 40, 20, 40 ]', () => {
    canvas.clear();

    const plotback = canvas.addGroup(PlotBack, {
      padding: [ 20, 40, 20, 40 ],
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });

    canvas.draw();
    const plotRange = plotback.get('plotRange');
    expect(plotRange.tl.x).to.equal(40);
    expect(plotRange.tl.y).to.equal(20);
    expect(plotRange.br.x).to.equal(460);
    expect(plotRange.br.y).to.equal(480);
  });

  it('padding is an array like [a, b]', () => {
    canvas.clear();

    const plotback = canvas.addGroup(PlotBack, {
      padding: [ 20, 40 ],
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });
    canvas.draw();

    const plotRange = plotback.get('plotRange');
    expect(plotRange.tl.x).to.equal(40);
    expect(plotRange.tl.y).to.equal(20);
    expect(plotRange.br.x).to.equal(460);
    expect(plotRange.br.y).to.equal(480);
  });

  it('padding is an array like [a]', () => {
    canvas.clear();

    const plotback = canvas.addGroup(PlotBack, {
      padding: [ 20 ],
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });

    canvas.draw();

    const plotRange = plotback.get('plotRange');
    expect(plotRange.tl.x).to.equal(20);
    expect(plotRange.tl.y).to.equal(20);
    expect(plotRange.br.x).to.equal(480);
    expect(plotRange.br.y).to.equal(480);
  });

  it('padding is an array like [a, b, c]', () => {
    canvas.clear();

    const plotback = canvas.addGroup(PlotBack, {
      padding: [ 20, 80, 20 ],
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });

    canvas.draw();

    const plotRange = plotback.get('plotRange');
    expect(plotRange.tl.x).to.equal(80);
    expect(plotRange.tl.y).to.equal(20);
    expect(plotRange.br.x).to.equal(420);
    expect(plotRange.br.y).to.equal(480);
  });

  it('padding value is like 1%', () => {
    canvas.clear();

    const plotback = canvas.addGroup(PlotBack, {
      padding: [ '2%', '8%', '2%' ],
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });

    canvas.draw();

    const plotRange = plotback.get('plotRange');
    expect(plotRange.tl.x).to.equal(40);
    expect(plotRange.tl.y).to.equal(10);
    expect(plotRange.br.x).to.equal(460);
    expect(plotRange.br.y).to.equal(490);
  });

  it('padding is object', () => {
    canvas.clear();

    const plotback = canvas.addGroup(PlotBack, {
      padding: {
        top: 20,
        right: 80,
        bottom: 20
      },
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });

    canvas.draw();

    const plotRange = plotback.get('plotRange');
    expect(plotRange.tl.x).to.equal(0);
    expect(plotRange.tl.y).to.equal(20);
    expect(plotRange.br.x).to.equal(420);
    expect(plotRange.br.y).to.equal(480);
  });

  it('change canvas width,height', done => {
    const plotback = canvas.addGroup(PlotBack, {
      padding: [ 20, 40, 20 ],
      background: {
        stroke: '#ededed'
      },
      plotBackground: {
        fill: '#eee',
        stroke: '#fff'
      }
    });
    setTimeout(() => {
      canvas.changeSize(300, 300);
      plotback.repaint();
      canvas.draw();
      const plotRange = plotback.get('plotRange');

      expect(plotRange.tl.x).to.equal(40);
      expect(plotRange.tl.y).to.equal(20);
      expect(plotRange.br.x).to.equal(260);
      expect(plotRange.br.y).to.equal(280);
      done();
    }, 500);
  });
});

describe('plotback image', () => {
  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500,
    pixelRatio: 1
  });
  const plotback = canvas.addGroup(PlotBack, {
    padding: 30,
    background: {
      stroke: '#ededed'
    },
    plotBackground: {
      image: 'http://builive.com/assets/img/java.png'
    }
  });

  canvas.draw();

  const plotRange = plotback.get('plotRange');

  it('image', () => {
    const plotBackShape = plotback.get('plotBackShape');
    expect(plotBackShape.attr('x')).to.equal(30);
    expect(plotBackShape.attr('y')).to.equal(30);
    expect(plotBackShape.attr('width')).to.equal(canvas.get('width') - 30 * 2);
  });

  it('change', done => {
    setTimeout(() => {
      canvas.changeSize(300, 300);
      plotback.repaint();
      canvas.draw();

      expect(plotRange.tl.x).to.equal(30);
      expect(plotRange.tl.y).to.equal(30);
      expect(plotRange.br.x).to.equal(270);
      expect(plotRange.br.y).to.equal(270);
      done();
    }, 500);
  });

});
