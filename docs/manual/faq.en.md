---
title: FAQ
order: 5
---

## How do export images

Considering the different use environment (browser, mobile, etc.) of G2, starting from version 4, G2 no longer provides `chart.todataURL()` and `chart.downloadiimage()` interfaces, which encourages users to encapsulate themselves.

You can refer to the following utility functions (which cover most scenarios, but do not guarantee that there are no compatibility issues, **for reference only**) :

<details>
  <summary>
  Reference scheme (click to expand) :
  </summary>

```ts
/**
 * Returns the dataURL for the chart to generate the image.
 * @param chart requires a Chart instance of Dataurl
 * @returns Returns the dataURL of the chart
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
 * Chart pictures exported
 * @param chart chart instance
 * @param name image name, optional, default name 'G2Chart'
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

In addition, access to the canvas dataURI data, you can also use the images are downloaded [download](https://github.com/rndme/download).

## Duplicate values appear in the Tooltip

When drawing an area map, you often encounter the following problem: two values appear on the Tooltip for the same data.

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fAKvSaa-wQIAAAAAAAAAAABkARQnAQ" width=400 />

<details>
  <summary>
  chart code(click to expand)：
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
chart.area().position('year*value').color('l(90) 0:#1890FF 1:#f7f7f7');
chart.line().position('year*value');
// highlight-end

chart.render();
```

</details>

**Reasons**：Because Chart.area () and Chart.line () are configured with different colors in the code, the Tooltip de-duplication rules take the colors into account and treat different colors as different data.

**Solution**：

1. You can turn off one of the tooltips, such as `chart.area().tooltip(false)`.

2. Listen for the `chart.on('tooltip:change')` event to dynamically modify 'items'.

## Legend sets Marker. Symbol error or not displayed

The Legend Marker type (Symbol) supported by G2 4.0 is: `"circle" | "square" | "line" | "diamond" | "triangle" | "triangle-down" | "hexagon" | "bowtie" | "cross" | "tick" | "plus" | "hyphen"`, specific can see [API](/zh/docs/api/general/legend#marker)

- 🗑️ `triangleDown` tag type removed, changed to `triangle - down`
- 🗑️ `hollow - *` tag types such as removed, you can set `style` to achieve the effect of the hollow

## Browser compatibility

> Due to the condition limit, the lower version limit is only for reference, which does not mean that the lower version cannot be supported. The test was completed in CDN mode. [online Demo](https://lxfu1.github.io/browser-compatibility-of-antv).

|        | Chrome | Edge | Firefox | IE  | Opera | Safari | UC  | 360 speed | 360 safe browser |
| ------ | :----: | :--: | :-----: | :-: | :---: | :----: | :-: | :-------: | :--------------: |
| **G2** |   40   |  12  |   85    |  9  |  40   |   14   | 6.2 |    12     |       7.3        |

### CDN

The following JS is introduced in the HEAD, and each chart is mounted on the global G2.

```ts
<script src="https://unpkg.com/@babel/polyfill@latest/dist/polyfill.min.js"></script> // optional
<script src="https://unpkg.com/@antv/g2@latest"></script>

// chart.js
var chart = new G2.Chart({
   container: 'container',
   autoFit: true,
   height: 500,
   padding: [50, 20, 50, 20]
});
```

### NPM

Use NPM mode, if there is a compatibility problem please use combination of Babel and `@Babel/polyfill`, reference G2 [webpack.config](https://github.com/antvis/G2/blob/master/webpack.config.js), More questions are welcome to join the DingTalk Group.
