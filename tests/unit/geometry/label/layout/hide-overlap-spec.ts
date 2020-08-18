import { hideOverlap } from '../../../../../src/geometry/label/layout/hide-overlap';
import { removeDom } from '../../../../../src/util/dom';
import { createCanvas, createDiv } from '../../../../util/dom';
import { getRotateMatrix } from '../../../../../src/util/transform';

describe('GeometryLabel layout', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 640,
    height: 480,
  });

  it('hideOverlap', () => {
    // mock
    const items = [];
    const labels = [];
    for (let i = 0; i < 20; i += 1) {
      const label = canvas.addGroup();
      label.addShape({
        type: 'text',
        attrs: {
          text: 'test',
          x: 100,
          y: 100,
          fill: 'red',
        },
      });
      labels.push(label);
      items.push({});
    }
    expect(canvas.getChildren().length).toBe(20);

    hideOverlap(items, labels, [], {} as any);
    canvas.draw();

    expect(canvas.getChildren().filter((child) => child.get('visible')).length).toBe(1);
  });

  function rotate(label, rotateRadian: number): void {
    const box = label.getCanvasBBox();
    label.attr('rotate', rotate);
    label.attr('x', box.x);
    label.attr('y', box.y);

    const matrix = getRotateMatrix(label, rotateRadian);
    label.getChildren().forEach((child) => {
      child.setMatrix(matrix);
    });
  }

  it('hideOverlap with rotate', () => {
    canvas.clear();

    const items = [];
    const labels = [];
    let x = 0;
    for (let i = 0; i < 10; i += 1) {
      x = 100 + i * 42;
      const label = canvas.addGroup();
      label.addShape({
        type: 'rect',
        attrs: {
          x,
          y: 100,
          width: 40,
          height: 30,
          fill: 'red',
          fillOpacity: 0.15,
        },
      });
      label.addShape({
        type: 'text',
        attrs: {
          text: '嗨',
          x: x + 15,
          y: 115,
          fill: '#333',
        },
      });

      items.push({ content: `嗨${i}` });
      labels.push(label);
    }
    expect(canvas.getChildren().filter((child) => child.get('visible')).length).toBe(10);

    hideOverlap(items, labels, [], {} as any);
    canvas.draw();

    expect(canvas.getChildren().filter((child) => child.get('visible')).length).toBe(10);

    // 旋转 10 度
    const rotateRadian1 = -Math.PI / 18;
    items[1].rotate = rotateRadian1;
    rotate(labels[1], rotateRadian1);

    // 旋转 30 度，与 labels[3] 碰撞
    const rotateRadian2 = -Math.PI / 6;
    items[2].rotate = rotateRadian2;
    rotate(labels[2], rotateRadian2);

    hideOverlap(items, labels, [], {} as any);
    canvas.draw();
    expect(canvas.getChildren().filter((child) => child.get('visible')).length).toBe(9);
    expect(labels[3].get('visible')).toBeFalsy();
  });

  it('hideOverlap with rotate 2', () => {
    canvas.clear();

    const items = [];
    const labels = [];
    let x = 0;
    for (let i = 0; i < 10; i += 1) {
      x = 100 + i * 42;
      const label = canvas.addGroup();
      label.addShape({
        type: 'rect',
        attrs: {
          x,
          y: 150,
          width: 40,
          height: 30,
          fill: 'red',
          fillOpacity: 0.15,
        },
      });
      label.addShape({
        type: 'text',
        attrs: {
          text: '嗨',
          x: x + 15,
          y: 165,
          fill: '#333',
        },
      });

      items.push({ content: `嗨${i}` });
      labels.push(label);
    }

    // 旋转
    const rotateRadian = Math.PI / 4;
    items[9].rotate = rotateRadian;
    rotate(labels[9], rotateRadian);

    hideOverlap(items, labels, [], {} as any);
    canvas.draw();
    expect(canvas.getChildren().filter((child) => child.get('visible')).length).toBe(9);
    expect(labels[9].get('visible')).toBeFalsy();
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
