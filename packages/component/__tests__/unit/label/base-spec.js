import * as G from '@antv/g';
import { expect } from 'chai';
import Label from '../../../src/label';

describe('new default label', () => {
  const div = document.createElement('div');
  div.id = 'default-label';
  document.body.appendChild(div);

  const canvas = new G.Canvas({
    containerDOM: div,
    width: 990,
    height: 366,
  });

  const coord = {
    center: { x: 525, y: 145.5 },
    end: { x: 970, y: 20 },
    height: 251,
    isRect: true,
    isTransposed: false,
    matrix: [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    start: { x: 80, y: 271 },
    type: 'cartesian',
    width: 898,
    x: { start: 80, end: 970 },
    y: { start: 271, end: 20 },
  };
  let items;

  beforeEach(() => {
    items = [
      { year: '1991', value: 15468, x: 80, y: 196.10128, text: '15468', start: { x: 80, y: 216.10128 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-15468' },
      { year: '1992', value: 16100, x: 191.25, y: 189.756, text: '16100', start: { x: 191.25, y: 209.756 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-16100' },
      { year: '1993', value: 15900, x: 302.5, y: 191.764, text: '15900', start: { x: 302.5, y: 221.764 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-15900' },
      { year: '1994', value: 17409, x: 413.75, y: 176.61364, text: '17409', start: { x: 413.75, y: 196.61364 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-17409' },
      { year: '1995', value: 17000, x: 525, y: 180.72, text: '17000', start: { x: 525, y: 200.72 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-17000' },
      { year: '1996', value: 31056, x: 636.25, y: 39.597759999999994, text: '31056', start: { x: 636.25, y: 59.597759999999994 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-31056' },
      { year: '1997', value: 31982, x: 747.5, y: 30.300720000000013, text: '31982', start: { x: 747.5, y: 50.300720000000013 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-31982' },
      { year: '1998', value: 32040, x: 858.75, y: 29.718399999999974, text: '32040', start: { x: 858.75, y: 49.718399999999974 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-32040' },
      { year: '1999', value: 33233, x: 970, y: 17.740679999999998, text: '33233', start: { x: 970, y: 37.740679999999998 }, textAlign: 'center', id: 'chart-geom1-line-glabel-0-33233' },
    ];


  });

  it('new default labels', () => {
    const label = new Label({
      canvas,
      items,
      coord,
    });
    label.render();
    expect(label.get('group').get('children').length === 9);
    expect(label.get('group').get('children')[0].attr('fill') === '#000');
    label.clear();
    expect(label.get('group').get('children').length === 0);
    label.destroy();
    expect(label.get('group').destroyed);
  });

  it('update labels', () => {
    const label = new Label({
      canvas,
      items,
      coord,
    });
    label.render();
    const item = items.splice(items.length - 1, 1);
    label.set('items', items);
    expect(label.get('group').get('children').length === 8);
    items.push(item[0]);
    label.set('items', items);
    label.draw();
    expect(label.get('group').get('children').length === 9);
  });

  it('add labelLine', () => {
    const label = new Label({
      canvas,
      items: items.map((item) => {
        item.labelLine = true;
        return item;
      }),
      coord,
    });
    label.render();
    let lineGroup = label.get('lineGroup');
    expect(lineGroup).not.to.be.undefined;
    expect(lineGroup.get('children').length === 9);

    label.set('items', items.map((item) => {
      item.labelLine = {
        strokeStyle: '#999',
        lineDash: [ 5 ],
      };
      return item;
    }));

    label.draw();
    lineGroup = label.get('lineGroup');
    expect(lineGroup.get('children')[0].attr('strokeStyle') === '#999');
    expect(lineGroup.get('children')[0].attr('lineDash') === [ 5 ]);
  });

  it('label name', () => {
    const label = new Label({
      canvas,
      items,
      coord,
      name: 'labelTest',
    });
    label.render();

    let labels = label.getLabels();
    expect(labels[0].name).to.equal('labelTest');
    label.set('name', 'labelTest2');
    label.render();
    labels = label.getLabels();
    expect(labels[0].name).to.equal('labelTest2');
  });

  it('htmlTemplate', () => {
    const label1 = new Label({
      canvas,
      items,
      coord,
    });
    label1.render();
    const label2 = new Label({
      canvas,
      items: items.map((item) => {
        item.htmlTemplate = '<div class="g-label" style="position:absolute;">{text}</div>';
        return item;
      }),
      coord,
    });
    label2.render();
    expect(label2.get('container')).not.to.be.undefined;
    expect(label2.get('container').childNodes.length).to.equal(9);
  });

  it('htmlTemplate only', () => {
    const items1 = [
      { year: '1991',
        value: 15468,
        x: 80,
        y: 196.10128,
        text: '15468',
        start: { x: 80, y: 216.10128 },
        textAlign: 'center',
        id: 'chart-geom1-line-glabel-0-15468',
        htmlTemplate: '<div class="g-label" style="position:absolute;">{text}</div>',
      },
      {
        year: '1992',
        value: 16100,
        x: 191.25,
        y: 189.756,
        text: '16100',
        start: { x: 191.25, y: 209.756 },
        textAlign: 'center',
        id: 'chart-geom1-line-glabel-0-16100',
      },
    ];
    const label = new Label({
      canvas,
      items: items1,
      coord,
    });
    label.render();
    expect(label.get('container')).not.to.be.undefined;
    expect(label.get('container').childNodes.length).to.equal(1);
    expect(label.get('group')).not.to.be.undefined;
    expect(label.getLabels().length).to.equal(1);
  });

  it('labelLine render', () => {
    const items = [
      { year: '1991',
        value: 15468,
        x: 80,
        y: 196.10128,
        text: '15468',
        start: { x: 80, y: 216.10128 },
        textAlign: 'center',
        id: 'chart-geom1-line-glabel-0-15468',
        labelLine: false,
        htmlTemplate: '<div class="g-label" style="position:absolute;">{text}</div>',
      },
      {
        year: '1992',
        value: 16100,
        x: 191.25,
        y: 189.756,
        text: '16100',
        start: { x: 191.25, y: 209.756 },
        textAlign: 'center',
        labelLine: true,
        id: 'chart-geom1-line-glabel-0-16100',
      },
    ];
    const label = new Label({
      canvas,
      items,
      coord,
    });
    label.render();
    expect(label.get('lineGroup')).not.to.be.undefined;
    expect(label.get('lineGroup').cfg.children.length).to.equal(1);
  });

  it('clear & destroy', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = 'test';

    const label = new Label({
      canvas,
      coord,
      container: div,
    });

    label.clear();
    expect(div.innerHTML).to.equal('');

    div.innerHTML = 'test';
    label.destroy();
    expect(div.innerHTML).to.equal('');
  });

  it('html: changeLabel, show and hide', () => {
    const label = new Label({
      canvas,
      items: items.map((item) => {
        item.htmlTemplate = '<div class="g-label" style="position:absolute;">{text}</div>';
        return item;
      }),
      coord,
    });
    label.render();
    const labels = label.getLabels();
    label.changeLabel(labels[0], {
      year: '1991', value: 15468, x: 80, y: 196.10128, text: 'test', start: { x: 80, y: 216.10128 }, textAlign: 'center',
    });
    expect(labels[0].innerHTML).to.equal('test');

    label.changeLabel(labels[0], {
      year: '1991', value: 15468, x: 80, y: 196.10128, start: { x: 80, y: 216.10128 }, textAlign: 'right',
    });

    label.show();
    expect(label.get('container').style.opacity).to.equal('1');
    label.hide();
    expect(label.get('container').style.opacity).to.equal('0');
  });

  it('G.Group: changeLabel, show and hide', () => {
    items[1].rotate = 180;
    items[1].textStyle = {
      rotate: 180,
    };
    items[1].text = null;
    const label2 = new Label({
      canvas,
      coord,
      items: [],
    });
    label2.render();
    label2.set('items', items);
    label2.render();
    const labels2 = label2.getLabels();
    label2.changeLabel(labels2[0], {
      year: '1991', value: 15468, x: 180, y: 196, text: 'test', start: { x: 180, y: 216 }, textAlign: 'center', rotate: 180, textStyle: { rotate: 180 },
    });

    label2.show();
    expect(label2.get('group').get('visible')).to.be.true;
    label2.hide();
    expect(label2.get('group').get('visible')).to.be.false;
  });
});
