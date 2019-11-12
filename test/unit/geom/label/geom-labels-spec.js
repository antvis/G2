const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Scale = require('@antv/scale');
const Labels = require('../../../../src/geom/label/');
const GeomLabels = require('../../../../src/geom/label/geom-labels');
const PolarLabels = require('../../../../src/geom/label/polar-labels');
const PieLabels = require('../../../../src/geom/label/pie-labels');
const Coord = require('@antv/coord/lib/');

describe('geom labels', () => {
  describe('labels constructor', () => {
    it('test default', () => {
      expect(Labels.getLabelsClass()).to.equal(GeomLabels);
      expect(Labels.getLabelsClass('rect')).to.equal(GeomLabels);
      expect(Labels.getLabelsClass('rect', 'line')).to.equal(GeomLabels);
    });

    it('test polar', () => {
      expect(Labels.getLabelsClass('polar')).to.equal(PolarLabels);
    });

    it('test pie', () => {
      expect(Labels.getLabelsClass('theta')).to.equal(PieLabels);
    });
  });

  const div = document.createElement('div');
  div.id = 'gl1';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerId: 'gl1',
    width: 500,
    height: 500
  });

  const coord = new Coord.Cartesian({
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
    values: [ '1', '2' ]
  });
  const points = [
    { x: 100, y: 10, z: 0, _origin: { x: 100, y: 10, z: '1' } },
    { x: 100, y: 20, z: 1, _origin: { x: 100, y: 20, z: '2' } }
  ];

  const labelScale1 = Scale.cat({
    field: 'z',
    values: [[ '1', '2' ], [ '3', '4' ]]
  });
  const points1 = [
    { x: 100, y: [ 10, 20 ], z: [ '1', '2' ], _origin: { x: 100, y: [ 10, 20 ], z: [ '1', '2' ] } },
    { x: 100, y: [ 30, 40 ], z: [ '3', '4' ], _origin: { x: 100, y: [ 30, 40 ], z: [ '3', '4' ] } }
  ];

  describe('one point one label', () => {
    const gLabels = canvas.addGroup(GeomLabels, {
      coord,
      labelCfg: {
        cfg: {
          offset: 10
        },
        scales: [ labelScale ]
      },
      geomType: 'point'
    });

    it('get default label cfg', () => {
      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(10);
      expect(cfg.textStyle).not.to.equal(undefined);
    });

    it('get label items', () => {
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y - 10);
    });

    it('show labels', () => {
      gLabels.showLabels(points);
      expect(gLabels.get('labelsGroup').get('children').length).to.equal(points.length);
      canvas.draw();
    });
    it('destroy', () => {
      gLabels.remove();
      expect(gLabels.get('destroyed')).to.equal(true);
      expect(canvas.get('children').length).to.equal(0);
    });
  });
  describe('one point one label with offsetX & offsetY', () => {
    it('absolute offsetX & offsetY', () => {
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 0,
            offsetX: 10,
            offsetY: 10
          },
          scales: [ labelScale ]
        },
        geomType: 'point'
      });
      const cfg = gLabels.get('label');
      expect(cfg.offsetX).to.equal(10);
      expect(cfg.offsetY).to.equal(10);
      expect(cfg.textStyle).not.to.equal(undefined);
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x + 10);
      expect(first.y).to.equal(points[0].y + 10);
    });
  });

  describe('one point two labels', () => {
    it('get label items', () => {
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 10
          },
          scales: [ labelScale1 ]
        },
        geomType: 'point'
      });

      const items = gLabels.getLabelsItems(points1);
      expect(items.length).to.equal(points1.length * 2);

      const first = items[0];
      const second = items[1];
      expect(first.x).to.equal(points1[0].x);
      expect(first.y).to.equal(points1[0].y[0] + 10);

      expect(second.x).to.equal(points1[0].x);
      expect(second.y).to.equal(points1[0].y[1] - 10);
    });
  });

  describe('one point inner label', () => {
    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: -10
          },
          scales: [ labelScale ]
        },
        geomType: 'interval'
      });
      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(-10);
      expect(cfg.textStyle.fill).to.equal('#fff');
    });
    it('get labels', () => {
      const items = gLabels.getLabelsItems(points);
      expect(items.length).to.equal(points.length);
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y + 10);
    });/**/
  });

  describe('two point inner label', () => {
    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: -10,
            label: {
              textAlign: 'left'
            },
            labelLine: true
          },
          scales: [ labelScale1 ]
        },
        geomType: 'interval'
      });

      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(-10);
      expect(cfg.textStyle.fill).to.equal('#fff');
    });

    it('get labels', () => {
      const items = gLabels.getLabelsItems(points1);
      expect(items.length).to.equal(points1.length * 2);
      const first = items[0];
      const second = items[1];
      expect(first.x).to.equal(points1[0].x);
      expect(first.y).to.equal(points1[0].y[0] - 10);
      expect(first.textAlign).to.equal('left');

      expect(second.x).to.equal(points1[0].x);
      expect(second.y).to.equal(points1[0].y[1] + 10);
      expect(second.textAlign).to.equal('left');

    });
  });


  describe('stack points', () => {
    const scale = Scale.cat({
      field: 'text',
      values: [ 'a', 'b' ]
    });
    const points = [
      { x: 0, y: 10, text: 'a', _origin: { x: 0, y: 10, text: 'a' } },
      { x: 0, y: [ 10, 20 ], text: 'b', _origin: { x: 0, y: [ 10, 20 ], text: 'b' } }
    ];

    let gLabels;
    it('init', () => {
      gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 10,
            label: {
              textAlign: 'right'
            },
            labelLine: true
          },
          scales: [ scale ]
        },
        geomType: 'interval'
      });
      const cfg = gLabels.get('label');
      expect(cfg.offset).to.equal(10);
    });

    it('get labels', () => {
      const items = gLabels.getLabelsItems(points);
      expect(items.length).to.equal(points.length);

      const first = items[0];
      const second = items[1];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y - 10);
      expect(first.textAlign).to.equal('right');

      expect(second.x).to.equal(points[1].x);
      expect(second.y).to.equal(points[1].y[1] - 10);
      expect(second.textAlign).to.equal('right');

    });
  });

  describe('transposed label', () => {
    const coord = new Coord.Cartesian({
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


    it('offset > 0', () => {
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 10
          },
          scales: [ labelScale ]
        },
        geomType: 'interval'
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x + 10);
      expect(first.y).to.equal(points[0].y);
    });

    it('offset = 0', () => {
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 0
          },
          scales: [ labelScale ]
        },
        geomType: 'interval'
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y);
    });

    it('offset < 0', () => {
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: -10
          },
          scales: [ labelScale ]
        },
        geomType: 'interval'
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x - 10);
      expect(first.y).to.equal(points[0].y);
    });

    it('multiple labels', () => {
      const points = [{
        x: [ 90, 100 ],
        y: [ 20, 20 ],
        z: [ '1', '2' ],
        _origin: {
          x: [ 90, 100 ],
          y: [ 20, 20 ],
          z: [ '1', '2' ]
        }
      },
      {
        x: [ 30, 40 ],
        y: [ 40, 40 ],
        z: [ '3', '4' ],
        _origin: {
          x: [ 30, 40 ],
          y: [ 40, 40 ],
          z: [ '3', '4' ]
        }
      }];
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: 10
          },
          scales: [ labelScale1 ]
        },
        geomType: 'interval'
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];

      expect(first.x).to.equal(80);
      expect(first.y).to.equal(points[0].y[0]);

      const second = items[1];

      expect(second.x).to.equal(110);
      expect(second.y).to.equal(points[0].y[0]);
    });

    it('multiple labels inner', () => {

      const points = [{
        x: [ 90, 100 ],
        y: [ 20, 20 ],
        z: [ '1', '2' ],
        _origin: {
          x: [ 90, 100 ],
          y: [ 20, 20 ],
          z: [ '1', '2' ]
        }
      },
      {
        x: [ 30, 40 ],
        y: [ 40, 40 ],
        z: [ '3', '4' ],
        _origin: {
          x: [ 30, 40 ],
          y: [ 40, 40 ],
          z: [ '3', '4' ]
        }
      }];
      const gLabels = canvas.addGroup(GeomLabels, {
        coord,
        labelCfg: {
          cfg: {
            offset: -10
          },
          scales: [ labelScale1 ]
        },
        geomType: 'interval'
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];

      expect(first.x).to.equal(100);
      expect(first.y).to.equal(points[0].y[0]);

      const second = items[1];
      expect(second.x).to.equal(90);
      expect(second.y).to.equal(points[0].y[0]);

    });

    it('clear', () => {
      div.parentNode.removeChild(div);
    });
  });
});
