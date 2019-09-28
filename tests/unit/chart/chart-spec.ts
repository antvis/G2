import { Canvas, Group } from '@antv/g';
import { Chart } from '../../../src/';
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
    expect(chart.width).toEqual(800);
    expect(chart.height).toEqual(600);
    expect(chart.canvas).toBeInstanceOf(Canvas);
    expect(chart.backgroundGroup).toBeInstanceOf(Group);
    expect(chart.middleGroup).toBeInstanceOf(Group);
    expect(chart.foregroundGroup).toBeInstanceOf(Group);

    // region -> view bbox
    expect({
      x: chart.viewBBox.x,
      y: chart.viewBBox.y,
      width: chart.viewBBox.width,
      height: chart.viewBBox.height,
    }).toEqual({
      x: 10,
      y: 10,
      width: 780,
      height: 580,
    });
  });
});
