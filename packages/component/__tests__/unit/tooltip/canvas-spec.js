const expect = require('chai').expect;
import * as G from '@antv/g';
import CanvasTooltip from '../../../src/tooltip/canvas';

describe('CanvasTooltip测试', () => {
  const div = document.createElement('div');
  div.id = 'tooltip-container';
  div.style.margin = '20px';
  document.body.appendChild(div);

  const canvas = new G.Canvas({
    containerId: 'tooltip-container',
    width: 500,
    height: 500,
  });

  const title = 'a tooltip title';
  const items = [
    { marker: 'square', color: 'red', name: 'name1', value: '1222333' },
    { marker: 'square', color: 'blue', name: 'n2', value: '1233' },
    { marker: 'square', color: 'yellow', name: 'name3', value: 'swww - afas' },
  ];
  const panelRange = {
    tl: { x: 25, y: 50 },
    tr: { x: 425, y: 50 },
    bl: { x: 25, y: 440 },
    br: { x: 425, y: 440 },
    cc: { x: 225, y: 245 },
  };

  it('initialize,show', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    // tooltip.show();
    const container = tooltip.get('container');
    expect(tooltip).be.an.instanceof(CanvasTooltip);
    expect(container.get('visible')).to.equal(false);
    tooltip.destroy();
  });

  it('initialize,show without items', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      // items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    // tooltip.show();
    const container = tooltip.get('container');
    expect(tooltip).be.an.instanceof(CanvasTooltip);
    expect(container.get('visible')).to.equal(false);
    tooltip.destroy();
  });
  it('initialize,show without item.marker', () => {
    const items = [
      { color: 'red', name: 'name1', value: '1222333' },
      { color: 'blue', name: 'n2', value: '1233' },
      { color: 'yellow', name: 'name3', value: 'swww - afas' },
    ];
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    // tooltip.show();
    const container = tooltip.get('container');
    expect(tooltip).be.an.instanceof(CanvasTooltip);
    expect(container.get('visible')).to.equal(false);
    tooltip.destroy();
  });

  it('initialize,show, not show title', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: false,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    // tooltip.show();
    const container = tooltip.get('container');
    expect(tooltip).be.an.instanceof(CanvasTooltip);
    expect(container.get('visible')).to.equal(false);
    tooltip.destroy();
  });

  it('hide', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.hide();
    const container = tooltip.get('container');
    expect(container.get('visible')).to.equal(false);
    tooltip.destroy();
  });

  it('clear', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.clear();
    const titleShape = tooltip.get('titleShape');
    const itemsGroup = tooltip.get('itemsGroup');
    const itemNumber = itemsGroup.get('children').length;
    expect(titleShape.text).to.equal('');
    expect(itemNumber).to.equal(0);
    tooltip.destroy();
  });

  it('destroy', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
      crosshairs: { type: 'cross' },
    });
    tooltip.destroy();
    const container = tooltip.get('container');
    expect(container.destroyed).to.equal(true);
  });

  it('set position', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(50, 10);
    canvas.draw();
    expect(tooltip.get('x')).to.equal(70);// x+gap
    expect(tooltip.get('y')).to.equal(50);// y+gap
    tooltip.destroy();
  });

  it('set position left', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      position: 'left',
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(50, 10);
    canvas.draw();
    expect(tooltip.get('x')).to.equal(25);
    expect(tooltip.get('y')).to.equal(50);
    tooltip.destroy();
  });

  it('adjust boundary', () => {
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      offset: 50,
      canvas,
      frontgroundGroup: canvas.addGroup(),
      inPanel: false,
    });
    tooltip.setPosition(-100, 600);
    canvas.draw();
    const height = tooltip.get('container').getBBox().height;
    expect(tooltip.get('x')).to.equal(20);// gap
    expect(tooltip.get('y')).to.equal(600 - height - 20);
    tooltip.destroy();
  });

  it('in plot - left', () => {
    const pl = {
      tl: { x: 100, y: 50 },
      tr: { x: 100, y: 50 },
      bl: { x: 25, y: 440 },
      br: { x: 425, y: 440 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      offset: 50,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(10, 20);
    expect(tooltip.get('x')).to.equal(pl.tl.x);
    tooltip.destroy();
  });

  it('in plot - right', () => {
    const pl = {
      tl: { x: 25, y: 50 },
      tr: { x: 300, y: 50 },
      bl: { x: 25, y: 440 },
      br: { x: 300, y: 440 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(300, 20);
    tooltip.show();
    const width = tooltip.get('container').getBBox().width;
    expect(tooltip.get('x')).to.equal(320 - width - 40);
    tooltip.destroy();
  });

  it('in plot - top', () => {
    const pl = {
      tl: { x: 25, y: 100 },
      tr: { x: 425, y: 100 },
      bl: { x: 25, y: 440 },
      br: { x: 425, y: 440 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(10, 20);
    expect(tooltip.get('y')).to.equal(pl.tl.y);
    tooltip.destroy();
  });

  it('in plot - bottom', () => {
    const pl = {
      tl: { x: 25, y: 100 },
      tr: { x: 425, y: 100 },
      bl: { x: 25, y: 150 },
      br: { x: 425, y: 150 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new CanvasTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(10, 300);
    tooltip.show();
    const height = tooltip.get('container').getBBox().height;
    expect(tooltip.get('y')).to.equal(320 - height - 40);
    tooltip.destroy();
  });

  it('crosshair type cross', () => {
    const tooltip = new CanvasTooltip({
      x: 0,
      y: 0,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      backgroundGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      crosshairs: { type: 'cross' },
    });
    tooltip.setPosition(50, 80);
    expect(tooltip.get('visible')).to.equal(true);
    tooltip.hide();
    expect(tooltip.get('visible')).to.equal(false);
  });

  it('markergroup', () => {
    const markerItems = [
      { color: 'blue', x: 50, y: 30 },
      { color: 'red', x: 50, y: 60 },
      { color: 'green', x: 50, y: 90 },
    ];
    const tooltip = new CanvasTooltip({
      x: 0,
      y: 0,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      backgroundGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      crosshair: { type: 'cross' },
    });
    tooltip.setMarkers(markerItems, { radius: 5 });
    tooltip.setPosition(50, 80);
    tooltip.show();
    const markergroup = tooltip.get('markerGroup');
    const children = markergroup.get('children');
    expect(children.length).to.equal(3);
    expect(children[0].attr('fill')).to.equal('blue');
    expect(children[0].attr('x')).to.equal(50);
    expect(children[0].attr('y')).to.equal(30);
    tooltip.hide();
    expect(markergroup.get('visible')).to.equal(false);
    tooltip.show();
    expect(markergroup.get('visible')).to.equal(true);
    tooltip.destroy();
  });

});
