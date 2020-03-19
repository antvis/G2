import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('1265', () => {

  it('1265', () => {
    const data = [
      { name: "a", time: "10:10", call: 4, waiting: 2, people: 2 },
      { name: "b", time: "10:10", call: 4, waiting: 21, people: 2 },
      { name: "a", time: "10:15", call: 2, waiting: 6, people: 3 },
      { name: "b", time: "10:15", call: 2, waiting: 16, people: 3 },
      { name: "a", time: "10:20", call: 13, waiting: 2, people: 5 },
      { name: "b", time: "10:20", call: 13, waiting: 12, people: 5 },
      { name: "a", time: "10:25", call: 9, waiting: 9, people: 1 },
      { name: "b", time: "10:25", call: 9, waiting: 19, people: 1 }
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });
    chart.data(data);
    chart.tooltip({
      shared: true,
    });
    chart
      .line()
      .position("time*people")
      .color("#fdae6b")
      .size(3)
      .shape("smooth");
    chart
      .point()
      .position("time*people")
      .color("#fdae6b")
      .size(3)
      .shape("circle");
    chart
      .interval()
      .position("time*waiting")
      .color("name")
      .adjust([
        {
          type: "dodge",
          marginRatio: 1 / 32
        }
      ]);

    chart.interaction('active-region');
    chart.render();

    const point = chart.getXY({ name: "a", time: "10:10", call: 4, waiting: 2, people: 2 })
    chart.emit('plot:mousemove', point);
    const background = chart.backgroundGroup;
    const region = background.findAllByName('active-region')[0];
    const { minX, width } = region.getBBox();
    expect(minX).toBeCloseTo(25.7484250664711);
    expect(width).toBeCloseTo(69.21814620494843);
  });
});
