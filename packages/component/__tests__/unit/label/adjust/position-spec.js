import { expect } from 'chai';
import {
  Canvas,
  Text,
} from '@antv/g';
import positionAdjust from '../../../../src/label/adjust/position';

describe('bboxAdjust(labels, shapes): label/adjust/bbox', () => {
  it('is a function', () => {
    expect(positionAdjust).to.be.a('function');
  });

  it('adjusting labels', () => {
    // mock
    const div = document.createElement('div');
    document.body.appendChild(div);

    const canvas = new Canvas({
      containerDOM: div,
      width: 640,
      height: 480,
    });
    const labels = [];
    for (let i = 0; i < 20; i += 1) {
      const text = new Text({
        attrs: {
          text: 'test',
          x: 0,
          y: 0,
        },
      });
      canvas.add(text);
      labels.push(text);
    }
    positionAdjust(labels);
    canvas.draw();

    expect(canvas.get('children').length).to.equal(9);
  });
});
