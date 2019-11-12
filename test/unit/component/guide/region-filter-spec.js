const expect = require('chai').expect;
const RegionFilter = require('../../../../src/component/guide/region-filter');
const G2 = require('../../../../src/index');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

const data = [
  { country: '巴西', population: 18203 },
  { country: '印尼', population: 23489 },
  { country: '美国', population: 29034 },
  { country: '印度', population: 104970 },
  { country: '中国', population: 131744 }
];

function drawChart() {
  const chart = new G2.Chart({
    container: 'c1',
    width: 400,
    height: 300
  });
  chart.source(data);
  chart.axis('country', {
    label: {
      offset: 12
    }
  });
  // chart.coord().transpose();
  chart.area().position('country*population');
  chart.line().position('country*population');
  chart.render();

  return chart;
}

describe('Guide.RegionFilter', () => {
  const chart = drawChart();
  const xScale = chart.getXScale();
  const yScales = chart.getYScales();
  const group = chart.get('frontPlot').addGroup();
  const coord = chart.get('coord');

  let regionFilter;
  it('RegionFilter in cartesian coordinate', () => {
    regionFilter = new RegionFilter({
      xScales: {
        country: xScale
      },
      yScales: {
        population: yScales[0]
      },
      start: [ '印尼', 'min' ],
      end: [ '印度', 'max' ],
      color: '#FF4D4F',
      appendInfo: 'region-filter'
    });
    regionFilter.render(coord, group, data, chart);
    chart.repaint();

    const el = regionFilter.get('el');
    expect(el.name).to.equal('guide-region-filter');
    expect(el.get('appendInfo')).to.equal('region-filter');
    expect(el.get('children').length).to.equal(2);

    const clip = el.attr('clip');
    expect(clip.attr('path')).to.eql([
      [ 'M', 170, 205 ],
      [ 'L', 290, 205 ],
      [ 'L', 290, 20 ],
      [ 'L', 170, 20 ],
      [ 'z' ]
    ]);
  });

  // it('RegionFilter in polar coordinate, only works for line geometry.', () => {
  //   group.clear();
  //   chart.coord('polar');
  //   chart.repaint();
  //   const coord = chart.get('coord');
  //   regionFilter = new RegionFilter({
  //     xScales: {
  //       country: xScale
  //     },
  //     yScales: {
  //       population: yScales[0]
  //     },
  //     start: [ '印尼', 'min' ],
  //     end: [ '印度', 'max' ],
  //     color: '#FF4D4F',
  //     apply: [ 'line' ],
  //     style: {
  //       lineWidth: 4
  //     }
  //   });
  //   regionFilter.render(coord, group, data, chart);
  //   chart.repaint();

  //   const el = regionFilter.get('el');
  //   expect(el.name).to.equal('guide-region-filter');
  //   expect(el.get('children').length).to.equal(1);

  //   const clip = el.attr('clip');
  //   expect(clip.attr('path')).to.eql([
  //     [ 'M', 230, 112.5 ],
  //     [ 'L', 142.0272722426983, 141.08407197968265 ],
  //     [ 'A', 92.5, 92.5, 0, 0, 0, 317.9727277573017, 141.08407197968265 ],
  //     [ 'z' ]
  //   ]);
  // });

  it('changeVisible', () => {
    expect(regionFilter.get('visible')).to.be.true;

    regionFilter.changeVisible(false);
    expect(regionFilter.get('visible')).to.be.false;
    expect(regionFilter.get('el').get('visible')).to.be.false;

    expect(group.get('children').length).to.equal(1);
    expect(group.get('children')[0]).to.eql(regionFilter.get('el'));

  });

  it('clear', () => {
    const el = regionFilter.get('el');
    const clip = regionFilter.get('clip');
    regionFilter.clear();
    expect(el.get('destroyed')).to.be.true;
    expect(clip.get('destroyed')).to.be.true;
    expect(group.get('children').length).to.equal(0);

    chart.destroy();
    document.body.removeChild(div);
  });
});
