const expect = require('chai').expect;
const { Canvas, Group } = require('../../../../src/renderer2d');
const Labels = require('../../../../src/component/label/index');
const LabelsRenderer = Labels.LabelsRenderer;
const assign = require('lodash/assign');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('LabelsRenderer mixin', function() {
  class A extends Group {
    getDefaultCfg() {
      return {
        label: null
      };
    }
  }

  assign(A.prototype, LabelsRenderer);

  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500
  });
  const items = [
    { x: 10, y: 20, text: '1' },
    { x: 10, y: 40, text: '2' },
    { x: 10, y: 60, text: '3' },
    { x: 10, y: 80, text: '4' },
    { x: 10, y: 100, text: '5' },
    { x: 10, y: 120, text: '6' },
    { x: 10, y: 140, text: '7' },
    { x: 10, y: 160, text: '8' }
  ];

  const a = canvas.addGroup(A, {
    label: {
      items,
      textStyle: {
        font: '20px/1.5 "Helvetica Neue",Helvetica,Arial,sans-serif',
        fill: '#333',
        rotate: 90
      }
    }
  });

  a.renderLabels();
  canvas.draw();
  const labelsGroup = a.get('labelsGroup');
  it('create', function() {
    expect(labelsGroup).not.to.be.undefined;
    expect(labelsGroup.getCount()).to.equal(items.length);
  });

  it('测试防御分支', function() {
    const a1 = canvas.addGroup(A, {
      label: null
    });
    a1.renderLabels();
    a1.resetLabels();
  });

  it('reset', function() {
    const count = labelsGroup.getCount();
    a.resetLabels(null);

    expect(labelsGroup.getCount()).to.equal(count);

    const items = [
      { x: 10, y: 20, text: '一' },
      { x: 10, y: 40, text: '二' },
      { x: 10, y: 60, text: '三' },
      { x: 10, y: 80, text: '四' },
      { x: 100, y: 100, text: '五', font: '10px Arial', fill: 'red' },
      { x: 10, y: 120, text: '六' },
      { x: 10, y: 140, text: '' }
    ];
    a.resetLabels(items);

    expect(labelsGroup.getCount()).to.equal(items.length);
    canvas.draw();
  });

  it('reset back', function() {
    const items = [
      { x: 10, y: 20, text: '1' },
      { x: 10, y: 40, text: '2' },
      { x: 10, y: 60, text: '3' },
      { x: 10, y: 80, text: '4' },
      { x: 10, y: 100, text: '5', font: '10px Arial', fill: 'red' },
      { x: 10, y: 120, text: '6' },
      { x: 10, y: 140, text: '7' },
      { x: 10, y: 160, text: '8' }
    ];
    a.resetLabels(items);

    expect(labelsGroup.getCount()).to.equal(items.length);
    canvas.draw();
  });

  it('change add', function() {
    const count = labelsGroup.getCount();
    const item = { x: 10, y: 183, rotate: 10 };
    a.addLabel('新的', item);
    expect(labelsGroup.getCount()).to.equal(count + 1);
    canvas.draw();
  });

  it('remove', function() {
    a.removeLabels();
    expect(a.get('labelsGroup')).to.be.null;
    canvas.draw();
  });
});
