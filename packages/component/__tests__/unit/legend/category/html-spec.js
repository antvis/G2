import { expect } from 'chai';
import { Canvas } from '@antv/g';
import * as d3Color from 'd3-color';
import HTMLLegend from '../../../../src/legend/category/html';

describe('HTML Legend', () => {
  const div = document.createElement('div');
  div.id = 'htmlLegend';
  div.style.margin = '20px';
  document.body.appendChild(div);

  const fontFamily =
    '"-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, "sans-serif"';

  const canvas = new Canvas({
    containerId: 'htmlLegend',
    width: 300,
    height: 300,
    pixelRatio: 2,
  });

  const colors = [
    '#1890FF',
    '#41D9C7',
    '#2FC25B',
    '#FACC14',
    '#E6965C',
    '#223273',
    '#7564CC',
    '#8543E0',
    '#5C8EE6',
    '#13C2C2',
    '#5CA3E6',
    '#3436C7',
    '#B381E6',
    '#F04864',
    '#D598D9',
  ];

  describe('default', () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push({
        value: 'test ' + i,
        attrValue: colors[i],
        marker: {
          fill: colors[i],
        },
        checked: true,
      });
    }
    let legend;

    it('without title', () => {
      legend = new HTMLLegend({
        canvas,
        items,
        fontFamily,
      });
      const titleContainer = legend.get('_titleContainer');
      expect(titleContainer).to.be.undefined;
      legend.destroy();
    });

    it('without items', () => {
      legend = new HTMLLegend({
        canvas,
        title: 'hello',
        fontFamily,
      });
      const titleContainer = legend.get('_titleContainer');
      expect(titleContainer.className).to.equal('g2-legend-title');
      expect(titleContainer.textContent).to.equal('hello');

      const itemGroupContainer = legend.get('_itemGroupContainer');
      expect(itemGroupContainer).to.be.undefined;
      legend.destroy();
    });

    it('default', () => {
      legend = new HTMLLegend({
        canvas,
        items,
        maxWidth: 200,
        maxHeight: 100,
        title: 'Html 图例',
        fontFamily,
      });
      const container = legend.get('_legendContainer');
      expect(container.parentNode).to.eql(div);
      expect(container.className).to.equal('g2-legend');

      const titleContainer = legend.get('_titleContainer');
      expect(titleContainer).to.be.an.instanceOf(HTMLElement);
      expect(titleContainer.className).to.equal('g2-legend-title');

      const itemGroupContainer = legend.get('_itemGroupContainer');
      expect(itemGroupContainer).to.be.an.instanceOf(HTMLElement);
      expect(itemGroupContainer.className).to.equal('g2-legend-list');

      const childNodes = itemGroupContainer.childNodes;
      expect(childNodes.length).to.equal(3);

      childNodes.forEach((child, index) => {
        const markerDom = child.getElementsByClassName('g2-legend-item-marker')[0];
        const textDom = child.getElementsByClassName('g2-legend-item-text')[0];
        expect(markerDom).to.be.an.instanceOf(HTMLElement);
        expect(textDom).to.be.an.instanceOf(HTMLElement);

        expect(child.className).to.equal('g2-legend-item');
        expect(child.style.display).to.equal('inline-block');
        expect(child.getAttribute('data-color')).to.equal(colors[index]);
        expect(child.getAttribute('data-value')).to.equal(items[index].value);
        expect(child.getAttribute('data-checked')).to.equal('true');
      });
    });

    it('click on itemGroupContainer', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      // 模拟点击事件
      const event = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      itemGroupContainer.dispatchEvent(event);

      const childNodes = itemGroupContainer.childNodes;
      childNodes.forEach((child) => {
        expect(child.getAttribute('data-checked')).to.equal('true');
      });
    });

    it('click on legend item', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      const itemNode = itemNodes[2];
      // 模拟点击事件
      const event = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      itemNode.dispatchEvent(event);

      expect(itemNode.getAttribute('data-checked')).to.equal('false');
      const markerDom = itemNode.getElementsByClassName('g2-legend-item-marker')[0];
      expect(markerDom.style.backgroundColor).to.equal(d3Color.rgb(legend.get('unSelectedColor')).toString());
      expect(itemNode.style.color).to.equal(d3Color.rgb(legend.get('unSelectedColor')).toString());
    });

    it('click on legend item marker', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      const itemNode = itemNodes[0];
      const markerDom = itemNode.getElementsByClassName('g2-legend-item-marker')[0];

      // 模拟点击事件
      const event = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      markerDom.dispatchEvent(event);

      expect(itemNode.getAttribute('data-checked')).to.equal('false');
      expect(markerDom.style.backgroundColor).to.equal(d3Color.rgb(legend.get('unSelectedColor')).toString());
      expect(itemNode.style.color).to.equal(d3Color.rgb(legend.get('unSelectedColor')).toString());
    });

    it('allowAllCanceled is false', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      const itemNode = itemNodes[1];
      const markerDom = itemNode.getElementsByClassName('g2-legend-item-marker')[0];

      // 模拟点击事件
      const event = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      markerDom.dispatchEvent(event);

      expect(itemNode.getAttribute('data-checked')).to.equal('true');
      expect(markerDom.style.backgroundColor).to.equal(d3Color.rgb(itemNode.getAttribute('data-color')).toString());
      expect(itemNode.style.color).to.equal(d3Color.rgb(itemNode.getAttribute('data-color')).toString());
    });

    it('allowAllCanceled is true', () => {
      legend.set('allowAllCanceled', true);
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      const itemNode = itemNodes[1];
      const markerDom = itemNode.getElementsByClassName('g2-legend-item-marker')[0];

      // 模拟点击事件
      const event = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      markerDom.dispatchEvent(event);

      expect(itemNode.getAttribute('data-checked')).to.equal('false');
      expect(markerDom.style.backgroundColor).to.equal(d3Color.rgb(legend.get('unSelectedColor')).toString());
      expect(itemNode.style.color).to.equal(d3Color.rgb(legend.get('unSelectedColor')).toString());
    });

    it('single selectedMode', () => {
      legend.set('selectedMode', 'single');

      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      const itemNode = itemNodes[0];
      const textDom = itemNode.getElementsByClassName('g2-legend-item-text')[0];
      const markerDom = itemNode.getElementsByClassName('g2-legend-item-marker')[0];

      // 模拟点击事件
      const event = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      textDom.dispatchEvent(event);

      expect(itemNode.getAttribute('data-checked')).to.equal('true');
      expect(itemNode.style.color).to.equal(d3Color.rgb(itemNode.getAttribute('data-color')).toString());
      expect(markerDom.style.backgroundColor).to.equal(d3Color.rgb(itemNode.getAttribute('data-color')).toString());

      itemNodes.forEach((node) => {
        if (node !== itemNode) {
          expect(node.getAttribute('data-checked')).to.equal('false');
        }
      });

      // 点击其他
      const itemNode1 = itemNodes[1];
      itemNode1.dispatchEvent(event);
      expect(itemNode1.getAttribute('data-checked')).to.equal('true');
      expect(itemNode.getAttribute('data-checked')).to.equal('false');
    });

    it('mousemove on itemGroupContainer', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      let isCalled = false;
      legend.on('itemmouseover', () => {
        isCalled = true;
      });

      // 模拟 mousemove 事件
      const event = new window.MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      itemGroupContainer.dispatchEvent(event);

      const childNodes = itemGroupContainer.childNodes;
      childNodes.forEach((child) => {
        expect(child.className.indexOf('active')).to.equal(-1);
      });
      expect(isCalled).to.be.false;
    });

    it('mousemove on legend item, and item is checked', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNode = itemGroupContainer.childNodes[1];
      let isCalled = false;
      legend.on('itemmouseover', () => {
        isCalled = true;
      });

      // 模拟 mousemove 事件
      const event = new window.MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      itemNode.dispatchEvent(event);

      expect(itemNode.className.indexOf('active')).to.gt(0);
      expect(legend.get('_lastActiveItem').value).to.equal('test 1');
      expect(isCalled).to.be.true;
    });

    it('mouseout', () => {
      const itemGroupContainer = legend.get('_itemGroupContainer');
      let isCalled = false;
      legend.on('itemmouseleave', () => {
        isCalled = true;
      });

      // 模拟 mousemove 事件
      const event = new window.MouseEvent('mouseout', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      itemGroupContainer.dispatchEvent(event);

      const childNodes = itemGroupContainer.childNodes;
      childNodes.forEach((child) => {
        expect(child.className.indexOf('active')).to.equal(-1);
        expect(child.className.indexOf('inactive')).to.equal(-1);
      });
      expect(isCalled).to.be.true;
      expect(legend.get('_lastActiveItem')).to.be.null;
    });

    it('mousemove on legend item, highlight is true, but item is unchecked', () => {
      legend.set('highlight', true);
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      const itemNode0 = itemNodes[0]; // 非选中状态

      let called = false;
      legend.on('itemmouseover', () => {
        called = true;
      });

      // 模拟 mousemove 事件
      const event = new window.MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      itemNode0.dispatchEvent(event);

      expect(itemNode0.className.indexOf('active')).to.equal(-1);
      expect(called).to.be.true;

      const unHoverNodes = [];
      itemNodes.forEach((itemNode) => {
        if (itemNode !== itemNode0) {
          unHoverNodes.push(itemNode);
        }
      });
      // 如果 hover 到的图例项处于非选中态，那么不会激发任何 active 状态
      unHoverNodes.forEach((unHoverNode) => {
        expect(unHoverNode.className.indexOf('active')).to.equal(-1);
        expect(unHoverNode.className.indexOf('inactive')).to.equal(-1);
      });
    });

    it('mousemove on a checked legend item, highlight is true', () => {
      legend.set('selectedMode', 'multiple');
      let moveCalled = false;
      let clickCalled = false;
      legend.on('itemclick', () => {
        clickCalled = true;
      });
      legend.on('itemmouseover', () => {
        moveCalled = true;
      });
      const clickEvent = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      const moveEvent = new window.MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const itemNodes = itemGroupContainer.childNodes;
      itemNodes[0].dispatchEvent(clickEvent);
      itemNodes[2].dispatchEvent(clickEvent);
      itemNodes[1].dispatchEvent(moveEvent);

      expect(legend.get('_lastActiveItem').value).to.equal('test 1');
      expect(itemNodes[1].className.indexOf('active')).to.gt(0);
      expect(itemNodes[0].className.indexOf('inactive')).to.gt(0);
      expect(itemNodes[2].className.indexOf('inactive')).to.gt(0);
      expect(moveCalled).to.be.true;
      expect(clickCalled).to.be.true;
    });

    it('getWidth()', () => {
      const width = legend.getWidth();
      expect(width).to.equal(200);
    });

    it.skip('getHeight()', () => {
      const height = legend.getHeight();
      expect(height).to.equal(49);
    });

    it('moveTo()', () => {
      legend.moveTo(20, 20);
      const container = legend.get('_legendContainer');
      expect(container.style.top).to.equal('20px');
      expect(container.style.left).to.equal('20px');
    });

    it('destroy', () => {
      legend.destroy();
      expect(legend.destroyed).to.be.true;
      canvas.destroy();
    });
  });

  describe('Pagination', () => {
    const items = [];
    for (let i = 0; i < colors.length; i++) {
      items.push({
        value: `${i + 1}`,
        attrValue: colors[i],
        marker: {
          stroke: colors[i],
        },
        checked: i !== 3,
      });
    }

    let legend;

    it('pagination is true', () => {
      legend = new HTMLLegend({
        container: '#htmlLegend', // 直接传入挂载 dom 的 id
        items,
        reversed: true,
        maxWidth: 200,
        maxHeight: 120,
        layout: 'vertical',
        hoverable: false,
        clickable: false,
        title: '带分页的图例',
        containerTpl: '<div class="g2-legend"></div>',
        pagination: {
          activeColor: '#000', // 可点击的颜色
          inactiveColor: '#ccc', // 不可点击的颜色
          arrowSize: 8, // 箭头的大小
          animation: true, // 匀速滑动动画
        },
        itemTpl: '<div class="g2-legend-item"><span class="g2-legend-item-text"></span></div>',
        formatter(val) {
          return 'item' + val;
        },
      });

      const legendContainer = legend.get('_legendContainer');
      const itemGroupContainer = legend.get('_itemGroupContainer');
      const titleContainer = legend.get('_titleContainer');
      const itemNodes = itemGroupContainer.childNodes;
      // 挂载至 htmlLegend 下
      expect(div.childNodes.length).to.equal(1);
      expect(legendContainer.parentNode).to.eql(div);

      expect(titleContainer.className).to.equal('g2-legend-title');
      expect(titleContainer.textContent).to.equal('带分页的图例');
      expect(itemNodes.length).to.equal(colors.length);
      expect(itemNodes[0].getAttribute('data-value')).to.equal('15');

      const pageSize = legendContainer.getElementsByClassName('total-page-number')[0];
      expect(pageSize.textContent).to.equal('5');
    });

    it('page navigation event', () => {
      const legendContainer = legend.get('_legendContainer');
      const currentPage = legendContainer.getElementsByClassName('current-page-number')[0];
      const prePageButton = legendContainer.getElementsByClassName('pre-page')[0];
      const nextPageButton = legendContainer.getElementsByClassName('next-page')[0];

      const clickEvent = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      // 位于第一页，prePageButtom 不可点击
      prePageButton.dispatchEvent(clickEvent);
      expect(prePageButton.style.borderColor).to.equal(d3Color.rgb(legend.get('pagination').inactiveColor).toString());
      expect(currentPage.textContent).to.equal('1');

      nextPageButton.dispatchEvent(clickEvent);
      expect(prePageButton.style.borderColor).to.equal(d3Color.rgb(legend.get('pagination').activeColor).toString());
      expect(currentPage.textContent).to.equal('2');

      nextPageButton.dispatchEvent(clickEvent);
      nextPageButton.dispatchEvent(clickEvent);
      nextPageButton.dispatchEvent(clickEvent);
      // 点击到最后一页
      expect(nextPageButton.style.borderColor).to.equal(d3Color.rgb(legend.get('pagination').inactiveColor).toString());
      expect(currentPage.textContent).to.equal('5');

      nextPageButton.dispatchEvent(clickEvent); // 不可点
      expect(currentPage.textContent).to.equal('5');

      // 点击到第一页
      prePageButton.dispatchEvent(clickEvent);
      prePageButton.dispatchEvent(clickEvent);
      prePageButton.dispatchEvent(clickEvent);
      prePageButton.dispatchEvent(clickEvent);
      expect(prePageButton.style.borderColor).to.equal(d3Color.rgb(legend.get('pagination').inactiveColor).toString());
      expect(currentPage.textContent).to.equal('1');
    });

    it('clickable is false', () => {
      const clickEvent = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      const itemGroupContainer = legend.get('_itemGroupContainer');
      let called = false;
      legend.on('itemclick', () => {
        called = true;
      });
      itemGroupContainer.childNodes[0].dispatchEvent(clickEvent);
      expect(called).to.be.false;
    });

    it('hoverable is false', () => {
      const moveEvent = new window.MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      const itemGroupContainer = legend.get('_itemGroupContainer');
      let called = false;
      legend.on('itemmouseover', () => {
        called = true;
      });
      itemGroupContainer.childNodes[0].dispatchEvent(moveEvent);
      expect(called).to.be.false;
    });

    it('destroy', () => {
      legend.destroy();

      expect(div.childNodes).to.be.empty;
    });
  });

  describe('Custom Legend', () => {
    const items = [];
    const values = ['Ireland', 'Germany', 'Australia', 'UK', 'Belgium'];
    const numbers = [10, 30, 34, 45, 78];
    for (let i = 0; i < 5; i++) {
      items.push({
        value: values[i],
        attrValue: colors[i],
        marker: {
          fill: colors[i],
        },
        checked: true,
      });
    }

    let legend;
    it('custom html legend without pagination', () => {
      legend = new HTMLLegend({
        container: div, // 挂载到外部容器中
        items,
        pagination: false, // 默认不分页
        maxWidth: 250,
        maxHeight: 80,
        clickable: false,
        title: '自定义图例',
        containerTpl: `<div class="g2-legend">
          <h5 class="g2-legend-title"></h5>
          <table class="g2-legend-list"></table>
        </div>`,
        itemTpl(value, checked, color, index) {
          return `<tr class="g2-legend-item">
            <td style="width:120px;">
              <i class="g2-legend-item-marker"></i>
              ${value}
            </td>
            <td style="width:120px;">
              ${numbers[index]}
            </td>
          /tr>`;
        },
        titleStyle: {
          marginTop: 0,
        },
        markerStyle: {
          width: '10px',
          height: '10px',
          borderRadius: 0,
        },
        backgroundStyle: {
          border: '1px solid #ccc',
          borderRadius: '5px',
        },
      });
      const legendContainer = legend.get('_legendContainer');
      expect(div.childNodes.length).to.equal(1);
      expect(legendContainer.parentNode).to.eql(div);

      const titleContainer = legend.get('_titleContainer');
      expect(titleContainer.nodeName).to.equal('H5');

      const itemGroupContainer = legend.get('_itemGroupContainer');
      expect(itemGroupContainer.nodeName).to.equal('TABLE');
      legend.destroy();
      expect(div.childNodes).to.be.empty;
    });

    it('custom html legend with pagination', () => {
      legend = new HTMLLegend({
        container: div, // 挂载到外部容器中
        items,
        pagination: {
          animation: false,
        },
        maxWidth: 250,
        maxHeight: 80,
        containerTpl: `<div class="g2-legend">
          <table class="g2-legend-list"></table>
        </div>`,
        itemTpl(value, checked, color, index) {
          return `<tr class="g2-legend-item">
            <td style="width:120px;">
              <i class="g2-legend-item-marker"></i>
              ${value}
            </td>
            <td style="width:120px;">
              ${numbers[index]}
            </td>
          /tr>`;
        },
        markerStyle: {
          width: '10px',
          height: '10px',
          borderRadius: 0,
        },
        backgroundStyle: {
          border: '1px solid #ccc',
          borderRadius: '5px',
        },
      });
      const legendContainer = legend.get('_legendContainer');
      expect(div.childNodes.length).to.equal(1);
      expect(legendContainer.parentNode).to.eql(div);

      const itemGroupContainer = legend.get('_itemGroupContainer');
      expect(itemGroupContainer.nodeName).to.equal('TABLE');
      expect(itemGroupContainer.style.translate).to.be.undefined;

      const pageSize = legendContainer.getElementsByClassName('total-page-number')[0];
      expect(pageSize.textContent).to.equal('8');

      const nextPageButton = legendContainer.getElementsByClassName('next-page')[0];
      const clickEvent = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      nextPageButton.dispatchEvent(clickEvent);
      const currentPageNumber = legendContainer.getElementsByClassName('current-page-number')[0];
      expect(currentPageNumber.textContent).to.equal('2');

      legend.destroy();
      expect(div.childNodes).to.be.empty;
    });
  });

  after(() => {
    document.body.removeChild(div);
  });
});
