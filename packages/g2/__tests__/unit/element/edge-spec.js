import { expect } from 'chai';
import Edge from '../../../src/element/edge';
import { getCoordinate } from '@antv/coord';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import View from '../../utils/view';

const Rect = getCoordinate('rect');

const LinearScale = getScale('linear');
const IdentityScale = getScale('identity');

describe('Edge Element', () => {
  const div = document.createElement('div');
  div.id = 'edge';
  document.body.appendChild(div);

  let edgeElement;
  const scaleX = new LinearScale({
    field: 'x',
    min: 0,
    max: 5,
  });
  const scaleY = new LinearScale({
    field: 'y',
    min: 0,
    max: 5,
  });
  const scaleVhv = new IdentityScale({
    field: 'vhv',
    values: ['vhv'],
  });
  const scaleRed = new IdentityScale({
    field: 'red',
    values: ['red'],
  });

  const data = [{ x: [1, 2], y: [3, 4] }, { x: [2, 3], y: [1, 5] }];
  const coord = new Rect({
    start: {
      x: 0,
      y: 500,
    },
    end: {
      x: 500,
      y: 0,
    },
  });

  const canvas = new Canvas({
    containerId: 'edge',
    renderer: 'canvas',
    pixelRatio: 2,
    width: 500,
    height: 500,
  });
  const container = canvas.addGroup();

  it('constructor', () => {
    edgeElement = new Edge({
      data,
      scales: {
        x: scaleX,
        y: scaleY,
        vhv: scaleVhv,
        red: scaleRed,
      },
      coord,
      container,
      view: new View(),
      id: 'view-edge',
    });

    expect(edgeElement.get('generatePoints')).to.be.true;
    expect(edgeElement.get('type')).to.equal('edge');
    expect(edgeElement.get('shapeType')).to.equal('edge');
  });

  it('element.init()', () => {
    edgeElement
      .position({
        fields: ['x', 'y'],
      })
      .color({
        values: ['red'],
      });
    edgeElement.init();

    const attrs = edgeElement.get('attrs');
    expect(attrs).to.have.keys(['position', 'color']);
  });

  it('draw Edge: two points', () => {
    edgeElement.paint();
    canvas.draw();
    const shapes = edgeElement.getShapes();
    expect(shapes.length).to.equal(2);
    expect(shapes[0].attr('path').length).to.equal(2);
  });

  it('draw Edge: vhv', () => {
    // 此处没有reset操作了 所以只能clear后 重新创建view
    edgeElement.clear();
    edgeElement = new Edge({
      data,
      scales: {
        x: scaleX,
        y: scaleY,
        vhv: scaleVhv,
        red: scaleRed,
      },
      coord,
      container,
      view: new View(),
      id: 'view-edge',
    });
    edgeElement
      .position({
        fields: ['x', 'y'],
      })
      .shape({
        fields: ['vhv'],
      });
    edgeElement.init();
    edgeElement.paint();
    canvas.draw();
    const shapes = edgeElement.getShapes();
    expect(shapes.length).to.equal(2);
    expect(shapes[0].attr('path').length).equal(4);
  });

  after(() => {
    canvas && canvas.destroy();
    document.body.removeChild(div);
  });
});
