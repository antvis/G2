const expect = require('chai').expect;
const G = require('../../../../src/renderer');
const Labels = require('../../../../src/component/label/index');

const Canvas = G.Canvas;

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('Labels', function() {

  const newItems = [
    { x: 10, y: 20, text: '一' },
    { x: 10, y: 40, text: '二' },
    { x: 10, y: 60, text: '三' },
    { x: 10, y: 80, text: '四' },
    { x: 10, y: 100, text: '五' },
    { x: 10, y: 120, text: '六' },
    { x: 10, y: 140, text: '七' }
  ];
  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  const labels = canvas.addGroup(Labels, {
    items: [
      { x: 10, y: 20, text: '1' },
      { x: 10, y: 40, text: '2' },
      { x: 10, y: 60, text: '3' },
      { x: 10, y: 80, text: '4' },
      { x: 10, y: 100, text: '5', fontFamily: 'Arial', fontSize: 30, fill: 'red' }
    ],
    textStyle(value) {
      const style = {
        fill: '#f80',
        textAlign: 'center', // 文本对齐方向，可取值为： start middle end
        fontSize: 16, // 文本大小
        fontWeight: 'bold' // 文本粗细
      };
      if (value !== '5' && value !== '五') {
        style.rotate = 45;
      }
      return style;
    }
  });

  canvas.draw();

  it('labels create', function() {
    expect(labels.getCount()).to.equal(labels.get('items').length);
    expect(labels).to.have.property('__cfg');
    expect(labels.__cfg.textStyle).to.be.a('function');
  });

  it('labels x,y', function() {
    const item = labels.getFirst();
    expect(item.attr('x')).to.equal(10);
    expect(item.attr('y')).to.equal(20);
    expect(item.attr('rotate')).to.equal(45);
  });

  it('labels rotate', function() {
    const item = labels.getLast();
    expect(item.attr('rotate')).to.be.undefined;
  });

  it('labels add Labels By String', function() {
    labels.addLabel('21331');
    const item = labels.getLast();
    expect(item.attr('text')).to.equal('21331');
  });

  it('labels add Labels By Object', function() {
    labels.addLabel({
      text: 2122121,
      x: 22,
      y: 23
    });
    const item = labels.getLast();
    expect(item.attr('text')).to.equal('2122121');
  });

  it('labels getLabels', function() {
    const labelsGroup = labels.getLabels();
    expect(labelsGroup.length).to.equal(7);
  });

  it('labels add Labels is Null', function() {
    labels.addLabel({
      text: null,
      x: 22,
      y: 23
    });
    const item = labels.getLast();
    expect(item.attr('text')).to.equal('');
  });

  it('labels.setItems', function() {
    labels.setItems(newItems);
    expect(labels.getCount()).to.equal(7);
  });

  it('labels.changeLabel(null, newLabel)', function() {
    const label = null;
    labels.changeLabel(label, {
      x: 100,
      y: 20,
      text: '变化'
    });
    expect(labels.get('items')).to.deep.equal(newItems);
  });

  it('change label', function() {
    const label = labels.getFirst();
    labels.changeLabel(label, {
      x: 100,
      y: 20,
      text: '变化'
    });
    expect(label.attr('x')).to.equal(100);
    expect(label.attr('text')).to.equal('变化');
    expect(label.attr('rotate')).to.equal(45);
  });

  it('change label without rotate.', function() {
    const label = labels.get('children')[4];
    labels.changeLabel(label, {
      x: 100,
      y: 20,
      text: '变化'
    });
    expect(label.attr('x')).to.equal(100);
    expect(label.attr('text')).to.equal('变化');
    expect(label.attr('rotate')).to.equal(45);
  });
});

describe('格式化文本信息', function() {
  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500,
    pixelRatio: 2
  });

  it('格式化文本信息', function() {
    const labels = canvas.addGroup(Labels, {
      items: [
        { x: 10, y: 20, text: '1' },
        { x: 10, y: 40, text: '2' }
      ],
      formatter(value) {
        return 'text--' + value;
      },
      textStyle: {
        fill: '#f80'
      }
    });
    canvas.draw();

    const firstItem = labels.getFirst();
    const lastItem = labels.getLast();
    expect(labels.getCount()).to.equal(labels.get('items').length);
    expect(firstItem.attr('text')).to.equal('text--1');
    expect(lastItem.attr('text')).to.equal('text--2');
    canvas.clear();
  });

  it('textStyle is a function', function() {
    const labels = canvas.addGroup(Labels, {
      items: [
        { x: 10, y: 20, text: 'CAT' },
        { x: 10, y: 40, text: 'DOG' }
      ],
      textStyle(text) {
        if (text === 'CAT') {
          return {
            fontSize: 24,
            fill: '#6556E2'
          };
        }
        return {
          fontSize: 12,
          fill: '#000'
        };
      }
    });
    canvas.draw();

    const firstItem = labels.getFirst();
    const lastItem = labels.getLast();
    expect(labels.getCount()).to.equal(labels.get('items').length);
    expect(firstItem.attr('fontSize')).to.equal(24);
    expect(firstItem.attr('fill')).to.equal('#6556E2');
    expect(lastItem.attr('fontSize')).to.equal(12);
    expect(lastItem.attr('fill')).to.equal('#000');
    canvas.destroy();
  });
});

describe('HTML 自定义 Labels', function() {

  it('html 渲染，htmlTemplate 是个字符串', function() {
    const canvas = new Canvas({
      containerId: 'c1',
      width: 500,
      height: 500,
      pixelRatio: 2
    });
    const labels = canvas.addGroup(Labels, {
      items: [
        { x: 80, y: 20, text: '1' },
        { x: 80, y: 40, text: '2' }
      ],
      textStyle: {
        fill: '#f80',
        textAlign: 'right'
      },
      htmlTemplate: '<p style="color: red;font-weight: 700;font: 12px arial;text-align: center;width: 50px;">{text}</p>',
      formatter(value) {
        return 'text--' + value;
      }
    });
    canvas.draw();
    const customDiv = labels.get('customDiv');
    const childNodes = customDiv.childNodes;
    const lastNode = childNodes[childNodes.length - 1];
    expect(labels.get('children')).to.be.empty;
    expect(customDiv).not.to.be.undefined;
    expect(lastNode.innerHTML).to.equal('<p style="color: red;font-weight: 700;font: 12px arial;text-align: center;width: 50px;">text--2</p>');
    expect(lastNode.style.right).to.equal('');
    expect(lastNode.style.left).to.equal('30px');
    canvas.destroy();
  });
  describe('自定义 Labels，回调', function() {

    const canvas = new Canvas({
      containerId: 'c1',
      width: 500,
      height: 500,
      pixelRatio: 2
    });

    const labels = canvas.addGroup(Labels, {
      items: [
        { x: 10, y: 20, text: '1' },
        { x: 10, y: 40, text: '2' },
        { x: 10, y: 60, text: '3' },
        { x: 10, y: 80, text: '4' },
        { x: 10, y: 100, text: '5' },
        { x: 10, y: 120, text: '6' },
        { x: 10, y: 140, text: '7' },
        { x: 10, y: 160, text: '8' }
      ],
      htmlTemplate(value, item, index) {
        return item.x + '<span style="font-size: 30px;color: yellow;">' + value + '</span>' + index;
      }
    });
    canvas.draw();
    const customDiv = labels.get('customDiv');

    it('labels create', function() {
      expect(customDiv).not.to.be.undefined;
      expect(customDiv.childNodes.length).to.equal(labels.get('items').length);
    });

    it('labels x,y', function() {
      const item = customDiv.childNodes[0];
      expect(parseFloat(item.style.left)).to.equal(10);
      const second = customDiv.childNodes[1];
      expect(parseFloat(second.style.left)).not.to.equal(40);
    });

    it('labels getLabels', function() {
      const labelsGroup = labels.getLabels();
      expect(labelsGroup.length).to.equal(8);
    });

    it('labels add Labels By Object', function() {
      labels.addLabel({
        text: 2122121,
        x: 22,
        y: 23,
        textAlign: 'end'
      });
      labels.addLabel({
        text: 2122121,
        x: 22,
        y: 23,
        textAlign: 'center'
      });
      const childNodes = customDiv.childNodes;
      const lastNode = childNodes[childNodes.length - 1];
      expect(lastNode.innerHTML).to.equal('22<span style="font-size: 30px;color: yellow;">2122121</span>9');
    });

    it('custom renderer', function() {
      const item = customDiv.childNodes[0];
      expect(item.innerHTML).to.equal('10<span style="font-size: 30px;color: yellow;">1</span>0');
    });

    it('labels.setItems', function() {
      const items = [
        { x: 10, y: 20, text: '一' },
        { x: 10, y: 40, text: '二' },
        { x: 10, y: 60, text: '三' },
        { x: 10, y: 80, text: '四' },
        { x: 10, y: 100, text: '五' },
        { x: 10, y: 120, text: '六' },
        { x: 10, y: 140, text: '七' }
      ];
      labels.setItems(items);
      expect(customDiv.childNodes.length).to.equal(7);
    });

    it('change label', function() {
      const label = customDiv.childNodes[0];
      labels.changeLabel(label, {
        x: 100,
        y: 40,
        text: '变化'
      });
      expect(label.innerHTML).to.equal('100<span style="font-size: 30px;color: yellow;">变化</span>0');
    });

    it('remove', function() {
      labels.remove();
      expect(customDiv.childNodes.length).to.equal(0);
    });
  });
});
