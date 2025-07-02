---
title: 螺旋图
order: 18
screenshot: /screenshots/spiral.webp
category: ['comparison', 'time']
similar: ['rose']
---

## 螺旋图的简介

螺旋图是一种以螺旋形式展示时间序列数据的特殊可视化图表。它将时间数据从中心点开始，按照螺旋的方式向外扩展，既保持了时间的连续性，又通过螺旋的形式实现了空间的紧凑利用。螺旋图特别适合展示具有周期性模式的长时间序列数据，如一年中的每日温度变化、网站访问量的周期性波动等。

螺旋图通过将线性时间轴转换为极坐标系下的螺旋形状，不仅能够清晰地展示数据的时间趋势，还能够突出显示数据中的周期性规律和异常值。这种表现形式在处理大量时间序列数据时具有独特的视觉优势。

**英文名**：Spiral Chart, Spiral Plot

## 螺旋图的构成

### 基础螺旋图

螺旋图主要由以下几个部分构成：

1. **中心点（Center Point）**：螺旋的起始位置，通常代表时间序列的起点
2. **螺旋轨迹（Spiral Path）**：从中心向外扩展的螺旋路径，表示时间的流逝
3. **数据点（Data Points）**：沿螺旋轨迹分布的点，表示各时间点的数值
4. **角度编码（Angular Encoding）**：角度位置通常对应时间的周期性（如一天中的小时、一年中的月份）
5. **径向编码（Radial Encoding）**：距离中心的远近通常对应时间的推进或数值的大小

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 生成螺旋形的时间序列数据
  const data = [];
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * 8 * Math.PI; // 8圈螺旋
    const radius = i * 2; // 径向距离随时间增加
    const value = 50 + 30 * Math.sin(angle * 2) + Math.random() * 10; // 模拟数据波动
    data.push({
      time: i,
      angle: angle,
      radius: radius,
      value: value,
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'cartesian' },
    encode: {
      x: 'x',
      y: 'y',
      size: 'value',
      color: 'time'
    },
    scale: {
      size: { range: [2, 8] },
      color: { palette: 'spectral' }
    },
    style: {
      fillOpacity: 0.8,
      stroke: '#fff',
      strokeWidth: 1
    },
    axis: false,
    legend: {
      size: { title: '数值大小' },
      color: { title: '时间进程' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### 极坐标螺旋图

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 生成极坐标螺旋数据
  const data = [];
  for (let i = 0; i < 365; i++) {
    const dayOfYear = i;
    const angle = (dayOfYear / 365) * 2 * Math.PI; // 一年为一圈
    const radius = 50 + dayOfYear * 0.2; // 螺旋向外扩展
    const temperature = 20 + 15 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI/2) + Math.random() * 5;
    
    data.push({
      day: dayOfYear,
      angle: angle * 180 / Math.PI, // 转换为度数
      radius: radius,
      temperature: temperature,
      month: Math.floor(dayOfYear / 30) + 1
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'temperature',
      size: 4
    },
    scale: {
      color: { 
        palette: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      x: { type: 'linear' },
      y: { type: 'linear' }
    },
    style: {
      fillOpacity: 0.8,
      stroke: '#fff',
      strokeWidth: 0.5
    },
    axis: {
      x: { title: '角度 (度)' },
      y: { title: '时间进程' }
    },
    legend: {
      color: { title: '温度 (°C)' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## 螺旋图的应用场景

### 适合的场景

例子 1: **展示周期性时间序列数据**

螺旋图特别适合展示具有明显周期性的时间序列数据，如年度温度变化：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟一年365天的温度数据
  const data = [];
  for (let day = 0; day < 365; day++) {
    const angle = (day / 365) * 2 * Math.PI;
    const radius = 50 + day * 0.3;
    // 模拟季节性温度变化
    const baseTemp = 15 + 20 * Math.sin(angle - Math.PI/2);
    const dailyVariation = 5 * Math.sin(day * 0.1) + Math.random() * 3;
    const temperature = baseTemp + dailyVariation;
    
    data.push({
      day: day + 1,
      angle: angle * 180 / Math.PI,
      radius: radius,
      temperature: temperature,
      season: day < 90 ? '春季' : day < 180 ? '夏季' : day < 270 ? '秋季' : '冬季'
    });
  }

  chart.options({
    type: 'line',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'temperature'
    },
    scale: {
      color: { 
        palette: ['#0571b0', '#92c5de', '#f7f7f7', '#f4a582', '#ca0020']
      },
      x: { type: 'linear', range: [0, 1] },
      y: { type: 'linear' }
    },
    style: {
      strokeWidth: 2,
      strokeOpacity: 0.8
    },
    axis: {
      x: { 
        title: null,
        tick: false,
        label: false
      },
      y: { 
        title: '天数进程',
        grid: true
      }
    },
    legend: {
      color: { title: '温度 (°C)' }
    },
    title: '年度温度变化螺旋图'
  });

  chart.render();

  return chart.getContainer();
})();
```

例子 2: **展示长期趋势中的周期模式**

螺旋图能够在展示长期趋势的同时突出周期性模式：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟股票价格的螺旋展示（每个点代表一周）
  const data = [];
  let basePrice = 100;
  
  for (let week = 0; week < 104; week++) { // 2年的数据
    const angle = (week / 52) * 2 * Math.PI; // 一年为一圈
    const radius = 30 + week * 1.5; // 螺旋向外扩展
    
    // 模拟价格变化：长期上升趋势 + 季节性波动 + 随机变化
    const trendGrowth = week * 0.5;
    const seasonalEffect = 10 * Math.sin(angle * 2);
    const randomChange = (Math.random() - 0.5) * 5;
    
    basePrice += trendGrowth + seasonalEffect + randomChange;
    const weeklyReturn = randomChange / basePrice * 100;
    
    data.push({
      week: week + 1,
      angle: angle * 180 / Math.PI,
      radius: radius,
      price: basePrice,
      return: weeklyReturn,
      year: Math.floor(week / 52) + 1
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'return',
      size: 'price'
    },
    scale: {
      color: { 
        palette: ['#d73027', '#f46d43', '#fdae61', '#ffffbf', '#abd9e9', '#74add1', '#4575b4']
      },
      size: { range: [3, 12] },
      x: { type: 'linear' },
      y: { type: 'linear' }
    },
    style: {
      fillOpacity: 0.7,
      stroke: '#fff',
      strokeWidth: 1
    },
    axis: {
      x: { title: '年度周期' },
      y: { title: '时间进程 (周)' }
    },
    legend: {
      color: { title: '周收益率 (%)' },
      size: { title: '股价' }
    },
    title: '股票价格螺旋趋势图'
  });

  chart.render();

  return chart.getContainer();
})();
```

例子 3: **多维数据的螺旋展示**

螺旋图可以同时展示多个维度的信息：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟网站访问数据的螺旋展示
  const data = [];
  for (let hour = 0; hour < 24 * 30; hour++) { // 30天的小时数据
    const dayHour = hour % 24;
    const day = Math.floor(hour / 24);
    const angle = (dayHour / 24) * 360; // 24小时为一圈
    const radius = 20 + day * 2; // 每天向外扩展
    
    // 模拟访问量：工作时间高，夜间低，周末不同
    let baseVisits = 100;
    if (dayHour >= 9 && dayHour <= 18) {
      baseVisits = 300; // 工作时间
    } else if (dayHour >= 19 && dayHour <= 22) {
      baseVisits = 200; // 晚间
    }
    
    const weekday = day % 7;
    if (weekday === 0 || weekday === 6) {
      baseVisits *= 0.7; // 周末降低
    }
    
    const visits = baseVisits + Math.random() * 50;
    const conversionRate = 2 + 3 * Math.random();
    
    data.push({
      hour: hour,
      dayHour: dayHour,
      day: day + 1,
      angle: angle,
      radius: radius,
      visits: visits,
      conversion: conversionRate,
      period: dayHour < 6 ? '深夜' : dayHour < 12 ? '上午' : dayHour < 18 ? '下午' : '晚间'
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      size: 'visits',
      color: 'conversion'
    },
    scale: {
      color: { 
        palette: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494']
      },
      size: { range: [1, 8] },
      x: { type: 'linear', domain: [0, 360] },
      y: { type: 'linear' }
    },
    style: {
      fillOpacity: 0.6,
      stroke: '#fff',
      strokeWidth: 0.5
    },
    axis: {
      x: { 
        title: '小时 (24小时制)',
        tickCount: 8
      },
      y: { title: '天数进程' }
    },
    legend: {
      color: { title: '转化率 (%)' },
      size: { title: '访问量' }
    },
    title: '网站访问量螺旋分析'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 不适合的场景

例子 1: **数据量过少的场景**

螺旋图需要足够的数据点来形成完整的螺旋形状，如果数据量太少，螺旋效果不明显，此时使用普通的折线图或散点图会更合适。

例子 2: **没有明显周期性的数据**

如果时间序列数据没有明显的周期性特征，螺旋图的优势无法体现，反而可能增加理解难度。

## 螺旋图的扩展

### 3D螺旋图

通过添加第三个维度来增强螺旋图的表现力：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 生成3D效果的螺旋数据
  const data = [];
  for (let i = 0; i < 200; i++) {
    const t = i / 20; // 时间参数
    const angle = t * 2 * Math.PI;
    const radius = 20 + t * 3;
    const height = Math.sin(t) * 30; // 高度变化
    
    // 投影到2D平面，通过透视效果模拟3D
    const perspective = 0.8 + 0.2 * Math.sin(angle);
    const x = radius * Math.cos(angle) * perspective;
    const y = radius * Math.sin(angle) * 0.6 + height * 0.4;
    
    data.push({
      time: i,
      x: x,
      y: y,
      radius: radius,
      height: height + 50, // 偏移以便显示
      depth: perspective
    });
  }

  chart.options({
    type: 'line',
    data,
    encode: {
      x: 'x',
      y: 'y',
      color: 'height',
      size: 'depth'
    },
    scale: {
      color: { 
        palette: ['#440154', '#31688e', '#35b779', '#fde725']
      },
      size: { range: [1, 4] }
    },
    style: {
      strokeOpacity: 0.8
    },
    axis: false,
    legend: {
      color: { title: '高度维度' },
      size: { title: '深度透视' }
    },
    title: '3D效果螺旋图'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 多层螺旋图

展示多个相关数据系列的螺旋对比：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 生成多层螺旋数据
  const data = [];
  const series = ['系列A', '系列B', '系列C'];
  
  series.forEach((seriesName, seriesIndex) => {
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * 4 * Math.PI;
      const baseRadius = 30 + seriesIndex * 15; // 不同系列不同半径
      const radius = baseRadius + i * 0.8;
      
      // 不同系列有不同的数据模式
      let value;
      if (seriesIndex === 0) {
        value = 50 + 20 * Math.sin(angle);
      } else if (seriesIndex === 1) {
        value = 45 + 25 * Math.cos(angle * 0.5);
      } else {
        value = 55 + 15 * Math.sin(angle * 2);
      }
      
      value += Math.random() * 10;
      
      data.push({
        time: i,
        angle: angle * 180 / Math.PI,
        radius: radius,
        value: value,
        series: seriesName
      });
    }
  });

  chart.options({
    type: 'line',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'series'
    },
    scale: {
      color: { 
        palette: ['#1890ff', '#52c41a', '#fa8c16']
      },
      x: { type: 'linear' },
      y: { type: 'linear' }
    },
    style: {
      strokeWidth: 2,
      strokeOpacity: 0.8
    },
    axis: {
      x: { title: null },
      y: { title: '螺旋进程' }
    },
    legend: {
      color: { title: '数据系列' }
    },
    title: '多层螺旋对比图'
  });

  chart.render();

  return chart.getContainer();
})();
```

## 螺旋图与其他图表的对比

### 螺旋图和[折线图](/charts/line)

- 螺旋图通过螺旋形式节省空间，适合展示长时间序列数据
- 折线图在直线坐标系中展示，更直观地显示数据变化趋势
- 螺旋图更能突出周期性模式，折线图更适合分析精确的时间趋势

### 螺旋图和[极坐标图](/charts/polar)

- 螺旋图是极坐标图的特殊形式，强调时间的螺旋进展
- 极坐标图通常用于展示角度和半径的关系
- 螺旋图更适合时间序列，极坐标图更适合方向性数据

### 螺旋图和[热力图](/charts/heatmap)

- 螺旋图通过螺旋路径展示时间序列的连续性
- 热力图通过颜色矩阵展示数据密度和模式
- 螺旋图保持时间顺序，热力图更适合展示分类数据的分布

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>