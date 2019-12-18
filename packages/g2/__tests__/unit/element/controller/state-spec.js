import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import View from '../../../utils/view';
import Interval from '../../../../src/element/interval';
import StateController from '../../../../src/element/controller/state';

const Rect = getCoordinate('rect');
const CatScale = getScale('cat');
const LinearScale = getScale('linear');

describe('StateController', () => {
  let div;
  let interval;
  let canvas;
  const view = new View();
  let stateController;

  before(() => {
    div = document.createElement('div');
    div.id = 'elementState';
    document.body.appendChild(div);

    canvas = new Canvas({
      containerId: 'elementState',
      renderer: 'canvas',
      width: 400,
      height: 400,
      pixelRatio: 2,
    });
    const container = canvas.addGroup();
    const rectCoord = new Rect({
      start: {
        x: 0,
        y: 400,
      },
      end: {
        x: 400,
        y: 0,
      },
    });

    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];

    const salesScale = new LinearScale({
      field: 'sales',
      values: [38, 52, 61, 145, 48],
      nice: true,
      min: 0,
      max: 160,
    });
    const yearScale = new CatScale({
      field: 'year',
      values: ['1951 年', '1952 年', '1956 年', '1957 年', '1958 年', '1959 年', '1960 年', '1962 年'],
      range: [0.0625, 0.9375],
    });

    interval = new Interval({
      data,
      scales: {
        year: yearScale,
        sales: salesScale,
      },
      coord: rectCoord,
      container,
      canvas,
      view,
      theme: {
        shape: {
          interval: {
            rect: {
              default: {
                fill: '#1890ff',
              },
              active: {
                stroke: '#000',
                lineWidth: 2,
              },
              selected: {
                fill: 'red',
              },
              // inactive: {
              //   fill: '#999',
              //   fillOpacity: 0.3,
              // }
            },
          },
        },
      },
      id: 'view-interval',
    });
    interval
      .position({
        fields: ['year', 'sales'],
      })
      .label({
        fields: ['sales'],
      });
    interval.init();
    interval.paint();
    canvas.draw();
  });

  it('init', () => {
    stateController = new StateController(interval);

    expect(stateController.element).to.eql(interval);
  });

  it('bind', () => {
    stateController.bind();
    view.emit('active:change', {
      exp: (obj) => {
        return obj.year === '1958 年';
      },
      draw: true,
    });

    const activeShapes = stateController._activeShapes;
    expect(activeShapes).not.to.be.null;
    expect(activeShapes.length).to.equal(1);

    const activeShape = activeShapes[0];
    expect(activeShape.attr('stroke')).to.equal('#000');
    expect(activeShape.attr('lineWidth')).to.equal(2);
  });

  it('active:change', () => {
    view.emit('active:change', {
      exp: (obj) => {
        return obj.year !== '1958 年';
      },
      draw: true,
    });

    const activeShapes = stateController._activeShapes;
    expect(activeShapes.length).to.equal(7);

    activeShapes.forEach((shape) => {
      expect(shape.get('origin')._origin.year).not.to.equal('1958 年');
    });
  });

  it('active:change, interval.active(false)', () => {
    interval.active(false); // 不允许 active
    stateController._clearActiveShapes();
    expect(stateController._activeShapes).to.be.null;

    view.emit('active:change', {
      exp: (obj) => {
        return obj.year !== '1958 年';
      },
      draw: true,
    });

    expect(stateController._activeShapes).to.be.null;
  });

  it('active:change, interval.active(style)', () => {
    interval.active({
      stroke: 'red',
      lineWidth: 1,
    });
    stateController._clearActiveShapes();
    expect(stateController._activeShapes).to.be.null;

    view.emit('active:change', {
      exp: (obj) => {
        return obj.year === '1951 年';
      },
      draw: true,
    });

    const activeShapes = stateController._activeShapes;
    expect(activeShapes.length).to.equal(1);
    expect(activeShapes[0].attr('stroke')).to.equal('red');
    expect(activeShapes[0].attr('lineWidth')).to.equal(1);
  });

  it('selected:change', () => {
    stateController._clearActiveShapes();
    view.emit('selected:change', {
      exp: (obj) => {
        return obj.year === '1952 年';
      },
      draw: false,
    });

    const selectedShapes = stateController._selectedShapes;
    expect(selectedShapes.length).to.equal(1);
    expect(selectedShapes[0].get('origin')._origin.year).to.equal('1952 年');

    canvas.draw();
  });

  it('selected:change, interval.selected(false)', () => {
    interval.selected(false); // 不允许 selected
    stateController._clearSelectedShapes();
    expect(stateController._selectedShapes).to.be.null;

    view.emit('selected:change', {
      exp: (obj) => {
        return obj.year === '1960 年';
      },
      draw: true,
    });

    expect(stateController._activeShapes).to.be.null;
  });

  it('selected:change, interval.selected(style)', () => {
    interval.selected({
      fill: '#000',
    });
    stateController._clearSelectedShapes();
    expect(stateController._selectedShapes).to.be.null;

    view.emit('selected:change', {
      exp: (obj) => {
        return obj.year === '1960 年';
      },
      draw: true,
    });

    const selectedShapes = stateController._selectedShapes;
    expect(selectedShapes.length).to.equal(1);
    expect(selectedShapes[0].attr('fill')).to.equal('#000');
  });

  it('inactive:change', () => {
    // 未在主题中定义 inactive 对应的样式
    stateController._clearSelectedShapes();
    view.emit('inactive:change', {
      exp: (obj) => {
        return obj.year !== '1952 年';
      },
      draw: true,
    });

    const inactiveShapes = stateController._inactiveShapes;
    expect(inactiveShapes.length).to.equal(7);

    inactiveShapes.forEach((shape) => {
      expect(shape.get('origin')._origin.year).not.to.equal('1952 年');
      // expect(shape.attr('fill')).to.equal('#999');
      // expect(shape.attr('fillOpacity')).to.equal(0.3);
    });
  });

  it('inactive:change, interval.inactive(false)', () => {
    interval.inactive(false); // 不允许 inactive
    stateController._clearInactiveShapes();
    expect(stateController._inactiveShapes).to.be.null;

    view.emit('inactive:change', {
      exp: (obj) => {
        return obj.year !== '1960 年';
      },
      draw: true,
    });

    expect(stateController._inactiveShapes).to.be.null;
  });

  it('inactive:change, interval.inactive(style)', () => {
    interval.inactive({
      fillOpacity: 0.1,
    });

    stateController._clearInactiveShapes();
    expect(stateController._inactiveShapes).to.be.null;

    view.emit('inactive:change', {
      exp: (obj) => {
        return obj.year !== '1960 年';
      },
      draw: true,
    });

    const inactiveShapes = stateController._inactiveShapes;
    expect(inactiveShapes.length).to.equal(7);
    inactiveShapes.forEach((shape) => {
      expect(shape.attr('fillOpacity')).to.equal(0.1);
    });
  });

  it('unbind', () => {
    stateController._clearActiveShapes();
    stateController._clearSelectedShapes();
    stateController._clearInactiveShapes();
    canvas && canvas.draw();

    stateController.unbind();

    view.emit('active:change', {
      exp: (obj) => {
        return obj.year === '1958 年';
      },
      draw: true,
    });
    view.emit('selected:change', {
      exp: (obj) => {
        return obj.year === '1958 年';
      },
      draw: true,
    });
    view.emit('inactive:change', {
      exp: (obj) => {
        return obj.year === '1958 年';
      },
      draw: true,
    });
    expect(stateController._activeShapes).to.be.null;
    expect(stateController._selectedShapes).to.be.null;
    expect(stateController._inactiveShapes).to.be.null;
  });

  after(() => {
    // canvas.destroy();
    // document.body.removeChild(div);
  });
});
