const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#500', () => {
  it('after pie rotated, label unchange', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: false
    });
    chart.source(data);

    const interval = chart.intervalStack()
      .position('sold')
      .color('genre')
      .label('genre', {
        offset: 20
      });

    chart.coord('theta', {
      radius: 0.8
    });

    chart.render();
    const labels = interval.get('labelContainer').get('labelRenderer').get('items');

    chart.coord('theta', {
      radius: 0.8
    }).rotate(120);
    chart.repaint();
    const changeLabels = interval.get('labelContainer').get('labelRenderer').get('items');
    expect(labels[0].x).not.equal(changeLabels[0].x);
    expect(labels[0].y).not.equal(changeLabels[0].y);
  });
});
