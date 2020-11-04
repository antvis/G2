import { IGroup } from '@antv/g-base';
import { Chart } from '../../../../src/index';
import Link from '../../../../src/interaction/action/element/link-by-color';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

import 'jest-extended';

describe('list highlight test', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  chart.data([
    { year: '1991', value: 13, type: '1' },
    { year: '1992', value: 34, type: '1' },
    { year: '1993', value: 5, type: '1' },
    { year: '1994', value: 34, type: '1' },

    { year: '1991', value: 13, type: '2' },
    { year: '1992', value: 34, type: '2' },
    { year: '1993', value: 5, type: '2' },
    { year: '1994', value: 34, type: '2' },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  const interval = chart.interval().position('year*value').color('type').adjust('stack');
  chart.render();
  const context = new Context(chart);
  const link = new Link(context);
  const elements = interval.elements;
  let linkGroup: IGroup;
  it('link', () => {
    context.event = {};
    link.unlink();
    link.clear(); // 事先调用，保证不出错
    context.event = {
      target: elements[0].shape,
    };
    link.link();
    //@ts-ignore
    linkGroup = link.linkGroup;
    expect(linkGroup.getCount()).toBe(1);
  });

  it('unlink', () => {
    context.event = {
      target: null,
    };
    link.unlink();
    expect(linkGroup.getCount()).toBe(1);
    context.event = {
      target: elements[0].shape,
    };
    link.unlink();
    expect(linkGroup.getCount()).toBe(0);
  });

  it('multiple link', () => {
    context.event = {
      target: elements[0].shape,
    };
    link.link();

    context.event = {
      target: elements[4].shape,
    };
    link.link();
    expect(linkGroup.getCount()).toBe(2);
  });

  it('clear', () => {
    link.clear();
    expect(linkGroup.getCount()).toBe(0);
    // @ts-ignore
    expect(link.cache).toBeEmpty();
  });
  it('link null', () => {
    context.event = {
      target: null,
    };
    expect(linkGroup.getCount()).toBe(0);
  });
  it('no color', () => {
    chart.clear();
    const interval1 = chart.interval().position('year*value');

    chart.render();
    context.event = {
      target: interval1.elements[0].shape,
    };
    link.link();
    expect(linkGroup.getCount()).toBe(0);
    link.unlink();
  });

  it('transposed coord', () => {
    chart.clear();
    chart.coordinate().transpose();
    const interval2 = chart.interval().position('year*value').color('type').adjust('stack');
    chart.render();
    const firstBBox = interval2.elements[0].shape.getCanvasBBox();
    const secondBBox = interval2.elements[1].shape.getCanvasBBox();
    context.event = {};
    link.clear();
    context.event = {
      target: interval2.elements[0].shape,
    };
    link.link();
    expect(linkGroup.getCount()).toBe(1);
    const group = linkGroup.getFirst() as IGroup;
    expect(group.getCount()).toBe(3);
    const path = group.getFirst();
    expect(path.attr('path')).toEqual([
      ['M', firstBBox.minX, firstBBox.minY],
      ['L', secondBBox.minX, secondBBox.maxY],
      ['L', secondBBox.maxX, secondBBox.maxY],
      ['L', firstBBox.maxX, firstBBox.minY],
      ['Z'],
    ]);
  });
});
