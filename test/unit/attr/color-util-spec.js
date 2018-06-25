
// const expect = require('chai').expect;
// const ColorUtil = require('../../../src/attr/color-util');

// xdescribe('color util test', function() {
//   it('color to rgb', () => {
//     expect(ColorUtil.toRGB('red')).equal('#ff0000');
//     expect(ColorUtil.toRGB('white')).equal('#ffffff');
//     expect(ColorUtil.toRGB('#ddd')).equal('#dddddd');
//     expect(ColorUtil.toRGB('#eeeeee')).equal('#eeeeee');
//   });
//   it('color to rgb with rgb(r,g,b)', () => {
//     expect(ColorUtil.toRGB('rgb(255,0, 0)')).equal('#ff0000');
//     expect(ColorUtil.toRGB('rgba(255,0, 0, 1)')).equal('#ff0000');
//   });

//   it('gradient white black', () => {
//     const gradient = ColorUtil.gradient([ 'white', 'black' ]);
//     expect(gradient(0)).equal('#ffffff');
//     expect(gradient(1)).equal('#000000');
//     expect(gradient(0.5)).equal('#808080');
//   });


//   it('gradient red blue', () => {
//     const gradient = ColorUtil.gradient([ 'red', 'blue' ]);
//     expect(gradient(0)).equal('#ff0000');
//     expect(gradient(1)).equal('#0000ff');
//     expect(gradient(0.5)).equal('#800080');
//   });
// });
