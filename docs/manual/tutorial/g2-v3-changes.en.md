---
title: G2 3.0 升级指引
order: 24
---

## 引入方式的改变

### cdn

```js
<script src="{{ url.g2 }}"></script>
```

### npm

```js
npm install @antv/g2 --save
```

同时我们为 G2 2.x 和 G2 3.0 提供了共存机制，当两个版本同时存在时，请使用 `G2_3` 命名空间来使用 3.0.0 的版本。

## 图表结构变化

1. G2 3.0 的图表 __只由一层 canvas 组成__，不再是之前的三层画布；
2. tooltip 统一使用 html 进行渲染。

## 变更的接口

  <table>
    <tbody>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">接口描述</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">G2 3.0 版本</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">G2 2.x 版本</div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">创建 chart 对象</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">new G2.Chart({
  container: &#x27;c1&#x27;,
  padding: 40,
  background: {
    stroke: &#x27;#bfbfbf&#x27;
  },
  plotBackground: {
    fill: &#x27;rgba(0, 0, 0, 0.1)&#x27;
  }
});
</code></pre>
          <div data-type="p"></div>
          <blockquote>
            <div data-type="p">说明：</div>
          </blockquote>
          <ol start="1" data-type="unordered-list">
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p"><code>container</code> 替代原先的 <code>id</code> 和 <code>container</code>，及支持 string 也支持传入 dom 对象，为了兼容旧版，也支持直接使用 <code>id</code></div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">原先 <code>plotCfg</code> 属性废弃，原先的配置分别在 <code>padding，background，plotBackground</code> 中设置。</div>
            </li>
          </ol>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">new G2.Chart({
  id: &#x27;c1&#x27;,
  plotCfg: {
    margin: 40,
    border: {
      stroke: &#x27;#bfbfbf&#x27;
    },
    background: {
      fill: &#x27;rgba(0, 0, 0, 0.1)&#x27;
    }
  }
})
</code></pre>
          <div data-type="p"></div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">创建 view</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.createView()
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.view()
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">加载数据</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.source(data, scaleDefs)
</code></pre>
          <blockquote>
            <div data-type="p">说明:</div>
          </blockquote>
          <div data-type="p">不再支持 <code>namesArr</code> 属性，如需要补全字段，请使用 DataView 的 transform</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.source(data[, scaleDefs, namesArr])
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">列定义</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.scale({});
chart.scale(&#x27;&#x27;, {});
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.col(&#x27;&#x27;, {});
chart.cols({})
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">坐标轴配置</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">接口使用方式不变，但是对可配置的属性结构以及部分属性名做了变化，详见
            <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/chart#whc6bq" class="bi-link">chart.axis() API</a>, 这里说明下变化较大的属性。</div><pre data-syntax=""><code class="language-">chart.axis(&#x27;x&#x27;, {
  label: {
    textStyle: {
      fill: &#x27;red&#x27;
    },
    autoRotate: true,
    offset: 10,
    formatter: val =&gt; {}
  }
});
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.axis(&#x27;x&#x27;, {
  labelOffset: 10,
  labels: {
    label: {
      fill: &#x27;red&#x27;
    },
    autoRotate: true
  },
  formatter: val =&gt; {}
});
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">图例配置</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">接口使用方式不变，但是对可配置的属性结构以及部分属性名做了变化，并且新添加了更多的功能，详见
            <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/chart#h34mcz" class="bi-link">chart.legend() API</a>
          </div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p"></div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">坐标系配置</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">G2 3.0 坐标系只支持 <code>rect,polar,helix,theta</code> 四种，原先的 <code>inner</code> 属性更名为 <code>innerRadius</code></div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p"></div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">分面</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.facet(&#x27;list&#x27;, {
  fields: [field],
  eachView(view, facet) {
     view.point().position(&#x27;x*y&#x27;);
     // guide
     // to do something else
  }
});
</code></pre>
          <blockquote>
            <div data-type="p">说明：</div>
          </blockquote>
          <div data-type="p">新增加了 matrix 分面，用于实现散点图矩阵。详见
            <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/chart#cizqmm" class="bi-link">chart.facet() API</a>。</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.facet([field], {
  type: &#x27;list&#x27;
});
chart.point().position(&#x27;x*y&#x27;)
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">tooltip 配置</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">G2 3.0 的 tooltip 使用 html 渲染。tooltip 配置的地方如下：</div>
          <ol start="1" data-type="unordered-list">
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">
                <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/tooltip" class="bi-link">chart.tooltip()</a>
              </div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">view.tooltip(true | false)</div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">
                <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/geometry#dlu5rn" class="bi-link">geom.tooltip()</a>
              </div>
            </li>
          </ol>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p"></div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">Guide 创建</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.guide().line({
  start: [startXValue, startYValue],
  end: [endXValue, endYValue],
  lineStyle: {
    stroke: &#x27;#999&#x27;,
    lineDash: [0, 2, 2],
    lineWidth: 3
  }
});
</code></pre>
          <div data-type="p"></div>
          <blockquote>
            <div data-type="p">说明：</div>
          </blockquote>
          <ol start="1" data-type="unordered-list">
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">原先的 chart.guide().rect() 更名为 chart.guide().region()</div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">移除 chart.guide().tag()</div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">chart.guide().line() 支持文本</div>
            </li>
          </ol>
          <div data-type="p"></div>
          <div data-type="p">详见
            <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/chart#gokznc" class="bi-link">chart.guide() API</a>
          </div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.guide().line([startXValue, startYValue], [endXValue, endYValue], {
  stroke: &#x27;#999&#x27;, // 线的颜色
  lineDash: [0, 2, 2], // 虚线的设置
  lineWidth: 3 // 线的宽度
});
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">数据过滤</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.filter(&#x27;a&#x27;, val =&gt; {});
</code></pre>
          <div data-type="p">详见
            <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/chart#ybmudb" class="bi-link">chart.filter() API</a>
          </div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.filter(&#x27;a&#x27;, []);
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">geom 创建</div>
        </td>
        <td rowspan="1" colSpan="1">
          <ol start="1" data-type="unordered-list">
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p"><code>chart.contour()</code> 废弃，使用 <code>chart.polygon()</code> 代替；</div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p"><code>chart.interval([&#x27;dodge&#x27;, &#x27;stack&#x27;])</code> 不再支持，请按照以下方式声明：</div>
            </li>
          </ol><pre data-syntax=""><code class="language-">chart.interval().adjust([&#x27;dodge&#x27;, &#x27;stack&#x27;])
</code></pre>
          <div data-type="p"></div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p"></div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">geom.position()</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">position(&#x27;x*y&#x27;)
</code></pre>
          <div data-type="p"></div>
          <blockquote>
            <div data-type="p">说明</div>
          </blockquote>
          <ol start="1" data-type="unordered-list">
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">不再支持加法运算符</div>
            </li>
            <li data-type="list-item" data-list-type="unordered-list">
              <div data-type="p">不再支持所有的统计函数嵌套方式</div>
            </li>
          </ol>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">position(&#x27;x*y&#x27;);
position(&#x27;x*(a+b)&#x27;);
positon(Stat.summary.percent(&#x27;x*y&#x27;))
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">geom.size()</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">size(&#x27;x&#x27;, [min. max])
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">size(&#x27;x&#x27;, max, min);
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">geom.label()</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">.label(&#x27;x&#x27;, {
    offset: -16,
    label: {
      fontWeight: &#x27;bold&#x27;,
      fontSize: 12
    },
    formatter: () =&gt; {}
})
</code></pre>
          <div data-type="p"></div>
          <div data-type="p">详见
            <a target="_blank" rel="noopener noreferrer nofollow" href="/zh/docs/api/geometry#84ebds" class="bi-link">geom.label() API</a>
          </div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">.label(&#x27;x&#x27;, {
    offset: -16,
    textStyle: {
        fontWeight: &#x27;bold&#x27;,
        fontSize: 12
    },
    renderer: () =&gt; {}
})
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">geom 的选中模式</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">geom.select()
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">geom.selected()
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">自定义 Shape</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">G2.Shape.registerShape(&#x27;interval&#x27;, {
  getPoints(cfg) {},
  draw(cfg, container) {}
});
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">G2.Shape.registShape(&#x27;interval&#x27;, {
  getShapePoints(cfg) {},
  drawShape(cfg, container) {}
});
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">自定义动画</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">G2.Animate.registerAnimation()
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">G2.Animate.registAnimation()
</code></pre></td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">shape.animte</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">/**
   * 执行动画
   * @param  {Object}   toProps  动画最终状态
   * @param  {Number}   duration 动画执行时间
   * @param  {Number}   delay    动画延迟时间
   * @param  {String}   easing   动画缓动效果
   * @param  {Function} callback 动画执行后的回调
   */
  shape.animate(toProps, duration, delay = 0, easing, callback)
</code></pre>
          <div data-type="p"></div>
          <div data-type="p">easing 的名称全部采用 [d3-easing](https://github.com/d3/d3-ease)。</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p"></div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" colSpan="1">
          <div data-type="p">事件</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.on(&#x27;tooltip:change&#x27;);
chart.on(&#x27;tooltip:show&#x27;);
chart.on(&#x27;tooltip:hide&#x27;)
</code></pre></td>
        <td rowspan="1" colSpan="1"><pre data-syntax=""><code class="language-">chart.on(&#x27;tooltipchange&#x27;);
chart.on(&#x27;tooltipshow&#x27;);
chart.on(&#x27;tooltiphide&#x27;)
</code></pre></td>
      </tr>
    </tbody>
  </table>

## 废弃的类、接口、属性、事件

* ~~G2.Frame~~
    废除 `Frame` ，由[ DataView](/zh/docs/api/data-set) 替代。
* ~~G2.Stat~~
    废除 `Stat`, 由 [DataView 的 transform](/zh/docs/api/data-set/#datasettransforms) 替代。
* ~~G2.Theme~~
    直接使用 `G2.Global`。
* ~~G2.Canvas~~
    直接使用 G2.G
* ~~G2.Coord~~
* ~~G2.Base~~
* ~~G2.ColorCalculate~~
* ~~G2.Layout~~
    由[ DataView 的 transform](/zh/docs/api/data-set/#datasettransforms) 相应的方法替代。
* ~~chart.col() 以及 chart.cols()~~
    使用 `chart.scale()` 替代
* ~~chart.guide().tag()~~
* ~~chart.guide().rect()~~
    使用 `chart.guide().region()` 替代。
* ~~chart.setMode()~~
* ~~chart.select()~~
* ~~chart.getPosition()~~
    使用 `chart.getXY()` 替代。
* ~~chart.contour()~~
    通过 ploygon 来实现。
* ~~syncXYScales~~
    度量统一，3.0 中在列定义中进行声明：

```javascript
chart.scale('x', {
  sync: true
})
```

* ~~plotCfg~~
* ~~chart.on(‘itemselected’)~~
* ~~chart.on(‘itemunselected’)~~
* ~~chart.on(‘itemselectedchange’)~~
* ~~chart.on(‘rangeselectstart’)~~
* ~~chart.on(‘rangeselectend’)~~
