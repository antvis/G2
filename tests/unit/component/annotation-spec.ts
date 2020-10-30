import 'jest-extended';
import { isElement } from '@antv/util';
import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { createDiv, removeDom } from '../../util/dom';
import { delay } from '../../util/delay';
import { IGroup } from '@antv/g-base';

const IMAGE = 'https://img.alicdn.com/tfs/TB1M.wKkND1gK0jSZFyXXciOVXa-120-120.png';

export const DATA = [
  { city: '杭州', sale: 100 },
  { city: '广州', sale: 30 },
  { city: '上海', sale: 110 },
  { city: '呼和浩特', sale: 40 },
];

describe('annotation', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 24,
    autoFit: false,
  });

  chart.data(DATA);
  chart.scale('sale', { nice: true });
  chart.animate(false);
  chart.interval().position('city*sale');
  chart.animate(false);

  it('image', () => {
    chart.annotation().image({
      start: { city: '广州', sale: 30 },
      end: { city: '广州', sale: 30 },
      src: IMAGE,
      offsetX: -12,
      style: {
        width: 24,
        height: 24,
      },
    });

    chart.render();

    const image = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;

    expect(image.get('src')).toBe(IMAGE);
    expect(image.get('offsetX')).toBe(-12);
    expect(image.get('style').width).toBe(24);
    expect(image.get('animate')).toBe(false);
  });

  it('line', () => {
    chart.animate(true);
    chart.annotation().line({
      start: { city: '上海', sale: 110 },
      end: { city: '呼和浩特', sale: 110 },
      style: {
        stroke: 'green',
        lineDash: [2, 2],
      },
      text: {
        position: 'end',
        content: '呼和浩特和上海',
        maxLength: 60,
        autoEllipsis: true,
        background: {
          padding: 5,
          style: {
            fill: '#1890ff',
            fillOpacity: 0.3,
            radius: 3,
          },
        },
        style: {
          fill: 'red',
          fontSize: 14,
        },
      },
    });

    chart.render();

    const line = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[1].component;
    // theme
    expect(line.get('style').lineDash).toEqual([2, 2]);
    // pos
    expect(line.get('start').x).toBe(494);
    expect(line.get('start').y).toBe(70);

    expect(line.get('end').x).toBe(682);
    expect(line.get('end').y).toBe(70);
    // style
    expect(line.get('style').stroke).toBe('green');

    expect(line.get('text').style.fill).toBe('red');
    expect(line.get('text').style.fontSize).toBe(14);
    // @ts-ignore
    expect(line.getElementById('-annotation-line-text').attr('text').indexOf('…')).toBeGreaterThan(-1);
    // @ts-ignore
    expect(line.getElementById('-annotation-line-text-bg')).toBeDefined();

    expect(line.get('animate')).toBe(true);
  });

  it('region', () => {
    chart.annotation().region({
      start: { city: '上海', sale: 0 },
      end: { city: '呼和浩特', sale: 120 },
      style: {
        fill: 'grey',
      },
    });

    chart.render();

    const region = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[2].component;
    expect(chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[2].layer).toBe('bg');

    // theme
    expect(region.get('style').fillOpacity).toBe(0.06);
    // pos
    expect(region.get('start').x).toBe(494);
    expect(region.get('start').y).toBe(576);

    expect(region.get('end').x).toBe(682);
    expect(region.get('end').y).toBe(24);
    expect(region.get('style').fill).toBe('grey');
  });

  it('text', () => {
    chart.annotation().text({
      position: { city: '杭州', sale: 100 },
      content: '杭州的数据' + 100,
      maxLength: 80,
      autoEllipsis: true,
      background: {
        padding: 3,
        style: {
          fill: '#ccc',
          fillOpacity: 0.5,
          radius: 3,
        },
      },
      style: {
        fill: 'red',
        textBaseline: 'bottom',
        textAlign: 'center',
      },
      rotate: Math.PI * 0.25,
    });

    chart.render();

    const text = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[3].component;
    // theme
    // @ts-ignore
    expect(text.get('style').fontFamily).toEqual(chart.getTheme().fontFamily);
    // pos
    expect(text.get('x')).toBe(118);
    expect(text.get('y')).toBe(116);
    // style
    expect(text.get('style').fill).toBe('red');
    expect(text.get('rotate')).toBeCloseTo(Math.PI * 0.25);
    expect(text.get('group').getFirst().attr('matrix')).not.toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    // @ts-ignore
    expect(text.getElementById('-annotation-text').attr('text').indexOf('…')).toBeGreaterThan(-1);
    // @ts-ignore
    expect(text.getElementById('-annotation-text-bg')).toBeDefined();
  });

  it('use percentage position', () => {
    chart.annotation().text({
      position: ['50%', '50%'],
      content: '坐标系中心点',
      style: {
        fill: 'red',
        textBaseline: 'bottom',
        textAlign: 'center',
      },
    });

    chart.render();

    const text = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[4].component;
    const coordinateCenter = chart.getCoordinate().getCenter();
    // pos
    expect(text.get('x')).toBe(coordinateCenter.x);
    expect(text.get('y')).toBe(coordinateCenter.y);
  });

  it('use array', () => {
    chart.annotation().text({
      position: ['杭州', 100],
      content: '杭州杭州',
      style: {
        fill: 'red',
        textBaseline: 'bottom',
        textAlign: 'center',
      },
    });

    chart.render();

    const text = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[5].component;
    // // pos
    expect(text.get('x')).toBe(118);
    expect(text.get('y')).toBe(116);
  });

  it('arc', () => {
    chart.coordinate('polar');
    chart.annotation().arc({
      start: { city: '杭州', sale: 100 },
      end: { city: '上海', sale: 100 },
      style: {
        stroke: '#289990',
        lineWidth: 4,
      },
    });
    chart.render();

    const arc = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[6].component;
    expect(arc.get('startAngle')).toBe(-Math.PI / 2);
    expect(arc.get('endAngle')).toBe(Math.PI / 2);
    // @ts-ignore
    expect(arc.get('radius')).toBe(230);
  });

  it('dataMarker', () => {
    chart.coordinate('rect');
    chart.annotation().dataMarker({
      position: { city: '上海', sale: 110 },
      text: {
        content: 'data marker test',
        maxLength: 80,
        autoEllipsis: true,
        background: {
          padding: 5,
          style: {
            fill: '#289990',
            fillOpacity: 0.3,
            stroke: '#289990',
            lineWidth: 1,
          },
        },
      },
    });
    chart.render();

    const dataMarker = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[7].component;

    expect(dataMarker.get('type')).toEqual('dataMarker');
    expect(dataMarker.get('x')).toEqual(494);
    expect(dataMarker.get('y')).toEqual(70);
    // @ts-ignore
    expect(dataMarker.getElementById('-annotation-text').attr('text').indexOf('…')).toBeGreaterThan(-1);
    // @ts-ignore
    expect(dataMarker.getElementById('-annotation-text-bg')).toBeDefined();
  });

  it('dataRegion', () => {
    chart.annotation().dataRegion({
      start: { city: '杭州', sale: 100 },
      end: { city: '上海', sale: 110 },
      text: {
        content: 'data region test',
        maxLength: 80,
        autoEllipsis: true,
        background: {
          padding: 5,
          style: {
            fill: '#289990',
            fillOpacity: 0.3,
            stroke: '#289990',
            lineWidth: 1,
            radius: 4,
          },
        },
      },
    });
    chart.render();

    const dataRegion = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[8].component;
    expect(dataRegion.get('type')).toEqual('dataRegion');
    expect(dataRegion.get('points')).toEqual([
      { x: 118, y: 116 },
      { x: 306, y: 438 },
      { x: 494, y: 70 },
    ]);

    // @ts-ignore
    expect(dataRegion.getElementById('-annotation-text').attr('text').indexOf('…')).toBeGreaterThan(-1);
    // @ts-ignore
    expect(dataRegion.getElementById('-annotation-text-bg')).toBeDefined();
  });

  it('regionFilter', async () => {
    chart.line().position('city*sale');
    chart.annotation().regionFilter({
      start: { city: '广州', sale: 30 },
      end: { city: '上海', sale: 110 },
      color: '#ff0000',
      apply: ['line'],
    });
    chart.render();

    await delay(700);

    const regionFilter = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[9].component;
    expect(regionFilter.get('type')).toEqual('regionFilter');
    expect(regionFilter.get('shapes')).toHaveLength(1);
  });

  it('text with callback', () => {
    // @ts-ignore
    chart.getController('annotation').clear(true);
    chart.annotation().text({
      position: ['50%', '50%'],
      content: (filteredData) => `${filteredData.reduce((a, b: any) => a + b.sale, 0)}`,
    });

    chart.render();

    const text = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(text).toBeDefined();
    // @ts-ignore
    expect(text.get('content')).toBe(`${DATA.reduce((a, b) => a + b.sale, 0)}`);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});

describe('shape annotation', () => {
  const containerDiv = createDiv();

  it('/w single shape', () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    chart.annotation().shape({
      render: (group, view) => {
        const bbox = view.viewBBox;
        group.addShape('text', {
          attrs: {
            text: 'Hello World!',
            fill: 'red',
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2,
          },
        });
      },
    });

    chart.render();

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.get('group') as IGroup;
    expect(container.getChildren()).toHaveLength(1);
    expect(container.getChildren()[0].get('type')).toBe('text');
    expect(container.getChildren()[0].attr('x')).toBe(400);
    expect(container.getChildren()[0].attr('y')).toBe(300);
  });

  it('/w group', () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    chart.annotation().shape({
      render: (group, view) => {
        const bbox = view.viewBBox;
        const parent = group.addGroup({
          id: 'my-group',
        });

        parent.addShape('line', {
          id: 'my-line1',
          attrs: {
            x1: bbox.x,
            y1: bbox.y + bbox.height / 2,
            x2: bbox.maxX,
            y2: bbox.y + bbox.height / 2,
            stroke: 'blue',
          },
        });
        parent.addShape('line', {
          id: 'my-line2',
          attrs: {
            x1: bbox.x + bbox.width / 2,
            y1: bbox.y,
            x2: bbox.x + bbox.width / 2,
            y2: bbox.maxY,
            stroke: 'blue',
          },
        });
        parent.addShape('text', {
          id: 'my-text',
          attrs: {
            text: 'center',
            fill: 'red',
            textAlign: 'center',
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2,
          },
        });
      },
    });

    chart.render();

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.get('group') as IGroup;
    expect(container.getChildren()).toHaveLength(1);
    expect(container.getChildren()[0].isGroup()).toBeTrue();
    const parent = container.getChildren()[0] as IGroup;
    expect(parent.getChildren()).toHaveLength(3);
    expect(parent.getChildByIndex(0).get('type')).toBe('line');
    expect(parent.getChildByIndex(1).get('type')).toBe('line');
    expect(parent.getChildByIndex(2).get('type')).toBe('text');
    expect(parent.getChildByIndex(2).attr('text')).toBe('center');
  });

  it('update', async () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    chart.annotation().shape({
      render: (group, view) => {
        const bbox = view.viewBBox;
        group.addShape('text', {
          id: 'my-test',
          attrs: {
            text: 'Hello World!',
            fill: 'red',
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2,
          },
        });
      },
    });

    chart.render();

    await delay(500);

    chart.changeSize(600, 400);

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.get('group') as IGroup;
    expect(container.getChildren()).toHaveLength(1);
    expect(container.getChildren()[0].get('type')).toBe('text');
    expect(container.getChildren()[0].attr('x')).toBe(300);
    expect(container.getChildren()[0].attr('y')).toBe(200);
  });

  it('helpers', () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    chart.annotation().shape({
      render: (group, view, helpers) => {
        const parent = group.addGroup();
        const points = DATA.map((datum) => helpers.parsePosition(datum));
        points.forEach((point, idx) => {
          if (idx < points.length - 1) {
            parent.addShape('line', {
              id: `my-line${idx}`,
              attrs: {
                x1: point.x,
                y1: point.y,
                x2: points[idx + 1].x,
                y2: points[idx + 1].y,
                stroke: point.y < points[idx + 1].y ? 'red' : 'green',
              },
            });
          }
        });
      },
    });

    chart.render();

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.get('group') as IGroup;
    expect(container.getChildren()).toHaveLength(1);
    const parent = container.getChildren()[0] as IGroup;
    expect(parent.getChildren()).toHaveLength(DATA.length - 1);
  });

  afterAll(() => {
    removeDom(containerDiv);
  });
});

describe('html annotation', () => {
  const containerDiv = createDiv();

  it('html string', () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    const htmlStr = '<span style="color:red">html string</span>';
    chart.annotation().html({
      html: htmlStr,
      position: ['50%', '50%'],
    });

    chart.render();

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.getContainer() as HTMLElement;
    expect(isElement(container)).toBeTrue();
    expect(container.innerHTML).toEqual(htmlStr);
    expect(container.style.position).toBe('absolute');
    expect(container.style.left).toBe('400px');
    expect(container.style.top).toEqual('300px');
  });

  it('html element', () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    const htmlElem = document.createElement('SPAN');
    htmlElem.appendChild(document.createTextNode('html string'));
    chart.annotation().html({
      html: htmlElem,
      position: ['50%', '50%'],
    });

    chart.render();

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.getContainer() as HTMLElement;
    expect(isElement(container)).toBeTrue();
    expect(container.innerHTML).toEqual(`<span>html string</span>`);
  });

  it('html callback', () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    chart.annotation().html({
      html: (container) => {
        const span = document.createElement('SPAN');
        span.appendChild(document.createTextNode('html string'));
        container.appendChild(span);
      },
      position: ['50%', '50%'],
    });

    chart.render();

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.getContainer() as HTMLElement;
    expect(isElement(container)).toBeTrue();
    expect(container.innerHTML).toEqual(`<span>html string</span>`);
  });

  it('update', async () => {
    const chart = new Chart({
      container: containerDiv,
      width: 800,
      height: 600,
      padding: 24,
      autoFit: false,
    });

    chart.data(DATA);
    chart.scale('sale', { nice: true });
    chart.animate(false);
    chart.interval().position('city*sale');
    chart.animate(false);

    const htmlStr = '<span style="color:red">html string</span>';
    chart.annotation().html({
      html: htmlStr,
      position: ['50%', '50%'],
    });

    chart.render();

    await delay(500);

    chart.changeSize(600, 400);

    const component = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(component).toBeDefined();
    const container = component.getContainer() as HTMLElement;
    expect(isElement(container)).toBeTrue();
    expect(container.innerHTML).toEqual(htmlStr);
    expect(container.style.position).toBe('absolute');
    expect(container.style.left).toBe('300px');
    expect(container.style.top).toEqual('200px');
  });

  afterAll(() => {
    removeDom(containerDiv);
  });
});
