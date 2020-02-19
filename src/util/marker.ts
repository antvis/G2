/** @ignore */
export const MarkerSymbols = {
  hexagon: (x: number, y: number, r: number) => {
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
  },
  bowtie: (x: number, y: number, r: number) => {
    const diffY = r - 1.5;
    return [['M', x - r, y - diffY], ['L', x + r, y + diffY], ['L', x + r, y - diffY], ['L', x - r, y + diffY], ['Z']];
  },
  cross: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y - r],
      ['L', x + r, y + r],
      ['M', x + r, y - r],
      ['L', x - r, y + r],
    ];
  },
  tick: (x: number, y: number, r: number) => {
    return [
      ['M', x - r / 2, y - r],
      ['L', x + r / 2, y - r],
      ['M', x, y - r],
      ['L', x, y + r],
      ['M', x - r / 2, y + r],
      ['L', x + r / 2, y + r],
    ];
  },
  plus: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
      ['M', x, y - r],
      ['L', x, y + r],
    ];
  },
  hyphen: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
    ];
  },
  line: (x: number, y: number, r: number) => {
    return [
      ['M', x, y - r],
      ['L', x, y + r],
    ];
  },
};
