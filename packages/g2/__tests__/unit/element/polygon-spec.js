import { expect } from 'chai';
import Polygon from '../../../src/element/polygon';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { getCoordinate } from '@antv/coord';
import Theme from '../../../src/theme/default';
import View from '../../utils/view';

const CatScale = getScale('cat');
const LinearScale = getScale('linear');

const Rect = getCoordinate('rect');
describe('Polygon Element X and Y are not all array', () => {
  const polygonDiv = document.createElement('div');
  polygonDiv.id = 'polygon1';
  document.body.appendChild(polygonDiv);

  let polygonElement;

  const nameScale = new CatScale({
    field: 'name',
    values: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'],
    range: [0, 1],
  });

  const dayScale = new CatScale({
    field: 'day',
    values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  });

  const valueScale = new LinearScale({
    field: 'sales',
    min: 0,
    max: 6000,
    nice: true,
  });
  const data = [
    { name: 'Alexander', day: 'Monday', sales: 10 },
    { name: 'Alexander', day: 'Tuesday', sales: 19 },
    { name: 'Alexander', day: 'Wednesday', sales: 8 },
    { name: 'Alexander', day: 'Thursday', sales: 24 },
    { name: 'Alexander', day: 'Friday', sales: 67 },
    { name: 'Marie', day: 'Monday', sales: 92 },
    { name: 'Marie', day: 'Tuesday', sales: 58 },
    { name: 'Marie', day: 'Wednesday', sales: 78 },
    { name: 'Marie', day: 'Thursday', sales: 117 },
    { name: 'Marie', day: 'Friday', sales: 48 },
    { name: 'Maximilian', day: 'Monday', sales: 35 },
    { name: 'Maximilian', day: 'Tuesday', sales: 15 },
    { name: 'Maximilian', day: 'Wednesday', sales: 123 },
    { name: 'Maximilian', day: 'Thursday', sales: 64 },
    { name: 'Maximilian', day: 'Friday', sales: 52 },
    { name: 'Sophia', day: 'Monday', sales: 72 },
    { name: 'Sophia', day: 'Tuesday', sales: 132 },
    { name: 'Sophia', day: 'Wednesday', sales: 114 },
    { name: 'Sophia', day: 'Thursday', sales: 19 },
    { name: 'Sophia', day: 'Friday', sales: 16 },
    { name: 'Lukas', day: 'Monday', sales: 38 },
    { name: 'Lukas', day: 'Tuesday', sales: 5 },
    { name: 'Lukas', day: 'Wednesday', sales: 8 },
    { name: 'Lukas', day: 'Thursday', sales: 117 },
    { name: 'Lukas', day: 'Friday', sales: 115 },
    { name: 'Maria', day: 'Monday', sales: 88 },
    { name: 'Maria', day: 'Tuesday', sales: 32 },
    { name: 'Maria', day: 'Wednesday', sales: 12 },
    { name: 'Maria', day: 'Thursday', sales: 6 },
    { name: 'Maria', day: 'Friday', sales: 120 },
    { name: 'Leon', day: 'Monday', sales: 13 },
    { name: 'Leon', day: 'Tuesday', sales: 44 },
    { name: 'Leon', day: 'Wednesday', sales: 88 },
    { name: 'Leon', day: 'Thursday', sales: 98 },
    { name: 'Leon', day: 'Friday', sales: 96 },
    { name: 'Anna', day: 'Monday', sales: 31 },
    { name: 'Anna', day: 'Tuesday', sales: 1 },
    { name: 'Anna', day: 'Wednesday', sales: 82 },
    { name: 'Anna', day: 'Thursday', sales: 32 },
    { name: 'Anna', day: 'Friday', sales: 30 },
    { name: 'Tim', day: 'Monday', sales: 85 },
    { name: 'Tim', day: 'Tuesday', sales: 97 },
    { name: 'Tim', day: 'Wednesday', sales: 123 },
    { name: 'Tim', day: 'Thursday', sales: 64 },
    { name: 'Tim', day: 'Friday', sales: 84 },
    { name: 'Laura', day: 'Monday', sales: 47 },
    { name: 'Laura', day: 'Tuesday', sales: 114 },
    { name: 'Laura', day: 'Wednesday', sales: 31 },
    { name: 'Laura', day: 'Thursday', sales: 48 },
    { name: 'Laura', day: 'Friday', sales: 91 },
  ];

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

  const canvas = new Canvas({
    containerId: 'polygon1',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  const container = canvas.addGroup();

  it('constructor', () => {
    polygonElement = new Polygon({
      data,
      scales: {
        name: nameScale,
        day: dayScale,
        sales: valueScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-polygon1',
    });

    expect(polygonElement.get('type')).to.equal('polygon');
    expect(polygonElement.get('shapeType')).to.equal('polygon');
    expect(polygonElement.get('generatePoints')).to.be.true;
  });

  it('element.init()', () => {
    polygonElement.position({ fields: ['name', 'day'] }).color({ fields: ['sales'] });
    polygonElement.init();

    const attrs = polygonElement.get('attrs');
    const dataArray = polygonElement.get('dataArray');
    expect(attrs).to.have.keys(['position', 'color']);
    expect(attrs.color.values).to.eql(Theme.colors);

    expect(dataArray.length).to.equal(1);
  });

  it('element.paint()', () => {
    polygonElement.paint();
    canvas.draw();

    const shapes = polygonElement.getShapes();
    const dataArray = polygonElement.get('dataArray');
    expect(shapes.length).to.equal(50);
    expect(dataArray.length).to.equal(1);

    expect(shapes[0].id).to.equal('view-polygon1-Alexander-Monday');
    expect(shapes[1].id).to.equal('view-polygon1-Alexander-Tuesday');
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(polygonDiv);
  });
});

describe('Polygon Element X is array and Y is number', () => {
  const polygonDiv = document.createElement('div');
  polygonDiv.id = 'polygon2';
  document.body.appendChild(polygonDiv);

  const xScale = new LinearScale({
    field: 'x',
    min: 56,
    max: 68,
    nice: false,
  });

  const yScale = new CatScale({
    field: 'y',
    values: ['category'],
    range: [0, 1],
  });

  let polygonElement;

  const data = [{ x: [60, 64], y: 'category' }];

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

  const canvas = new Canvas({
    containerId: 'polygon2',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  const container = canvas.addGroup();

  it('constructor', () => {
    polygonElement = new Polygon({
      data,
      scales: {
        x: xScale,
        y: yScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-polygon2',
    });

    expect(polygonElement.get('type')).to.equal('polygon');
    expect(polygonElement.get('shapeType')).to.equal('polygon');
    expect(polygonElement.get('generatePoints')).to.be.true;
  });

  it('element.init()', () => {
    polygonElement.position({ fields: ['x', 'y'] });
    polygonElement.init();

    const attrs = polygonElement.get('attrs');
    const dataArray = polygonElement.get('dataArray');
    expect(attrs).to.have.keys(['position']);

    expect(dataArray.length).to.equal(1);
  });

  it('element.paint()', () => {
    polygonElement.paint();
    canvas.draw();

    const shapes = polygonElement.getShapes();
    const dataArray = polygonElement.get('dataArray');
    expect(shapes.length).to.equal(1);
    expect(dataArray.length).to.equal(1);

    expect(shapes[0].id).to.equal('view-polygon2-60,64-category');
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(polygonDiv);
  });
});

describe('Polygon Element X is number and Y is array', () => {
  const polygonDiv = document.createElement('div');
  polygonDiv.id = 'polygon3';
  document.body.appendChild(polygonDiv);

  let polygonElement;

  const keyScale = new CatScale({
    field: 'key',
    values: ['PetalLength'],
    range: [0, 1],
  });

  const yScale = new LinearScale({
    field: 'y',
    min: 1.3,
    max: 1.4,
    nice: true,
  });

  const data = [{ key: 'PetalLength', value: 1.4, y: [1.3, 1.4] }];

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

  const canvas = new Canvas({
    containerId: 'polygon3',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  const container = canvas.addGroup();

  it('constructor', () => {
    polygonElement = new Polygon({
      data,
      scales: {
        key: keyScale,
        y: yScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-polygon3',
    });

    expect(polygonElement.get('type')).to.equal('polygon');
    expect(polygonElement.get('shapeType')).to.equal('polygon');
    expect(polygonElement.get('generatePoints')).to.be.true;
  });

  it('element.init()', () => {
    polygonElement.position({ fields: ['key', 'y'] });
    polygonElement.init();

    const attrs = polygonElement.get('attrs');
    const dataArray = polygonElement.get('dataArray');
    expect(attrs).to.have.keys(['position']);

    expect(dataArray.length).to.equal(1);
  });

  it('element.paint()', () => {
    polygonElement.paint();
    canvas.draw();

    const shapes = polygonElement.getShapes();
    const dataArray = polygonElement.get('dataArray');
    expect(shapes.length).to.equal(1);
    expect(dataArray.length).to.equal(1);

    expect(shapes[0].id).to.equal('view-polygon3-PetalLength-1.3,1.4');
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(polygonDiv);
  });
});

describe('Polygon Element both X and Y are array', () => {
  const polygonDiv = document.createElement('div');
  polygonDiv.id = 'polygon4';
  document.body.appendChild(polygonDiv);

  let polygonElement;

  const xScale = new LinearScale({
    field: 'x',
    min: 0.1,
    max: 0.4,
    nice: true,
  });

  const yScale = new LinearScale({
    field: 'y',
    min: 0.2,
    max: 0.8,
    nice: true,
  });

  const data = [{ x: [0.1, 0.3, 0.3, 0.4], y: [0.2, 0.5, 0.12, 0.88] }];

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

  const canvas = new Canvas({
    containerId: 'polygon4',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  const container = canvas.addGroup();

  it('constructor', () => {
    polygonElement = new Polygon({
      data,
      scales: {
        x: xScale,
        y: yScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-polygon4',
    });

    expect(polygonElement.get('type')).to.equal('polygon');
    expect(polygonElement.get('shapeType')).to.equal('polygon');
    expect(polygonElement.get('generatePoints')).to.be.true;
  });

  it('element.init()', () => {
    polygonElement.position({ fields: ['x', 'y'] });
    polygonElement.init();

    const attrs = polygonElement.get('attrs');
    const dataArray = polygonElement.get('dataArray');
    expect(attrs).to.have.keys(['position']);

    expect(dataArray.length).to.equal(1);
  });

  it('element.paint()', () => {
    polygonElement.paint();
    canvas.draw();

    const shapes = polygonElement.getShapes();
    const dataArray = polygonElement.get('dataArray');
    expect(shapes.length).to.equal(1);
    expect(dataArray.length).to.equal(1);

    expect(shapes[0].id).to.equal('view-polygon4-0.1,0.3,0.3,0.4-0.2,0.5,0.12,0.88');
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(polygonDiv);
  });
});
