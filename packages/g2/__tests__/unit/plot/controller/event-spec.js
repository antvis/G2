import { simulate } from 'event-simulate';
import { expect } from 'chai';
import { Canvas } from '@antv/g';
import View from '../../../../src/plot/view';
import EventController from '../../../../src/plot/controller/event';

describe('eventController', function() {

  const div = document.createElement('div');
  div.style.margin = '20px';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerDOM: div,
    width: 500,
    height: 500,
  });

  const view = new View({
    id: 'view',
    canvas,
    container: canvas.addGroup(),
    // start: { x: 0, y: 0 },
    // end: { x: 500, y: 500 },
    width: 500,
    height: 500,
    padding: 10,
    backgroundStyle: {
      fill: 'grey',
    },
  });

  const data = [
    { a: 1, b: 2 },
    { a: 2, b: 5 },
    { a: 3, b: 4 },
  ];
  view.data(data);

  const circle = view.get('panelGroup').addShape('circle', {
    name: 'test',
    attrs: {
      x: 100,
      y: 100,
      r: 30,
      fill: 'red',
    },
    origin: { value: 100 },
  });

  circle.name = 'test';

  view.render();
  canvas.draw();

  const eventController = view.get('eventController');

  it('initilaize', function() {
    expect(eventController).be.an.instanceof(EventController);
  });

  it('bind events', function() {
    const viewEvents = view.get('container').getEvents();
    expect(viewEvents).to.has.property('mousedown');
    expect(viewEvents).to.has.property('mouseup');
    expect(viewEvents).to.has.property('mousemove');
    expect(viewEvents).to.has.property('click');
    expect(viewEvents).to.has.property('dblclick');
    expect(viewEvents).to.has.property('contextmenu');

    const canvasEvents = canvas.getEvents();
    expect(canvasEvents).to.has.property('mousemove');
  });

  it('view mouseenter', function() {
    let viewMouseEnter = false;
    view.on('mouseenter', function() {
      viewMouseEnter = true;
    });
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });
    expect(viewMouseEnter).to.be.equal(true);
  });

  it('view mouseleave', function() {
    let viewMouseLeave = false;
    view.on('mouseleave', function() {
      viewMouseLeave = true;
    });

    const bbox = canvas.get('el').getBoundingClientRect();
    // point.x < left
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left - 5,
    });
    expect(viewMouseLeave).to.be.equal(true);
    viewMouseLeave = false;
    // point.x > right
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left + bbox.width + 50,
    });
    expect(viewMouseLeave).to.be.equal(true);
    viewMouseLeave = false;
    // pont.y < top
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top - 5,
      clientX: bbox.left + 50,
    });
    expect(viewMouseLeave).to.be.equal(true);
    viewMouseLeave = false;
    // point.y>bottom
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + bbox.height + 5,
      clientX: bbox.left + 50,
    });
    expect(viewMouseLeave).to.be.equal(true);
    viewMouseLeave = false;

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top - 5,
      clientX: bbox.left - 5,
    });
    expect(viewMouseLeave).to.be.equal(true);
  });

  it('mousedown', function() {
    let viewMouseDown = false;
    let shapeMouseDown = false;
    let shapeEventData;

    view.on('mousedown', () => {
      viewMouseDown = true;
    });

    view.on('test:mousedown', (ev) => {
      shapeMouseDown = true;
      shapeEventData = ev.data;
    });
    // simulate event
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'mousedown', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });

    expect(shapeMouseDown).to.be.equal(false);
    expect(viewMouseDown).to.be.equal(true);

    shapeMouseDown = false;
    viewMouseDown = false;


    simulate(canvas.get('el'), 'mousedown', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });
    expect(shapeMouseDown).to.be.equal(true);
    expect(shapeEventData.value).to.be.equal(100);
    expect(viewMouseDown).to.be.equal(true);
  });


  it('view mousemove', function() {
    let viewMouseMove = false;
    view.on('mousemove', function() {
      viewMouseMove = true;
    });
    // simulate mouse event
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 60,
      clientX: bbox.left + 60,
    });
    expect(viewMouseMove).to.be.equal(true);
  });

  it('mouseup', function() {
    let viewMouseUp = false;
    let shapeMouseUp = false;
    let shapeEventData;
    view.on('test:mouseup', () => {
      shapeMouseUp = true;
    });
    view.on('mouseup', (ev) => {
      viewMouseUp = true;
      shapeEventData = ev.data;
    });
    // simulate event
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'mouseup', {
      clientY: bbox.top + 20,
      clientX: bbox.left + 20,
    });
    expect(shapeMouseUp).to.be.equal(false);
    expect(viewMouseUp).to.be.equal(true);

    shapeMouseUp = false;
    viewMouseUp = false;

    simulate(canvas.get('el'), 'mouseup', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });

    expect(shapeMouseUp).to.be.equal(true);
    expect(shapeEventData.value).to.be.equal(100);
    expect(viewMouseUp).to.be.equal(true);
  });

  it('click', function() {
    let shapeClick = false;
    let viewClick = false;
    let shapeEventData;

    view.on('test:click', () => {
      shapeClick = true;
    });

    view.on('click', (ev) => {
      viewClick = true;
      shapeEventData = ev.data;
    });

    // simulate event
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'click', {
      clientY: bbox.top + 20,
      clientX: bbox.left + 20,
    });
    expect(shapeClick).to.be.equal(false);
    expect(viewClick).to.be.equal(true);

    shapeClick = false;
    viewClick = false;

    simulate(canvas.get('el'), 'click', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });

    expect(shapeClick).to.be.equal(true);
    expect(shapeEventData.value).to.be.equal(100);
    expect(viewClick).to.be.equal(true);
  });


  it('dbllick', function() {
    let shapeClick = false;
    let viewClick = false;
    let shapeEventData;

    view.on('test:dblclick', () => {
      shapeClick = true;
    });

    view.on('dblclick', (ev) => {
      viewClick = true;
      shapeEventData = ev.data;
    });

    // simulate event
    const bbox = canvas.get('el').getBoundingClientRect();

    simulate(canvas.get('el'), 'dblclick', {
      clientY: bbox.top + 20,
      clientX: bbox.left + 20,
    });
    expect(shapeClick).to.be.equal(false);
    expect(viewClick).to.be.equal(true);

    shapeClick = false;
    viewClick = false;

    simulate(canvas.get('el'), 'dblclick', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });

    expect(shapeClick).to.be.equal(true);
    expect(shapeEventData.value).to.be.equal(100);
    expect(viewClick).to.be.equal(true);
  });

  it('wheel outside view', function() {
    let viewWheel = false;

    view.on('wheel', function() {
      viewWheel = true;
    });
    const canvasDom = canvas.get('canvasDOM');
    const ex = 0;
    const ey = 0;
    const e = document.createEvent('MouseEvents');
    e.initMouseEvent('wheel', true, true, document.defaultView, 0, ex, ey, ex, ey, false, false, false, false, 0, null);
    e.wheelDelta = 10;
    canvasDom.dispatchEvent(e);
    expect(viewWheel).to.be.equal(false);
  });

  it('wheel inside view', function() {
    let viewWheel = false;

    view.on('wheel', function() {
      viewWheel = true;
    });
    const canvasDom = canvas.get('canvasDOM');
    const bbox = canvas.get('el').getBoundingClientRect();
    const ex = bbox.left + 100;
    const ey = bbox.top + 100;
    const e = document.createEvent('MouseEvents');
    e.initMouseEvent('wheel', true, true, document.defaultView, 0, ex, ey, ex, ey, false, false, false, false, 0, null);
    e.wheelDelta = 10;
    canvasDom.dispatchEvent(e);
    expect(viewWheel).to.be.equal(true);
  });

  it('shape mousemove & mouseenter & mouseleave', function() {
    let shapeMouseMove = false;
    let shapeMouseLeave = false;
    let shapeMouseEnter = false;
    view.on('test:mousemove', function() {
      shapeMouseMove = true;
    });
    view.on('test:mouseleave', function() {
      shapeMouseLeave = true;
    });
    view.on('test:mouseenter', function() {
      shapeMouseEnter = true;
    });
    // simulate mouse event
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 120,
      clientX: bbox.left + 120,
    });
    expect(shapeMouseMove).to.be.equal(true);

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top,
      clientX: bbox.left,
    });
    expect(shapeMouseLeave).to.be.equal(true);
    shapeMouseLeave = false;

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });
    expect(shapeMouseEnter).to.be.equal(true);

    shapeMouseMove = false;
    shapeMouseLeave = false;
    shapeMouseEnter = false;
    simulate(canvas.get('el'), 'mousemove', {
      clientY: 0,
      clientX: 0,
    });
    expect(shapeMouseMove).to.be.equal(false);
    expect(shapeMouseEnter).to.be.equal(false);
  });


  it('panelenter & panelmove & panelleave', function() {
    let panelEnter = false;
    let panelMove = false;
    let panelLeave = false;
    view.on('panel:mouseenter', function() {
      panelEnter = true;
    });
    view.on('panel:mousemove', function() {
      panelMove = true;
    });
    view.on('panel:mouseleave', function() {
      panelLeave = true;
    });

    // simulate mouse event
    const bbox = canvas.get('el').getBoundingClientRect();
    const viewPadding = view.get('padding');

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top,
      clientX: bbox.left,
    });
    expect(panelLeave).to.be.equal(true);

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + viewPadding + 5,
      clientX: bbox.left + viewPadding + 5,
    });
    expect(panelEnter).to.be.equal(true);

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + viewPadding + 10,
      clientX: bbox.left + viewPadding + 10,
    });
    expect(panelMove).to.be.equal(true);
  });


  it('clear event', function() {
    eventController.clearEvents();
    // view events
    const viewEvents = view.get('container').getEvents();
    expect(viewEvents).to.be.empty;
    // canvas events
    const canvasEvents = view.get('container').getEvents();
    expect(canvasEvents).to.be.empty;
  });

  after(function() {
    canvas.destroy();
    document.body.removeChild(div);
  });

});
