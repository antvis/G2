# G2: The Grammar of Graphics in JavaScript

[![](https://img.shields.io/travis/antvis/g2.svg)](https://travis-ci.org/antvis/g2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![NPM Package](https://img.shields.io/npm/v/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![NPM Downloads](http://img.shields.io/npm/dm/@antv/g2.svg)](https://npmjs.org/package/@antv/g2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2.svg)](http://isitmaintained.com/project/antvis/g2 "Percentage of issues still open")

G2 is a visualization grammar, a data-driven visual language with a high level of usability and scalability. It provides a set of grammars, takes users beyond a limited set of charts to an almost unlimited world of graphical forms. With G2, users can describe the visual appearance of a visualization just by one statement.

**Special thanks to [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson), the author of [*The Grammar Of Graphics*](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html), whose book served as the foundation for G2.**

[More details about G2](https://antv.alipay.com/zh-cn/g2/3.x/index.html).

<img src="https://gw.alipayobjects.com/zos/rmsportal/AOwgKIjknXfggPijmhym.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/nfiOREzMIsENrzUeLOGR.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/uZZmaudtKRnvUhmUdZSZ.gif" width="180"><img src="https://gw.alipayobjects.com/zos/rmsportal/ifSTXzrGbvtLRpnAvAiZ.gif" width="200">


## Installation

```bash
$ npm install @antv/g2
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

![demos](https://user-images.githubusercontent.com/1655789/34187141-d800fe94-e56a-11e7-878a-4dc0e4f538d9.png)

## Development

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run dev

# run demos
$ npm run demos
```

## How to Contribute

Please let us know how can we help. Do check out [issues](https://github.com/antvis/g2/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md).

## ~~Experience Improvement Program Description~~

~~In order to serve the users better, G2 will send the URL and version information back to the AntV server:~~

~~https://kcart.alipay.com/web/bi.do~~

~~**Except for URL and G2 version information, no other information will be collected.** You can also turn it off with the following code:~~

```js
// disable tracking
G2.track(false)
```

**update:**

**We decided to terminate the "Experience Improvement Program". In verson `@antv/g2@3.4.7` and above, all tracking code is removed, no unexpected remote request will be sent while you are using G2.**
