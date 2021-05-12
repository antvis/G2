import { Chart, registerShape } from '../../src';
import { createDiv } from '../util/dom';

registerShape('point', 'breath-point', {
  draw(shapeInfo: any, container: any) {
    const point = { x: shapeInfo.x, y: shapeInfo.y };
    const group = container.addGroup();
    const r = shapeInfo.style?.r || 2;
    const opacity = shapeInfo.style?.fillOpacity || 0.5;
    const fill = shapeInfo.fill || shapeInfo.color;
    const point1 = group.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r,
        fill,
        opacity,
      },
    });

    point1.animate(
      {
        r: r * 1.2,
        opacity: 0,
      },
      {
        duration: 4500,
        easing: 'easeLinear',
        repeat: true,
      }
    );
    return group;
  },
});
const data = [
  { x: '1', y: 210, type: '1' },
  { x: '1', y: 110, type: '12' },
  { x: '1', y: 10, type: '13' },
  { x: '2', y: 130, type: '1' },
  { x: '2', y: 103, type: '12' },
  { x: '2', y: 190, type: '13' },
  { x: '3', y: 103, type: '1' },
  { x: '3', y: 130, type: '13' },
  { x: '3', y: 310, type: '12' },
];

describe('#3111', () => {
  const div = createDiv();
  div.style.width = '500px';
  div.style.height = '500px';
  const chart = new Chart({
    container: div,
    autoFit: true,
    width: 500,
    height: 500,
  });

  chart.data(data).scale('x', { range: [0, 1] });
  chart.line().position('x*y').color('type').style({ lineWidth: 1 });
  chart.point().position('x*y').size(4).color('type').shape('breath-point');
  chart.render();

  it('render, point is normal', () => {
    const line2 = chart.geometries[0].elements[2];
    const point8 = chart.geometries[1].elements[8];
    // @ts-ignore
    expect(line2.getModel().mappingData[2].x).toBe(point8.getModel().mappingData.x);
    // @ts-ignore
    expect(line2.getModel().mappingData[2].y).toBe(point8.getModel().mappingData.y);
  });

  it('change size, point is normal', () => {
    chart.changeSize(800, 800);
    const line2 = chart.geometries[0].elements[2];
    const point8 = chart.geometries[1].elements[8];
    // @ts-ignore
    expect(line2.getModel().mappingData[2].x).toBe(point8.getModel().mappingData.x);
    // @ts-ignore
    expect(line2.getModel().mappingData[2].y).toBe(point8.getModel().mappingData.y);
  });
});
