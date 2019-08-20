import { expect } from 'chai';
import * as _ from '@antv/util';
import { Plot } from '../../../src/';
import { getFacet } from '../../../src/facet';
import Interval from '../../../src/element/interval';

describe('rect', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  describe('rect facet', () => {
    const plot = new Plot({
      containerDOM: div,
    });

    const data = [
      { city: '杭州', category: '办公用品', year: '2018', sale: 200 },
      { city: '杭州', category: '办公用品', year: '2019', sale: 300 },
      { city: '杭州', category: '技术', year: '2018', sale: 400 },
      { city: '杭州', category: '技术', year: '2019', sale: 500 },
      { city: '广州', category: '办公用品', year: '2018', sale: 600 },
      { city: '广州', category: '办公用品', year: '2019', sale: 700 },
      { city: '广州', category: '技术', year: '2018', sale: 800 },
      { city: '广州', category: '技术', year: '2019', sale: 900 },
    ];
    plot.data(data);

    plot.facet({
      type: 'rect',
      fields: [ 'city', 'category' ],
      eachView(view) {
        view.interval().position({
          fields: [ 'year', 'sale' ],
        });
        return view;
      },
    });

    plot.render();

    it('facet - rect', () => {
      const facetViews = plot.get('views');
      const facet = plot.get('facet');

      expect(facetViews.length).to.be.equal(4);

      expect(facet).to.be.an.instanceOf(getFacet('rect'));

      // 分面布局
      expect(facetViews[0].get('start')).to.be.eql({ x: 0, y: 0 });
      expect(facetViews[1].get('start')).to.be.eql({ x: 0, y: 0.5 });
      expect(facetViews[2].get('start')).to.be.eql({ x: 0.5, y: 0 });
      expect(facetViews[3].get('start')).to.be.eql({ x: 0.5, y: 0.5 });

      _.each(facetViews, (view) => {
        const elements = view.get('elements');
        expect(elements.length).to.be.equal(1);

        expect(elements[0]).to.be.an.instanceOf(Interval);
      });
    });

    it('rerender', () => {
      // 清除重新绘制，测试生命周期
      plot.clear();
      plot.render();
      plot.render();

      const facetViews = plot.get('views');
      const facet = plot.get('facet');
      expect(facetViews.length).to.be.equal(4);
      expect(facet).to.be.an.instanceOf(getFacet('rect'));
    });
  });

  after(() => {
    document.body.removeChild(div);
  });
});
