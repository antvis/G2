# G2: the Grammar of Graphics in Javascript

---

G2 is a visualization grammar, a data-driven visual language with a high level of usability and scalability. It provides a set of grammars, takes users beyond a limited set of charts to an almost unlimited world of graphical forms. With G2, users can describe the visual appearance of a visualization just by one statement.

[More details about G2]().

## Installing

```js
npm install @antv/g2
```

### Example

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

[More examples](http://g2-dev.site.alipay.net/zh-cn/g2/3.x/demo/index.html)

## Contributing

- project structure
- core style guide
- work flow
