import { registerComponentController } from '../../../../src/';
import GestureController from '../../../../src/chart/controller/gesture';
import View from '../../../../src/chart/view';
import { delay } from '../../../util/delay';
import { createCanvas, createDiv } from '../../../util/dom';

describe('Gesture', () => {
  const div = createDiv();

  const canvas = createCanvas({
    container: div,
  });

  const backgroundGroup = canvas.addGroup();
  const middleGroup = canvas.addGroup();
  const foregroundGroup = canvas.addGroup();

  const view = new View({
    parent: null,
    canvas,
    foregroundGroup,
    middleGroup,
    backgroundGroup,
    padding: 5,
    visible: false,
  });

  new GestureController(view);

  xit('swipe', (done) => {
    let swipe;
    view.on('swipe', (e) => (swipe = e));
    // @ts-ignore
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 20, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 22, clientY: 13 }],
      },
    });

    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 150, clientY: 10 }],
      },
    });
    setTimeout(() => {
      expect(swipe).toBeDefined();
      // expect(swipe.direction).toBe('right');
      done();
    }, 50);
  });

  it('pinch', () => {
    const pinchCallback = jest.fn();
    const pinchstartCallback = jest.fn();
    const pinchendCallback = jest.fn();
    view.on('pinchstart', pinchstartCallback);
    view.on('pinch', pinchCallback);
    view.on('pinchend', pinchendCallback);

    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [
          { clientX: 20, clientY: 20 },
          { clientX: 25, clientY: 23 },
        ],
      },
    });
    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 30, clientY: 30 }],
      },
    });
    expect(pinchCallback).toBeCalled();
    expect(pinchstartCallback).toBeCalled();
    expect(pinchendCallback).toBeCalled();
  });

  it('press', async () => {
    let pressEvent;
    const pressstartCallback = jest.fn();
    const pressendCallback = jest.fn();
    view.on('pressstart', pressstartCallback);
    view.on('press', (e) => {
      pressEvent = e;
    });
    view.on('pressend', pressendCallback);

    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });

    await delay(260);
    expect(pressEvent.direction).toBe('none');
    expect(pressstartCallback).toBeCalled();

    const pressCallback = jest.fn();
    view.on('press', pressCallback);

    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 50, clientY: 10 }],
      },
    });
    expect(pressCallback).toBeCalled();
  });

  it('pan', () => {
    const panstartCallback = jest.fn();
    let pan;
    const panendCallback = jest.fn();
    view.on('panstart', panstartCallback);
    view.on('pan', (e) => (pan = e));
    view.on('panend', panendCallback);

    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [{ clientX: 20, clientY: 10 }],
      },
    });
    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [{ clientX: 24, clientY: 20 }],
      },
    });

    expect(pan).toBeDefined();
    expect(pan.direction).toBe('right');
    expect(pan.deltaX).toBe(10);
    expect(panstartCallback).toBeCalled();
    expect(panendCallback).toBeCalled();
  });
});

describe('Register gesture', () => {
  const div = createDiv();

  const canvas = createCanvas({
    container: div,
  });

  const backgroundGroup = canvas.addGroup();
  const middleGroup = canvas.addGroup();
  const foregroundGroup = canvas.addGroup();

  it('registerComponentController', () => {
    registerComponentController('gesture', GestureController);
    const view = new View({
      parent: null,
      canvas,
      foregroundGroup,
      middleGroup,
      backgroundGroup,
      padding: 5,
      visible: false,
    });

    expect(view.getController('gesture')).toBeInstanceOf(GestureController);
  });
});

describe('Event on/off', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  registerComponentController('gesture', GestureController);

  it('event on/off', async () => {
    const view1 = new View({
      parent: null,
      canvas,
      foregroundGroup: canvas.addGroup(),
      middleGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
      padding: 5,
      visible: false,
    });
    const view2 = new View({
      parent: null,
      canvas,
      foregroundGroup: canvas.addGroup(),
      middleGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
      padding: 5,
      visible: false,
    });

    // destroy GestureController in view 1
    view1.destroy();
    let error;
    window.addEventListener('error', (evt) => {
      error = evt;
    });

    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [{ clientX: 10, clientY: 10 }],
      },
    });

    await delay(260);
    expect(error).toBeUndefined();
  });
});
