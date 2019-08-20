import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { getCoord } from '@antv/coord';
import { getElementLabels } from '../../../../../src/element/controller/label';
import BaseElementLabel from '../../../../../src/element/controller/label/components/base';
import IntervalElementLabel from '../../../../../src/element/controller/label/components/interval';
import PieElementLabel from '../../../../../src/element/controller/label/components/pie';
import PolarElementLabel from '../../../../../src/element/controller/label/components/polar';
import { Global } from '../../../../../src';

const Rect = getCoord('rect');
const CatScale = getScale('cat');
// const LinearScale = getScale('linear');

describe('element label controller', function() {
  describe('labels constructor', function() {
    it('test getElementLabels', function() {
      expect(getElementLabels('base')).to.equal(BaseElementLabel);
      expect(getElementLabels('interval')).to.equal(IntervalElementLabel);
      expect(getElementLabels('pie')).to.equal(PieElementLabel);
      expect(getElementLabels('polar')).to.equal(PolarElementLabel);
    });
  });

  const div = document.createElement('div');
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerDOM: div,
    width: 500,
    height: 500
  });

  const coord = new Rect({
    start: {
      x: 0,
      y: 100
    },
    end: {
      x: 100,
      y: 0
    }
  });

  const labelScale = new CatScale({
    field: 'z',
    values: [ '1', '2' ]
  });
  const points = [
    { x: 100, y: 10, z: 0, _origin: { x: 100, y: 10, z: '1' } },
    { x: 100, y: 20, z: 1, _origin: { x: 100, y: 20, z: '2' } }
  ];

  const labelScale1 = new CatScale({
    field: 'z',
    values: [ [ '1', '2' ], [ '3', '4' ] ]
  });
  const points1 = [
    { x: 100, y: [ 10, 20 ], z: [ '1', '2' ], _origin: { x: 100, y: [ 10, 20 ], z: [ '1', '2' ]} },
    { x: 100, y: [ 30, 40 ], z: [ '3', '4' ], _origin: { x: 100, y: [ 30, 40 ], z: [ '3', '4' ]} }
  ];

  describe('one point one label', function() {
    const gLabels = canvas.addGroup(BaseElementLabel, {
      coord,
      labelOptions: {
        callback: () => {
          return {
            offset: 10,
          };
        },
        scales: [ labelScale ]
      },
      theme: Global.theme,
      elementType: 'point'
    });

    it('get default label cfg', function() {
      const cfg = gLabels.get('defaultLabelCfg');
      expect(cfg).to.equal(Global.theme.label);
    });

    it('get label items', function() {
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y - 10);
    });

    it('show labels', function() {
      gLabels.showLabels(points);
      expect(gLabels.get('labelsGroup').get('children').length).to.equal(points.length);
      canvas.draw();
    });
    it('destroy', function() {
      gLabels.remove();
      expect(gLabels.destroyed).to.equal(true);
      expect(canvas.get('children').length).to.equal(0);
    });
  });

  describe('one point one label with offsetX & offsetY', function() {
    it('absolute offsetX & offsetY', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: 0,
              offsetX: 10,
              offsetY: 10,
            };
          },
          scales: [ labelScale ]
        },
        theme: Global.theme,
        elementType: 'point'
      });

      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.offset).to.equal(0);
      expect(first.offsetX).to.equal(10);
      expect(first.offsetY).to.equal(10);
      expect(first.x).to.equal(points[0].x + 10);
      expect(first.y).to.equal(points[0].y + 10);
    });
  });

  describe('one point two labels', function() {
    it('get label items', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: 10,
            };
          },
          scales: [ labelScale1 ],
        },
        elementType: 'point',
        theme: Global.theme,
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

  describe('one point inner label', function() {
    it('get labels', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: -10,
            };
          },
          scales: [ labelScale ],
        },
        elementType: 'interval',
        theme: Global.theme,
      });

      const items = gLabels.getLabelsItems(points);
      expect(items.length).to.equal(points.length);
      const first = items[0];
      expect(first.offset).to.equal(-10);
      expect(first.textStyle.fill).to.equal('#fff');
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y + 10);
    });
  });

  describe('two point inner label', function() {
    it('get labels', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: -10,
              labelLine: true,
            };
          },
          scales: [ labelScale1 ],
        },
        theme: Global.theme,
        elementType: 'interval',
      });
      const items = gLabels.getLabelsItems(points1);
      expect(items.length).to.equal(points1.length * 2);
      const first = items[0];
      const second = items[1];

      expect(first.offset).to.equal(-10);
      expect(first.textStyle.fill).to.equal('#fff');
      expect(first.x).to.equal(points1[0].x);
      expect(first.y).to.equal(points1[0].y[0] - 10);
      expect(first.textAlign).to.equal('center');

      expect(second.offset).to.equal(-10);
      expect(second.textStyle.fill).to.equal('#fff');
      expect(second.x).to.equal(points1[0].x);
      expect(second.y).to.equal(points1[0].y[1] + 10);
      expect(second.textAlign).to.equal('center');
    });
  });

  describe('stack points', function() {
    const scale = new CatScale({
      field: 'text',
      values: [ 'a', 'b' ]
    });
    const points = [
      { x: 0, y: 10, text: 'a', _origin: { x: 0, y: 10, text: 'a' } },
      { x: 0, y: [ 10, 20 ], text: 'b', _origin: { x: 0, y: [ 10, 20 ], text: 'b' } }
    ];

    it('get labels', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: 10,
              labelLine: true,
            };
          },
          scales: [ scale ],
        },
        elementType: 'interval',
        theme: Global.theme,
      });
      const items = gLabels.getLabelsItems(points);
      expect(items.length).to.equal(points.length);

      const first = items[0];
      const second = items[1];
      expect(first.offset).to.equal(10);
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y - 10);
      expect(first.textAlign).to.equal('center');

      expect(second.offset).to.equal(10);
      expect(second.x).to.equal(points[1].x);
      expect(second.y).to.equal(points[1].y[1] - 10);
      expect(second.textAlign).to.equal('center');
    });
  });

  describe('transposed label', function() {
    const coord = new Rect({
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


    it('offset > 0', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: 10,
            };
          },
          scales: [ labelScale ]
        },
        elementType: 'interval',
        theme: Global.theme,
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.offset).to.equal(10);
      expect(first.x).to.equal(points[0].x + 10);
      expect(first.y).to.equal(points[0].y);
    });

    it('offset = 0', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: 0,
            };
          },
          scales: [ labelScale ]
        },
        elementType: 'interval',
        theme: Global.theme,
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x);
      expect(first.y).to.equal(points[0].y);
    });

    it('offset < 0', function() {
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: -10,
            };
          },
          scales: [ labelScale ]
        },
        elementType: 'interval',
        theme: Global.theme,
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];
      expect(first.x).to.equal(points[0].x - 10);
      expect(first.y).to.equal(points[0].y);
    });

    it('multiple labels', function() {
      const points = [ {
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
      } ];
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: 10,
            };
          },
          scales: [ labelScale1 ]
        },
        elementType: 'interval',
        theme: Global.theme,
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];

      expect(first.x).to.equal(80);
      expect(first.y).to.equal(points[0].y[0]);

      const second = items[1];

      expect(second.x).to.equal(110);
      expect(second.y).to.equal(points[0].y[0]);
    });

    it('multiple labels inner', function() {

      const points = [ {
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
      } ];
      const gLabels = canvas.addGroup(BaseElementLabel, {
        coord,
        labelOptions: {
          callback: () => {
            return {
              offset: -10,
            };
          },
          scales: [ labelScale1 ]
        },
        elementType: 'interval',
        theme: Global.theme,
      });
      const items = gLabels.getLabelsItems(points);
      const first = items[0];

      expect(first.x).to.equal(100);
      expect(first.y).to.equal(points[0].y[0]);

      const second = items[1];
      expect(second.x).to.equal(90);
      expect(second.y).to.equal(points[0].y[0]);

    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
