---
title: FAQ
order: 10
---

## How to export pictures

Taking into account the different environment of G2 (browser, mobile, etc.), G2 from the v4 version, is no longer available `chart.toDataURL()` as well as `chart.downloadImage()` an interface to encourage the user's own packaging.

You can refer to the following tool functions (which can cover most scenarios, but there is no guarantee that there will be no compatibility problems at all, **just for reference**）：

<details>
  <summary>
  Reference plan (click to expand):
  </summary>

```ts
/**
 * The dataURL of the returned chart is used to generate pictures. 
 * @param chart needs to get the chart instance of 
 * @returns DataURL returns the dataURL of the chart
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
 * Chart picture export 
 * @param chart chart instance 
 * @param name Picture name, optional, default name is 'G2Chart'
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

In addition, after obtaining the dataURI of the canvas, you can also use [download](https://github.com/rndme/download) to download the image.

## Duplicate values appear in Tooltip 

When drawing an area chart, you often encounter the problem as shown in the figure below, but there are two values on the tooltip for the same data.

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fAKvSaa-wQIAAAAAAAAAAABkARQnAQ" width=400 />

<details>
  <summary>
  Chart code (click to expand):
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

**Reason explanation**: Because chart.area() and chart.line() are configured with different colors in the code, the color is considered in the tooltip deduplication rule, and different colors are regarded as different data.

**Solution**:

1. You can close one of the tooltips, for example `chart.area().tooltip(false)`.
2. Monitor `chart.on('tooltip:change')` events, dynamically modify `items` data.
