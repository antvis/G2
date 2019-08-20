const expect = require('chai').expect;
const G = require('@antv/g/lib');
import Crosshair from '../../../src/tooltip/crosshair';

describe('crosshair测试', () => {
  const div = document.createElement('div');
  div.id = 'crosshair-container';
  div.style.margin = '20px';
  document.body.appendChild(div);

  const canvas = new G.Canvas({
    containerId: 'crosshair-container',
    width: 500,
    height: 500,
  });

  const panelRange = {
    tl: { x: 25, y: 50 },
    tr: { x: 425, y: 50 },
    bl: { x: 25, y: 440 },
    br: { x: 425, y: 440 },
    cc: { x: 225, y: 245 },
  };

  it('show,hide', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'cross',
    });
    crosshair.show();
    canvas.draw();
    crosshair.hide();
    expect(crosshair).be.an.instanceof(Crosshair);
    crosshair.destroy();
  });
  it('type cross', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'cross',
    });
    crosshair.show();
    canvas.draw();
    expect(crosshair).be.an.instanceof(Crosshair);
    crosshair.destroy();
  });

  it('type x', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'x',
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    crosshair.destroy();
  });
  it('type y', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'y',
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    crosshair.destroy();
  });
  it('type x without panelRange', () => {
    const crosshair = new Crosshair({
      // panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'x',
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    crosshair.destroy();
  });
  it('type y without panelRange', () => {
    const crosshair = new Crosshair({
      // panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'y',
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    crosshair.destroy();
  });

  it('type empty', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    crosshair.destroy();
  });
  it('type empty with isTransposed', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
      isTransposed: true,
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    crosshair.destroy();
  });

  it('setPosition type cross', () => {
    const crosshair = new Crosshair({
      panelRange,
      canvas,
      plot: canvas.addGroup(),
      type: 'cross',
    });
    crosshair.setPosition(50, 100);
    crosshair.show();
    canvas.draw();
    const crossLineShapeX = crosshair.get('crossLineShapeX');
    const crossLineShapeY = crosshair.get('crossLineShapeY');
    const y = crossLineShapeX.attr('matrix')[7];
    const x = crossLineShapeY.attr('matrix')[6];
    expect(x).to.equal(50);
    expect(y).to.equal(100);
    crosshair.destroy();
  });
});
