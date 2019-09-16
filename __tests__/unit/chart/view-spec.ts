import { Canvas, Group } from '@antv/g';
import { expect } from 'chai';
import { View } from '../../../src/chart';
import { createCanvas, createDiv } from '../../util/dom';

const data = [{ city: '杭州', sale: 100 }, { city: '上海', sale: 200 }, { city: '呼和浩特', sale: 50 }];

describe('View', () => {
  const div = createDiv();

  console.log(div);
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
    expect(view.filteredData).to.be.eql([{ city: '杭州', sale: 100 }]);
  });
});
