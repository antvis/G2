import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../util/dom';
import { View } from '../../../../src';
import { BBox } from '../../../../src/util/bbox';

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

describe('view', () => {
  it('init', () => {
    const view = new View({
      id: 'onlyView',
      canvas,
      foregroundGroup,
      middleGroup,
      backgroundGroup,
    });

    const subview = new View({
      parent: view,
      canvas,
      foregroundGroup,
      middleGroup,
      backgroundGroup,
      region: { start: { x: 0.5, y: 0.5 }, end: { x: 0.9, y: 0.9 } },
    });

    // 默认值
    expect(view.getOptions().region).toEqual({ start: { x: 0, y: 0 }, end: { x: 1, y: 1 } });

    expect(view.viewBBox).toEqual(new BBox(0, 0, 400, 300));
    expect(subview.viewBBox).toEqual(new BBox(200, 150, 160, 120));

    subview.destroy();
    view.destroy();
  });
});
