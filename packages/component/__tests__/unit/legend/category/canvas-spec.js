import { expect } from 'chai';
import Category from '../../../../src/legend/category/canvas';
import { Canvas, Event } from '@antv/g';

describe('Canvas category legend', () => {
  const div = document.createElement('div');
  div.id = 'legend';
  div.style.margin = '20px';
  document.body.appendChild(div);
  const symbols = [ 'circle', 'diamond', 'square', 'triangle', 'triangleDown' ];
  const colors = [ '#ff6600', '#b01111', '#ac5724', '#572d8a', '#333333', '#7bab12', '#c25e5e', '#a6c96a', '#133960', '#2586e7' ];
  const canvas = new Canvas({
    containerId: 'legend',
    width: 500,
    height: 500,
  });
  const items = [];
  for (let i = 0; i < 25; i++) {
    items.push({
      value: '分类' + i,
      marker: {
        symbol: symbols[ Math.floor(Math.random() * 5)],
        radius: 10,
        stroke: '#f00',
        fill: colors[Math.floor(Math.random() * 10)],
      },
      checked: i > 1, // 选中状态
    });
  }
  const catCfg = {
    maxWidth: 120,
    maxHeight: 330,
    /* maxWidth: 370,
    maxHeight: 50,*/
    items,
    unSelectedColor: '#ccc',
    layout: 'vertical',
    offsetX: 50,
    offsetY: 50,
    container: canvas,
    title: '测试图例',
    titleDistance: 35,
    titleStyle: {
      fill: '#000',
      fontSize: 24,
      textAlign: 'start',
      textBaseline: 'top',
    },
    textStyle: {
      fill: '#f80',
      fontSize: 12,
      textAlign: 'start',
      textBaseline: 'top',
    },
    /* backgroundStyle: {
      fill: '#0aa',
      stroke: '#000',
      strokeWidth: 2,
      x: 0,
      y: 0,
    },*/
    autoWrap: true,
    itemWidth: 120,
    wordSpacing: 2,
    itemMarginBottom: 5,
    backgroundPadding: [ 5, 5, 5, 5 ],
    itemDistance: 5,
    maxLength: 400,
    formatter: (value) => {
      return value + '格式化';
    },
    flipPage: true
  };

  const legend = new Category(catCfg);
  const itemsGroup = legend.get('itemsGroup');
  const targetItem = itemsGroup.get('children')[2];
  const event1 = new Event('click', {}, true, true);
  event1.target = targetItem.get('children')[0];
  legend.draw();
  /* it('constructor', () => {
    expect(legend.get('type')).to.eql('category-legend');
    const itemsGroup = legend.get('itemsGroup');
    expect(legend.get('container').getCount()).to.equal(3);
    expect(itemsGroup.getCount()).to.equal(25);
    expect(legend._wrap__onClick).to.be.an.instanceof(Function);
  });
  it('legend 点击事件', () => {
    itemsGroup.emit('click', event1);
    expect(targetItem.get('checked')).to.be.false;
    itemsGroup.emit('click', event1);
    expect(targetItem.get('checked')).to.be.true;
  });
  it('legend event', () => {
    const itemsGroup = legend.get('itemsGroup');
    const event1 = new Event('click', {}, true, true);
    const event2 = new Event('mousemove', {}, true, true);
    const event3 = new Event('mouseleave', {}, true, true);
    const event4 = new Event('mousemove', {}, true, true);
    const targetItem = itemsGroup.get('children')[1];
    const targetItem2 = itemsGroup.get('children')[24];
    event1.target = targetItem2.get('children')[0];
    event2.target = targetItem.get('children')[0];
    event3.target = targetItem.get('children')[0];
    event4.target = itemsGroup;
    legend.on('itemmouseover', (ev) => {
      expect(ev.type).to.eqls('itemmouseover');
    });
    legend.on('itemmouseleave', (ev) => {
      expect(ev.type).to.eqls('itemmouseleave');
    });
    itemsGroup.emit('mousemove', event1);
    itemsGroup.emit('mousemove', event2);
    itemsGroup.emit('mousemove', event4);
    itemsGroup.emit('mouseleave', event3);
  });
  it('vertical layout', () => {
    legend.clear();
    legend.destroy();
    catCfg.layout = 'vertical';
    catCfg.hoverable = true;
    catCfg.selectedMode = 'single';
    catCfg.clickable = true;
    catCfg.highlight = true;
    catCfg.autoWrap = true;
    catCfg.title = false;
    catCfg.container = new Canvas({
      containerId: 'legend',
      width: 500,
      height: 500,
    });
    const legend2 = new Category(catCfg);
    legend2.draw();
    const itemsGroup = legend2.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[2];
    const event1 = new Event('click', {}, true, true);
    event1.target = targetItem.get('children')[0];
    legend2.on('itemclick', (ev) => {
      expect(ev.type).to.eqls('itemclick');
    });
    itemsGroup.emit('click', event1);
    expect(targetItem.get('checked')).to.be.true;
    itemsGroup.get('children').forEach((item, index) => {
      if (index !== 2) {
        expect(item.get('checked')).to.be.false;
      }
    });
    legend2.clear();
    legend2.destroy();
  });
  it('horizontal layout', () => {
    catCfg.layout = 'vertical';
    catCfg.hoverable = true;
    catCfg.selectedMode = 'mutiple';
    catCfg.itemWidth = 60;
    catCfg.clickable = true;
    catCfg.autoWrap = false;
    catCfg.title = false;
    catCfg.reversed = false;
    catCfg.allowAllCanceled = false;
    catCfg.container = new Canvas({
      containerId: 'legend',
      width: 500,
      height: 500,
    });
    const legend2 = new Category(catCfg);
    legend2.draw();
    const itemsGroup = legend2.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[2];
    const event1 = new Event('click', {}, true, true);
    event1.target = targetItem.get('children')[0];
    legend2.on('itemclick', (ev) => {
      expect(ev.type).to.eqls('itemclick');
    });
    itemsGroup.emit('click', event1);
    expect(targetItem.get('checked')).to.be.false;
    itemsGroup.get('children').forEach((item, index) => {
      if (index < 2) {
        expect(item.get('checked')).to.be.false;
      }
    });
    itemsGroup.emit('click', event1);
    itemsGroup.get('children').forEach((item) => {
      const event1 = new Event('click', {}, true, true);
      event1.target = item.get('children')[0];
      itemsGroup.emit('click', event1);
    });
    event1.target.set('parent', null);
    itemsGroup.emit('click', event1);
    // allowAllCanceled
    itemsGroup.get('children').forEach((item) => {
      event1.target = item.get('children')[0];
      itemsGroup.emit('click', event1);
    });
    expect(itemsGroup.get('children')[24].get('checked')).to.be.true;
    legend2.clear();
  });
  it('other', () => {
    catCfg.reversed = true;
    catCfg.hoverable = false;
    catCfg.clickable = false;
    catCfg.layout = 'horizontal';
    catCfg.allowAllCanceled = true;
    delete catCfg.title;
    catCfg.maxLength = 200;
    delete catCfg.itemWidth;
    const legend3 = new Category(catCfg);
    legend3.clear();
  });
  it('垂直布局 元素倒序', () => {
    const canvas = new Canvas({
      containerId: 'legend',
      width: 500,
      height: 500,
    });
    const items = [
      {
        value: '分类1',
        checked: false, // 选中状态
        marker: {
          fill: 'red',
          symbol: 'circle',
        },
      },
      {
        value: '分类2',
        checked: false, // 选中状态
        marker: {
          symbol: 'circle',
          stroke: '#343',
        },
      },
      {
        value: '分类3',
        checked: true, // 选中状态
      },
      {
        value: '分类4',
        checked: true, // 选中状态
        marker: {
          fill: 'red',
          symbol: 'circle',
        },
      },
      {
        value: '分类5',
        checked: false, // 选中状态
        marker: {
          fill: 'red',
          symbol: 'circle',
        },
      },

    ];
    catCfg.items = items;
    catCfg.container = canvas;
    catCfg.reversed = true;
    catCfg.hoverable = true;
    catCfg.clickable = true;
    delete catCfg.formatter;
    catCfg.layout = 'vertical';
    delete catCfg.title;
    catCfg.autoWrap = false;
    catCfg.allowAllCanceled = true;
    catCfg.maxLength = 400;
    delete catCfg.itemWidth;
    delete catCfg.title;
    const legend4 = new Category(catCfg);
    legend4.draw();
    const itemsGroup = legend4.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[1];
    const event1 = new Event('click', {}, true, true);
    event1.target = targetItem.get('children')[0];
    itemsGroup.emit('click', event1);
    expect(itemsGroup.get('children')[1].get('checked')).to.be.false;
  });*/
});
