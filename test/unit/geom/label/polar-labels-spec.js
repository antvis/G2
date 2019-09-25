const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const PolarLabels = require('../../../../src/geom/label/polar-labels');
const Coord = require('@antv/coord/lib/');
const Scale = require('@antv/scale');

const div = document.createElement('div');
div.id = 'gl2';
document.body.appendChild(div);

function looseEqual(num1, num2) {
  return Math.abs(num1 - num2) < 0.00001;
}

const canvas = new Canvas({
  containerId: 'gl2',
  width: 500,
  height: 500
});

describe('polar labels', () => {
  const coord = new Coord.Polar({
    start: {
      x: 0,
      y: 100
    },
    end: {
      x: 100,
      y: 0
    }
  });

  const labelScale = Scale.cat({
    field: 'z',
    values: [ '1', '2', '3', '4' ]
  });
  const points = [
    { x: 50, y: 10, z: 0, _origin: { x: 50, y: 10, z: '1' } },
    { x: 100, y: 50, z: 1, _origin: { x: 100, y: 50, z: '2' } },
    { x: 10, y: 50, z: 2, _origin: { x: 10, y: 50, z: '3' } }
  ];

  const point = coord.convertPoint({
    x: 0.125,
    y: 0.8
  });
  point.z = 3;
  point._origin = { x: point.z, y: point.y, z: '4' };
  points.push(point);

  const points1 = [{
    x: 50,
    y: [ 10, 20 ],
    z: [ '1', '2' ],
    _origin: { x: 50, y: [ 10, 20 ], z: [ '1', '2' ] }
  }, {
    x: [ 60, 80 ],
    y: [ 50, 50 ],
    z: [ '3', '4' ],
    _origin: { x: [ 60, 80 ], y: [ 50, 50 ], z: [ '3', '4' ] }
  }];
  const labelScale1 = Scale.cat({
    field: 'z',
    values: [[ '1', '2' ], [ '3', '4' ]]
  });
  describe('one point one label', () => {
    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(PolarLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 10
          },
          scales: [ labelScale ]
        },
        geomType: 'point'
      });

      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(10);
      expect(cfg.textStyle).not.to.equal(undefined);
    });
    let items;
    it('get items', () => {
      items = gLabels.getLabelsItems(points);
      expect(items.length).to.equal(points.length);
    });

    it('first point rotate 0', () => {
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y - 10);
      expect(first.rotate).to.equal(0);
    });

    it('second point rotate 90', () => {
      const second = items[1];
      expect(second.x).to.equal(points[1].x + 10);
      expect(second.y).to.equal(points[1].y);
      expect(second.rotate).to.equal(Math.PI / 2);
    });

    it('third rotate 90', () => {
      const point = items[2];
      expect(point.x).to.equal(points[2].x - 10);
      expect(looseEqual(point.y, points[2].y)).to.equal(true);
      expect(point.rotate).to.equal(Math.PI / 2);
    });

    it('point rotate 45', () => {
      const point = items[3];
      const tmp = coord.convertPoint({
        x: 0.125,
        y: 1
      });

      expect(point.x).to.equal(tmp.x);
      expect(point.y).to.equal(tmp.y);
      expect(point.rotate).to.equal(45 / 180 * Math.PI);
    });
  });

  describe('one point one label,inner text', () => {
    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(PolarLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: -10
          },
          scales: [ labelScale ]
        },
        geomType: 'point'
      });

      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(-10);
      expect(cfg.textStyle).not.to.equal(undefined);
    });

    let items;
    it('get items', () => {
      items = gLabels.getLabelsItems(points);
      expect(items.length).to.equal(points.length);
    });

    it('first point rotate 0', () => {
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y + 10);
      expect(first.rotate).to.equal(0);
    });

    it('second point rotate 90', () => {
      const second = items[1];
      expect(second.x).to.equal(points[1].x - 10);
      expect(second.y).to.equal(points[1].y);
      expect(second.rotate).to.equal(90 / 180 * Math.PI);
    });

    it('third rotate 90', () => {
      const point = items[2];
      expect(point.x).to.equal(points[2].x + 10);
      expect(looseEqual(point.y, points[2].y)).to.equal(true);
      expect(point.rotate).to.equal(Math.PI / 2);
    });

    it('point rotate 45', () => {
      const point = items[3];
      const tmp = coord.convertPoint({
        x: 0.125,
        y: 0.6
      });

      expect(point.x).to.equal(tmp.x);
      expect(point.y).to.equal(tmp.y);
      expect(point.rotate).to.equal(45 / 180 * Math.PI);
    });
  });

  describe('one point two labels,outer text', () => {
    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(PolarLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 10
          },
          scales: [ labelScale1 ]
        },
        geomType: 'point'
      });

      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(10);
      expect(cfg.textStyle).not.to.equal(undefined);
    });

    let items;
    it('get items', () => {
      items = gLabels.getLabelsItems(points1);
      expect(items.length).to.equal(points1.length * 2);
    });

    it('point rotate 0', () => {
      const first = items[0];
      expect(first.x).to.equal(points1[0].x);
      expect(first.y).to.equal(points1[0].y[0] + 10);
      expect(first.rotate).to.equal(0);

      const second = items[1];
      expect(second.x).to.equal(points1[0].x);
      expect(second.y).to.equal(points1[0].y[1] - 10);
      expect(second.rotate).to.equal(0);
    });

    it('point rotate 90', () => {
      let point = items[2];

      expect(point.x).to.equal(points1[1].x[0] - 10);
      expect(point.y).to.equal(points1[1].y[0]);

      point = items[3];

      expect(point.x).to.equal(points1[1].x[1] + 10);
      expect(point.y).to.equal(points1[1].y[1]);
    });

  });

  describe('one point two label,inner text', () => {
    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(PolarLabels, {
        coord,
        labelCfg: {
          globalCfg: {
            offset: -10
          },
          scales: [ labelScale1 ]
        },
        geomType: 'interval'
      });

      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(-10);
      expect(cfg.textStyle).not.to.equal(undefined);
      expect(cfg.textStyle.fill).to.equal('#fff');

    });

    let items;
    it('get items', () => {
      items = gLabels.getLabelsItems(points1);
      expect(items.length).to.equal(points1.length * 2);
    });

    it('point rotate 0', () => {
      const first = items[0];
      expect(first.x).to.equal(points1[0].x);
      expect(first.y).to.equal(points1[0].y[0] - 10);
      expect(first.rotate).to.equal(0);

      const second = items[1];
      expect(second.x).to.equal(points1[0].x);
      expect(second.y).to.equal(points1[0].y[1] + 10);
      expect(second.rotate).to.equal(0);
    });

    it('point rotate 90', () => {
      let point = items[2];

      expect(point.x).to.equal(points1[1].x[0] + 10);
      expect(point.y).to.equal(points1[1].y[0]);

      point = items[3];

      expect(point.x).to.equal(points1[1].x[1] - 10);
      expect(point.y).to.equal(points1[1].y[1]);

    });
  });

  describe('transpose labels', () => {
    const coord = new Coord.Polar({
      start: {
        x: 0,
        y: 100
      },
      end: {
        x: 100,
        y: 0
      }
    });
    coord.transpose();

    describe('offset < 0', () => {
      let gLabels;
      it('init', () => {
        gLabels = canvas.addGroup(PolarLabels, {
          coord,
          labelCfg: {
            cfg: {
              offset: -10
            },
            scales: [ labelScale ]
          },
          geomType: 'point'
        });

        const cfg = gLabels.get('label');
        expect(cfg.offset).to.equal(-10);
        expect(cfg.textStyle).not.to.equal(undefined);
        expect(cfg.textStyle.fill).not.to.equal('#fff');
      });

      let items;
      it('get items', () => {
        items = gLabels.getLabelsItems(points);
        expect(items.length).to.equal(points.length);
      });

      it('first point rotate 0', () => {
        const first = items[0];
        expect(first.x).to.equal(40.078432583507784);
        expect(first.y).to.equal(11.25);
        expect(first.rotate).to.equal(0);
      });

      it('second point rotate 90', () => {
        const second = items[1];

        expect(second.x).to.equal(99);
        expect(second.y).to.equal(40.0501256289338);
        expect(second.rotate).to.equal(Math.PI / 2);

      });

      it('third rotate 90', () => {
        const point = items[2];
        expect(+(point.x).toFixed(2)).to.equal(11.25);
        expect(point.y).to.equal(59.92156741649222);
        expect(point.rotate).to.equal(Math.PI / 2);
      });

    });

    describe('offset > 0', () => {
      let gLabels;
      it('init', () => {
        gLabels = canvas.addGroup(PolarLabels, {
          coord,
          labelCfg: {
            cfg: {
              offset: 10
            },
            scales: [ labelScale ]
          },
          geomType: 'point'
        });

        const cfg = gLabels.get('label');
        expect(cfg.offset).to.equal(10);
        expect(cfg.textStyle).not.to.equal(undefined);
      });

      let items;
      it('get items', () => {
        items = gLabels.getLabelsItems(points);
        expect(items.length).to.equal(points.length);
      });

      it('first point rotate 0', () => {
        const first = items[0];
        expect(first.x).to.equal(59.92156741649222);
        expect(first.y).to.equal(11.25);
        expect(first.rotate).to.equal(0);
      });

      it('second point rotate 90', () => {
        const second = items[1];

        expect(second.x).to.equal(99);
        expect(second.y).to.equal(59.9498743710662);
        expect(second.rotate).to.equal(Math.PI / 2);

      });

      it('third rotate 90', () => {
        const point = items[2];

        expect(point.x).to.equal(11.25);
        expect(point.y).to.equal(40.078432583507784);
        expect(point.rotate).to.equal(Math.PI / 2);
      });
      it('remove', () => {
        div.parentNode.removeChild(div);
      });
    });
  });
});
