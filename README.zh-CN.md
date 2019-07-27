# G2: The Grammar of Graphics in JavaScript

[![](https://img.shields.io/travis/antvis/g2.svg)](https://travis-ci.org/antvis/g2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![NPM Package](https://img.shields.io/npm/v/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![NPM Downloads](http://img.shields.io/npm/dm/@antv/g2.svg)](https://npmjs.org/package/@antv/g2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2.svg)](http://isitmaintained.com/project/antvis/g2 "Percentage of issues still open")

G2 是一套基于可视化编码的图形语法，以数据驱动，具有高度的易用性和扩展性，用户无需关注各种繁琐的实现细节，一条语句即可构建出各种各样的可交互的统计图表。

**在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 G2 的图形语法提供了理论基础！**

[了解更多 G2 详情](https://antv.alipay.com/zh-cn/g2/3.x/index.html).

<img src="https://gw.alipayobjects.com/zos/rmsportal/AOwgKIjknXfggPijmhym.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/nfiOREzMIsENrzUeLOGR.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/uZZmaudtKRnvUhmUdZSZ.gif" width="180"><img src="https://gw.alipayobjects.com/zos/rmsportal/ifSTXzrGbvtLRpnAvAiZ.gif" width="200">

## 安装

```bash
npm install @antv/g2
```

## 特性

- ✔︎ 简单、易用
- ✔︎ 完备的可视化编码
- ✔︎ 强大的扩展能力

## 文档

- [使用教程](https://antv.alipay.com/zh-cn/g2/3.x/tutorial/index.html)
- [API 文档](https://antv.alipay.com/zh-cn/g2/3.x/api/index.html)
- [图表示例](https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html)

### 快速开始

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

[更多示例](https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html)

![demos](https://user-images.githubusercontent.com/1655789/34187141-d800fe94-e56a-11e7-878a-4dc0e4f538d9.png)

## 本地开发

```bash
$ npm install

# 跑测试用例
$ npm run test-live

# 监听文件变化构建，并打开 demo 页面
$ npm run dev

# 打开 demo
$ npm run demos
```

## ~~体验改进计划说明~~

~~为了更好服务用户，G2 会将 URL 和版本信息发送回 AntV 服务器：~~

~~https://kcart.alipay.com/web/bi.do~~

~~**除了 URL 与 G2 版本信息外，不会收集任何其他信息**，一切为了能对 G2 的运行情况有更多了解，以更好服务于用户。如有担心，可以通过下面的代码关闭：~~

```js
// 关闭 G2 的体验改进计划打点请求
G2.track(false)
```

**更新**

**我们已决定终止体验改进计划**

**从 `@antv/g2@3.4.7` 版本开始，所有打点代码已被移除。后续版本的 G2 不会再发送任何远程请求**

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/g2/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md)。
