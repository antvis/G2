# G2: the Grammar of Graphics in Javascript

---

G2 is a visual coding, data-driven, with a high degree of ease of use and scalability, users do not need to pay attention to all kinds of complicated implementation details, a statement can be constructed a variety of interactive statistic chart.[detail](http://g2-dev.site.alipay.net/zh-cn/g2/3.x/index.html)

## Installing

```js
npm install @antv/g2
```

### Example


```html
<div id="c1"></div>
```

```js

const data = [
  {genre: 'Sports', sold: 275},
  {genre: 'Strategy', sold: 1150},
  {genre: 'Action', sold: 120},
  {genre: 'Shooter', sold: 350},
  {genre: 'Other', sold: 150},
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