import GestureController from '../../../../src/chart/controller/gesture';
import { createCanvas, createDiv } from '../../../util/dom';
import View from '../../../../src/chart/view';
import { delay } from '../../../util/delay';

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

  let pressEvent;
  const pressstartCallback = jest.fn();
  const pressendCallback = jest.fn();
  view.on('pressstart', pressstartCallback);
  view.on('press', e => {
    pressEvent = e;
  });
  view.on('pressend', pressendCallback);

  const pinchCallback = jest.fn();
  const pinchstartCallback = jest.fn();
  const pinchendCallback = jest.fn();
  view.on('pinchstart', pinchstartCallback);
  view.on('pinch', pinchCallback);
  view.on('pinchend', pinchendCallback);

  const panstartCallback = jest.fn();
  const panCallback = jest.fn();
  const panendCallback = jest.fn();
  view.on('panstart', panstartCallback);
  view.on('pan', panCallback);
  view.on('panend', panendCallback);

  it('pinch', () => {
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [
          { clientX: 10, clientY: 10 }
        ]
      }
    });
    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [
          { clientX: 20, clientY: 20 },
          { clientX: 25, clientY: 23 },
        ]
      }
    });
    canvas.emit('touchend', {
      name: 'touchend',
      originalEvent: {
        touches: [
          { clientX: 30, clientY: 30 },
        ]
      }
    });
    expect(pinchCallback).toBeCalled();
    expect(pinchstartCallback).toBeCalled();
    expect(pinchendCallback).toBeCalled();
  });

  it('press', async () => {
    canvas.emit('touchstart', {
      name: 'touchstart',
      originalEvent: {
        touches: [
          { clientX: 10, clientY: 10 }
        ]
      }
    });

    await delay(260);
    expect(pressEvent.direction).toBe('none');
    expect(pressstartCallback).toBeCalled();

    const pressCallback = jest.fn();
    view.on('press', pressCallback);

    canvas.emit('touchmove', {
      name: 'touchmove',
      originalEvent: {
        touches: [
          { clientX: 50, clientY: 10 }
        ]
      }
    });
    expect(pressCallback).toBeCalled();
  });
});
