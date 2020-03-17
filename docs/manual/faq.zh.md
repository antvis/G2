---
title: 常见问题
order: 10
---

## 如何导出图片

考虑到 G2 使用环境的不同（浏览器、mobile 等），G2 从 v4 版本开始，不再提供 `chart.toDataURL()` 以及 `chart.downloadImage()` 接口，鼓励用户自己包装。

可以参考以下工具函数（能覆盖大部分场景，但是不保证完全不存在兼容问题，**仅供参考**）：

<details>
  <summary>
  参考方案(点击展开)：
  </summary>

```ts
/**
 * 返回图表的 dataURL 用于生成图片。
 * @param chart 需要获取 DataURL 的 chart 实例
 * @returns 返回图表的 dataURL
 */
function toDataURL(chart: Chart) {
  const canvas = chart.getCanvas();
  const renderer = chart.renderer;
  const canvasDom = canvas.get('el');
  let dataURL = '';
  if (renderer === 'svg') {
    const clone = canvasDom.cloneNode(true);
    const svgDocType = document.implementation.createDocumentType(
      'svg',
      '-//W3C//DTD SVG 1.1//EN',
      'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
    );
    const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
    svgDoc.replaceChild(clone, svgDoc.documentElement);
    const svgData = new XMLSerializer().serializeToString(svgDoc);
    dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
  } else if (renderer === 'canvas') {
    dataURL = canvasDom.toDataURL('image/png');
  }
  return dataURL;
}

/**
 * 图表图片导出
 * @param chart chart 实例
 * @param name 图片名称，可选，默认名为 'G2Chart'
 */
function downloadImage(chart: Chart, name: string = 'G2Chart') {
  const link = document.createElement('a');
  const renderer = chart.renderer;
  const filename = `${name}${renderer === 'svg' ? '.svg' : '.png'}`;
  const canvas = chart.getCanvas();
  canvas.get('timeline').stopAllAnimations();

  setTimeout(() => {
    const dataURL = toDataURL(chart);
    if (window.Blob && window.URL && renderer !== 'svg') {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blobObj = new Blob([u8arr], { type: mime });
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blobObj, filename);
      } else {
        link.addEventListener('click', () => {
          link.download = filename;
          link.href = window.URL.createObjectURL(blobObj);
        });
      }
    } else {
      link.addEventListener('click', () => {
        link.download = filename;
        link.href = dataURL;
      });
    }
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, false);
    link.dispatchEvent(e);
  }, 16);
}
```

</details>

另外，获取到画布的 dataURI 数据之后，也可以使用 [download](https://github.com/rndme/download) 进行图片下载。

## Tooltip 内出现了重复值

在绘制面积图时经常会遇到如下图的问题，本来是相同的数据却在 tooltip 上出现了两个值。

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fAKvSaa-wQIAAAAAAAAAAABkARQnAQ" width=400 />

<details>
  <summary>
  图表代码(点击展开)：
  </summary>

```ts
import { Chart } from '@antv/g2';

const data = [
  { year: '1991', value: 15468 },
  { year: '1992', value: 16100 },
  { year: '1993', value: 15900 },
  { year: '1994', value: 17409 },
  { year: '1995', value: 17000 },
  { year: '1996', value: 31056 },
  { year: '1997', value: 31982 },
  { year: '1998', value: 32040 },
  { year: '1999', value: 33233 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);
chart.scale({
  value: {
    min: 10000,
    nice: true,
  },
  year: {
    range: [0, 1],
  },
});
chart.tooltip({
  showCrosshairs: true,
  shared: true,
});

chart.axis('value', {
  label: {
    formatter: (val) => {
      return (+val / 10000).toFixed(1) + 'k';
    },
  },
});

// highlight-start
chart
  .area()
  .position('year*value')
  .color('l(90) 0:#1890FF 1:#f7f7f7');
chart.line().position('year*value');
// highlight-end

chart.render();
```

</details>

**原因解释**：因为在代码中给 chart.area() 和 chart.line() 配置了不同的颜色，tooltip 去重规则会考虑颜色，颜色不同的视为不同的数据。

**解决方案**：

1. 可以将其中一个 tooltip 关闭，比如 `chart.area().tooltip(false)`。
2. 监听 `chart.on('tooltip:change')` 事件，动态修改 `items` 数据。
