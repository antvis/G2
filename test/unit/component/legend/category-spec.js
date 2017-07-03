const expect = require('chai').expect;
// const Util = require('../../../../src/util');
const { Canvas, Event } = require('@ali/g');
const Legend = require('../../../../src/component/legend/category');

const div = document.createElement('div');
div.id = 'legend';
div.style.margin = '20px';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

const symbols = [ 'circle', 'diamond', 'square', 'triangle', 'triangle-down' ];
const colors = [ '#ff6600', '#b01111', '#ac5724', '#572d8a', '#333333', '#7bab12', '#c25e5e', '#a6c96a', '#133960', '#2586e7' ];

describe('分类图例', function() {
  it('默认', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i],
        marker: i !== 2 ? {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        } : null,
        checked: i === 2, // 选中状态
        textStyle: {
          fill: '#000',
          fontSize: 12
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      itemGap: 10,
      title: {
        fill: '#f80',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'top',
        text: '水平图例'
      }
    });

    canvas.draw();
    const legendItemsGroup = legend.get('children')[0];
    expect(legend.get('children')[1].get('type')).to.equal('text');
    expect(legend.getCount()).to.equal(2);
    expect(legendItemsGroup.getCount()).to.equal(5);
    expect(legend._wrap__onClick).to.be.an.instanceof(Function);
    expect(legend._wrap__onMousemove).to.be.an.instanceof(Function);

    // 点击事件测试1：不允许全部取消选中并且当前只有一个图例项被选中
    const targetItem = legendItemsGroup.get('children')[2];
    const event1 = new Event('click', {
      clientX: 100,
      clientY: 316
    }, true, true);
    event1.currentTarget = targetItem.get('children')[0];
    expect(targetItem.get('checked')).to.be.true;
    legend.trigger('click', [ event1 ]);
    expect(legendItemsGroup.get('children')[0].get('checked')).to.be.false;
    expect(legendItemsGroup.get('children')[1].get('checked')).to.be.false;
    expect(legendItemsGroup.get('children')[2].get('checked')).to.be.true;
    expect(legendItemsGroup.get('children')[3].get('checked')).to.be.false;
    expect(legendItemsGroup.get('children')[4].get('checked')).to.be.false;

    // 点击事件测试2：不允许全部取消选中并且当前只有一个图例项被选中
    const event2 = new Event('click', {
      clientX: 100,
      clientY: 316
    }, true, true);
    event2.currentTarget = legendItemsGroup.get('children')[0].get('children')[2];
    expect(targetItem.get('checked')).to.be.true;
    legend.trigger('click', [ event2 ]);
    expect(legendItemsGroup.get('children')[0].get('checked')).to.be.true;
    expect(legendItemsGroup.get('children')[1].get('checked')).to.be.false;
    expect(legendItemsGroup.get('children')[2].get('checked')).to.be.true;
    expect(legendItemsGroup.get('children')[3].get('checked')).to.be.false;
    expect(legendItemsGroup.get('children')[4].get('checked')).to.be.false;
  });

  it('默认，不可点击', function() {
    canvas.clear();
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i],
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: true, // 选中状态
        textStyle: {
          fill: '#000',
          fontSize: 12
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 10,
      title: null,
      clickable: false,
      itemFormatter: val => {
        return '(' + val + ')';
      }
    });
    legend.move(0, 50);
    legend.id = '2';

    canvas.draw();
    expect(legend._wrap__onClick).to.be.undefined;
    expect(legend._wrap__onMousemove).to.be.an.instanceof(Function);

    const legendItemsGroup = legend.get('children')[0];
    const targetItem = legendItemsGroup.get('children')[2];
    const event1 = new Event('mousemove', {
      clientX: 224,
      clientY: 239
    }, true, true);
    event1.currentTarget = targetItem.get('children')[0];
    legend.trigger('mousemove', [ event1 ]);
    const node = canvas.get('el');
    expect(node.style.cursor).to.equal('pointer');

    const event2 = new Event('mousemove', {
      clientX: 0,
      clientY: 0
    }, true, true);
    event2.currentTarget = targetItem;
    legend.trigger('mousemove', [ event2 ]);
    expect(node.style.cursor).to.equal('default');
  });

  it('默认，只可单次点击。', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i],
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: i === 2, // 选中状态
        textStyle: {
          fill: '#000',
          fontSize: 12
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 10,
      title: {
        fill: '#f80',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'top',
        text: '水平图例'
      },
      mode: 'single'
    });
    legend.id = '3';

    legend.move(0, 100);

    canvas.draw();
    const itemGroups = legend.get('children')[0].get('children');
    expect(itemGroups[0].get('checked')).to.be.false;
    expect(itemGroups[1].get('checked')).to.be.false;
    expect(itemGroups[2].get('checked')).to.be.true;
    expect(itemGroups[3].get('checked')).to.be.false;
    expect(itemGroups[4].get('checked')).to.be.false;

    // 无效点击事件
    const unusedEvent = new Event('click', {
      clientX: 100,
      clientY: 316
    }, true, true);
    unusedEvent.currentTarget = legend.get('children')[0];
    legend.trigger('click', [ unusedEvent ]);
    expect(itemGroups[0].get('checked')).to.be.false;
    expect(itemGroups[1].get('checked')).to.be.false;
    expect(itemGroups[2].get('checked')).to.be.true;
    expect(itemGroups[3].get('checked')).to.be.false;
    expect(itemGroups[4].get('checked')).to.be.false;

    // 有效点击事件测试
    const event = new Event('click', {
      clientX: 100,
      clientY: 316
    }, true, true);
    event.currentTarget = itemGroups[1].get('children')[0];
    legend.trigger('click', [ event ]);
    expect(itemGroups[0].get('checked')).to.be.false;
    expect(itemGroups[1].get('checked')).to.be.true;
    expect(itemGroups[2].get('checked')).to.be.false;
    expect(itemGroups[3].get('checked')).to.be.false;
    expect(itemGroups[4].get('checked')).to.be.false;
  });

  it('垂直布局图例', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i],
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: !(i === 3), // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 15,
      layout: 'vertical',
      title: {
        fill: '#f80',
        fontSize: 14,
        textAlign: 'start',
        textBaseline: 'middle',
        text: '垂直图例'
      },
      unCheckStyle: {
        fill: '#ccc',
        fontWeight: 'bold'
      },
      background: {
        fill: '#ccc',
        fillOpacity: 0.2
      }
    });
    legend.move(0, 150);
    canvas.draw();
    expect(legend.getCount()).to.equal(3);
    const itemsGroup = legend.get('children')[1];
    // expect(Util.equal(itemsGroup.getBBox().width, 50.34765625)).to.be.true;
    expect(itemsGroup.getCount()).to.equal(5);
    const children = itemsGroup.get('children');
    expect(children[0].get('children')[0].attr('fill')).to.equal('#ff6600');
    expect(children[0].get('children')[1].attr('fill')).to.equal('#000');
    expect(children[3].get('children')[0].attr('fill')).to.equal('#ccc');
    expect(children[3].get('children')[1].attr('fill')).to.equal('#ccc');

    // 有效点击事件测试
    const event = new Event('click', {
      clientX: 100,
      clientY: 316
    }, true, true);
    event.currentTarget = children[0].get('children')[0];
    legend.trigger('click', [ event ]);
    expect(children[0].get('children')[0].attr('fill')).to.equal('#ccc');
    expect(children[0].get('checked')).to.be.false;
  });

  it('水平布局，但是总长度超出了容器宽度，自动换行', function() {
    canvas.clear();
    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: !(i >= 20), // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 20,
      itemMarginBottom: 20,
      title: {
        fill: '#f80',
        fontSize: 16,
        textAlign: 'start',
        textBaseline: 'top',
        text: 'Legend-title'
      },
      maxLength: 500
    });
    canvas.draw();
    const legendBBox = legend.getBBox();
    const legendItems = legend.get('children')[0];
    expect(legendBBox.width).to.be.below(500);
    expect(legendItems.getCount()).to.equal(25);
  });

  it('水平布局，但是总长度超出了容器宽度，自动换行，且每行列对齐', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: true, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 10,
      title: {
        fill: '#f80',
        fontSize: 16,
        textAlign: 'start',
        textBaseline: 'middle',
        text: 'Legend-title'
      },
      maxLength: 500,
      background: {
        fill: '#ccc',
        fillOpacity: 0.1,
        lineWidth: 1
      },
      itemMarginBottom: 5,
      itemWidth: 60
    });
    canvas.draw();
    // const legendBBox = legend.getBBox();
    const legendItems = legend.get('children')[1];
    // expect(legendBBox.width).to.be.equal(482);
    expect(legendItems.getCount()).to.equal(25);
  });

  it('垂直布局图例，超出容器高度，自动生列', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: true, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 10, // 水平距离
      itemMarginBottom: 20, // 垂直距离
      layout: 'vertical',
      titleGap: 20,
      title: {
        fill: '#f80',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'top',
        text: '垂直图例1'
      },
      maxLength: 200
    });

    legend.move(50, 0);
    canvas.draw();
    const legendBBox = legend.getBBox();
    expect(legendBBox.height).to.be.equal(176.5);
  });

  it('垂直布局图例，设置了 itemWidth, 超出容器高度，自动生列', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        name: i + '',
        color: colors[ i % 10 ],
        marker: {
          symbol: symbols[ i % 5 ],
          radius: 5,
          fill: colors[ i % 10 ]
        },
        checked: true, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      allowAllCanceled: true,
      itemGap: 10, // 水平距离
      itemMarginBottom: 20, // 垂直距离
      layout: 'vertical',
      titleGap: 20,
      itemWidth: 30,
      maxLength: 100,
      background: {
        lineWidth: 1,
        stroke: '#ccc'
      }
    });

    // legend.move(50, 0);
    canvas.draw();
    const legendBBox = legend.getBBox();
    expect(legendBBox.height).to.be.equal(83);
    // expect(legendBBox.width).to.equal(192.34765625);
  });

  it('html 渲染图例，使用默认的模板', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: !(i > 2), // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items,
      title: {
        text: '图例标题'
      },
      useHtml: true,
      scroll: false
    });

    canvas.draw();

    const legendDom = div.getElementsByClassName('g-legend')[0];
    expect(legendDom).not.to.be.undefined;
    expect(legendDom.style.position).to.equal('absolute');

    const legendItem = div.getElementsByClassName('g-legend-item')[1];
    expect(legendItem.className).to.equal('g-legend-item item-1 checked');

    // 模拟点击事件
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    legendItem.dispatchEvent(event);
    expect(legendItem.className).to.equal('g-legend-item item-1 unChecked');

    let count = 0;
    legend.on('legend:hover', function() {
      count = 1;
    });

    // 模拟 hover 事件
    const hoverEvent = new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    legendItem.dispatchEvent(hoverEvent);
    expect(count).to.equal(1);

    div.removeChild(legendDom);
  });

  it('html 渲染图例，使用回调函数自定义模板', function() {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: (i === 10), // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    canvas.addGroup(Legend, {
      items,
      useHtml: true,
      itemTpl(value, color) {
        const tpl = '<li class="g-legend-item item-${ index } ${ checked }" data-color="${ originColor }" data-value="${ originValue }" style="cursor:pointer;display: inline-block;width: 85px">' +
        '<i class="g-legend-marker" style="width:16px;height:16px;border-radius:4px;display:inline-block;margin-right:10px;background-color: ${ color };"></i>' +
        '<span class="g-legend-text" style="color:' + color + '">' + value + '</span></li>';
        return tpl;
      },
      width: 500,
      height: 80,
      scroll: false,
      mode: 'single'
    });

    canvas.draw();

    const legendDom = div.getElementsByClassName('g-legend')[0];
    expect(legendDom).not.to.be.undefined;
    expect(legendDom.style.position).to.equal('absolute');

    const legendItem10 = div.getElementsByClassName('g-legend-item')[10];
    const legendItem11 = div.getElementsByClassName('g-legend-item')[11];
    expect(legendItem10.className).to.equal('g-legend-item item-10 checked');
    expect(legendItem11.className).to.equal('g-legend-item item-11 unChecked');
    // 模拟点击事件
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    legendItem10.dispatchEvent(event);
    expect(legendItem10.className).to.equal('g-legend-item item-10 checked');
    expect(legendItem11.className).to.equal('g-legend-item item-11 unChecked');


    legendItem11.dispatchEvent(event);
    expect(legendItem10.className).to.equal('g-legend-item item-10 unChecked');
    expect(legendItem11.className).to.equal('g-legend-item item-11 checked');
    div.removeChild(legendDom);
  });

  it('html 渲染图例，使用字符串自定义模板', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 35; i++) {
      items.push({
        name: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: i === 1, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    canvas.addGroup(Legend, {
      items,
      useHtml: true,
      itemTpl: '<li class="g-legend-item item-${ index } ${ checked }" data-color="${ originColor }" data-value="${ originValue }" style="cursor:pointer;width: 85px"><span class="g-legend-text" style="color: ${ color };cursor: pointer;">${ value }</span></li>'
    });

    canvas.draw();

    const legendDom = div.getElementsByClassName('g-legend')[0];
    expect(legendDom).not.to.be.undefined;
    expect(legendDom.style.position).to.equal('absolute');
    expect(legendDom.style.width).to.equal('500px');

    const legendItem01 = div.getElementsByClassName('g-legend-item')[1];
    expect(legendItem01.className).to.equal('g-legend-item item-1 checked');

    // 模拟点击事件1
    const event1 = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    legendItem01.dispatchEvent(event1);
    expect(legendItem01.className).to.equal('g-legend-item item-1 checked');

    const legendItem00 = div.getElementsByClassName('g-legend-item')[0];
    expect(legendItem00.className).to.equal('g-legend-item item-0 unChecked');
    // 模拟点击事件2
    const event2 = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    legendItem00.dispatchEvent(event2);
    expect(legendItem00.className).to.equal('g-legend-item item-0 checked');
  });
});
