const expect = require('chai').expect;
const Util = require('../../../../src/util');
const { Canvas } = require('@ali/g');
const Legend = require('../../../../src/component/legend/category');

const div = document.createElement('div');
div.id = 'legend';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

function findByName(group, name) {
  return group.findBy(function(node) {
    return node.name === name;
  });
}

const types = ['circle', 'line', 'rect', 'circle', 'line'];
const symbols = ['circle', 'diamond', 'square', 'triangle', 'triangle-down'];
const colors = ['#ff6600', '#b01111', '#ac5724', '#572d8a', '#333333', '#7bab12', '#c25e5e', '#a6c96a', '#133960', '#2586e7'];

describe('分类图例', function() {
  it('默认', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        value: 'test ' + i,
        color: colors[i],
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: true, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items: items,
      allowAllCanceled: true,
      itemGap: 30,
      title: {
        fill: '#f80',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'top',
        text: "水平图例"
      },
      itemWidth: 50
    });

    canvas.draw();
    const legendItemsGroup = legend.get('children')[1];
    expect(legend.getCount()).to.equal(3);
    expect(legendItemsGroup.getCount()).to.equal(5);
    expect(Util.equal(legend.getBBox().width, 367.349609375)).to.be.true;
  });

  it('垂直布局图例', function() {
    canvas.clear();
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        value: 'test ' + i,
        color: colors[i],
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: i === 3 ? false : true, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items: items,
      allowAllCanceled: true,
      itemGap: 15,
      layout: 'vertical',
      title: {
        fill: '#f80',
        fontSize: 16,
        textAlign: 'start',
        textBaseline: 'middle',
        text: '垂直图例'
      },
      unCheckStyle: {
        fill: '#ccc',
        fontWeight: 'bold'
      }
    });
    canvas.draw();
    expect(legend.getCount()).to.equal(3);
    const itemsGroup = legend.get('children')[1];
    expect(Util.equal(itemsGroup.getBBox().width, 49.34765625)).to.be.true;
    expect(itemsGroup.getCount()).to.equal(5);
    const children = itemsGroup.get('children');
    expect(children[0].get('children')[0].attr('fill')).to.equal('#ff6600');
    expect(children[0].get('children')[1].attr('fill')).to.equal('#000');
    expect(children[3].get('children')[0].attr('fill')).to.equal('#ccc');
    expect(children[3].get('children')[1].attr('fill')).to.equal('#ccc');
  });

  it('水平布局，但是总长度超出了容器宽度，自动换行', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        value: 'test ' + i,
        color: colors[i % 10],
        marker: {
          symbol: symbols[i % 5],
          radius: 5,
          fill: colors[i % 10]
        },
        checked: i >= 20 ? false : true, // 选中状态
        textStyle: {
          fill: '#000'
        }
      });
    }

    const legend = canvas.addGroup(Legend, {
      items: items,
      allowAllCanceled: true,
      itemGap: 50,
      itemMarginBottom: 20,
      title: {
        fill: '#f80',
        fontSize: 16,
        textAlign: 'start',
        textBaseline: 'middle',
        text: "Legend-title"
      },
      maxLength: 500,
      background: {
        lineWidth: 1,
        stroke: '#999'
      },
      backPadding: [10, 10, 10, 10]
    });
    // legend.move(15, 0);
    canvas.draw();
  });

  it('水平布局，但是总长度超出了容器宽度，自动换行，且每行列对齐', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        value: 'test ' + i,
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
      items: items,
      allowAllCanceled: true,
      itemGap: 10,
      title: {
        fill: '#f80',
        fontSize: 16,
        textAlign: 'start',
        textBaseline: 'middle',
        text: "Legend-title"
      },
      maxLength: 500,
      background: {
        lineWidth: 1,
        stroke: '#999',
        fill: 'red'
      },
      // backPadding: [10, 10, 10, 10],
      itemMarginBottom: 5,
      itemWidth: 60
    });
    // legend.move(50, 0);
    canvas.draw();
  });

  it('垂直布局图例，超出容器高度，自动生列', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        value: 'test ' + i,
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
      items: items,
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
        text: "垂直图例1"
      },
      // itemWidth: 100,
      maxLength: 200
    });

    canvas.draw();
  });

  it('垂直布局图例，设置了 itemWidth, 超出容器高度，自动生列', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        value: i + '',
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
      items: items,
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
        text: "垂直图例2"
      },
      itemWidth: 50,
      maxLength: 100
    });

    canvas.draw();
  });
});
