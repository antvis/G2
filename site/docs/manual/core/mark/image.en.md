---
title: image
order: 10
---

## Overview

The `image` mark usually does not appear independently and is mainly used as an addition to other marks, which can enhance the visual effect of data and help convey information more intuitively. It is very similar to the [`point`](/en/manual/core/mark/point) mark, both using `x` and `y` data channels for centered positioning. The difference is that `image` provides a special `src` data channel to specify the remote address or base64 of the image.

```js | ob { autoMount: true }
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
  // Configure visual channels
  encode: {
    x: 'x', // Configure x channel
    y: 'y', // Configure y channel
    src: 'url', // Configure image src channel
  },
  axis: { x: false, y: false },
});

chart.render();
```

For more examples, you can visit the [Chart Examples - Image](/en/examples#general-image) page.

## Configuration

| Property | Description                                                                                                                                   | Type              | Default | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `image` mark, including `x`, `y`, `src`, `size`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `image` mark                                                                                               | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `image` mark.

| Property | Description                                                                                                          | Type                          | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `image` mark, usually a numeric or character value from `data` to determine the `x` position of the image | [encode](/en/manual/core/encode) | -       | ✓        |
| y        | Bind the `y` property channel of the `image` mark, usually a numeric or character value from `data` to determine the `y` position of the image | [encode](/en/manual/core/encode) | -       | ✓        |
| size     | Bind the `size` channel of the `image` mark to control the display size of the image. Generally, the more information stored in the image, the more it needs to be enlarged | [encode](/en/manual/core/encode) | -       |          |
| src      | Bind the `src` image channel of the `image` mark, which will display images based on the corresponding data        |                               | -       | ✓        |

#### src

The final rendering is handled by G, so the supported data types are consistent with G's atomic Image graphic, supporting:

1. `Remote URL`: Network address
2. `file`: Local image path
3. `base64`: Chart base64 format string
4. `blob`: Blob object returned from image request

### style

| Property      | Description                                                                                                                       | Type                             | Default   | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- | -------- |
| width         | Width of the graphic. If not configured, the image is displayed by default according to its natural width and `size`           | _number_ \| _Function\<number\>_ | -         |          |
| height        | Height of the graphic. If not configured, the image is displayed by default according to its natural height and `size`         | _number_ \| _Function\<number\>_ | -         |          |
| opacity       | Overall opacity of the graphic                                                                                                    | _number_ \| _Function\<number\>_ | -         |          |
| shadowColor   | Shadow color of the graphic                                                                                                       | _string_ \| _Function\<string\>_ | -         |          |
| shadowBlur    | Gaussian blur coefficient of the graphic shadow                                                                                   | _number_ \| _Function\<number\>_ | -         |          |
| shadowOffsetX | Horizontal distance of the shadow from the graphic                                                                                | _number_ \| _Function\<number\>_ | -         |          |
| shadowOffsetY | Vertical distance of the shadow from the graphic                                                                                  | _number_ \| _Function\<number\>_ | -         |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'                                                                  | _string_ \| _Function\<string\>_ | `default` |          |

Try it out:

<Playground path="style/general/image/demo/contributor.ts" rid="image-style"></Playground>
