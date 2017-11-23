# G2: The Grammar of Graphics in JavaScript

[![](https://img.shields.io/travis/antvis/g2.svg)](https://travis-ci.org/antvis/g2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![NPM Package](https://img.shields.io/npm/v/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![NPM Downloads](http://img.shields.io/npm/dm/@antv/g2.svg)](https://npmjs.org/package/@antv/g2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2.svg)](http://isitmaintained.com/project/antvis/g2 "Percentage of issues still open")

G2 is a visualization grammar, a data-driven visual language with a high level of usability and scalability. It provides a set of grammars, takes users beyond a limited set of charts to an almost unlimited world of graphical forms. With G2, users can describe the visual appearance of a visualization just by one statement.

[More details about G2](https://antv.alipay.com/zh-cn/g2/3.x/index.html).

<img src="https://gw.alipayobjects.com/zos/rmsportal/AOwgKIjknXfggPijmhym.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/nfiOREzMIsENrzUeLOGR.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/uZZmaudtKRnvUhmUdZSZ.gif" width="180"><img src="https://gw.alipayobjects.com/zos/rmsportal/ifSTXzrGbvtLRpnAvAiZ.gif" width="200">



## Installation

```js
npm install @antv/g2
```

### Usage

<img src="https://gw.alipayobjects.com/zos/rmsportal/aHvVgFiBnGzzKCEjdVtL.png" width="450">

```html
<div id="c1"></div>
```

```js
import G2 from '@antv/g2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 1150 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = new G2.Chart({
  container: 'c1',
  width: 500,
  height: 500
});

chart.source(data);
chart.interval().position('genre*sold').color('genre');
chart.render();
```

[More examples](https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html)

<img src="https://gw.alipayobjects.com/zos/rmsportal/mIeSjXfslxpwgqhnzEjQ.png" width="800">
