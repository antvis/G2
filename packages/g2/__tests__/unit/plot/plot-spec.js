import { expect } from 'chai';
import '../../../src';
import Plot from '../../../src/plot/plot';
import Global from '../../../src/global';

describe('Plot', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  describe('default', () => {
    const plot = new Plot({
      containerDOM: div,
      // padding: 30,
    });

    it('init', () => {
      expect(plot.get('scaleController')).not.equal(null);
      expect(plot.get('coordController')).not.equal(null);

      expect(plot.get('viewRange')).not.to.be.undefined;
      expect(plot.get('viewRange').x).to.equal(0);
      expect(plot.get('viewRange').y).to.equal(0);
      expect(plot.get('viewRange').width).to.equal(Global.width);
      expect(plot.get('viewRange').height).to.equal(Global.height);

      // console.log(plot.get('panelRange'));

      expect(plot.get('panelRange')).not.to.be.undefined;
      expect(plot.get('panelRange').x).to.equal(80);
      expect(plot.get('panelRange').y).to.equal(20);
      expect(plot.get('panelRange').width).to.equal(540);
      expect(plot.get('panelRange').height).to.equal(365);
    });

    it('data', () => {
      const data = [
        { a: 1, b: 2 },
        { a: 2, b: 5 },
        { a: 3, b: 4 },
      ];
      plot.data(data);
      expect(plot.get('data')).to.eql(data);
    });

    it('define elements', () => {
      expect(plot.line).to.be.a('function');
      expect(plot.point).to.be.a('function');

      const line = plot.line()
        .position({
          fields: [ 'a', 'b' ],
        })
        .color({
          values: [ 'red' ],
        });

      expect(plot.get('elements').length).to.equal(1);
      expect(plot.get('elements')[0]).to.equal(line);
    });

    it('render', () => {
      plot.render();
      expect(plot.get('container').getCount()).equal(3);
    });

    it('changeSize', () => {
      plot.changeSize(400, 300);

      expect(plot.get('width')).equal(400);
      expect(plot.get('height')).equal(300);
      expect(plot.get('viewRange').width).equal(400);
    });

    it('destroy', () => {
      plot.destroy();
      expect(plot.destroyed).equal(true);
    });
  });

  after(() => {
    document.body.removeChild(div);
  });
});
