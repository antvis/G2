import { expect } from 'chai';
import Area from '../../../src/element/area';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { getCoord } from '@antv/coord';
import View from '../../utils/view';

const Rect = getCoord('rect');
const LinearScale = getScale('linear');
const CatScale = getScale('cat');

describe('Area', () => {
  describe('Default', () => {
    const areaDiv = document.createElement('div');
    areaDiv.id = 'area1';
    document.body.appendChild(areaDiv);

    let areaElement;

    const yearScale = new CatScale({
      field: 'year',
      values: [ '1994', '1995', '1996' ],
      range: [ 0, 1 ],
    });

    const valueScale = new LinearScale({
      field: 'value',
      min: 100,
      max: 120,
      nice: true,
    });

    const data = [
      {
        year: '1994',
        value: 100,
      },
      {
        year: '1995',
        value: 110,
      },
      {
        year: '1996',
        value: 120,
      },
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
      containerId: 'area1',
      renderer: 'canvas',
      width: 200,
      height: 200,
      pixelRatio: 2,
    });

    // const container = canvas.addGroup();
    it('constructor', () => {
      areaElement = new Area({
        data,
        scales: {
          year: yearScale,
          value: valueScale,
        },
        coord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-area',
      });
      expect(areaElement.get('type')).to.eql('area');
      expect(areaElement.get('shapeType')).to.eql('area');
      expect(areaElement.get('generatePoints')).to.be.true;
      expect(areaElement.get('sortable')).to.be.true;
      expect(areaElement.get('connectNulls')).to.be.false;
      expect(areaElement.get('showSinglePoint')).to.be.false;
    });

    it('element.init()', () => {
      areaElement.position({ fields: [ 'year', 'value' ]});
      areaElement.init();
      const attrs = areaElement.get('attrs');
      const dataArray = areaElement.get('dataArray');
      expect(attrs).to.have.keys([ 'position' ]);
      expect(dataArray.length).to.eql(1);
    });

    it('element.paint()', () => {
      areaElement.paint();
      canvas.draw();
      const shapes = areaElement.getShapes();
      expect(shapes.length).to.eql(1);
      expect(shapes[0].attr('path')).to.eql([
        [ 'M', 0, 200 ],
        [ 'L', 100, 100 ],
        [ 'L', 200, 0 ],
        [ 'L', 200, 200 ],
        [ 'L', 100, 200 ],
        [ 'L', 0, 200 ],
        [ 'Z' ],
      ]);
    });

    after(() => {
      areaElement.destroy();
      canvas.destroy();
      document.body.removeChild(areaDiv);
    });
  });

  describe('Area with stack adjust', () => {
    const areaDiv = document.createElement('div');
    areaDiv.id = 'area2';
    document.body.appendChild(areaDiv);

    let areaStackElement;
    const yearScale = new CatScale({
      field: 'year',
      values: [ '1994', '1995', '1996' ],
      range: [ 0, 1 ],
    });

    const valueScale = new LinearScale({
      field: 'value',
      min: 0,
      max: 250,
      nice: false,
    });

    const typeScale = new CatScale({
      field: 'type',
      values: [ 'a', 'b' ],
    });

    const data = [
      { year: '1994', value: 100, type: 'a' },
      { year: '1995', value: 90, type: 'a' },
      { year: '1996', value: 120, type: 'a' },
      { year: '1994', value: 120, type: 'b' },
      { year: '1995', value: 65, type: 'b' },
      { year: '1996', value: 10, type: 'b' },
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
      containerId: 'area2',
      renderer: 'canvas',
      width: 200,
      height: 200,
      pixelRatio: 2,
    });

    // const container = canvas.addGroup();
    it('area with stack', () => {
      areaStackElement = new Area({
        data,
        scales: {
          year: yearScale,
          value: valueScale,
          type: typeScale,
        },
        coord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-area-stack',
      });

      areaStackElement
        .position({ fields: [ 'year', 'value' ]})
        .color({ fields: [ 'type' ]})
        .adjust({ type: 'stack' });
      areaStackElement.init();
      areaStackElement.paint();
      canvas.draw();
      const shapes = areaStackElement.getShapes();
      expect(shapes.length).to.eql(2);
      expect(shapes[0].attr('path')).to.eql([
        [ 'M', 0, 24 ],
        [ 'L', 100, 76 ],
        [ 'L', 200, 96 ],
        [ 'L', 200, 192 ],
        [ 'L', 100, 148 ],
        [ 'L', 0, 104 ],
        [ 'Z' ],
      ]);
      expect(shapes[1].attr('path')).to.eql([
        [ 'M', 0, 104 ],
        [ 'L', 100, 148 ],
        [ 'L', 200, 192 ],
        [ 'L', 200, 200 ],
        [ 'L', 100, 200 ],
        [ 'L', 0, 200 ],
        [ 'Z' ],
      ]);
    });

    after(() => {
      areaStackElement.destroy();
      canvas.destroy();
      document.body.removeChild(areaDiv);
    });
  });

  describe('connectNulls', () => {
    const areaDiv = document.createElement('div');
    areaDiv.id = 'area3';
    document.body.appendChild(areaDiv);

    const yearScale = new CatScale({
      field: 'year',
      values: [ '1994', '1995', '1996', '1997', '1998' ],
      range: [ 0, 1 ],
    });

    const valueScale = new LinearScale({
      field: 'value',
      min: 0,
      max: 120,
      nice: true,
    });

    const data = [
      { year: '1994', value: 90 },
      { year: '1995', value: 90 },
      { year: '1996', value: null },
      { year: '1997', value: 120 },
      { year: '1998', value: 78 },
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
      containerId: 'area3',
      renderer: 'canvas',
      width: 200,
      height: 200,
      pixelRatio: 2,
    });

    // const container = canvas.addGroup();
    it('connectNulls is false', () => {
      const element = new Area({
        data,
        scales: {
          year: yearScale,
          value: valueScale,
        },
        coord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-area-stack',
      });

      element.position({ fields: [ 'year', 'value' ]});
      element.init();
      element.paint();
      canvas.draw();
      const shapes = element.getShapes();
      expect(shapes.length).to.eql(2);
      expect(shapes[0].attr('path')).to.eql([
        [ 'M', 0, 50 ],
        [ 'L', 50, 50 ],
        [ 'L', 50, 200 ],
        [ 'L', 0, 200 ],
        [ 'Z' ],
      ]);
      expect(shapes[1].attr('path')).to.eql([
        [ 'M', 150, 0 ],
        [ 'L', 200, 70 ],
        [ 'L', 200, 200 ],
        [ 'L', 150, 200 ],
        [ 'Z' ],
      ]);

      element.destroy();
    });

    it('connectNulls is true', () => {
      // container.clear();
      const element = new Area({
        data,
        connectNulls: true,
        scales: {
          year: yearScale,
          value: valueScale,
        },
        coord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-area-stack',
      });

      element.position({ fields: [ 'year', 'value' ]});
      element.init();
      element.paint();
      canvas.draw();
      const shapes = element.getShapes();
      expect(shapes.length).to.eql(1);
      expect(shapes[0].attr('path')).to.eql([
        [ 'M', 0, 50 ],
        [ 'L', 50, 50 ],
        [ 'L', 150, 0 ],
        [ 'L', 200, 70 ],
        [ 'L', 200, 200 ],
        [ 'L', 150, 200 ],
        [ 'L', 50, 200 ],
        [ 'L', 0, 200 ],
        [ 'Z' ],
      ]);
      element.destroy();
    });

    after(() => {
      canvas.destroy();
      document.body.removeChild(areaDiv);
    });
  });
});
