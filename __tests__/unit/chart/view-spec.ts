import { Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import { expect } from 'chai';
import { View } from '../../../src';
import { createCanvas, createDiv } from '../../util/dom';

const data = [
  { city: '杭州', sale: 100 },
  { city: '广州', sale: 30 },
  { city: '上海', sale: 200 },
  { city: '呼和浩特', sale: 10 },
];

describe('View', () => {
  const div = createDiv();

  const canvas = createCanvas({
    containerDOM: div,
  });

  const backgroundGroup = canvas.addGroup();
  const middleGroup = canvas.addGroup();
  const foregroundGroup = canvas.addGroup();

  const view = new View({
    parent: null,
    canvas,
    foregroundGroup,
    middleGroup,
    backgroundGroup,
    padding: 5,
  });

  it('constructor', () => {
    expect(view.canvas).to.be.an.instanceof(Canvas);
    expect(view.backgroundGroup).to.be.an.instanceof(Group);
    expect(view.middleGroup).to.be.an.instanceof(Group);
    expect(view.foregroundGroup).to.be.an.instanceof(Group);
  });

  it('region', () => {
    // region -> view bbox
    expect({
      x: view.viewBBox.x,
      y: view.viewBBox.y,
      width: view.viewBBox.width,
      height: view.viewBBox.height,
    }).to.eql({
      x: 5,
      y: 5,
      width: 790,
      height: 590,
    });
  });

  it('data', () => {
    view.data(data);

    expect(view.options.data).to.be.eql(data);
  });

  it('filter', () => {
    view.filter('sale', (sale: number) => sale <= 150);
    view.filter('city', (city: string) => city.length <= 2);

    view.render();
    expect(view.filteredData).to.be.eql([{ city: '杭州', sale: 100 }, { city: '广州', sale: 30 }]);
  });

  it('coordinate', () => {
    expect(view.getCoordinate().type).to.be.eql('rect');

    view.coordinate('rect');
    view.render();
    expect(view.getCoordinate().type).to.be.eql('rect');

    view.coordinate('theta');
    view.render();

    expect(view.getCoordinate().type).to.be.eql('theta');
    expect(view.getCoordinate().width).to.be.eql(790);
    expect(view.getCoordinate().height).to.be.eql(590);
  });

  it('geometry', () => {
    // @ts-ignore
    view.polygon().position('city*sale');

    view.render();
    expect(view.geometries.length).to.be.eql(1);
    expect(_.size(view.geometries[0].scales)).to.be.eql(2);
    expect(view.geometries[0].scales.city.ticks).to.be.eql(['杭州', '广州']);
    expect(view.geometries[0].scales.sale.values).to.be.eql([100, 30]);
  });
});
