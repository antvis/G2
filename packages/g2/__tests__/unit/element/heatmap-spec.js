import Plot from '../../../src/plot/plot';
import heatmapData from '../../data/heatmap';


describe('Heatmap Element', () => {
  const div = document.createElement('div');
  div.id = 'heatmap';
  document.body.appendChild(div);
  let plot;

  it('create', function() {
    plot = new Plot({
      containerId: 'heatmap',
      width: 500,
      height: 500,
      padding: [ 0, 0, 0, 0 ]
    });
    plot.data({
      source: heatmapData
    });
    plot.tooltip(false);
    plot.axis(false);
    plot.legend(false);
    plot.heatmap().position({
      fields: [ 'g', 'l' ]
    }).color({
      fields: [ 'tmp' ],
      values: [ '#F51D27', '#FA541C', '#FF8C12', '#FFC838', '#FAFFA8', '#80FF73', '#12CCCC', '#1890FF', '#6E32C2' ]
    });
    plot.render();
  });
  after(() => {
    document.body.removeChild(div);
  });

});
