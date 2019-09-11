import { Canvas, Group } from '@antv/g';
import { expect } from 'chai';
import Chart from '../../../src/chart/chart';
import { createDiv } from '../../util/dom';

describe('Chart', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 10,
  });

  it('constructor', () => {
    expect(chart.width).to.eql(800);
    expect(chart.height).to.eql(600);
    expect(chart.canvas).to.be.an.instanceof(Canvas);
    expect(chart.backgroundGroup).to.be.an.instanceof(Group);
    expect(chart.middleGroup).to.be.an.instanceof(Group);
    expect(chart.foregroundGroup).to.be.an.instanceof(Group);

    // region -> view bbox
    expect({
      x: chart.viewBBox.x,
      y: chart.viewBBox.y,
      width: chart.viewBBox.width,
      height: chart.viewBBox.height,
    }).to.eql({
      x: 10,
      y: 10,
      width: 780,
      height: 580,
    });
  });
});
