import * as G from '@antv/g';
const expect = require('chai').expect;
import Tooltip from '../../../src/tooltip/base';

describe('Tooltip基类测试', () => {
  const div = document.createElement('div');
  div.id = 'tooltip-container';
  div.style.margin = '20px';
  document.body.appendChild(div);

  const title = 'a tooltip title';
  const items = [
    { color: 'red', name: 'name1', value: '1222333' },
    { color: 'blue', name: 'n2', value: '1233' },
    { color: 'yellow', name: 'name3', value: 'swww - afas' },
  ];
  const panelRange = {
    tl: { x: 25, y: 50 },
    tr: { x: 425, y: 50 },
    bl: { x: 25, y: 440 },
    br: { x: 425, y: 440 },
    cc: { x: 225, y: 245 },
  };
  it('initialize', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    expect(tooltip).be.an.instanceof(Tooltip);
    expect(tooltip.get('x')).to.equal(10);
    expect(tooltip.get('y')).to.equal(10);
    expect(tooltip.get('panelRange').tl.x).to.equal(25);
  });

  it('set content', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      panelGroup: new G.Group(),
      panelRange,
    });
    tooltip.setContent(title, items);
    expect(tooltip.get('items')[0].name).to.equal('name1');
    expect(tooltip.get('titleContent')).to.equal('a tooltip title');
  });

  it('content change', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    const newItems = [
      { color: 'red', name: 'name1', value: '1222333' },
      { color: 'blue', name: 'name2', value: 'kamenashi - kazuya' },
      { color: 'yellow', name: 'name3', value: 'swww - afas' },
    ];
    const newTitle = 'a new tooltip title';
    const isChanged = tooltip.isContentChange(newTitle, newItems);
    expect(isChanged).to.equal(true);
  });
  it('content change', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    const newItems = [
      { color: 'red', name: 'name1', value: '1222333' },
      { color: 'blue', name: 'name2', value: 'kamenashi - kazuya' },
      { color: 'yellow', name: 'name3', value: 'swww - afas' },
    ];
    const isChanged = tooltip.isContentChange(title, newItems);
    expect(isChanged).to.equal(true);
  });
  it('content not change', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    const isChanged = tooltip.isContentChange(title, items);
    expect(isChanged).to.equal(false);
  });

  it('set position', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    tooltip.setPosition(20, 15);
    expect(tooltip.get('x')).to.equal(20);
    expect(tooltip.get('y')).to.equal(15);
  });

  it('show', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    tooltip.setPosition(20, 15);
    tooltip.show();
    expect(tooltip.get('visible')).to.equal(true);
  });

  it('hide', () => {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      items,
      titleContent: title,
      panelGroup: new G.Group(),
      panelRange,
    });
    tooltip.setPosition(20, 15);
    tooltip.hide();
    expect(tooltip.get('visible')).to.equal(false);
  });

  it('set markers', () => {
    const canvas = new G.Canvas({
      containerId: 'tooltip-container',
      width: 500,
      height: 500,
    });
    const markerItems = [
      { color: 'blue', x: 50, y: 30 },
      { color: 'red', x: 50, y: 60 },
      { color: 'green', x: 50, y: 90 },
    ];
    const tooltip = new Tooltip({
      x: 0,
      y: 0,
      items,
      titleContent: title,
      panelRange,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setMarkers(markerItems, { radius: 5 });
    const markergroup = tooltip.get('markerGroup');
    const children = markergroup.get('children');
    expect(children.length).to.equal(3);
    expect(children[0].attr('fill')).to.equal('blue');
    expect(children[0].attr('x')).to.equal(50);
    expect(children[0].attr('y')).to.equal(30);
  });

  it('set markers twice', () => {
    const canvas = new G.Canvas({
      containerId: 'tooltip-container',
      width: 500,
      height: 500,
    });
    const markerItems = [
      { color: 'blue', x: 50, y: 30 },
      { color: 'red', x: 50, y: 60 },
      { color: 'green', x: 50, y: 90 },
    ];
    const tooltip = new Tooltip({
      x: 0,
      y: 0,
      items,
      titleContent: title,
      panelRange,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setMarkers(markerItems, { radius: 5 });
    tooltip.setMarkers(markerItems, { radius: 10 });
    const markergroup = tooltip.get('markerGroup');
    const children = markergroup.get('children');
    expect(children.length).to.equal(3);
    expect(children[0].attr('fill')).to.equal('blue');
    expect(children[0].attr('x')).to.equal(50);
    expect(children[0].attr('y')).to.equal(30);
  });

  it('clear markers', () => {
    const canvas = new G.Canvas({
      containerId: 'tooltip-container',
      width: 500,
      height: 500,
    });
    const markerItems = [
      { color: 'blue', x: 50, y: 30 },
      { color: 'red', x: 50, y: 60 },
      { color: 'green', x: 50, y: 90 },
    ];
    const tooltip = new Tooltip({
      x: 0,
      y: 0,
      items,
      titleContent: title,
      panelRange,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setMarkers(markerItems, { radius: 5 });
    tooltip.clearMarkers();
    const markergroup = tooltip.get('markerGroup');
    const children = markergroup.get('children');
    expect(children.length).to.equal(0);
  });
});
