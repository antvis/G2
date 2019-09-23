// todo 再飞，涉及到 DataSource 的使用，所以先全部注释掉了
// import { expect } from 'chai';
// import * as _ from '@antv/util';
// import { getCoordinate } from '@antv/coord';
// import { Canvas } from '@antv/g';
// import { getScale } from '@antv/scale';
// import { DataSource } from '@antv/data-source';
// import Text from '../../../src/element/text';
// import WordData from '../../data/word';
// import WordPopulation from '../../data/word-population';
//
// const Rect = getCoordinate('rect');
//
// const LinearScale = getScale('linear');
// const CatScale = getScale('cat');
// const IdentityScale = getScale('identity');
//
// describe('Text Element', () => {
//   const div = document.createElement('div');
//   document.body.appendChild(div);
//
//   const coord = new Rect({
//     start: {
//       x: 0,
//       y: 400,
//     },
//     end: {
//       x: 400,
//       y: 0,
//     }
//   });
//
//   const gdpScale = new LinearScale({
//     field: 'GDP',
//     values: WordData.map((d) => d.GDP),
//     min: 10000,
//     max: 30000,
//   });
//   const lifeExpectancyScale = new LinearScale({
//     field: 'LifeExpectancy',
//     values: WordData.map((d) => d.LifeExpectancy),
//     max: 90,
//     min: 70,
//   });
//   const populationScale = new LinearScale({
//     field: 'Population',
//     values: WordData.map((d) => d.Population)
//   });
//   const countryScale = new CatScale({
//     field: 'Country',
//     values: WordData.map((d) => d.Country)
//   });
//   const continentScale = new CatScale({
//     field: 'Continent',
//     values: WordData.map((d) => d.Continent)
//   });
//
//   describe('default', () => {
//     let textElement;
//     const canvas = new Canvas({
//       containerDOM: div,
//       renderer: 'svg',
//       width: 400,
//       height: 400,
//       pixelRatio: 2,
//     });
//     const container = canvas.addGroup();
//     it('constructor', () => {
//       textElement = new Text({
//         data: WordData,
//         scales: {
//           GDP: gdpScale,
//           LifeExpectancy: lifeExpectancyScale,
//           Population: populationScale,
//           Country: countryScale,
//           Continent: continentScale,
//         },
//         coord,
//         container,
//         view: {
//           get() {
//             return 'view';
//           }
//         },
//         id: 'view-text',
//       });
//
//       expect(textElement.get('type')).to.equal('text');
//       expect(textElement.get('shapeType')).to.equal('text');
//     });
//     it('element.init()', () => {
//       textElement
//         .position({
//           fields: [ 'GDP', 'LifeExpectancy' ],
//         })
//         .content({
//           fields: [ 'Continent', 'Country' ],
//           callback(continent, country) {
//             return `${_.head(continent)}-${_.head(country)}`;
//           },
//         })
//         .style({
//           callback() {
//             return {
//               fill: 'yellowGreen',
//             };
//           },
//         });
//
//       textElement.init();
//
//       const dataArray = textElement.get('dataArray');
//       expect(dataArray.length).to.equal(1); // 没有分组
//       expect(dataArray[0][0].Country).to.eql('Argentina');
//     });
//
//     it('element.paint()', () => {
//       textElement.paint();
//       canvas.draw();
//
//       const shapes = textElement.getShapes();
//       const dataArray = textElement.get('dataArray');
//       expect(dataArray.length).to.equal(1); // 没有分组
//       expect(shapes.length).to.equal(60);
//     });
//
//     after(() => {
//       // canvas.destroy();
//       // document.body.removeChild(div);
//     });
//   });
//
//   describe('configure TextElement', () => {
//     const canvas = new Canvas({
//       containerDOM: div,
//       renderer: 'canvas',
//       width: 400,
//       height: 400,
//       pixelRatio: 2,
//     });
//     const container = canvas.addGroup();
//     const textElement = new Text({
//       data: WordData,
//       scales: {
//         GDP: gdpScale,
//         LifeExpectancy: lifeExpectancyScale,
//         Population: populationScale,
//         Country: countryScale,
//         Continent: continentScale,
//       },
//       coord,
//       container,
//       view: {
//         get() {
//           return 'view';
//         }
//       },
//       id: 'view-text',
//     });
//     it('color & size & style', () => {
//       textElement
//         .position({
//           fields: [ 'GDP', 'LifeExpectancy' ]
//         })
//         .content('Continent*Country', (continent, country) => {
//           return `${_.head(continent)}-${_.head(country)}`;
//         })
//         .color({
//           fields: [ 'Population' ],
//           callback(val) {
//             return val > 20000000 ? 'red' : 'blue';
//           }
//         })
//         .size({
//           fields: [ 'Population' ],
//           values: [ 10, 50 ],
//         })
//         .style({
//           callback() {
//             return {
//               fontWeight: 'bold',
//               rotate: 90,
//               // TODO-xinming 这里无法判断到是否是最右边的数据，选择向右对齐
//               textAlign: 'left',
//             };
//           }
//         });
//       textElement.init();
//
//       const dataArray = textElement.get('dataArray');
//       const drawCfg = textElement.getDrawCfg(dataArray[0][0]);
//       expect(drawCfg.style).to.eql({
//         fontWeight: 'bold',
//         rotate: 90,
//         textAlign: 'left',
//       });
//
//       textElement.paint();
//       canvas.draw();
//     });
//     after(() => {
//       // canvas.destroy();
//       // document.body.removeChild(div);
//     });
//   });
// });
//
// describe('Text Element: single scale in a view', () => {
//   const div = document.createElement('div');
//   document.body.appendChild(div);
//
//   const coord = new Rect({
//     start: {
//       x: 0,
//       y: 250,
//     },
//     end: {
//       x: 250,
//       y: 0,
//     }
//   });
//   const canvas = new Canvas({
//     containerDOM: div,
//     renderer: 'svg',
//     width: 250,
//     height: 250,
//     pixelRatio: 2,
//   });
//   const container = canvas.addGroup();
//   const data = [ { month: '一月', temp: 20 }, { month: '二月', temp: 40 } ];
//   const monthScale = new CatScale({
//     field: 'month',
//     values: data.map((d) => d.month),
//     range: [ 0.2, 0.8 ],
//   });
//   const tempScale = new LinearScale({
//     field: 'temp',
//     values: data.map((d) => d.temp),
//   });
//   const identityScale = new IdentityScale({
//     field: '1',
//     values: [ '0.5' ],
//     range: [ 1 ],
//   });
//
//   const textElement = new Text({
//     data,
//     scales: {
//       month: monthScale,
//       temp: tempScale,
//       1: identityScale,
//     },
//     coord,
//     container,
//     view: {
//       get() {
//         return 'view';
//       }
//     },
//     id: 'view-text',
//   });
//
//   textElement.position({
//     fields: [ 'month', 1 ],
//   }).content({
//     fields: [ 'month', 'temp' ],
//     callback: (month, temp) => `(${month}, ${temp})`,
//   });
//
//   textElement.init();
//   textElement.paint();
//   canvas.draw();
//
//   after(() => {
//     // canvas.destroy();
//     // document.body.removeChild(div);
//   });
// });
//
// describe('Text Element: used in wordCloud', () => {
//   const div = document.createElement('div');
//   document.body.appendChild(div);
//   const coord = new Rect({
//     start: {
//       x: 0,
//       y: 400,
//     },
//     end: {
//       x: 400,
//       y: 0,
//     },
//   });
//   coord.reflect(); // 布局算法基于左上角为起点，而 G2 的坐标系基于左下角为起点，所以坐标系需要进行 reflect('y') 的操作
//   const canvas = new Canvas({
//     containerDOM: div,
//     renderer: 'svg',
//     width: 400,
//     height: 400,
//     pixelRatio: 2,
//   });
//   const container = canvas.addGroup();
//   const ds = new DataSource({
//     source: WordPopulation,
//   });
//
//   const min = ds.aggregate('value', 'min');
//   const max = ds.aggregate('value', 'max');
//   ds.transform({
//     type: 'tag-cloud',
//     fields: [ 'country', 'value' ],
//     font: 'Verdana', // fontFamily会影响词云图布局的计算,需要在transform的时候传入
//     padding: 0,
//     timeInterval: 4000, // max execute time
//     size: [ 400, 400 ],
//     rotate: () => {
//       let random = ~~(Math.random() * 4) % 4;
//       if (random === 2) {
//         random = 0;
//       }
//       return random * 90; // 0, 90, 270
//     },
//     fontSize: (d) => {
//       if (d.value) {
//         return (d.value - min) / (max - min) * (50 - 12) + 12;
//       }
//       return 0;
//     }
//   });
//
//   const xScale = new LinearScale({
//     field: 'x',
//     values: ds.data.map((d) => d.x),
//   });
//   const yScale = new LinearScale({
//     field: 'y',
//     values: ds.data.map((d) => d.y),
//   });
//   const categoryScale = new CatScale({
//     field: 'category',
//     values: ds.data.map((d) => d.category),
//   });
//   const countryScale = new CatScale({
//     field: 'country',
//     values: ds.data.map((d) => d.country),
//   });
//   const textElement = new Text({
//     container,
//     coord,
//     data: ds.data,
//     scales: {
//       // scale在生产环境下会自动创建,测试环境需要自定义
//       x: xScale,
//       y: yScale,
//       category: categoryScale,
//       country: countryScale,
//     },
//     view: {
//       get() {
//         return 'view';
//       }
//     },
//     id: 'view-text',
//   });
//   textElement
//     .position({
//       fields: [ 'x', 'y' ],
//     })
//     .content('country')
//     .color({
//       fields: [ 'category' ],
//     })
//     .style({
//       fields: [ 'size', 'rotate', 'fontFamily' ],
//       callback(size, rotate, fontFamily) {
//         return {
//           fontSize: size,
//           rotate,
//           fontFamily,
//           textBaseline: 'Alphabetic',
//         };
//       },
//     });
//
//   textElement.init();
//   textElement.paint();
//
//   canvas.draw();
// });
