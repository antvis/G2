import { getCoordinate } from '@antv/coord';
import { isNumberEqual } from '@antv/util';
import { doAnimate, doGroupAppearAnimate, getDefaultAnimateCfg } from '../../../src/animate/index';
import { delay } from '../../util/delay';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');
const HelixCoordinate = getCoordinate('helix');

describe('Animate', () => {
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });
  const polarCoord = new PolarCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });
  const helixCoord = new HelixCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });

  const thetaCoord = new PolarCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });
  thetaCoord.transpose();
  // @ts-ignore
  thetaCoord.type = 'theta';

  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 400,
    height: 400,
  });

  it('getDefaultAnimateCfg', () => {
    expect(getDefaultAnimateCfg('interval', rectCoord)).toEqual({
      appear: { duration: 450, easing: 'easeQuadOut' },
      update: { duration: 400, easing: 'easeQuadInOut', animation: null },
      enter: { duration: 400, easing: 'easeQuadInOut', animation: 'scale-in-y' },
      leave: { duration: 350, easing: 'easeQuadIn', animation: 'fade-out' },
    });

    expect(getDefaultAnimateCfg('interval', rectCoord.transpose())).toEqual({
      appear: { duration: 450, easing: 'easeQuadOut' },
      update: { duration: 400, easing: 'easeQuadInOut', animation: null },
      enter: { duration: 400, easing: 'easeQuadInOut', animation: 'scale-in-x' },
      leave: { duration: 350, easing: 'easeQuadIn', animation: 'fade-out' },
    });

    expect(getDefaultAnimateCfg('interval', polarCoord)).toEqual({
      appear: { duration: 450, easing: 'easeQuadOut' },
      update: { duration: 400, easing: 'easeQuadInOut', animation: null },
      enter: { duration: 400, easing: 'easeQuadInOut', animation: 'fade-in' },
      leave: { duration: 350, easing: 'easeQuadIn', animation: 'fade-out' },
    });

    expect(getDefaultAnimateCfg('interval', helixCoord)).toEqual({
      appear: { duration: 450, easing: 'easeQuadOut' },
      update: { duration: 400, easing: 'easeQuadInOut', animation: null },
      enter: { duration: 400, easing: 'easeQuadInOut', animation: 'fade-in' },
      leave: { duration: 350, easing: 'easeQuadIn', animation: 'fade-out' },
    });

    expect(getDefaultAnimateCfg('interval', thetaCoord)).toEqual({
      appear: { duration: 450, easing: 'easeQuadOut' },
      update: { duration: 400, easing: 'easeQuadInOut', animation: 'sector-path-update' },
      enter: { duration: 400, easing: 'easeQuadInOut', animation: 'fade-in' },
      leave: { duration: 350, easing: 'easeQuadIn', animation: 'fade-out' },
    });

    expect(getDefaultAnimateCfg('line', rectCoord)).toEqual({
      appear: { duration: 450, easing: 'easeQuadOut' },
      update: { duration: 400, easing: 'easeQuadInOut' },
      enter: { duration: 400, easing: 'easeQuadInOut', animation: 'fade-in' },
      leave: { duration: 350, easing: 'easeQuadIn', animation: 'fade-out' },
    });

    expect(getDefaultAnimateCfg('whatever', rectCoord)).toBeUndefined();

    expect(getDefaultAnimateCfg('interval', rectCoord, 'appear')).toEqual({ duration: 450, easing: 'easeQuadOut' });

    expect(getDefaultAnimateCfg('interval', rectCoord, 'enter')).toEqual({
      duration: 400,
      easing: 'easeQuadInOut',
      animation: 'scale-in-x',
    });
  });

  it('doAnimate', async () => {
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
      animation: 'fade-in',
      duration: () => 300,
      delay: () => 0,
      easing: () => 'easeLinear',
    };
    doAnimate(rect, animateCfg, {
      coordinate: rectCoord,
      toAttrs: null,
    });

    await delay(500);

    expect(isNumberEqual(rect.attr('strokeOpacity'), 1)).toBeTruthy();
    expect(isNumberEqual(rect.attr('fillOpacity'), 0.5)).toBeTruthy();
    expect(isNumberEqual(rect.attr('opacity'), 1)).toBeTruthy();
  });

  it('doAnimate, update', (done) => {
    const rect = canvas.addShape({
      type: 'rect',
      attrs: {
        x: 20,
        y: 20,
        width: 30,
        height: 150,
        fill: '#1890ff',
      },
      origin: {
        data: { x: 10, y: 10 },
      },
    });
    const animateCfg = {
      duration: 400,
      easing: 'easeLinear',
    };
    doAnimate(rect, animateCfg, {
      coordinate: rectCoord,
      toAttrs: {
        width: 150,
        height: 150,
      },
    });

    setTimeout(() => {
      expect(isNumberEqual(rect.attr('width'), 150)).toBeTruthy();
      expect(isNumberEqual(rect.attr('height'), 150)).toBeTruthy();
      done();
    }, 1000);
  });

  it('doGroupAppearAnimate', (done) => {
    const group = canvas.addGroup();
    group.addShape({
      type: 'circle',
      attrs: {
        x: 150,
        y: 150,
        r: 50,
        fill: 'red',
      },
    });

    doGroupAppearAnimate(
      group,
      {
        duration: 500,
        easing: 'easeQuadOut',
      },
      'interval',
      polarCoord,
      { x: 0, y: 400 }
    );

    setTimeout(() => {
      expect(group.attr('matrix')).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
      done();
    }, 1000);
  });

  afterEach(() => {
    canvas.clear();
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
