const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#534', () => {
  it('if text is empty, labelLine does not show', () => {
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
    chart.coord('theta', {
      radius: 0.8
    });

    const interval = chart.intervalStack()
      .position('sold')
      .color('genre')
      .label('genre', genre => {
        if (genre === 'Other') {
          return 0;
        }
        if (genre === 'Shooter') {
          return null;
        }
        return genre;
      });

    chart.render();

    const labels = interval.get('labelContainer').get('labelsGroup').get('children');
    const labelLines = interval.get('labelContainer').get('lineGroup').get('children');
    expect(labels.length).equal(4);
    expect(labelLines.length).equal(4);
  });
});
