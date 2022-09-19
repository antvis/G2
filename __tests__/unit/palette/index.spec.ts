import {
  Category10,
  Category20,
  SequentialBlue,
  SequentialDarkBlue,
  SequentialGreen,
  SequentialDarkGreen,
  SequentialGrey,
  SequentialOrange,
  SequentialPink,
  SequentialRed,
  SequentialYellow,
  SequentialPurple,
  SequentialYellowOrange,
  SequentialYellowGreen,
  SequentialPinkPurple,
  SequentialGreenBlue,
  DivergingGreenYellow,
  DivergingRedBlue,
  DivergingGreenRed,
  DivergingRedPurple,
} from '../../../src/palette';

describe('palette', () => {
  it('Category10 returns expected colors', () => {
    expect(Category10()).toEqual([
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#6F5EF9',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
      '#FF99C3',
    ]);
  });

  it('Category20 returns expected colors', () => {
    expect(Category20()).toEqual([
      '#5B8FF9',
      '#CDDDFD',
      '#5AD8A6',
      '#CDF3E4',
      '#5D7092',
      '#CED4DE',
      '#F6BD16',
      '#FCEBB9',
      '#6F5EF9',
      '#D3CEFD',
      '#6DC8EC',
      '#D3EEF9',
      '#945FB9',
      '#DECFEA',
      '#FF9845',
      '#FFE0C7',
      '#1E9493',
      '#BBDEDE',
      '#FF99C3',
      '#FFE0ED',
    ]);
  });

  it('SequentialBlue returns expected colors', () => {
    expect(SequentialBlue()).toEqual([
      '#95F0FF',
      '#78D3F8',
      '#5AB8DB',
      '#3A9DBF',
      '#0A82A4',
      '#00698A',
      '#005170',
      '#003958',
      '#002440',
    ]);
  });

  it('SequentialDarkBlue returns expected colors', () => {
    expect(SequentialDarkBlue()).toEqual([
      '#B8E1FF',
      '#9AC5FF',
      '#7DAAFF',
      '#5B8FF9',
      '#3D76DD',
      '#085EC0',
      '#0047A5',
      '#00318A',
      '#001D70',
    ]);
  });

  it('SequentialGreen returns expected colors', () => {
    expect(SequentialGreen()).toEqual([
      '#9DF5CA',
      '#61DDAA',
      '#42C090',
      '#19A576',
      '#008A5D',
      '#006F45',
      '#00562F',
      '#003E19',
      '#002800',
    ]);
  });

  it('SequentialDarkGreen returns expected colors', () => {
    expect(SequentialDarkGreen()).toEqual([
      '#8CF4F2',
      '#6FD8D6',
      '#52BCBA',
      '#31A09F',
      '#008685',
      '#006C6C',
      '#005354',
      '#003B3D',
      '#002627',
    ]);
  });

  it('SequentialGrey returns expected colors', () => {
    expect(SequentialGrey()).toEqual([
      '#D0E4FF',
      '#B4C8ED',
      '#99ADD1',
      '#7E92B5',
      '#65789B',
      '#4C6080',
      '#334867',
      '#1B324F',
      '#021D38',
    ]);
  });

  it('SequentialOrange returns expected colors', () => {
    expect(SequentialOrange()).toEqual([
      '#FFC771',
      '#FFAB57',
      '#F6903D',
      '#D77622',
      '#B85C00',
      '#9B4300',
      '#7D2A00',
      '#601000',
      '#450000',
    ]);
  });

  it('SequentialPink returns expected colors', () => {
    expect(SequentialPink()).toEqual([
      '#FFC2EC',
      '#FFA6D0',
      '#F08BB4',
      '#D37099',
      '#B65680',
      '#9A3C67',
      '#7E214F',
      '#630038',
      '#490022',
    ]);
  });

  it('SequentialPurple returns expected colors', () => {
    expect(SequentialPurple()).toEqual([
      '#FFCCFF',
      '#EBB0FF',
      '#CE95F5',
      '#B27AD8',
      '#9661BC',
      '#7B48A1',
      '#613086',
      '#48186C',
      '#2E0054',
    ]);
  });

  it('SequentialRed returns expected colors', () => {
    expect(SequentialRed()).toEqual([
      '#FFBB95',
      '#FF9E7B',
      '#FF8362',
      '#E8684A',
      '#C84D32',
      '#AA311C',
      '#8C1104',
      '#6F0000',
      '#510000',
    ]);
  });

  it('SequentialYellow returns expected colors', () => {
    expect(SequentialYellow()).toEqual([
      '#FFD83B',
      '#F6BD16',
      '#D7A100',
      '#B98700',
      '#9C6E00',
      '#7F5600',
      '#633F00',
      '#482900',
      '#2F1400',
    ]);
  });

  it('SequentialPinkPurple returns expected colors', () => {
    expect(SequentialPinkPurple()).toEqual([
      '#FFEBB0',
      '#FFDF80',
      '#FACA3E',
      '#E6B80B',
      '#B5AC23',
      '#6A9A48',
      '#20876B',
      '#06746B',
      '#044E48',
    ]);
  });

  it('SequentialGreenBlue returns expected colors', () => {
    expect(SequentialGreenBlue()).toEqual([
      '#D2EDC8',
      '#A9DACC',
      '#75C6D1',
      '#42B3D5',
      '#3993C2',
      '#3073AE',
      '#27539B',
      '#1E3388',
      '#171E6D',
    ]);
  });

  it('SequentialYellowGreen returns expected colors', () => {
    expect(SequentialYellowGreen()).toEqual([
      '#FFEBB0',
      '#FFDF80',
      '#FACA3E',
      '#E6B80B',
      '#B5AC23',
      '#6A9A48',
      '#20876B',
      '#06746B',
      '#044E48',
    ]);
  });

  it('SequentialYellowOrange returns expected colors', () => {
    expect(SequentialYellowOrange()).toEqual([
      '#FDEDBE',
      '#FFDF80',
      '#FFCB33',
      '#FFB200',
      '#FF8C00',
      '#FF6500',
      '#E6450F',
      '#B22C00',
      '#661900',
    ]);
  });

  it('DivergingGreenRed returns expected colors', () => {
    expect(DivergingGreenRed()).toEqual([
      '#014c63',
      '#10686c',
      '#168575',
      '#16a37e',
      '#0bc286',
      '#65cf9b',
      '#96dcb0',
      '#c1e8c5',
      '#F2EAEA',
      '#FFC5AC',
      '#FFA884',
      '#FF895D',
      '#FF6836',
      '#F3470D',
      '#D13808',
      '#A4300C',
      '#7A270E',
    ]);
  });

  it('DivergingRedBlue returns expected colors', () => {
    expect(DivergingRedBlue()).toEqual([
      '#661900',
      '#B22C00',
      '#E6450F',
      '#FF6500',
      '#FF8C00',
      '#FFB200',
      '#FFCB33',
      '#FFDF80',
      '#E0F2EB',
      '#66D8FF',
      '#1AC5FF',
      '#007FFF',
      '#0059FF',
      '#0040FF',
      '#002CB2',
      '#FFDF80',
      '#001F7F',
    ]);
  });

  it('DivergingGreenYellow returns expected colors', () => {
    expect(DivergingGreenYellow()).toEqual([
      '#003F7F',
      '#004C99',
      '#0059B2',
      '#0072E5',
      '#1A8CFF',
      '#4DA6FF',
      '#80BFFF',
      '#B3D9FF',
      '#EAE9EB',
      '#FFD5B1',
      '#FFC08C',
      '#FFAB66',
      '#FF963E',
      '#F17F0B',
      '#D16A0C',
      '#A45411',
      '#794012',
    ]);
  });

  it('DivergingRedPurple returns expected colors', () => {
    expect(DivergingRedPurple()).toEqual([
      '#661900',
      '#B22C00',
      '#E6450F',
      '#FF6500',
      '#FF8C00',
      '#FFB200',
      '#FFCB33',
      '#FFDF80',
      '#FFE2DC',
      '#EAACFF',
      '#DD78FF',
      '#C53FFF',
      '#A700FF',
      '#8500FF',
      '#620BE1',
      '#3607C2',
      '#27029A',
    ]);
  });
});
