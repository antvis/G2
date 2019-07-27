const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#346', () => {
  it('when show tooltip, throw error', () => {

    G2.Shape.registerShape('line', 'custom', {
      draw(cfg, group) {
        const points = cfg.points;
        const path = [];
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          if (i === 0) {
            path.push([ 'M', point.x, point.y ]);
          } else {
            path.push([ 'L', point.x, point.y ]);
          }
        }
        group.addShape('path', {
          attrs: {
            path,
            stroke: cfg.color,
            lineWidth: 1
          }
        });
      }
    });
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540
    });

    chart.source(data);

    chart.line()
      .position('genre*sold')
      .color('red')
      .shape('custom');

    expect(() => {
      chart.render();
    }).not.to.throw();
  });
});
