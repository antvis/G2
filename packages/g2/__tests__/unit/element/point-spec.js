import { expect } from 'chai';
import { getCoord } from '@antv/coord';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import Point from '../../../src/element/point';

import ScatterData from '../../data/bubble';
import View from '../../utils/view';

const Rect = getCoord('rect');

const LinearScale = getScale('linear');
const IdentityScale = getScale('identity');

describe('Point Element', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  let pointElement;

  const coord = new Rect({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 200,
      y: 0,
    },
  });

  const gdpScale = new LinearScale({
    field: 'GDP',
    values: ScatterData.map((d) => d.GDP),
  });
  const lifeExpectancyScale = new LinearScale({
    field: 'LifeExpectancy',
    values: ScatterData.map((d) => d.LifeExpectancy),
  });
  const populationScale = new LinearScale({
    field: 'Population',
    values: ScatterData.map((d) => d.Population),
  });
  const shapeIdentityScale = new IdentityScale({
    field: 'circle',
    values: [ 'circle' ],
  });

  const canvas = new Canvas({
    containerDOM: div,
    renderer: 'svg',
    width: 400,
    height: 400,
    pixelRatio: 2,
  });
  const container = canvas.addGroup();

  it('constructor', () => {
    pointElement = new Point({
      data: ScatterData,
      scales: {
        GDP: gdpScale,
        LifeExpectancy: lifeExpectancyScale,
        Population: populationScale,
        circle: shapeIdentityScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-point',
    });

    expect(pointElement.get('type')).to.equal('point');
    expect(pointElement.get('shapeType')).to.equal('point');
  });

  it('element.init()', () => {
    pointElement
      .position({
        fields: [ 'GDP', 'LifeExpectancy' ]
      })
      .size({
        fields: [ 'Population' ],
        values: [ 4, 65 ],
      })
      .shape('circle');

    pointElement.init();

    const attrs = pointElement.get('attrs');

    const dataArray = pointElement.get('dataArray');

    expect(attrs).to.have.keys([ 'position', 'size', 'shape' ]);
    expect(dataArray.length).to.equal(1); // 没有分组
    expect(dataArray[0][0].Country).to.eql('Argentina');
  });

  it('element.paint()', () => {
    pointElement.paint();
    canvas.draw();

    const shapes = pointElement.getShapes();
    const dataArray = pointElement.get('dataArray');
    expect(dataArray.length).to.equal(1); // 没有分组
    expect(shapes.length).to.equal(60);
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
