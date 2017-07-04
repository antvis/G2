const expect = require('chai').expect;
const util = require('../../src/util');
const { Canvas } = require('@ali/g');
const View = require('../../src/chart/view');
const Coord = require('../../src/coord/index');

const div = document.createElement('div');
div.id = 'debug';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'debug',
  width: 500,
  height: 500
});

const coord = new Coord.Rect({
  start: {
    x: 80,
    y: 420
  },
  end: {
    x: 420,
    y: 80
  }
});

const data = [
  { a: 1, b: 2 },
  { a: 2, b: 5 },
  { a: 3, b: 4 }
];
describe('test view', function() {
const view = new View({
  viewContainer: canvas.addGroup({
    zIndex: 2
  }),
  canvas: canvas,
  coord,
  options: {
    scales: {
      e: {
        type: 'cat',
        values: ['a', 'b', 'c']
      },
      a: {
        min: 0
      },
      b: {
        min: 0
      }
    },
    axes: {
      a: {
        title: null
      },
      b: {
        grid: {
          position: 'center'
        }
      }
    }
  }
});

view.source(data);
view.scale({
  a: {
    min: 0
  },
  b: {
    min: 0
  }
});
view.axis('a', {
  title: {
    textStyle: {
      fill: 'red'
    }
  }
});

view.guide().line({
  start: {
    a: 1,
    b: 2
  },
  end: {
    a: 3,
    b: 4
  },
  text: {
    content: '辅助线的辅助文本',
    position: 0.3
  }
});
const line = view.line().position('a*b');

view.render();
canvas.sort();
canvas.draw();
});
