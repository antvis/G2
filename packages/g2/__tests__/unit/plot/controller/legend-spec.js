import { expect } from 'chai';
import LegendController from '../../../../src/plot/controller/legend';
import { Canvas, Event } from '@antv/g';
import '../../../../src';
import View from '../../../../src/plot/view';

describe('LegendController', () => {
  const data = [
    { country: 'Asia', year: '1750', value: 502, type: 'a' },
    { country: 'Asia', year: '1800', value: 635, type: 'a' },
    { country: 'Asia', year: '1850', value: 809, type: 'b' },
    { country: 'Asia', year: '1900', value: 947, type: 'a' },
    { country: 'Asia', year: '1950', value: 1402, type: 'a' },
    { country: 'Asia', year: '1999', value: 3634, type: 'b' },
    { country: 'Asia', year: '2050', value: 5268, type: 'a' },
    { country: 'Africa', year: '1750', value: 106, type: 'a' },
    { country: 'Africa', year: '1800', value: 107, type: 'a' },
    { country: 'Africa', year: '1850', value: 111, type: 'c' },
    { country: 'Africa', year: '1900', value: 133, type: 'a' },
    { country: 'Africa', year: '1950', value: 221, type: 'b' },
    { country: 'Africa', year: '1999', value: 767, type: 'a' },
    { country: 'Africa', year: '2050', value: 1766, type: 'a' },
    { country: 'Europe', year: '1750', value: 163, type: 'a' },
    { country: 'Europe', year: '1800', value: 203, type: 'a' },
    { country: 'Europe', year: '1850', value: 276, type: 'c' },
    { country: 'Europe', year: '1900', value: 408, type: 'a' },
    { country: 'Europe', year: '1950', value: 547, type: 'a' },
    { country: 'Europe', year: '1999', value: 729, type: 'b' },
    { country: 'Europe', year: '2050', value: 628, type: 'b' },
    { country: 'Oceania', year: '1750', value: 200, type: 'a' },
    { country: 'Oceania', year: '1800', value: 200, type: 'a' },
    { country: 'Oceania', year: '1850', value: 200, type: 'a' },
    { country: 'Oceania', year: '1900', value: 300, type: 'a' },
    { country: 'Oceania', year: '1950', value: 230, type: 'c' },
    { country: 'Oceania', year: '1999', value: 300, type: 'a' },
    { country: 'Oceania', year: '2050', value: 460, type: 'a' },
  ];
  const div = document.createElement('div');
  div.id = 'view';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerId: 'view',
    renderer: 'canvas',
    width: 500,
    height: 400,
    pixelRatio: 2,
  });

  const view = new View({
    canvas,
    container: canvas.addGroup(),
    width: 500,
    height: 400,
    padding: [10, 90, 50, 90],
  });

  it('close legend', () => {
    view.data(data);
    view
      .line()
      .position({
        fields: ['year', 'value'],
      })
      .color({
        fields: ['country'],
      });
    view.legend('country', false);
    view.render();
    const lc = view.get('legendController');
    expect(lc.legends).to.be.empty;
  });

  it('default', () => {
    view.legend({ useHtml: false });
    view.render();
    const lc = view.get('legendController');
    expect(lc.view).to.be.eql(view);
    expect(lc).to.be.an.instanceof(LegendController);
  });

  it('legendPosition right-center', () => {
    view.data(data);
    view
      .line()
      .position({
        fields: ['year', 'value'],
      })
      .color({
        fields: ['country'],
      });
    view.legend({
      position: 'right-center',
    });
    view.render();
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const legendHeight = legend.getHeight();
    const legendWidth = legend.getWidth();
    const backRange = lc.viewRange;
    const canvasHeight = view.get('height');
    const borderMargin = lc.theme.legend.margin;
    expect(x).to.equal(backRange.maxX - borderMargin[1] - legendWidth);
    expect(y).to.equal((canvasHeight - legendHeight) / 2);
  });

  it('legendPosition right-top', () => {
    view.data(data);
    view
      .line()
      .position({
        fields: ['year', 'value'],
      })
      .color({
        fields: ['country'],
      });
    view.legend({
      position: 'right-top',
      useHtml: false,
    });
    view.render();

    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const legendWidth = legend.getWidth();
    const backRange = lc.viewRange;
    const borderMargin = lc.theme.legend.margin;
    expect(x).to.equal(backRange.maxX - borderMargin[1] - legendWidth);
    expect(y).to.equal(backRange.minY + borderMargin[0]);
  });

  it('legendPosition left-center', () => {
    view.legend({
      position: 'left-center',
    });
    view.render();
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const legendHeight = legend.getHeight();
    const backRange = lc.viewRange;
    const viewHeight = view.get('height');
    const borderMargin = lc.theme.legend.margin;
    expect(x).to.equal(backRange.minX + borderMargin[1]);
    expect(y).to.equal((viewHeight - legendHeight) / 2);
  });

  it('legendPosition top-center', () => {
    view.legend({
      selectedMode: 'single',
      position: 'top-center',
    });
    view.render();
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const legendWidth = legend.getWidth();
    const backRange = lc.viewRange;
    const viewWidth = view.get('width');
    const borderMargin = lc.theme.legend.margin;
    expect(x).to.equal((viewWidth - legendWidth) / 2);
    expect(y).to.equal(backRange.minY + borderMargin[0]);
  });

  it('legendPosition top-left', () => {
    view.legend({
      position: 'top-left',
    });
    view.render();
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const backRange = lc.viewRange;
    const borderMargin = lc.theme.legend.margin;
    expect(x).to.equal(backRange.minX + borderMargin[1]);
    expect(y).to.equal(backRange.minY + borderMargin[0]);
  });

  it('legendPosition top-right', () => {
    view.data(data);
    view
      .line()
      .position({
        fields: ['year', 'value'],
      })
      .color({
        fields: ['country'],
      });
    view.legend({
      position: 'top-right',
      useHtml: false,
    });
    view.render();
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const legendWidth = legend.getWidth();
    const backRange = lc.viewRange;
    const borderMargin = lc.theme.legend.margin;
    expect(x).to.equal(backRange.maxX - legendWidth - borderMargin[1]);
    expect(y).to.equal(backRange.minY - borderMargin[0]);
  });

  it('legendPosition bottom-center', () => {
    view.legend({
      position: 'bottom-center',
    });
    view.render();
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const legendWidth = legend.getWidth();
    const backRange = lc.viewRange;
    const borderMargin = lc.theme.legend.margin;
    const canvasWidth = view.get('width');
    const legendHeight = legend.getHeight();
    expect(x).to.equal((canvasWidth - legendWidth) / 2);
    expect(y).to.equal(backRange.maxY - borderMargin[2] - legendHeight);
  });

  it.skip('legend click', () => {
    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const itemsGroup = legend.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[0];
    const event1 = new Event('click', {}, true, true);
    event1.target = targetItem.get('children')[0];
    itemsGroup.emit('click', event1);
    const filteredValues = view.getFilteredValues('country');
    expect(filteredValues).eql(['Africa', 'Europe', 'Oceania']);

    expect(view.get('isUpdate')).to.be.true;
  });

  it('legend custom', () => {
    view.legend({
      position: 'bottom-right',
      custom: true,
      items: [
        {
          value: 'Asia',
          marker: {
            symbol: 'square',
            radius: 5,
            fill: 'purple',
          },
          checked: true,
        },
        {
          value: 'Africa',
          marker: 'hollowTriangle',
          checked: true,
          color: '#d73027',
        },
        {
          value: 'Europe',
          marker: {
            symbol: 'cross',
            radius: 5,
            stroke: '#91cf60',
          },
          checked: true,
        },
        {
          value: 'Oceania',
          marker: 'tick',
          color: '#fee08b',
          checked: true,
        },
        {
          value: 'other',
          marker: 'circle',
          color: 'blue',
        },
        {
          value: 'custom',
          marker: (x, y, r) => {
            return [['M', x, y], ['m', -r, 0], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0]];
          },
          color: 'pink',
        },
      ],
    });
    view.render();
    const lc = view.get('legendController');
    expect(lc.legends.length).equal(1);

    const legendItems = lc.legends[0].get('items');
    expect(legendItems[0].marker).to.eql({
      symbol: 'square',
      radius: 5,
      fill: 'purple',
    });
    expect(legendItems[1].marker).to.eql({
      symbol: 'triangle',
      radius: 4.5,
      stroke: '#d73027',
    });
    expect(legendItems[2].marker).to.eql({
      symbol: 'cross',
      radius: 5,
      stroke: '#91cf60',
    });
    expect(legendItems[3].marker).to.eql({
      symbol: 'tick',
      radius: 4.5,
      stroke: '#fee08b',
    });
    expect(legendItems[4].marker).to.eql({
      symbol: 'circle',
      radius: 4.5,
      fill: 'blue',
    });
    expect(legendItems[5].marker.symbol).to.be.instanceOf(Function);
    expect(legendItems[5].marker.fill).to.equal('pink');
  });

  it('legend mutiLegend', () => {
    view.legend({
      position: 'bottom',
    });
    view
      .interval()
      .position({
        fields: ['year', 'value'],
      })
      .color({
        fields: ['type'],
      });
    view.render();

    const lc = view.get('legendController');
    expect(lc.legends.length).equal(2);
  });

  it('legend html', () => {
    view.legend({
      position: 'bottom-left',
      useHtml: true,
      layout: 'horizontal',
    });
    view.render();

    const lc = view.get('legendController');
    const legend = lc.legends[1];
    const itemGroupContainer = legend.get('_itemGroupContainer');
    const itemNodes = itemGroupContainer.childNodes;
    const itemNode = itemNodes[1];
    // 模拟点击事件
    const event = new window.MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    itemNode.dispatchEvent(event);
    expect(itemNode.getAttribute('data-checked')).to.equal('false');
  });

  it.skip('custom interaction', () => {
    let clickCalled = false;
    let overCalled = false;
    let leaveCalled = false;
    view.legend({
      onClick() {
        clickCalled = true;
      },
      onMouseover() {
        overCalled = true;
      },
      onMouseleave() {
        leaveCalled = true;
      },
    });

    view.render();

    const lc = view.get('legendController');
    const legend = lc.legends[0];
    const itemsGroup = legend.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[0];

    const clickEvent = new Event('mousemove', {}, true, true);
    clickEvent.target = targetItem.get('children')[0];
    itemsGroup.emit('click', clickEvent);
    expect(clickCalled).to.be.true;

    const mousemoveEvent = new Event('mousemove', {}, true, true);
    mousemoveEvent.target = targetItem.get('children')[1];
    itemsGroup.emit('mousemove', mousemoveEvent);
    expect(overCalled).to.be.true;

    const mouseleaveEvent = new Event('mouseleave', {}, true, true);
    mouseleaveEvent.target = targetItem.get('children')[1];
    itemsGroup.emit('mouseleave', mouseleaveEvent);
    expect(leaveCalled).to.be.true;
  });

  it('legend marker custom', () => {
    view.legend({
      marker(x, y, r) {
        return [['M', x - r, y], ['L', x + r / 2, y + r], ['L', x + r, y], ['Z']];
      },
    });
    view.render();

    const lc = view.get('legendController');
    const legendItems = lc.legends[0].get('items');
    expect(legendItems[0].marker.symbol).to.be.instanceOf(Function);
  });
});
