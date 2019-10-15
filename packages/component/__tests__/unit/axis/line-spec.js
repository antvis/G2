import { expect } from 'chai';
import { Canvas } from '@antv/g';
import LineAxis from '../../../src/axis/line';
import findByName from '../../helper/find-element-by-name';

describe('line axis', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerDOM: div,
    width: 600,
    height: 600,
    pixelRatio: 2,
    renderer: 'svg',
  });

  describe('line axis on bottom', function() {
    const group = canvas.addGroup();
    const axis = new LineAxis({
      group,
      canvas,
      start: {
        x: 60,
        y: 460,
      },
      end: {
        x: 460,
        y: 460,
      },
      isVertical: false,
      factor: 1,
      ticks: [
        { text: '0', value: 0 },
        { text: '1', value: 0.1 },
        { text: '2', value: 0.2 },
        { text: '3', value: 0.3 },
        { text: '4', value: 0.4 },
        { text: '5', value: 0.5 },
        { text: '6', value: 0.6 },
        { text: '7', value: 0.7 },
        { text: '8', value: 0.8 },
        { text: '9', value: 0.9 },
        { text: '10', value: 1 },
      ],
      title: {
        offset: 50,
        text: 'x 轴',
        position: 'start', // 标题文本位置位于坐标轴前端
      },
      gridAlternateColor: 'rgba(0, 0, 255, 0.1)',
      grid: {
        stroke: '#000',
        lineDash: [2, 4],
      },
      gridPoints: [
        { id: 'test1', points: [{ x: 60, y: 460 }, { x: 60, y: 450 }, { x: 60, y: 440 }, { x: 60, y: 430 }] },
        { id: 'test2', points: [{ x: 100, y: 460 }, { x: 100, y: 450 }, { x: 100, y: 440 }, { x: 100, y: 430 }] },
        { id: 'test3', points: [{ x: 140, y: 460 }, { x: 140, y: 450 }, { x: 140, y: 440 }, { x: 140, y: 430 }] },
        { id: 'test4', points: [{ x: 180, y: 460 }, { x: 180, y: 450 }, { x: 180, y: 440 }, { x: 180, y: 430 }] },
        { id: 'test5', points: [{ x: 220, y: 460 }, { x: 220, y: 450 }, { x: 220, y: 440 }, { x: 220, y: 430 }] },
        { id: 'test6', points: [{ x: 260, y: 460 }, { x: 260, y: 450 }, { x: 260, y: 440 }, { x: 260, y: 430 }] },
        { id: 'test7', points: [{ x: 300, y: 460 }, { x: 300, y: 450 }, { x: 300, y: 440 }, { x: 300, y: 430 }] },
        { id: 'test8', points: [{ x: 340, y: 460 }, { x: 340, y: 450 }, { x: 340, y: 440 }, { x: 340, y: 430 }] },
        { id: 'test9', points: [{ x: 380, y: 460 }, { x: 380, y: 450 }, { x: 380, y: 440 }, { x: 380, y: 430 }] },
        { id: 'test10', points: [{ x: 420, y: 460 }, { x: 420, y: 450 }, { x: 420, y: 440 }, { x: 420, y: 430 }] },
        { id: 'test11', points: [{ x: 460, y: 460 }, { x: 460, y: 450 }, { x: 460, y: 440 }, { x: 460, y: 430 }] },
      ],
      label(text) {
        return {
          textStyle: {
            fill: '#f80',
            textAlign: 'center',
          },
          text: text + '%',
          offset: 20,
        };
      },
      subTickCount: 3,
      subTickLine: {
        length: 20,
        stroke: 'yellow',
      },
    });
    axis.render();
    canvas.draw();

    it('Axis instance', function() {
      expect(axis).not.to.be.undefined;
      expect(axis).to.be.an.instanceof(LineAxis);
    });

    it('line group', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');
      expect(findByName(axis.get('group'), 'axis-line')).not.to.be.null;
      expect(path[0][1]).to.equal(60);
      expect(path[0][2]).to.equal(460);
    });

    it('ticks group', function() {
      expect(findByName(axis.get('group'), 'axis-ticks')).not.to.be.null;
    });

    it('label', function() {
      const labelRenderer = axis.get('labelRenderer');
      expect(labelRenderer).not.to.be.undefined;
      expect(labelRenderer.getLabels().length).to.equal(axis.get('ticks').length);
    });

    it.skip('title', function() {
      const title = findByName(axis.get('group'), 'axis-title');
      expect(title).not.to.be.null;
      expect(title.attr('y')).to.equal(510);
    });

    it('tickItems', function() {
      expect(axis.get('tickItems').length).to.equal(axis.get('ticks').length);
    });

    it('subTickItems', function() {
      expect(axis.get('subTickItems').length).to.equal((axis.get('ticks').length - 1) * axis.get('subTickCount'));
    });

    it('grid', function() {
      const gridGroup = axis.get('gridGroup');
      expect(gridGroup).not.to.be.undefined;
      expect(findByName(axis.get('group'), 'axis-grid')).not.to.be.null;
    });

    it('destroy', function() {
      axis.destroy();
      expect(canvas.contain(axis)).to.be.false;
    });
  });

  describe('line axis on top', function() {
    const group = canvas.addGroup();
    const axis = new LineAxis({
      canvas,
      group,
      isVertical: false,
      factor: -1,
      start: {
        x: 60,
        y: 60,
      },
      end: {
        x: 460,
        y: 60,
      },
      ticks: [1000000, 2000000, 3000000, '4000000', '5000000', 6000000, 7000000, 8000000, 9000000, 10000000],
      title: {
        textStyle: {
          fontSize: 24,
          fill: 'red',
          textBaseline: 'bottom',
          fontWeight: 700,
          textAlign: 'center',
        },
        text: 'top axis',
        position: 'end',
        offset: 30,
      },
      autoRotateLabel: false,
      autoHideLabel: true,
      label: {
        textStyle: {
          fill: '#444',
          textAlign: 'center',
        },
      },
    });
    axis.render();
    canvas.draw();

    it('line', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');

      expect(path[0][1]).to.equal(60);
      expect(path[0][2]).to.equal(60);
    });

    it('tics', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');

      expect(path[0][2]).to.equal(60);
      expect(path[1][2]).to.equal(60);
    });

    it.skip('tite', function() {
      const title = findByName(axis.get('group'), 'axis-title');
      expect(title).not.to.be.null;
      expect(title.attr('y')).to.equal(30);
    });

    it('destroy', function() {
      axis.destroy();
      expect(canvas.contain(axis)).to.be.false;
    });
  });

  describe('line axis on left', function() {
    const group = canvas.addGroup();
    const axis = new LineAxis({
      canvas,
      group,
      isVertical: true,
      factor: -1,
      start: {
        x: 60,
        y: 60,
      },
      end: {
        x: 60,
        y: 460,
      },
      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      title: {
        textStyle: {
          fill: 'red',
          textAlign: 'center',
        },
        text: 'axis left',
        position: 'center',
        offset: 40,
      },
      grid: {
        stroke: '#c0c0c0',
      },
      gridPoints: [
        { id: 'test', points: [{ x: 120, y: 200 }, { x: 180, y: 200 }, { x: 240, y: 200 }, { x: 300, y: 200 }] },
      ],
      label: {
        textStyle: {
          fill: '#f80',
          textAlign: 'center',
          textBaseline: 'middle',
        },
        offset: 30,
      },
    });
    axis.render();

    canvas.sort();
    canvas.draw();

    it('line', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');

      expect(path[1][1]).to.equal(60);
      expect(path[1][2]).to.equal(460);
    });

    it('ticks', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');

      expect(path[0][1]).to.equal(60);
      expect(path[1][1]).to.equal(60);
    });

    it('grid', function() {
      const gridGroup = axis.get('gridGroup');
      expect(gridGroup).not.to.be.null;
      expect(findByName(gridGroup, 'axis-grid')).not.to.be.null;
    });

    it.skip('title', function() {
      const text = findByName(axis.get('group'), 'axis-title');
      expect(text).not.to.be.null;
      expect(text.attr('x')).to.equal(20);
      expect(text.attr('matrix')).not.to.equal([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });

    it('destroy', function() {
      axis.destroy();
      expect(canvas.contain(axis)).to.be.false;
    });
  });

  describe('line axis on right', function() {
    const group = canvas.addGroup();
    const axis = new LineAxis({
      canvas,
      group,
      isVertical: true,
      factor: 1,
      start: {
        x: 460,
        y: 60,
      },
      end: {
        x: 460,
        y: 460,
      },
      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      title: {
        textStyle: {
          fill: '#000',
        },
        text: 'axis right',
        offset: 40,
      },
      autoRotateTitle: false,
      label: null,
    });
    axis.render();
    canvas.draw();

    it('line', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');
      expect(path[0][1]).to.equal(460);
      expect(path[1][1]).to.equal(460);
      expect(path[0][2]).to.equal(60);
      expect(path[1][2]).to.equal(460);
    });

    it('ticks', function() {
      const line = axis.get('lineShape');
      const path = line.attr('path');
      expect(path[0][1]).to.equal(460);
      expect(path[1][1]).to.equal(460);
    });
    it('label', function() {
      const labelsGroup = axis.get('labelsGroup');
      expect(labelsGroup).to.be.undefined;
    });
    it('title', function() {
      const text = findByName(axis.get('group'), 'axis-title');
      expect(text).not.to.null;
      expect(text.attr('x')).to.equal(500);
      expect(text.attr('matrix')).to.eql([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
    it('destroy', function() {
      axis.destroy();
      expect(canvas.contain(axis)).to.be.false;
    });
  });

  describe('line axis label offset', () => {
    const group = canvas.addGroup();
    const axis = new LineAxis({
      canvas,
      group,
      isVertical: true,
      factor: 1,
      start: {
        x: 230,
        y: 60,
      },
      end: {
        x: 230,
        y: 460,
      },
      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      label: {
        textStyle: {
          fill: '#f80',
          textAlign: 'center',
        },
        offsetX: 200,
        offsetY: 50,
      },
    });
    axis.render();
    canvas.draw();

    it('vertical axis label', function() {
      const labelRenderer = axis.get('labelRenderer');
      expect(labelRenderer).not.to.be.undefined;
      const bbox = axis.get('group').getBBox();
      const labelAttrs = labelRenderer.getLabels()[0].attrs;
      expect(labelAttrs.x > bbox.minX + 200).to.be.true;
      expect(labelAttrs.x > bbox.minY + 50).to.be.true;
      expect(labelAttrs.x > 0).to.be.true;
      expect(labelAttrs.x > 0).to.be.true;
    });

    const axis2 = new LineAxis({
      canvas,
      group,
      isVertical: false,
      factor: 1,
      start: {
        x: 60,
        y: 120,
      },
      end: {
        x: 460,
        y: 120,
      },
      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      label: {
        textStyle: {
          fill: '#f80',
          textAlign: 'center',
        },
        offsetX: 200,
        offsetY: 50,
      },
    });
    axis2.render();
    canvas.draw();

    it('horizontal axis label', function() {
      const labelRenderer = axis2.get('labelRenderer');
      expect(labelRenderer).not.to.be.undefined;
      const bbox = axis2.get('group').getBBox();
      const labelAttrs = labelRenderer.getLabels()[0].attrs;
      expect(labelAttrs.x > bbox.minX + 200).to.be.true;
      expect(labelAttrs.x > bbox.minY + 50).to.be.true;
      expect(labelAttrs.x > 0).to.be.true;
      expect(labelAttrs.x > 0).to.be.true;
    });

    it('destroy', function() {
      axis.destroy();
      expect(canvas.contain(axis)).to.be.false;
    });
  });

  describe('label is an instance of Function', () => {
    const group = canvas.addGroup();
    const axis = new LineAxis({
      canvas,
      group,
      isVertical: true,
      factor: 1,
      start: {
        x: 100,
        y: 200,
      },
      end: {
        x: 100,
        y: 460,
      },
      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      label(text, index, total) {
        if (index === 0 || index === total - 1) {
          return null;
        }

        return {
          textStyle: {
            fill: 'red',
          },
        };
      },
      gridPoints: [
        { id: 'grid-0', points: [{ x: 100, y: 200 }, { x: 150, y: 200 }] },
        { id: 'grid-1', points: [{ x: 100, y: 226 }, { x: 150, y: 226 }] },
        { id: 'grid-2', points: [{ x: 100, y: 252 }, { x: 150, y: 252 }] },
        { id: 'grid-3', points: [{ x: 100, y: 278 }, { x: 150, y: 278 }] },
        { id: 'grid-4', points: [{ x: 100, y: 305 }, { x: 150, y: 305 }] },
        { id: 'grid-5', points: [{ x: 100, y: 331 }, { x: 150, y: 331 }] },
        { id: 'grid-6', points: [{ x: 100, y: 357 }, { x: 150, y: 357 }] },
        { id: 'grid-7', points: [{ x: 100, y: 383 }, { x: 150, y: 383 }] },
        { id: 'grid-8', points: [{ x: 100, y: 409 }, { x: 150, y: 409 }] },
        { id: 'grid-9', points: [{ x: 100, y: 435 }, { x: 150, y: 435 }] },
      ],
      grid(text, index) {
        if (index === 0) return null;

        return {
          stroke: '#1890ff',
        };
      },
    });
    axis.render();
    canvas.draw();

    it('label', () => {
      const labelRenderer = axis.get('labelRenderer');
      const labels = labelRenderer.get('items');

      expect(labels.length).to.equal(8);
      labels.forEach((label) => {
        expect(label.textStyle.fill).to.equal('red');
      });
    });

    it('grid', () => {
      const gridGroup = axis.get('gridGroup');
      const grids = gridGroup.get('children');

      expect(grids.length).to.equal(9);
      grids.forEach((grid) => {
        expect(grid.attr('stroke')).to.equal('#1890ff');
      });
    });

    it('destroy', function() {
      axis.destroy();
      expect(canvas.contain(axis)).to.be.false;
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
