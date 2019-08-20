import * as Util from '@antv/util';
import { expect } from 'chai';
import { Canvas } from '@antv/g';
import CircleAxis from '../../../src/axis/circle';
import LineAxis from '../../../src/axis/line';
import findByName from '../../helper/find-element-by-name';

describe('circle axis', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  describe('axis in the middle', function() {
    const canvas = new Canvas({
      containerDOM: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
    });
    const group = canvas.addGroup();
    const xAxis = new CircleAxis({
      group,
      canvas,
      radius: 200,
      inner: 0,
      center: {
        x: 260,
        y: 260,
      },
      line: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
      tickLine: {
        lineWidth: 1,
        length: 5,
        stroke: '#C0D0E0',
      },
      ticks: [ 0, 60, 180, 240, 300 ],
      label: {
        textStyle: {
          fill: '#444',
          fontSize: 16,
        },
      },
      grid: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
      gridPoints: [
        { id: 'test1', points: [ { x: 260, y: 260 }, { x: 260, y: 60 } ]},
        { id: 'test2', points: [ { x: 260, y: 260 }, { x: 460, y: 260 } ]},
        { id: 'test3', points: [ { x: 260, y: 260 }, { x: 260, y: 460 } ]},
        { id: 'test4', points: [ { x: 260, y: 260 }, { x: 60, y: 260 } ]},
      ],
    });
    const yAxis = new LineAxis({
      group,
      canvas,
      factor: -1,
      start: {
        x: 260,
        y: 60,
      },
      end: {
        x: 260,
        y: 260,
      },
      line: {
        lineWidth: 1,
        stroke: '#aaa',
      },
      ticks: [ 0, 20, 40, 60, 80, 100 ],
      circle: xAxis,
      grid: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
      gridPoints: [
        {
          id: 'grid',
          points: [
            { x: 260, y: 200, radius: 60, flag: 1 },
            { x: 320, y: 260, radius: 60, flag: 1 },
            { x: 260, y: 320, radius: 60, flag: 1 },
            { x: 200, y: 260, radius: 60, flag: 1 },
          ],
        },
      ],
      label: {
        textStyle: {
          fill: '#444',
        },
      },
      subTickCount: 5,
    });

    xAxis.render();
    yAxis.render();

    canvas.draw();

    describe('axis in the middle', function() {
      it('Axis instance', function() {
        expect(xAxis).not.to.be.undefined;
      });
      it('radius, center of the circle', function() {
        const center = xAxis.get('center');
        const r = xAxis.get('radius');

        expect(center.x).to.equal(260);
        expect(center.y).to.equal(260);
        expect(r).to.equal(200);
      });
      it('line', function() {
        const lineShape = xAxis.get('lineShape');
        expect(lineShape).not.to.be.undefined;
        expect(lineShape.attr('path').length).not.to.equal(0);
      });
      it('ticks', function() {
        const ticks = xAxis.get('ticks');
        const tickShape = findByName(xAxis.get('group'), 'axis-ticks');

        expect(ticks.length).to.equal(5);
        expect(tickShape).not.to.be.undefined;
        expect(tickShape.attr('path')).not.to.be.undefined;
      });
      it('labels', function() {
        const labelRenderer = xAxis.get('labelRenderer');
        expect(labelRenderer).not.to.equal(null);
        expect(labelRenderer.get('items').length).to.equal(5);
      });

      it('grid', function() {
        const gridGroup = xAxis.get('gridGroup');
        expect(gridGroup).not.to.be.undefined;
        expect(gridGroup.getCount()).to.equal(4);
      });
    });

    describe('axis around circle', function() {
      it('Axis instance', function() {
        expect(yAxis).not.to.be.undefined;
      });

      it('grid', function() {
        const gridGroup = xAxis.get('gridGroup');
        expect(gridGroup).not.to.be.undefined;
      });
    });
  });

  describe('axis in the middle - 2', function() {
    const canvas = new Canvas({
      containerDOM: div,
      width: 500,
      height: 500,
    });
    const group = canvas.addGroup();

    const xAxis = new CircleAxis({
      canvas,
      group,
      radius: 200,
      inner: 0,
      center: {
        x: 260,
        y: 260,
      },
      ticks: [ '一月', '二月', '三', '四月', '五月', '六月' ],
      label: {
        textStyle: {},
      },
      grid: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
      gridPoints: [
        {
          id: 'grid',
          points: [ { x: 260, y: 260 }, { x: 260, y: 60 } ],
        },
      ],
      subTickCount: 5,
    });

    const yAxis = new LineAxis({
      canvas,
      group,
      factor: -1,
      start: {
        x: 260,
        y: 60,
      },
      end: {
        x: 260,
        y: 260,
      },
      line: {
        lineWidth: 1,
        stroke: '#aaa',
      },
      min: 0,
      max: 100,
      circle: xAxis,
      tickInterval: 20,
      grid: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
      label: {},
    });

    xAxis.render();
    yAxis.render();

    canvas.draw();
    describe('axis in the middle', function() {
      it('Axis instance', function() {
        expect(xAxis).not.to.be.undefined;
      });

      it('radius, center of the circle', function() {
        const center = xAxis.get('center');
        const r = xAxis.get('radius');

        expect(center.x).to.equal(260);
        expect(center.y).to.equal(260);
        expect(r).to.equal(200);
      });

      it('labels', function() {
        const labelRenderer = xAxis.get('labelRenderer');
        expect(labelRenderer).not.to.equal(null);
        expect(labelRenderer.get('items').length).to.equal(6);
      });

      it('grid', function() {
        const gridGroup = xAxis.get('gridGroup');
        expect(gridGroup).not.to.be.undefined;
        expect(gridGroup.getCount()).to.equal(1);
      });
    });

    describe('axis around circle', function() {
      it('Axis instance', function() {
        expect(yAxis).not.to.be.undefined;
      });

      it('grid', function() {
        const gridGroup = xAxis.get('gridGroup');
        expect(gridGroup).not.to.be.undefined;
        canvas.clear();
      });
    });
  });

  describe('axis around circle', function() {
    const canvas = new Canvas({
      containerDOM: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
    });
    const group = canvas.addGroup();

    const simpleAxisCfg = {
      radius: 200,
      inner: 0,
      center: {
        x: 260,
        y: 260,
      },
      line: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
      tickLine: {
        lineWidth: 1,
        length: 5,
        stroke: '#C0D0E0',
      },
      ticks: [
        { text: '一', value: 0.1 },
        { text: '二', value: 0.2 },
        { text: '三', value: 0.3 },
        { text: '四', value: 0.4 },
        { text: '五', value: 0.5 },
        { text: '六', value: 0.6 },
        { text: '七', value: 0.7 },
        { text: '八', value: 0.8 },
        { text: '九', value: 0.9 },
        { text: '十', value: 1 },
      ],
      label: {
        textStyle: {
          fill: '#444',
        },
      },
      grid: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      },
    };

    it('label autorotate - 1', function() {
      const cfg = Util.mix({}, simpleAxisCfg, {
        canvas,
        group,
        radius: 200,
        inner: 0,
        center: {
          x: 260,
          y: 260,
        },
        startAngle: -Math.PI / 2,
        ticks: [
          { text: '文本', value: -0.4 },
          { text: '文本', value: 0 },
          { text: '文本', value: 0.05 },
          { text: '文本', value: 0.1 },
          { text: '文本', value: 0.15 },
          { text: '文本', value: 0.2 },
          { text: '文本', value: 0.25 },
          { text: '文本', value: 0.3 },
          { text: '文本', value: 0.35 },
          { text: '文本', value: 0.4 },
          { text: '文本', value: 0.45 },
          { text: '文本', value: 0.5 },
          { text: '文本', value: 0.55 },
          { text: '文本', value: 0.6 },
          { text: '文本', value: 0.65 },
          { text: '文本', value: 0.7 },
          { text: '文本', value: 0.75 },
          { text: '文本', value: 0.8 },
          { text: '文本', value: 0.85 },
          { text: '文本', value: 0.9 },
          { text: '文本', value: 0.95 },
          { text: '文本', value: 1 },
          { text: '文本', value: 1.5 },
        ],
        label: {
          textStyle: {
            fill: '#444',
          }
        },
        autoRotateLabel: true,
      });
      const axis = new CircleAxis(cfg);
      axis.render();
      canvas.draw();
      const textChildren = axis.get('labelRenderer').getLabels();
      expect(textChildren[0].attr('matrix')).not.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
      expect(textChildren[1].attr('matrix')).to.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
    });
  });
});
