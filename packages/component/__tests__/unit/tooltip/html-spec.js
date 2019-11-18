import { expect } from 'chai';
import * as G from '@antv/g';
import * as Util from '@antv/util';
import HtmlTooltip from '../../../src/tooltip/html';

describe('HtmlTooltip测试', () => {
  const div = document.createElement('div');
  div.id = 'tooltip-container';
  div.style.margin = '20px';
  document.body.appendChild(div);

  const canvas = new G.Canvas({
    containerId: 'tooltip-container',
    width: 500,
    height: 500,
  });

  const title = 'a tooltip title';
  const items = [
    { color: 'red', name: '累计下载量', value: '7008.17' },
    { color: 'blue', name: '累计注册成功量', value: '7008.17' },
    { color: 'yellow', name: '累计下单成功量', value: '7008.17' },
  ];
  const panelRange = {
    tl: { x: 25, y: 50 },
    tr: { x: 425, y: 50 },
    bl: { x: 25, y: 440 },
    br: { x: 425, y: 440 },
    cc: { x: 225, y: 245 },
  };

  it('initialize,show', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.show();
    const display = tooltip.get('container').style.display;
    expect(tooltip).be.an.instanceof(HtmlTooltip);
    expect(display).to.equal('block');
    tooltip.destroy();
  });
  it('initialize,show, not show title', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: false,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.show();
    const display = tooltip.get('container').style.display;
    expect(tooltip).be.an.instanceof(HtmlTooltip);
    expect(display).to.equal('block');
    tooltip.destroy();
  });
  it('initialize,show with no items', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      // items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.show();
    const display = tooltip.get('container').style.display;
    expect(tooltip).be.an.instanceof(HtmlTooltip);
    expect(display).to.equal('block');
    tooltip.destroy();
  });

  it('hide', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      crosshairs: { type: 'cross' },
    });
    tooltip.hide();
    const display = tooltip.get('container').style.display;
    expect(display).to.equal('none');
    tooltip.destroy();
  });

  it('clear', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.clear();
    const container = tooltip.get('container');
    const titleDom = container.getElementsByClassName('g2-tooltip-title')[0];
    const listDom = container.getElementsByClassName('g2-tooltip-list')[0];
    expect(titleDom.innerHTML).to.equal('');
    expect(listDom.innerHTML).to.equal('');
    tooltip.destroy();
  });

  it('destroy', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.destroy();
    const tooltipNode = document.getElementsByClassName('g2-tooltip');
    expect(tooltipNode.length).to.equal(0);
  });

  it('set position', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(50, 10);
    tooltip.show();
    expect(tooltip.get('x')).to.equal(70); // x+gap
    expect(tooltip.get('y')).to.equal(50); // y+gap
    tooltip.destroy();
  });

  it('set position twice when enterable', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      enterable: true,
    });
    tooltip.show();
    tooltip.setPosition(50, 10);
    tooltip.setPosition(50, 10);

    expect(tooltip.get('x')).to.equal(51);
    expect(tooltip.get('y')).to.equal(-46);
    tooltip.destroy();
  });

  it('adjust boundary', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      offset: 50,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      inPanel: false,
    });
    tooltip.show();
    tooltip.setPosition(-100, 600);

    const height = tooltip.get('container').clientHeight;
    expect(tooltip.get('x')).to.equal(20); // gap
    expect(tooltip.get('y')).to.equal(600 - height - 20);
    tooltip.destroy();
  });

  it('in plot - left', () => {
    const pl = {
      tl: { x: 100, y: 50 },
      tr: { x: 100, y: 50 },
      bl: { x: 25, y: 440 },
      br: { x: 425, y: 440 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      offset: 50,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(10, 20);
    tooltip.show();
    expect(tooltip.get('x')).to.equal(pl.tl.x);
    tooltip.destroy();
  });

  it('in plot - right', () => {
    const pl = {
      tl: { x: 25, y: 50 },
      tr: { x: 300, y: 50 },
      bl: { x: 25, y: 440 },
      br: { x: 300, y: 440 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.show();
    tooltip.setPosition(300, 20);

    const width = tooltip.get('container').clientWidth;
    expect(tooltip.get('x')).to.equal(320 - width - 40);
    tooltip.destroy();
  });

  it('in plot - top', () => {
    const pl = {
      tl: { x: 25, y: 100 },
      tr: { x: 425, y: 100 },
      bl: { x: 25, y: 440 },
      br: { x: 425, y: 440 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.setPosition(10, 20);
    tooltip.show();
    expect(tooltip.get('y')).to.equal(pl.tl.y);
    tooltip.destroy();
  });

  it('in plot - bottom', () => {
    const pl = {
      tl: { x: 25, y: 100 },
      tr: { x: 425, y: 100 },
      bl: { x: 25, y: 150 },
      br: { x: 425, y: 150 },
      cc: { x: 225, y: 245 },
    };
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange: pl,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
    });
    tooltip.show();
    tooltip.setPosition(10, 300);

    const height = tooltip.get('container').clientHeight;
    expect(tooltip.get('y')).to.equal(320 - height - 40);
    tooltip.destroy();
  });

  it('enterable', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      enterable: true,
    });
    tooltip.setPosition(300, 50);
    const width = tooltip.get('container').clientWidth;
    const height = tooltip.get('container').clientHeight;
    expect(tooltip.get('y')).to.equal(50 - height / 2);
    expect(tooltip.get('x')).to.equal(300 - width - 1);
    tooltip.destroy();
  });
  it.skip('not enterable', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      enterable: false,
      position: 'top',
    });
    tooltip.setPosition(300, 50);
    expect(tooltip.get('y')).to.equal(50);
    expect(tooltip.get('x')).to.equal(202.5);
    tooltip.destroy();
  });
  it('follow true', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      follow: true,
    });
    tooltip.setPosition(50, 80);
    expect(tooltip.get('follow')).to.equal(true);
    tooltip.destroy();
  });
  it('setfollow false', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      follow: false,
    });
    tooltip.setPosition(50, 80);
    expect(tooltip.get('follow')).to.equal(false);
    tooltip.destroy();
  });

  it('crosshair type cross', () => {
    const tooltip = new HtmlTooltip({
      x: 0,
      y: 0,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      crosshairs: { type: 'cross' },
    });
    tooltip.setPosition(50, 80);
    tooltip.show();
    canvas.draw();
    tooltip.destroy();
  });

  it('html', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      htmlContent: (title, items) => {
        let list = '<ul>';
        for (let i = 0; i < items.length; i++) {
          const li = '<li>' + items[i].name + ':' + items[i].value + '</li>';
          list += li;
        }
        list += '</li>';
        return '<div style="position:absolute;">' + title + list + '</div>';
      },
    });
    tooltip.setPosition(100, 40);
    tooltip.show();
    const container = tooltip.get('container');
    const type = Util.getType(container);
    expect(type).to.equal('HTMLDivElement');
    tooltip.destroy();
  });

  it('containerTpl', () => {
    const container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    const CONTAINER_CLASS = 'g2-tooltip';
    const TITLE_CLASS = 'g2-tooltip-title';
    const LIST_CLASS = 'g2-tooltip-list';
    container.innerHTML = `<div class="${CONTAINER_CLASS}">
        <div class="${TITLE_CLASS}"></div>
        <ul class="${LIST_CLASS}"></ul>
        </div>`;
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      containerTpl: '#container',
    });
    tooltip.destroy();
  });

  it('containerTpl with wrong classname', () => {
    const CONTAINER_CLASS = 'g2-tooltip';
    const TITLE_CLASS = 'wrong-title';
    const LIST_CLASS = 'wrong-list';
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      containerTpl: `
      <div class="${CONTAINER_CLASS}">
        <div class="${TITLE_CLASS}"></div>
        <ul class="${LIST_CLASS}"></ul>
        </div>
    `,
    });
    tooltip.destroy();
  });

  it('itemTpl with wrong classname', () => {
    const MARKER_CLASS = 'wrong-marker';
    const VALUE_CLASS = 'wrong-value';
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      itemTpl: `<li data-index={index}>
        <span style="background-color:{color};" class="${MARKER_CLASS}"></span>
        {name}<span class="${VALUE_CLASS}">{value}</span></li>`,
    });
    tooltip.destroy();
  });

  it('html set htmlString content', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      htmlContent: (title, items) => {
        let list = '<ul>';
        for (let i = 0; i < items.length; i++) {
          const li = '<li class="item' + i + '">' + items[i].name + ':' + items[i].value + '</li>';
          list += li;
        }
        list += '</li>';
        return '<div style="position:absolute;">' + title + list + '</div>';
      },
    });
    tooltip.show();
    const title_new = 'new title';
    const items_new = [
      { color: 'red', name: 'change1', value: '223' },
      { color: 'blue', name: 'change2', value: '404' },
      { color: 'yellow', name: 'change3', value: '419' },
    ];
    tooltip.setContent(title_new, items_new);
    const container = tooltip.get('container');
    const firstItem = container.getElementsByClassName('item0')[0];
    expect(firstItem.innerHTML).to.equal('change1:223');
    tooltip.destroy();
  });

  it('html set htmlDom content', () => {
    const tooltip = new HtmlTooltip({
      x: 10,
      y: 10,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      htmlContent: (title, items) => {
        const tooltipContent = document.createElement('div');
        tooltipContent.className = 'g2-tooltip';

        const tooltipTitle = document.createElement('div');
        tooltipTitle.className = 'g2-tooltip-title';

        const tooltipList = document.createElement('ul');
        tooltipList.className = 'g2-tooltip-list';

        const listContent = items.map((item, i) => `<li class="item${i}">${item.name}:${item.value}</li>`).join('');

        tooltipTitle.innerText = title;
        tooltipList.innerHTML = listContent;

        tooltipContent.appendChild(tooltipTitle);
        tooltipContent.appendChild(tooltipList);

        return tooltipContent;
      },
    });
    tooltip.show();
    const title_new = 'new title';
    const items_new = [
      { color: 'red', name: 'change1', value: '223' },
      { color: 'blue', name: 'change2', value: '404' },
      { color: 'yellow', name: 'change3', value: '419' },
    ];
    tooltip.setContent(title_new, items_new);
    const container = tooltip.get('container');
    const firstItem = container.getElementsByClassName('item0')[0];
    expect(firstItem.innerHTML).to.equal('change1:223');
    tooltip.destroy();
  });

  it('markergroup', () => {
    const markerItems = [
      { color: 'blue', x: 50, y: 30 },
      { color: 'red', x: 50, y: 60 },
      { color: 'green', x: 50, y: 90 },
    ];
    const tooltip = new HtmlTooltip({
      x: 0,
      y: 0,
      panelRange,
      titleContent: title,
      showTitle: true,
      visible: true,
      items,
      canvas,
      panelGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
      frontgroundGroup: canvas.addGroup(),
      crosshair: { type: 'cross' },
    });
    tooltip.setMarkers(markerItems, { radius: 5 });
    tooltip.setPosition(50, 80);
    tooltip.show();
    const markergroup = tooltip.get('markerGroup');
    const children = markergroup.get('children');
    expect(children.length).to.equal(3);
    expect(children[0].attr('fill')).to.equal('blue');
    expect(children[0].attr('x')).to.equal(50);
    expect(children[0].attr('y')).to.equal(30);
    tooltip.hide();
    expect(markergroup.get('visible')).to.equal(false);
    tooltip.show();
    expect(markergroup.get('visible')).to.equal(true);
    tooltip.destroy();
  });
});
