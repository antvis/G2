import { expect } from 'chai';
import { getCoordinate } from '@antv/coord';
import AxisController from '../../../../src/plot/controller/axis';
import Global from '../../../../src/global';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');
const Helix = getCoordinate('helix');

describe('AxisController', () => {
  const start = {
    x: 0,
    y: 500,
  };
  const end = {
    x: 500,
    y: 0,
  };
  const coord = new Rect({
    start,
    end,
  });
  const scaleX = {
    field: 'a',
    getTicks() {
      return [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
        { value: 9 },
        { value: 10 },
      ];
    },
  };
  const scaleY = {
    field: 'b',
    getTicks() {
      return [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
        { value: 9 },
        { value: 10 },
      ];
    },
  };
  const as = new AxisController({
    theme: Global.theme,
  });

  it('_isHide', () => {
    as.options = {
      fields: {
        a: false,
      },
    };
    expect(as._isHide('a')).to.equal(true);
    expect(as._isHide('b')).to.equal(false);
  });

  describe('_getAxisPosition', () => {
    it('get axis position rect', () => {
      let position = as._getAxisPosition(coord, 'x');
      expect(position).to.equal('bottom');

      position = as._getAxisPosition(coord, 'y');
      expect(position).to.equal('left');

      position = as._getAxisPosition(coord, 'y', 1);
      expect(position).to.equal('right');
    });

    it('get axis position polar', () => {
      const coord = new Polar({
        start,
        end,
      });

      let position = as._getAxisPosition(coord, 'x');
      expect(position).to.equal('circle');
      position = as._getAxisPosition(coord, 'y');
      expect(position).to.equal('radius');
    });

    it('get axis position polar transpose', () => {
      const coord = new Polar({
        start,
        end,
      });
      coord.transpose();

      let position = as._getAxisPosition(coord, 'x');
      expect(position).to.equal('radius');
      position = as._getAxisPosition(coord, 'y');
      expect(position).to.equal('circle');
    });

    it('get axis position for helix', () => {
      const helix = new Helix({
        start,
        end,
      });
      const position = as._getAxisPosition(helix);
      expect(position).to.equal('helix');
    });

    it('user defines the position of the axis', () => {
      as.options = {
        fields: {
          a: {
            position: 'right',
          },
        },
      };

      const position = as._getAxisPosition(coord, 'y', 0, 'a');
      expect(position).to.equal('right');
    });
  });

  describe('_getLineCfg', () => {
    as.options = null;
    it('_getLineCfg, X axis when position is bottom.', () => {
      const lineCfg = as._getLineCfg(coord, scaleX, 'x');
      expect(lineCfg.isVertical).to.equal(false);
      expect(lineCfg.factor).to.equal(1);
      expect(lineCfg.start).to.eql({ x: 0, y: 500 });
      expect(lineCfg.end).to.eql({ x: 500, y: 500 });
    });

    it('axis title', () => {
      let cfg;
      as.options = {
        fields: {
          a: {
            showTitle: true,
          },
        },
      };
      cfg = as._getAxisDefaultCfg(coord, scaleX, 'x');
      expect(cfg.title.text).to.equal('a');
      as.options.fields.a.title = {
        text: 'test',
      };
      cfg = as._getAxisDefaultCfg(coord, scaleX, 'x');
      expect(cfg.title.text).to.equal('test');
    });

    it('_getLineCfg, X axis when position is top.', () => {
      as.options = {
        fields: {
          a: {
            position: 'top',
          },
        },
      };
      const lineCfg = as._getLineCfg(coord, scaleX, 'x');
      expect(lineCfg.isVertical).to.equal(false);
      expect(lineCfg.factor).to.equal(-1);
      expect(lineCfg.start).to.eql({ x: 0, y: 0 });
      expect(lineCfg.end).to.eql({ x: 500, y: 0 });
    });

    it('_getLineCfg, Y axis when position is left.', () => {
      const lineCfg = as._getLineCfg(coord, scaleY, 'y');
      expect(lineCfg.isVertical).to.equal(true);
      expect(lineCfg.factor).to.equal(-1);
      expect(lineCfg.start).to.eql({ x: 0, y: 500 });
      expect(lineCfg.end).to.eql({ x: 0, y: 0 });
    });

    it('_getLineCfg, Y axis when position is left and index is bigger than 0.', () => {
      as.options = {
        fields: {
          b: {
            position: 'left',
          },
        },
      };
      const lineCfg = as._getLineCfg(coord, scaleY, 'y', 1);
      expect(lineCfg.isVertical).to.equal(true);
      expect(lineCfg.factor).to.equal(-1);
      expect(lineCfg.start).to.eql({ x: 0, y: 500 });
      expect(lineCfg.end).to.eql({ x: 0, y: 0 });
    });

    it('_getLineCfg, Y axis when position is right.', () => {
      as.options = {
        fields: {
          b: {
            position: 'right',
          },
        },
      };
      const lineCfg = as._getLineCfg(coord, scaleY, 'y');
      expect(lineCfg.isVertical).to.equal(true);
      expect(lineCfg.factor).to.equal(1);
      expect(lineCfg.start).to.eql({ x: 500, y: 500 });
      expect(lineCfg.end).to.eql({ x: 500, y: 0 });
    });

    it('_getLineCfg, Y axis when position is right and index is bigger than 0.', () => {
      as.options = {
        fields: {
          b: {
            position: 'right',
          },
        },
      };
      const lineCfg = as._getLineCfg(coord, scaleY, 'y', 1);
      expect(lineCfg.isVertical).to.equal(true);
      expect(lineCfg.factor).to.equal(1);
      expect(lineCfg.start).to.eql({ x: 500, y: 500 });
      expect(lineCfg.end).to.eql({ x: 500, y: 0 });
    });

    it('_getLineCfg, X axis when coord is transposed.', () => {
      const coord = new Rect({
        start,
        end,
      });
      coord.transpose();
      const lineCfg = as._getLineCfg(coord, scaleX, 'x');
      expect(lineCfg.isVertical).to.equal(true);
      expect(lineCfg.factor).to.equal(-1);
      expect(lineCfg.start).to.eql({ x: 0, y: 500 });
      expect(lineCfg.end).to.eql({ x: 0, y: 0 });
    });
  });

  describe('_getCircleCfg', () => {
    it('_getCircleCfg', () => {
      const coord = new Polar({
        start,
        end,
      });
      const circleCfg = as._getCircleCfg(coord);

      expect(circleCfg.startAngle).to.equal(-1.5707963267948966);
      expect(circleCfg.endAngle).to.equal(4.71238898038469);
      expect(circleCfg.radius).to.equal(250);
      expect(circleCfg.inner).to.equal(0);
      expect(circleCfg.center).to.eql({ x: 250, y: 250 });
    });

    it.skip('_getCircleCfg when coord is reflectY.', () => {
      const coord = new Polar({
        start,
        end,
        startAngle: 1 / (3 * Math.PI),
        endAngle: Math.PI,
      });
      coord.reflect('y');
      const circleCfg = as._getCircleCfg(coord);
      expect(circleCfg.startAngle).to.equal(0.10610329539459758);
      expect(circleCfg.endAngle).to.equal(3.141592653589794);
      expect(circleCfg.center).to.eql({
        x: 250.70494165327872,
        y: 124.94090329888789,
      });
    });

    it('_getCircleCfg when coord is transposed.', () => {
      const coord = new Polar({
        start,
        end,
        innerRadius: 0.5,
      });
      coord.transpose();

      const circleCfg = as._getCircleCfg(coord);
      expect(circleCfg.startAngle).to.equal(-1.5707963267948966);
      expect(circleCfg.endAngle).to.equal(4.71238898038469);
      expect(circleCfg.radius).to.equal(250);
      expect(circleCfg.inner).to.equal(0.5);
      expect(circleCfg.center).to.eql({
        x: 250,
        y: 250,
      });
    });
  });

  describe('_getRadiusCfg', () => {
    it('_getRadiusCfg', () => {
      const coord = new Polar({
        start,
        end,
      });
      const radiusCfg = as._getRadiusCfg(coord);
      expect(radiusCfg.factor).to.equal(-1);
      expect(radiusCfg.start).to.eql({
        x: 250,
        y: 250,
      });
      expect(radiusCfg.end).to.eql({
        x: 250.00000000000003,
        y: 0,
      });
    });

    it('_getRadiusCfg when coord is transpose.', () => {
      const coord = new Polar({
        start,
        end,
        startAngle: 1 / (3 * Math.PI),
        endAngle: Math.PI,
      });
      coord.transpose();
      const radiusCfg = as._getRadiusCfg(coord);
      expect(radiusCfg.factor).to.equal(1);
      expect(radiusCfg.start).to.eql({
        x: 250.70494165327872,
        y: 124.94090329888789,
      });
      expect(radiusCfg.end).to.eql({
        x: 500.00000000000006,
        y: 151.49164063853073,
      });
    });
  });

  describe('_getHelixCfg ', () => {
    it('_getHelixCfg', () => {
      const coord = new Helix({
        start,
        end,
      });
      const helixCfg = as._getHelixCfg(coord);
      expect(helixCfg.crp.length).to.equal(202);
    });
  });

  describe('_getAxisCfg', () => {
    it('_getAxisCfg', () => {
      const axisCfg = as._getAxisCfg(coord, scaleX, scaleY, 'x');
      expect(axisCfg.autoRotateLabel).to.equal(true);
      expect(axisCfg.position).to.equal('bottom');
      expect(axisCfg.ticks.length).to.equal(10);
      expect(axisCfg.showTitle).to.be.false;
    });
    it('_getAxisCfg when gridAlign is middle.', () => {
      as.options = {
        fields: {
          b: {
            gridAlign: 'center',
          },
        },
      };
      const coord = new Polar({
        start,
        end,
      });
      coord.reflect('y');
      const axisCfg = as._getAxisCfg(coord, scaleY, scaleX, 'y');

      expect(axisCfg.ticks.length).to.equal(10);
      expect(axisCfg.grid).not.to.be.empty;
      expect(axisCfg.gridType).to.equal('arc');
      expect(axisCfg.gridPoints.length).to.equal(12); // fixed: fill gaps
      expect(axisCfg.gridPoints[0].id).not.to.be.undefined;
      expect(axisCfg.gridPoints[0].points.length).to.equal(12);
    });
  });
});
