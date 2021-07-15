import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../util/dom';
import { View } from '../../../../src';
import { salesByArea } from '../../../data/sales';

// @ts-ignore
const canvasRenderer = new Renderer();

// create a canvas
// @ts-ignore
const canvas = new Canvas({
  container: createDiv(),
  width: 400,
  height: 300,
  renderer: canvasRenderer,
});

canvas.width = 400;
canvas.height = 300;

const backgroundGroup = new Group({});
canvas.appendChild(backgroundGroup);

const middleGroup = new Group({});
canvas.appendChild(middleGroup);

const foregroundGroup = new Group({});
canvas.appendChild(foregroundGroup);

const view = new View({
  canvas,
  foregroundGroup,
  middleGroup,
  backgroundGroup,
});

describe('view', () => {
  it('init', () => {
    view.data(salesByArea);
    view.filter('sales', (v) => v > 2400000);

    view.render();
    expect(view.getOriginalData()).toBe(salesByArea);

    expect(view.getData().every((d) => d.sales > 2400000)).toBe(true);
    expect(view.getData().length).toBe(4);

    view.filter('area', (area) => area === '东北');

    view.render();

    expect(view.getData().length).toBe(1);
  });

  afterAll(() => {
    view.destroy();
    canvas.destroy();
  });
});
