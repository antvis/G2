const expect = require('chai').expect;
const util = require('../../src/util');
const { Canvas } = require('@ali/g');
const View = require('../../src/chart/view');
const Chart = require('../../src/chart/chart');
const Coord = require('../../src/coord/index');

const div = document.createElement('div');
div.id = 'debug';
document.body.appendChild(div);

describe('test view', function() {
/*  const data = [
    { a: 1, b: 2, c: 'type 1' },
    { a: 1, b: 5, c: 'type 1' },
    { a: 1, b: 4, c: 'type 1' },
    { a: 2, b: 3, c: 'type 2' },
    { a: 2, b: 1, c: 'type 2' },
    { a: 2, b: 2, c: 'type 2' },
    { a: 3, b: 2, c: 'type 3' },
    { a: 3, b: 5, c: 'type 3' },
    { a: 3, b: 4, c: 'type 3' },
    { a: 4, b: 3, c: 'type 4' },
    { a: 4, b: 1, c: 'type 4' },
    { a: 4, b: 2, c: 'type 4' },
    { a: 5, b: 2, c: 'type 5' },
    { a: 5, b: 5, c: 'type 5' },
    { a: 5, b: 4, c: 'type 5' },
    { a: 6, b: 3, c: 'type 6' },
    { a: 6, b: 1, c: 'type 6' },
    { a: 6, b: 2, c: 'type 6' },
    { a: 7, b: 2, c: 'type 7' },
    { a: 7, b: 5, c: 'type 7' },
    { a: 7, b: 4, c: 'type 7' },
    { a: 8, b: 3, c: 'type 8' },
    { a: 8, b: 1, c: 'type 8' },
    { a: 8, b: 2, c: 'type 8' },
    { a: 9, b: 2, c: 'type 9' },
    { a: 9, b: 5, c: 'type 9' },
    { a: 9, b: 4, c: 'type 9' },
    { a: 10, b: 3, c: 'type 10' },
    { a: 10, b: 1, c: 'type 10' },
    { a: 10, b: 2, c: 'type 10' }
  ];

  const chart = new Chart({
    height: 500,
    width: 500,
    container: 'debug',
    padding: [ 80 ]
  });
  const view = chart.view();

  view.source(data);
  // chart.legend({
  //   position: 'bottom'
  // });

  // chart.legend('b', {
  //   slidable: false
  // });
  view.guide().line({
    start: {
      a: 2,
      b:5
    },
    end: {
      a: 8,
      b: 2
    },
    lineStyle: {
      stroke: '#999', // 线的颜色
      lineDash: [0, 2, 2], // 虚线的设置
      lineWidth: 3 // 线的宽度
    }, // 图形样式配置
    text: {
      position: 'center',
      content: '我是辅助线啊'
    }
  })
  view.line().position('a*b').color('c');
  // view.point().position('a*b').size('b').shape('circle').color('red');
  chart.render();
  console.log(JSON.stringify(chart.get('plotRange')));
  view.on('mousedown', ev => {
    console.log(ev);
  });*/

  var data = [
    {genre: 'Sports', sold: 275},
    {genre: 'Strategy', sold: 115},
    {genre: 'Action', sold: 120},
    {genre: 'Shooter', sold: 350},
    {genre: 'Other', sold: 150},
  ];

  var chart = new Chart({
    container: 'debug',
    height : 300,
    forceFit: true,
    padding: 0
  });

  chart.source(data, {
    genre: {
      alias: '游戏种类'
    },
    sold: {
      alias: '销售量'
    }
  });
  // chart.coord().scale(0.5, 0.5);
  chart.interval().position('genre*sold').color('genre')
  chart.render();
  console.log(chart);
  // chart.on('interval:mouseenter', ev => {
  //   console.log(ev)
  // });

  // var data = [{"月均降雨量":49.9,"月份":"Jan.","name":"Tokyo"},{"月均降雨量":71.5,"月份":"Feb.","name":"Tokyo"},{"月均降雨量":106.4,"月份":"Mar.","name":"Tokyo"},{"月均降雨量":129.2,"月份":"Apr.","name":"Tokyo"},{"月均降雨量":144,"月份":"May","name":"Tokyo"},{"月均降雨量":176,"月份":"Jun.","name":"Tokyo"},{"月均降雨量":135.6,"月份":"Jul.","name":"Tokyo"},{"月均降雨量":148.5,"月份":"Aug.","name":"Tokyo"},{"月均降雨量":216.4,"月份":"Sep.","name":"Tokyo"},{"月均降雨量":194.1,"月份":"Oct.","name":"Tokyo"},{"月均降雨量":95.6,"月份":"Nov.","name":"Tokyo"},{"月均降雨量":54.4,"月份":"Dec.","name":"Tokyo"},{"月均降雨量":83.6,"月份":"Jan.","name":"New York"},{"月均降雨量":78.8,"月份":"Feb.","name":"New York"},{"月均降雨量":98.5,"月份":"Mar.","name":"New York"},{"月均降雨量":93.4,"月份":"Apr.","name":"New York"},{"月均降雨量":106,"月份":"May","name":"New York"},{"月均降雨量":84.5,"月份":"Jun.","name":"New York"},{"月均降雨量":105,"月份":"Jul.","name":"New York"},{"月均降雨量":104.3,"月份":"Aug.","name":"New York"},{"月均降雨量":91.2,"月份":"Sep.","name":"New York"},{"月均降雨量":83.5,"月份":"Oct.","name":"New York"},{"月均降雨量":106.6,"月份":"Nov.","name":"New York"},{"月均降雨量":92.3,"月份":"Dec.","name":"New York"},{"月均降雨量":48.9,"月份":"Jan.","name":"London"},{"月均降雨量":38.8,"月份":"Feb.","name":"London"},{"月均降雨量":39.3,"月份":"Mar.","name":"London"},{"月均降雨量":41.4,"月份":"Apr.","name":"London"},{"月均降雨量":47,"月份":"May","name":"London"},{"月均降雨量":48.3,"月份":"Jun.","name":"London"},{"月均降雨量":59,"月份":"Jul.","name":"London"},{"月均降雨量":59.6,"月份":"Aug.","name":"London"},{"月均降雨量":52.4,"月份":"Sep.","name":"London"},{"月均降雨量":65.2,"月份":"Oct.","name":"London"},{"月均降雨量":59.3,"月份":"Nov.","name":"London"},{"月均降雨量":51.2,"月份":"Dec.","name":"London"},{"月均降雨量":42.4,"月份":"Jan.","name":"Berlin"},{"月均降雨量":33.2,"月份":"Feb.","name":"Berlin"},{"月均降雨量":34.5,"月份":"Mar.","name":"Berlin"},{"月均降雨量":39.7,"月份":"Apr.","name":"Berlin"},{"月均降雨量":52.6,"月份":"May","name":"Berlin"},{"月均降雨量":75.5,"月份":"Jun.","name":"Berlin"},{"月均降雨量":57.4,"月份":"Jul.","name":"Berlin"},{"月均降雨量":60.4,"月份":"Aug.","name":"Berlin"},{"月均降雨量":47.6,"月份":"Sep.","name":"Berlin"},{"月均降雨量":39.1,"月份":"Oct.","name":"Berlin"},{"月均降雨量":46.8,"月份":"Nov.","name":"Berlin"},{"月均降雨量":51.1,"月份":"Dec.","name":"Berlin"}];
  // var chart = new Chart({
  //   container: 'debug',
  //   forceFit: true,
  //   height : 350,
  //   padding: [ 20, 90, 60, 60 ]
  // });
  // chart.source(data);
  // chart.tooltip({
  //   // split: true,
  //   // crosshairs: {
  //   //   style: {
  //   //     fill: '#f80',
  //   //     fillOpacity: 0.3
  //   //   }
  //   // }
  // });
  // // chart.col('name',{alias: '城市'});
  // chart.interval().position('月份*月均降雨量', 'dodge').color('name')//.size(10);
  // chart.render();

  /*const data = [
    {"value":162,"type":"ACME","year":"1986"},
    {"value":42,"type":"Compitor","year":"1986"},
    {"value":134,"type":"ACME","year":"1987"},
    {"value":54,"type":"Compitor","year":"1987"},
    {"value":116,"type":"ACME","year":"1988"},
    {"value":26,"type":"Compitor","year":"1988"},
    {"value":122,"type":"ACME","year":"1989"},
    {"value":32,"type":"Compitor","year":"1989"},
    {"value":178,"type":"ACME","year":"1990"},
    {"value":68,"type":"Compitor","year":"1990"},
    {"value":144,"type":"ACME","year":"1991"},
    {"value":54,"type":"Compitor","year":"1991"},
    {"value":125,"type":"ACME","year":"1992"},
    {"value":35,"type":"Compitor","year":"1992"},
    {"value":176,"type":"ACME","year":"1993"},
    {"value":66,"type":"Compitor","year":"1993"},
    {"value":156,"type":"ACME","year":"1994"},
    {"value":130,"type":"Compitor","year":"1994"},
    {"value":195,"type":"ACME","year":"1995"},
    {"value":100,"type":"Compitor","year":"1995"},
    {"value":215,"type":"ACME","year":"1996"},
    {"value":100,"type":"Compitor","year":"1996"},
    {"value":176,"type":"ACME","year":"1997"},
    {"value":36,"type":"Compitor","year":"1997"},
    {"value":167,"type":"ACME","year":"1998"},
    {"value":47,"type":"Compitor","year":"1998"},
    {"value":142,"type":"ACME","year":"1999"},
    {"value":100,"type":"Compitor","year":"1999"},
    {"value":117,"type":"ACME","year":"2000"},
    {"value":100,"type":"Compitor","year":"2000"},
    {"value":113,"type":"ACME","year":"2001"},
    {"value":23,"type":"Compitor","year":"2001"},
    {"value":132,"type":"ACME","year":"2002"},
    {"value":23,"type":"Compitor","year":"2002"},
    {"value":146,"type":"ACME","year":"2003"},
    {"value":46,"type":"Compitor","year":"2003"},
    {"value":169,"type":"ACME","year":"2004"},
    {"value":59,"type":"Compitor","year":"2004"},
    {"value":184,"type":"ACME","year":"2005"},
    {"value":44,"type":"Compitor","year":"2005"}
  ];
  var chart = new Chart({
        container: 'debug',
        forceFit: true,
        height: 450
      });
      chart.source(data, {
        'value': {
          alias: 'The Share Price in Dollars',
          formatter: function(val) {
            return '$' + val;
          }
        },
        year: {
          range: [0, 1]
        }
      });
      // chart.tooltip({
      //   // split: true,
      //   // crosshairs: false
      //   // crosshairs: {
      //   //   type: 'y'
      //   // }
      // });
      chart.area().position('year*value').color('type').shape('smooth');
      // chart.line().position('year*value').color('type').size(2).shape('smooth');
      chart.render();*/
});
