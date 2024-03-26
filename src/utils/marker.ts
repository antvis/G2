import { Path } from '@antv/g';
import type { PathArray } from '@antv/util';

export interface SymbolFactor {
  (x: number, y: number, r: number): PathArray;
  style?: string[];
}

const point: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['A', r, r, 0, 1, 0, x + r, y],
    ['A', r, r, 0, 1, 0, x - r, y],
    ['Z'],
  ];
};
point.style = ['fill'];

const hollowPoint = point.bind(undefined);
hollowPoint.style = ['stroke', 'lineWidth'];

const square: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y - r],
    ['L', x + r, y - r],
    ['L', x + r, y + r],
    ['L', x - r, y + r],
    ['Z'],
  ];
};
square.style = ['fill'];

const rect = square.bind(undefined);
rect.style = ['fill'];

const hollowSquare = square.bind(undefined);
hollowSquare.style = ['stroke', 'lineWidth'];

const diamond: SymbolFactor = (x, y, r) => {
  const hr = r * 0.618;
  return [
    ['M', x - hr, y],
    ['L', x, y - r],
    ['L', x + hr, y],
    ['L', x, y + r],
    ['Z'],
  ];
};
diamond.style = ['fill'];

const hollowDiamond = diamond.bind(undefined);
hollowDiamond.style = ['stroke', 'lineWidth'];

const triangle: SymbolFactor = (x, y, r) => {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y + diffY],
    ['L', x, y - diffY],
    ['L', x + r, y + diffY],
    ['Z'],
  ];
};
triangle.style = ['fill'];

const hollowTriangle = triangle.bind(undefined);
hollowTriangle.style = ['stroke', 'lineWidth'];

const triangleDown: SymbolFactor = (x, y, r) => {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y - diffY],
    ['L', x + r, y - diffY],
    ['L', x, y + diffY],
    ['Z'],
  ];
};
triangleDown.style = ['fill'];

const hollowTriangleDown = triangleDown.bind(undefined);
hollowTriangleDown.style = ['stroke', 'lineWidth'];

const hexagon: SymbolFactor = (x, y, r) => {
  const diffX = (r / 2) * Math.sqrt(3);
  return [
    ['M', x, y - r],
    ['L', x + diffX, y - r / 2],
    ['L', x + diffX, y + r / 2],
    ['L', x, y + r],
    ['L', x - diffX, y + r / 2],
    ['L', x - diffX, y - r / 2],
    ['Z'],
  ];
};
hexagon.style = ['fill'];

const hollowHexagon = hexagon.bind(undefined);
hollowHexagon.style = ['stroke', 'lineWidth'];

const bowtie: SymbolFactor = (x, y, r) => {
  const diffY = r - 1.5;
  return [
    ['M', x - r, y - diffY],
    ['L', x + r, y + diffY],
    ['L', x + r, y - diffY],
    ['L', x - r, y + diffY],
    ['Z'],
  ];
};
bowtie.style = ['fill'];

const hollowBowtie = bowtie.bind(undefined);
hollowBowtie.style = ['stroke', 'lineWidth'];

const line: SymbolFactor = (x, y, r) => {
  return [
    ['M', x, y + r],
    ['L', x, y - r],
  ];
};
line.style = ['stroke', 'lineWidth'];

const cross: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y - r],
    ['L', x + r, y + r],
    ['M', x + r, y - r],
    ['L', x - r, y + r],
  ];
};
cross.style = ['stroke', 'lineWidth'];

const tick: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r / 2, y - r],
    ['L', x + r / 2, y - r],
    ['M', x, y - r],
    ['L', x, y + r],
    ['M', x - r / 2, y + r],
    ['L', x + r / 2, y + r],
  ];
};
tick.style = ['stroke', 'lineWidth'];

const plus: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
    ['M', x, y - r],
    ['L', x, y + r],
  ];
};
plus.style = ['stroke', 'lineWidth'];

const hyphen: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
  ];
};
hyphen.style = ['stroke', 'lineWidth'];

const dot: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
  ];
};
dot.style = ['stroke', 'lineWidth'];

const dash = dot.bind(undefined);
dash.style = ['stroke', 'lineWidth'];

const smooth: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['A', r / 2, r / 2, 0, 1, 1, x, y],
    ['A', r / 2, r / 2, 0, 1, 0, x + r, y],
  ];
};
smooth.style = ['stroke', 'lineWidth'];

const hv: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r - 1, y - 2.5],
    ['L', x, y - 2.5],
    ['L', x, y + 2.5],
    ['L', x + r + 1, y + 2.5],
  ];
};
hv.style = ['stroke', 'lineWidth'];

const vh: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - r - 1, y + 2.5],
    ['L', x, y + 2.5],
    ['L', x, y - 2.5],
    ['L', x + r + 1, y - 2.5],
  ];
};
vh.style = ['stroke', 'lineWidth'];

const hvh: SymbolFactor = (x, y, r) => {
  return [
    ['M', x - (r + 1), y + 2.5],
    ['L', x - r / 2, y + 2.5],
    ['L', x - r / 2, y - 2.5],
    ['L', x + r / 2, y - 2.5],
    ['L', x + r / 2, y + 2.5],
    ['L', x + r + 1, y + 2.5],
  ];
};
hvh.style = ['stroke', 'lineWidth'];

const vhv: SymbolFactor = (x: number, y: number, r: number) => {
  return [
    ['M', x - 5, y + 2.5],
    ['L', x - 5, y],
    ['L', x, y],
    ['L', x, y - 3],
    ['L', x, y + 3],
    ['L', x + 6.5, y + 3],
  ];
};
vhv.style = ['stroke', 'lineWidth'];

export const Symbols = new Map<string, SymbolFactor>([
  ['bowtie', bowtie],
  ['cross', cross],
  ['dash', dash],
  ['diamond', diamond],
  ['dot', dot],
  ['hexagon', hexagon],
  ['hollowBowtie', hollowBowtie],
  ['hollowDiamond', hollowDiamond],
  ['hollowHexagon', hollowHexagon],
  ['hollowPoint', hollowPoint],
  ['hollowSquare', hollowSquare],
  ['hollowTriangle', hollowTriangle],
  ['hollowTriangleDown', hollowTriangleDown],
  ['hv', hv],
  ['hvh', hvh],
  ['hyphen', hyphen],
  ['line', line],
  ['plus', plus],
  ['point', point],
  ['rect', rect],
  ['smooth', smooth],
  ['square', square],
  ['tick', tick],
  ['triangleDown', triangleDown],
  ['triangle', triangle],
  ['vh', vh],
  ['vhv', vhv],
]);

export function useMarker(
  type: string,
  { d, fill, lineWidth, path, stroke, color, ...style }: Record<string, any>,
) {
  const symbol = Symbols.get(type) || Symbols.get('point');
  return (...args: Parameters<SymbolFactor>) => {
    const path = new Path({
      style: {
        ...style,
        d: symbol(...args),
        stroke: symbol.style.includes('stroke') ? color || stroke : '',
        fill: symbol.style.includes('fill') ? color || fill : '',
        lineWidth: symbol.style.includes('lineWidth')
          ? lineWidth || lineWidth || 2
          : 0,
      },
    });

    return path;
  };
}

export function registerSymbol(type: string, marker: SymbolFactor) {
  Symbols.set(type, marker);
}

export function unregisterSymbol(type: string) {
  Symbols.delete(type);
}
