---
title: image
order: 10
---

## 概述

`image` 图片标记通常不会单独出现，主要在其他的标记基础上进行添加使用，可以增强数据的可视化效果，帮助更直观地传达信息。和[`point`](/manual/core/mark/point) 标记很类似都是以 `x`，`y` 数据通道作为位置居中定位，区别在于 `image` 提供一个特殊的 `src` 数据通道，来指定图片的远程地址或者 base64。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 200,
  height: 60,
  type: 'image',
  data: [
    {
      x: '1',
      y: 1,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '2',
      y: 1,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '3',
      y: 1,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '4',
      y: 1,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qCegRabhuUIAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '5',
      y: 1,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GNP1RLFfQV0AAAAAAAAAAAAAemJ7AQ/original',
    },

    {
      x: '1',
      y: 2,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '2',
      y: 2,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '3',
      y: 2,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qCegRabhuUIAAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '4',
      y: 2,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GNP1RLFfQV0AAAAAAAAAAAAAemJ7AQ/original',
    },
    {
      x: '5',
      y: 2,
      url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GNP1RLFfQV0AAAAAAAAAAAAAemJ7AQ/original',
    },
  ],
  // 配置视觉通道
  encode: {
    x: 'x', // 配置x通道
    y: 'y', // 配置y通道
    src: 'url', // 配置 图片src 通道
  },
  axis: { x: false, y: false },
});

chart.render();
```

更多的案例，可以查看[图表示例 - 图片](/examples#general-image)页面。

## 配置项

| 属性   | 描述                                                                                             | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------------------ | ----------------- | ------ | ---- |
| encode | 配置 `image` 标记的视觉通道，包括`x`、`y`、`src`、`size`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `image` 标记的图形样式                                                                      | [style](#style)   | -      |      |

### encode

配置 `image` 标记的视觉通道。

| 属性 | 描述                                                                                                | 类型                          | 默认值 | 必选 |
| ---- | --------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x    | 绑定 `image` 标记的 `x` 属性通道，一般是 `data` 中的数值或字符，用于确定图片的 `x` 位置             | [encode](/manual/core/encode) | -      | ✓    |
| y    | 绑定 `image` 标记的 `y` 属性通道，一般是 `data` 中的数值或字符，用于确定图片的 `y` 位置             | [encode](/manual/core/encode) | -      | ✓    |
| size | 绑定 `image` 标记的 `size` 大小通道，用于控制图片展示的大小，一般图片中所存储的信息越多，越需要放大 | [encode](/manual/core/encode) | -      |      |
| src  | 绑定 `image` 标记的 `src` 图片通道 ，会更具对应的数据显示图片                                       |                               | -      | ✓    |

#### src

最终的绘制都是调用 G 去渲染，所以支持的数据类型和 G 的原子 Image 图形保持一致，支持：

1. `远程地址`：网络地址
2. `file`：本地图片地址
3. `base64`：图表 base64 格式字符串
4. `blob`：图片请求返回的 Blob 对象

### style

| 属性          | 描述                                                             | 类型                             | 默认值    | 必选 |
| ------------- | ---------------------------------------------------------------- | -------------------------------- | --------- | ---- |
| width         | 图形的宽度, 如果没有配置 图片按照 自宽高 和 `size` 大小 默认显示 | _number_ \| _Function\<number\>_ | -         |      |
| height        | 图形的高度, 如果没有配置 图片按照 自宽高 和 `size` 大小 默认显示 | _number_ \| _Function\<number\>_ | -         |      |
| opacity       | 图形的整体透明度                                                 | _number_ \| _Function\<number\>_ | -         |      |
| shadowColor   | 图形阴影颜色                                                     | _string_ \| _Function\<string\>_ | -         |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                           | _number_ \| _Function\<number\>_ | -         |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                         | _number_ \| _Function\<number\>_ | -         |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                         | _number_ \| _Function\<number\>_ | -         |      |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                    | _string_ \| _Function\<string\>_ | `default` |      |

尝试一下：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const Avatars = [
  'https://gw.alipayobjects.com/zos/antfincdn/z8eXl6l9GM/aiyin.jpg',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*cu6GQ7yNpJIAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*IFYESbDDqI0AAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*z6bUQ7bvuAYAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*zIFOTbhtCoMAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*z9SnQpiMnIgAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*aGTWQKFIx2cAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/n%26uTxqsNHe/IMG_3154.JPG',
  'http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/antfincdn/sX13FkC4%26C/erling.jpg',
  'https://gw.alipayobjects.com/zos/antfincdn/4VUXCQEiBd/c4f901c7-f591-4616-8dfc-83aecf839cd8.png',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*5kqTSZE-9KMAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*_OhHTo0gxAMAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/aXQ3OTu6Er/IMG_3509.JPG',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*blSIQbwdOqsAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*rVgGS5sJwHQAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*gB63QppvTsgAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/AefmmqKied/3ca2b3d8-e568-4bec-b10d-e4e432cb6f23.png',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*iBIzSZMCWRcAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*GHQQQYTL4g8AAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*VXoNRoRXPBwAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*WZcQRJtWWlIAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*-wAXRKlOrW4AAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*LSpRS6i_WOcAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*23r_SpWxPdEAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*R3QzTpZM7IUAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*vU-mRr0XrfcAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*LMcOQKUxbUEAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*8CiTTqjnzcEAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/smBVaflWk5/my.jpg',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*V7E0RqRAlG4AAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*_E0SR4LCxaAAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*PmifSa53auQAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*mWkGRqxLexYAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*CPXKQ76YlfwAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/c9K5r1m%26y9/d0b8a090-f034-43e6-aeeb-f59cb6c7c33c.png',
  'https://gw.alipayobjects.com/zos/antfincdn/L%261dAufvjL/IMG_1477.JPG',
  'https://gw.alipayobjects.com/zos/antfincdn/NkfCEL7RTL/7cdd44fc-8624-4b6c-8947-67f78e79142f.png',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*dl_gToTY6msAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*QFEMTaidg9QAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/KGawdl9Ahq/touxiang.JPG',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*y1cFS4MDmPIAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*qykaTLGttsgAAAAAAAAAAABkARQnAQ',
  'https://gw.alipayobjects.com/zos/antfincdn/QL5d8rcf%24M/IMG_6534.JPG',
  'https://gw.alipayobjects.com/mdn/rms_04a9e5/afts/img/A*ZmohRYwarWcAAAAAAAAAAAAAARQnAQ',
  'https://gw.alipayobjects.com/mdn/rms_04a9e5/afts/img/A*1O_3R4Wcwy0AAAAAAAAAAAAAARQnAQ',
];

// Code from https://juejin.cn/post/6995818748191981604
function getLovePoints() {
  let angle = 0;
  let x = 0;
  let y = 0;
  const a = 6;
  const points = [];
  for (let i = 0; i < 20; i += 0.2) {
    angle = i / Math.PI;
    x = a * (16 * Math.sin(angle) ** 3);
    y =
      a *
      (13 * Math.cos(angle) -
        5 * Math.cos(2 * angle) -
        2 * Math.cos(3 * angle) -
        Math.cos(4 * angle));
    points.push({ x, y });
  }
  return points;
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 40,
});

chart.data(getLovePoints());

chart
  .image()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('src', (_, idx) => Avatars[idx % Avatars.length])
  .encode('size', 48)
  .style({
    opacity: 0.7,
    shadowColor: '#fad7e0',
    shadowBlur: 40,
    shadowOffsetY: 20,
  })
  .axis(false)
  .tooltip(false);

chart.render();

```
