import * as G from '@antv/g';
const expect = require('chai').expect;
import { defaultPosition, constraintPositionInBoundary, constraintPositionInPanel } from '../../../src/tooltip/util/position';

describe('position util test', () => {
  it('defaultPosition with position inside with target', () => {
    const div = document.createElement('div');
    const canvas = new G.Canvas({
      containerDOM: div,
      width: 990,
      height: 366,
    });
    const position = defaultPosition(100, 50, 'inside', 1000, 500, canvas);
    expect(position).to.deep.equal([ -500, -250 ]);
  });
  it('defaultPosition: with position inside without target', () => {
    const position = defaultPosition(100, 50, 'inside', 1000, 500);
    expect(position).to.deep.equal([ -400, -200 ]);
  });
  it('defaultPosition: with position top without target', () => {
    const position = defaultPosition(100, 50, 'top', 1000, 500);
    expect(position).to.deep.equal([ -400, -470 ]);
  });
  it('defaultPosition: with position left without target', () => {
    const position = defaultPosition(100, 50, 'left', 1000, 500);
    expect(position).to.deep.equal([ -920, -200 ]);
  });

  it('defaultPosition: with position right without target', () => {
    const position = defaultPosition(100, 50, 'right', 1000, 500);
    expect(position).to.deep.equal([ 120, -200 ]);
  });

  it('defaultPosition: with position bottom without target', () => {
    const position = defaultPosition(100, 50, 'bottom', 1000, 500);
    expect(position).to.deep.equal([ -400, 70 ]);
  });

  it('constraintPositionInBoundary: x is large ', () => {
    const position = constraintPositionInBoundary(1000, 50, 100, 50, 1000, 500);
    expect(position).to.deep.equal([ 880, 70 ]);
  });

  it('constraintPositionInBoundary: x is small ', () => {
    const position = constraintPositionInBoundary(100, 50, 100, 50, 1000, 500);
    expect(position).to.deep.equal([ 120, 70 ]);
  });

  it('constraintPositionInBoundary: y is large ', () => {
    const position = constraintPositionInBoundary(100, 500, 100, 50, 1000, 500);
    expect(position).to.deep.equal([ 120, 430 ]);
  });

  it('constraintPositionInBoundary: y is small ', () => {
    const position = constraintPositionInBoundary(100, 50, 100, 50, 1000, 500);
    expect(position).to.deep.equal([ 120, 70 ]);
  });

  it('constraintPositionInPanel: inside plot, only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(100, 50, 10, 10, panelRange, true);
    expect(position).to.deep.equal([ 100, 50 ]);
  });
  it('constraintPositionInPanel: outside top left, only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(90, 40, 50, 50, panelRange, true);
    expect(position).to.deep.equal([ 100, 40 ]);
  });
  it('constraintPositionInPanel: outside top right, only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(210, 40, 50, 50, panelRange, true);
    expect(position).to.deep.equal([ 120, 40 ]);
  });
  it('constraintPositionInPanel: outside bottom right, only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(220, 110, 50, 50, panelRange, true);
    expect(position).to.deep.equal([ 130, 110 ]);
  });
  it('constraintPositionInPanel: outside bottom left, only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(90, 110, 50, 50, panelRange, true);
    expect(position).to.deep.equal([ 100, 110 ]);
  });

  it('constraintPositionInPanel: outside top left, not only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(90, 40, 50, 50, panelRange, false);
    expect(position).to.deep.equal([ 100, 50 ]);
  });
  it('constraintPositionInPanel: outside top right, not only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(210, 40, 50, 50, panelRange, false);
    expect(position).to.deep.equal([ 120, 50 ]);
  });
  it('constraintPositionInPanel: outside bottom right, not only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(220, 110, 50, 50, panelRange, false);
    expect(position).to.deep.equal([ 130, 50 ]);
  });
  it('constraintPositionInPanel: outside bottom left, not only horizontal', () => {
    const panelRange = {
      tl: { x: 100, y: 50 },
      tr: { x: 200, y: 50 },
      bl: { x: 100, y: 100 },
      br: { x: 200, y: 100 },
    };
    const position = constraintPositionInPanel(90, 110, 50, 50, panelRange, false);
    expect(position).to.deep.equal([ 100, 50 ]);
  });
});

