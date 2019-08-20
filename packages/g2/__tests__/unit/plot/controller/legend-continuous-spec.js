import { expect } from 'chai';
import View from '../../../../src/plot/view';
import { Canvas } from '@antv/g';

const data = [
  { x: 1, y: 11, size: 10, color: 10 },
  { x: 2, y: 10, size: 11, color: 11 },
  { x: 3, y: 9, size: 12, color: 12 },
  { x: 4, y: 8, size: 13, color: 13 },
  { x: 5, y: 7, size: 1, color: 1 },
  { x: 6, y: 6, size: 3, color: 2 },
  { x: 7, y: 5, size: 4, color: 4 },
  { x: 8, y: 4, size: 5, color: 5 },
  { x: 9, y: 3, size: 8, color: 7 },
  { x: 10, y: 2, size: 10, color: 10 },
  { x: 11, y: 1, size: 9, color: 8 },
];

describe('legend-controller', () => {
  describe('legend controller size', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const canvas = new Canvas({
      containerDOM: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
    });

    const view = new View({
      canvas,
      container: canvas.addGroup(),
      width: 500,
      height: 500,
      animate: false,
    });

    view.data(data);

    view
      .point()
      .position({ fields: [ 'x', 'y' ]})
      .shape('circle')
      .size({ fields: [ 'size' ]});

    const lc = view.get('legendController');

    it('init', () => {
      view.legend('size', {
        showTitle: true,
      });

      view.render();

      expect(lc.legends.length).to.be.equal(1);

      expect(lc.legends[0].get('type')).to.be.equal('size-legend');
      expect(lc.legends[0].get('height')).to.be.equal(16);
      expect(lc.legends[0].get('layout')).to.be.equal('horizontal');

      // expect(lc.legends[0].get('slider').min).to.be.equal(0);
      // expect(lc.legends[0].get('slider').max).to.be.equal(13);

      expect(lc.legends[0].get('title')).to.be.equal('size');
    });

    it('left non-horizontal', () => {
      view.legend('size', {
        position: 'left-center',
        layout: 'vertical',
      });

      view.render();

      expect(lc.legends.length).to.be.equal(1);

      expect(lc.legends[0].get('type')).to.be.equal('size-legend');
      expect(lc.legends[0].get('height')).to.be.equal(156);
      expect(lc.legends[0].get('layout')).to.be.equal('vertical');

      // expect(lc.legends[0].get('slider').min).to.be.equal(0);
      // expect(lc.legends[0].get('slider').max).to.be.equal(13);
    });

    after(() => {
      canvas.destroy();
      document.body.removeChild(div);
    });
  });

});

describe('legend controller color', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerDOM: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    animate: false,
  });

  const view = new View({
    canvas,
    container: canvas.addGroup(),
    width: 500,
    height: 500,
  });

  view.data(data);

  view
    .point()
    .position({ fields: [ 'x', 'y' ]})
    .shape('circle')
    .color({ fields: [ 'color' ]});

  const lc = view.get('legendController');

  it('init', () => {

    view.legend('color', {
      showTitle: true,
    });

    view.render();

    expect(lc.legends.length).to.be.equal(1);

    expect(lc.legends[0].get('type')).to.be.equal('color-legend');
    expect(lc.legends[0].get('height')).to.be.equal(16);
    expect(lc.legends[0].get('layout')).to.be.equal('horizontal');

    // expect(lc.legends[0].get('slider').min).to.be.equal(0);
    // expect(lc.legends[0].get('slider').max).to.be.equal(13);

    expect(lc.legends[0].get('title')).to.be.equal('color');
  });

  it('left non-horizontal', () => {
    view.legend('color', {
      position: 'left-center',
      layout: 'vertical',
    });

    view.render();

    expect(lc.legends.length).to.be.equal(1);

    expect(lc.legends[0].get('type')).to.be.equal('color-legend');
    expect(lc.legends[0].get('height')).to.be.equal(156);
    expect(lc.legends[0].get('layout')).to.be.equal('vertical');

    // expect(lc.legends[0].get('slider').min).to.be.equal(0);
    // expect(lc.legends[0].get('slider').max).to.be.equal(13);
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});


describe('legend controller size & color', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerDOM: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
  });

  const view = new View({
    canvas,
    container: canvas.addGroup(),
    width: 500,
    height: 500,
    animate: false,
  });

  view.data(data);

  view
    .point()
    .position({ fields: [ 'x', 'y' ]})
    .shape('circle')
    .color({ fields: [ 'color' ]})
    .size({ fields: [ 'size' ]});

  const lc = view.get('legendController');

  it('init', () => {

    view.legend('size', {
      showTitle: true,
    });

    view.legend('color', {
      position: 'left-center',
      layout: 'vertical',
    });

    view.render();

    expect(lc.legends.length).to.be.equal(2);
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
