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

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1655789?v=4" width="100px;"/><br/><sub><b>leungwensen</b></sub>](https://github.com/leungwensen)<br/>|[<img src="https://avatars3.githubusercontent.com/u/6628666?v=4" width="100px;"/><br/><sub><b>simaQ</b></sub>](https://github.com/simaQ)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1264678?v=4" width="100px;"/><br/><sub><b>dxq613</b></sub>](https://github.com/dxq613)<br/>|[<img src="https://avatars3.githubusercontent.com/u/8325822?v=4" width="100px;"/><br/><sub><b>elaine1234</b></sub>](https://github.com/elaine1234)<br/>|[<img src="https://avatars0.githubusercontent.com/u/7098619?v=4" width="100px;"/><br/><sub><b>guisturdy</b></sub>](https://github.com/guisturdy)<br/>|[<img src="https://avatars3.githubusercontent.com/u/5888974?v=4" width="100px;"/><br/><sub><b>paleface001</b></sub>](https://github.com/paleface001)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
|[<img src="https://avatars0.githubusercontent.com/u/8186664?v=4" width="100px;"/><br/><sub><b>chenshuai2144</b></sub>](https://github.com/chenshuai2144)<br/>|[<img src="https://avatars3.githubusercontent.com/u/6111424?v=4" width="100px;"/><br/><sub><b>xile611</b></sub>](https://github.com/xile611)<br/>|[<img src="https://avatars3.githubusercontent.com/u/5591805?v=4" width="100px;"/><br/><sub><b>maplor</b></sub>](https://github.com/maplor)<br/>|[<img src="https://avatars3.githubusercontent.com/u/6560377?v=4" width="100px;"/><br/><sub><b>zhfanrui</b></sub>](https://github.com/zhfanrui)<br/>|[<img src="https://avatars2.githubusercontent.com/u/6942296?v=4" width="100px;"/><br/><sub><b>Frezc</b></sub>](https://github.com/Frezc)<br/>|[<img src="https://avatars1.githubusercontent.com/u/6812138?v=4" width="100px;"/><br/><sub><b>Leannechn</b></sub>](https://github.com/Leannechn)<br/>|
|[<img src="https://avatars2.githubusercontent.com/u/1451480?v=4" width="100px;"/><br/><sub><b>janjakubnanista</b></sub>](https://github.com/janjakubnanista)<br/>|[<img src="https://avatars1.githubusercontent.com/u/11624840?v=4" width="100px;"/><br/><sub><b>ParryQiu</b></sub>](https://github.com/ParryQiu)<br/>|[<img src="https://avatars3.githubusercontent.com/u/22516098?v=4" width="100px;"/><br/><sub><b>Sai0514</b></sub>](https://github.com/Sai0514)<br/>|[<img src="https://avatars0.githubusercontent.com/u/9816225?v=4" width="100px;"/><br/><sub><b>liximomo</b></sub>](https://github.com/liximomo)<br/>|[<img src="https://avatars1.githubusercontent.com/u/9054130?v=4" width="100px;"/><br/><sub><b>wensen-lws</b></sub>](https://github.com/wensen-lws)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|
|[<img src="https://avatars1.githubusercontent.com/u/2370929?v=4" width="100px;"/><br/><sub><b>wangyu-kelly</b></sub>](https://github.com/wangyu-kelly)<br/>|[<img src="https://avatars0.githubusercontent.com/u/9314735?v=4" width="100px;"/><br/><sub><b>BlackGanglion</b></sub>](https://github.com/BlackGanglion)<br/>|[<img src="https://avatars3.githubusercontent.com/u/210810?v=4" width="100px;"/><br/><sub><b>illumen</b></sub>](https://github.com/illumen)<br/>|[<img src="https://avatars1.githubusercontent.com/u/827205?v=4" width="100px;"/><br/><sub><b>DanielRuf</b></sub>](https://github.com/DanielRuf)<br/>|[<img src="https://avatars2.githubusercontent.com/u/5518?v=4" width="100px;"/><br/><sub><b>huacnlee</b></sub>](https://github.com/huacnlee)<br/>|[<img src="https://avatars2.githubusercontent.com/u/13056641?v=4" width="100px;"/><br/><sub><b>0nza1101</b></sub>](https://github.com/0nza1101)<br/>|
[<img src="https://avatars2.githubusercontent.com/u/566097?v=4" width="100px;"/><br/><sub><b>RaoHai</b></sub>](https://github.com/RaoHai)<br/>|[<img src="https://avatars0.githubusercontent.com/u/8731922?v=4" width="100px;"/><br/><sub><b>tbroadley</b></sub>](https://github.com/tbroadley)<br/>|[<img src="https://avatars2.githubusercontent.com/u/1860329?v=4" width="100px;"/><br/><sub><b>charleyw</b></sub>](https://github.com/charleyw)<br/>|[<img src="https://avatars0.githubusercontent.com/u/21355783?v=4" width="100px;"/><br/><sub><b>Hazyzh</b></sub>](https://github.com/Hazyzh)<br/>|[<img src="https://avatars0.githubusercontent.com/u/6947976?v=4" width="100px;"/><br/><sub><b>forbreak</b></sub>](https://github.com/forbreak)<br/>|[<img src="https://avatars0.githubusercontent.com/u/4783781?v=4" width="100px;"/><br/><sub><b>nekocode</b></sub>](https://github.com/nekocode)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Sat Jul 27 2019 14:06:08 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->
