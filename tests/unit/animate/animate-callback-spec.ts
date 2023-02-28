import { getCoordinate } from '@antv/coord';
import { getSectorPath } from '../../../src/util/graphics';
import { doAnimate } from '../../../src/animate';
import { createCanvas, createDiv, removeDom } from '../../util/dom';
import { delay } from '../../util/delay';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');

describe('Animate callback', () => {
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });
  const polarCoord = new PolarCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });

  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 400,
    height: 400,
  });

  it('waveIn callback', async () => {
    let res = '';
    const rect = canvas.addShape({
      type: 'rect',
      attrs: {
        x: 20,
        y: 20,
        width: 30,
        height: 150,
        fill: '#1890ff',
        fillOpacity: 0.5,
      },
      origin: {
        data: { x: 10, y: 10 },
      },
    });
    const animateCfg = {
      animation: 'wave-in',
      duration: () => 30,
      delay: () => 0,
      easing: () => 'easeLinear',
      callback: () => {
        res = 'wave-in';
      }
    };
    doAnimate(rect, animateCfg, {
      coordinate: rectCoord,
      toAttrs: rect.attr(),
    });

    await delay(800);
    expect(res).toBe('wave-in');
  });

  it('sector-path-update callback', async () => {
    let res = '';
    const path1 = getSectorPath(200, 140, 104.99999475, 1.3180245040922702, 2.834655440308032, 0);
    const path2 = getSectorPath(200, 140, 104.99999475, 1, 2, 0);
    const sector = canvas.addShape({
      type: 'path',
      attrs: {
        path: path1,
        fill: 'red',
      },
    });
    const animateCfg = {
      animation: 'sector-path-update',
      duration: () => 30,
      delay: () => 0,
      easing: () => 'easeLinear',
      callback: () => {
        res = 'sector-path-update';
      }
    };
    doAnimate(sector, animateCfg, {
      coordinate: polarCoord,
      toAttrs: {
        ...sector.attr(),
        path: path2,
      },
    });

    await delay(800);
    expect(res).toBe('sector-path-update');
  });

  it('zoom-in callback', async () => {
    let res = '';
    const rect = canvas.addShape({
      type: 'rect',
      attrs: {
        x: 20,
        y: 20,
        width: 30,
        height: 150,
        fill: '#1890ff',
        fillOpacity: 0.5,
      },
      origin: {
        data: { x: 10, y: 10 },
      },
    });
    const animateCfg = {
      animation: 'zoom-in',
      duration: () => 30,
      delay: () => 0,
      easing: () => 'easeLinear',
      callback: () => {
        res = 'zoom-in';
      }
    };
    doAnimate(rect, animateCfg, {
      coordinate: rectCoord,
      toAttrs: rect.attr(),
    });

    await delay(800);
    expect(res).toBe('zoom-in');
  });

  it('zoom-out callback', async () => {
    let res = '';
    const rect = canvas.addShape({
      type: 'rect',
      attrs: {
        x: 20,
        y: 20,
        width: 30,
        height: 150,
        fill: '#1890ff',
        fillOpacity: 0.5,
      },
      origin: {
        data: { x: 10, y: 10 },
      },
    });
    const animateCfg = {
      animation: 'zoom-out',
      duration: () => 30,
      delay: () => 0,
      easing: () => 'easeLinear',
      callback: () => {
        res = 'zoom-out';
      }
    };
    doAnimate(rect, animateCfg, {
      coordinate: rectCoord,
      toAttrs: rect.attr(),
    });

    await delay(800);
    expect(res).toBe('zoom-out');
  });

  afterEach(() => {
    canvas.clear();
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});