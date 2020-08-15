#### 4.0.15 (2020-08-14)

##### Documentation Changes

*  add part API documents ([#2718](https://github.com/antvis/g2/pull/2718)) ([6e5769f9](https://github.com/antvis/g2/commit/6e5769f94a47aab9083305d53cc0584fe3d65f3b))

##### New Features

* **background:**  使用 shape 来绘制 dark 的背景色 ([#2745](https://github.com/antvis/g2/pull/2745)) ([6adbdbf4](https://github.com/antvis/g2/commit/6adbdbf4e23bab95e924475f0e4cdf706594e731))
* **annotation:**  text annotation 提供content回调，将图表filteredData作为回调参数 ([#2735](https://github.com/antvis/g2/pull/2735)) ([0e4d1f12](https://github.com/antvis/g2/commit/0e4d1f12e955f71bb7129219312af817f09228ff))
*  Tooltip supported customContent ([#2739](https://github.com/antvis/g2/pull/2739)) ([5dc5a36e](https://github.com/antvis/g2/commit/5dc5a36e92e5704719acb13d96b4c8194f9766e8))
*  add api-extractor  for extract typescript declare file ([#2725](https://github.com/antvis/g2/pull/2725)) ([22620898](https://github.com/antvis/g2/commit/22620898ae650ea0da70ee2ec211bfd32c1d8303))
* **pie-label:**  add pie-outer label layout ([#2726](https://github.com/antvis/g2/pull/2726)) ([d94157da](https://github.com/antvis/g2/commit/d94157dad468a306443634dc4b4df48f5bfea5c0))

##### Bug Fixes

* **change-size:**  when size is equal, not render ([#2734](https://github.com/antvis/g2/pull/2734)) ([3f9f0ac1](https://github.com/antvis/g2/commit/3f9f0ac1a8b1e4da9d84134cbd4625cd017a257a))
*  resolve tooltip debounce ([#2733](https://github.com/antvis/g2/pull/2733)) ([f5114f47](https://github.com/antvis/g2/commit/f5114f473fb17661fe65aaa61550e341dba0e8f5))
*  bugs in wordcloud demo ([#2723](https://github.com/antvis/g2/pull/2723)) ([61abf9de](https://github.com/antvis/g2/commit/61abf9de512bd2fc5e9877b6353b13daf9b8663e))
*  [#2706](https://github.com/antvis/g2/pull/2706) ([#2710](https://github.com/antvis/g2/pull/2710)) ([897e2bbb](https://github.com/antvis/g2/commit/897e2bbb455e02ede853e6ff1103dab016b18e9b))

##### Refactors

* **axis:**  axis update 包含有 create 逻辑,删除容易的 create 逻辑,简化代码 ([#2741](https://github.com/antvis/g2/pull/2741)) ([757e21d6](https://github.com/antvis/g2/commit/757e21d641d83913cd7c8e0fcdadd88489d9f3d4))

#### 4.0.14 (2020-07-27)

##### New Features

- **Polygon** 为 polygon 添加 square shape，用于绘制正方形矩阵块，同时支持 size 通道映射
- **Facet** 分面标题支持格式化
- **Legend** 图例新增 maxItemWidth 属性，超出自动省略
- **Annotation** annotation 中文本绘制能力增强，可设置自动缩略以及背景框

##### Bug Fixes

- 坐标轴 verticalLimitLength 的参照物是画布 ([#2692](https://github.com/antvis/g2/pull/2692)) ([85d94fca](https://github.com/antvis/g2/commit/85d94fcac96fc1b2eaf35d8d014fa2c4b3f6548b))
- 修复 'top-right' 类型的图例位置主题默认 maxItemWidth 不生效的问题

#### 4.0.13 (2020-07-20)

##### Chores

- v4.0.13 ([0f184303](https://github.com/antvis/g2/commit/0f184303f2a2429c5b82ecc762b8c49c4807308e))

##### Documentation Changes

- modified scale.md document error ([#2655](https://github.com/antvis/g2/pull/2655)) ([232241d9](https://github.com/antvis/g2/commit/232241d9e0e5922454e7e3de35e5f2df7032ee6a))
- uniform AntV navbar's order and naming ([#2652](https://github.com/antvis/g2/pull/2652)) ([abcb5ae8](https://github.com/antvis/g2/commit/abcb5ae81bfbc7fec867f07a5596578616e708bd))
- **event.en.md:** fix typo ([#2644](https://github.com/antvis/g2/pull/2644)) ([6ae5c520](https://github.com/antvis/g2/commit/6ae5c520c8710727b7ccddb59a4396a1be471616))

##### New Features

- path line area 三类 Geometry 支持 showSinglePoint 属性，用于支持单点孤立数据点的绘制 ([#2666](https://github.com/antvis/g2/pull/2666)) ([3f37f287](https://github.com/antvis/g2/commit/3f37f287a1defdde0bb6cf1f939d74dad4c5e12d))

##### Bug Fixes

- **version:** update version string ([e5f73439](https://github.com/antvis/g2/commit/e5f73439b64a19da3f1a8e562e27c31344b2a8ca))
- fix [#2658](https://github.com/antvis/g2/pull/2658) ([#2659](https://github.com/antvis/g2/pull/2659)) ([1b3d214c](https://github.com/antvis/g2/commit/1b3d214c0502b9a3c8cb53fe026f0487f27cf850))
- tooltip controller isVisible not update ([#2604](https://github.com/antvis/g2/pull/2604)) ([82c2c8c6](https://github.com/antvis/g2/commit/82c2c8c6793f457a895c6dc9f5a4ac15362a27df))
- 修复 interval 下 shape='line' 设置 lineCap 失效的问题 ([#2645](https://github.com/antvis/g2/pull/2645)) ([a8ee3dc4](https://github.com/antvis/g2/commit/a8ee3dc43c252f838bc3da1ce60dd973db9fa1bf))
- issues of pie demo 2 ([#2643](https://github.com/antvis/g2/pull/2643)) ([98cfc07f](https://github.com/antvis/g2/commit/98cfc07f12baca65a388eb4e6313445121c3bc1d))
- partial issues of code sandbox caused by relative path ([#2641](https://github.com/antvis/g2/pull/2641)) ([4d4910f0](https://github.com/antvis/g2/commit/4d4910f07a2756b585528aa81e88fa02d2afbe0d))
- do not use tooltip title for tooltip item name ([#2593](https://github.com/antvis/g2/pull/2593)) ([c81733b8](https://github.com/antvis/g2/commit/c81733b8a6fcb23c3340fa3a37f4ba10d7158faf))
- 修复[#2279](https://github.com/antvis/g2/pull/2279) canvas resize 之后 tooltip 越界的问题 ([#2615](https://github.com/antvis/g2/pull/2615)) ([31bd0d01](https://github.com/antvis/g2/commit/31bd0d0121ededffcff9cef1dee4d1c57ab8ec65))
- **pie-label:** 饼图 label 若干修复 ([#2648](https://github.com/antvis/g2/pull/2648)) ([235aa272](https://github.com/antvis/g2/commit/235aa27283ca35f80c5996015886b7660dbf9559))

##### Refactors

- 删除不必要的代码 ([#2607](https://github.com/antvis/g2/pull/2607)) ([61153676](https://github.com/antvis/g2/commit/6115367677297415755512e2c4bec649988fab40))

#### 4.0.12 (2020-06-24)

##### Chores

- 添加 lint-staged 配置 ([#2600](https://github.com/antvis/g2/pull/2600)) ([a776ddd1](https://github.com/antvis/g2/commit/a776ddd15d8b4f7456710d38c80f6a53c37cd24e))

- 优化 pre-commit hooks，github ci 服务太慢并且做不到强行约束，信息很容易忽略掉

##### Bug Fixes

- highlight-by-x Action toggle() 失效的问题

#### 4.0.11 (2020-06-18)

##### Documentation Changes

- fix indentation ([#2580](https://github.com/antvis/g2/pull/2580)) ([4ffdff52](https://github.com/antvis/g2/commit/4ffdff52954bbdae7d826ac25e536d5c31a9560f))
- **site:** update size nav ([#2572](https://github.com/antvis/g2/pull/2572)) ([3ec492ee](https://github.com/antvis/g2/commit/3ec492ee146206f1b06b93264168bd7d05c87283))

##### Bug Fixes

- **2570:** 修复 appendPadding 设置后，图表更新不断缩小的问题 ([#2577](https://github.com/antvis/g2/pull/2577)) ([402e7b01](https://github.com/antvis/g2/commit/402e7b018423516a3d5bdbb39bdf666491c43306))
- **legend:** 修改 legend 布局的宽高限制 ([#2587](https://github.com/antvis/g2/pull/2587)) ([055043f1](https://github.com/antvis/g2/commit/055043f11142cbdeec82e606eb3882f8a58db5c3))
- error if chart destroyed during resize ([#2547](https://github.com/antvis/g2/pull/2547)) ([2290ed38](https://github.com/antvis/g2/commit/2290ed38ea851936dd0066f1ee41ce9572ba30ee))

#### 4.0.10 (2020-06-09)

##### New Features

- 增加 appendPadding 调节 padding ([#2502](https://github.com/antvis/g2/pull/2502)) ([fe352ce3](https://github.com/antvis/g2/commit/fe352ce315ad2384b0f8fb3413e8b6612952261b))

##### Bug Fixes

- **2505:** 修复图表暗黑主题无背景色的问题 ([#2512](https://github.com/antvis/g2/pull/2512)) ([1a025c0a](https://github.com/antvis/g2/commit/1a025c0abc7ea42b820bdd9f2ce4160a6319e08f))
- **annotation:** fix regionFilter not work on sub view ([#2531](https://github.com/antvis/g2/pull/2531)) ([e8c58349](https://github.com/antvis/g2/commit/e8c5834941987202cc86506e6ef1963a3f3e49e2))
- **line 40:** replace '!=' with '!==' ([#2519](https://github.com/antvis/g2/pull/2519)) ([02a22a56](https://github.com/antvis/g2/commit/02a22a56a5351d567ed374fbcc1316e891f668a1))

#### 4.0.9 (2020-05-28)

##### New Features

- support legend layout margin ([#2497](https://github.com/antvis/g2/pull/2497)) ([bb18ddf1](https://github.com/antvis/g2/commit/bb18ddf16a03950a15efe44feb32a4c3385ea33d))

##### Bug Fixes

- **#2495:** fix layout error after render twice ([#2496](https://github.com/antvis/g2/pull/2496)) ([4abb8930](https://github.com/antvis/g2/commit/4abb89305496583f843d217f2551c3f0ed6dceda))
- 图例应于坐标轴对齐 ([#2488](https://github.com/antvis/g2/pull/2488)) ([f8262a2e](https://github.com/antvis/g2/commit/f8262a2efa0d876dd9395cb4d1db208b42eb80c9))
- update tooltip when mousemove on tooltip container ([#2460](https://github.com/antvis/g2/pull/2460)) ([8cbc5a64](https://github.com/antvis/g2/commit/8cbc5a6450660829e7ffe4964f544fe4263b1352))

#### 4.0.8 (2020-05-18)

##### Documentation Changes

- **upgrade:** 完善升级文档 ([#2403](https://github.com/antvis/g2/pull/2403)) ([b4451df7](https://github.com/antvis/g2/commit/b4451df7ef49e751f8ed6e9d6a088fa217f9b293))

##### New Features

- **slider:** add `formatMask` property ([aac56a86](https://github.com/antvis/g2/commit/aac56a86751061a135c40dee6ac843028a1d7838))
- **interaction:** use get method ([78e2c32f](https://github.com/antvis/g2/commit/78e2c32f434591ee1e30ba54e004e3a000e3054d))

##### Bug Fixes

- **2365:** 修复极坐标系圆弧坐标轴文本不响应坐标系 rotate 的问题 ([#2424](https://github.com/antvis/g2/pull/2424)) ([5c2bc3ff](https://github.com/antvis/g2/commit/5c2bc3ffe896339457e264679559a5ce738f439a))
- **2371:** 修复未判断 labels 为空导致的饼图图例过滤错误 ([#2422](https://github.com/antvis/g2/pull/2422)) ([a30eb71f](https://github.com/antvis/g2/commit/a30eb71f403c369b7b2f3b01617a36ec14b8a838))
- **2377:** registerTheme 时，需要和基础主题进行合并 ([#2416](https://github.com/antvis/g2/pull/2416)) ([0c220765](https://github.com/antvis/g2/commit/0c22076559c76f548f6d4c4a8a5bbaeebf9d5afb))
- **2412:** 修复 axis title offset 设置不生效的问题，默认自动计算 ([#2417](https://github.com/antvis/g2/pull/2417)) ([a220df31](https://github.com/antvis/g2/commit/a220df3199e51a26fbba3245d6f65ec2135389ef))
- fix min/max value map to color ([#2442](https://github.com/antvis/g2/pull/2442)) ([b3d41214](https://github.com/antvis/g2/commit/b3d412142736e4415d53463f52c04fcd00b23817))

#### 4.0.7 (2020-04-17)

##### Bug Fixes

- do not set tooltip position when follow is false ([62f5e279](https://github.com/antvis/g2/commit/62f5e2795794427bbb905758f368adef56ecde8e))
- **delegation:** mouse leave failed ([d3a30ed2](https://github.com/antvis/g2/commit/d3a30ed21cd95af0db8466cbb1a0662d5179d996))
- **element:** 修复获取 state style 报错的问题 ([320e22f0](https://github.com/antvis/g2/commit/320e22f0627f1f2a0e1bf3c5c9211d043953fd8c))

#### 4.0.6 (2020-04-10)

##### New Features

- view 上添加手势事件支持 ([e4f74a22](https://github.com/antvis/g2/commit/e4f74a224fee34afa29cb272ceef854f2d3bce41))

##### Bug Fixes

- **geometry:** geometry.clear() 以及 destroy() 时要清空、销毁内部变量 ([c89ff974](https://github.com/antvis/g2/commit/c89ff97479a7a1e3dd3014e5440aad1d52f4311e))
- **#2272:** 当映射数据中不存在 x 和 y 时，不绘制 label ([df60733e](https://github.com/antvis/g2/commit/df60733e206d8d83bfd46b485df32a6ba0e80bd4))

##### Performance Improvements

- 性能优化，详见 [MR](https://github.com/antvis/G2/pull/2221)

##### Documentation Changes

- 添加 Gestrue 手势使用文档 ([2c459853](https://github.com/antvis/g2/commit/2c459853885b4f4e23c0d33c6542d5b83b527df8))

#### 4.0.5 (2020-04-08)

##### Bug Fixes

- **#2261:** 修复 tooltip 数据查找补全的问题 ([4b29feab](https://github.com/antvis/g2/commit/4b29feabbe664d413a17355002eb1b24e0e35553))
- **#2241:** 修改图表更新过程中，tooltip 未及时消失而出现内容为空的问题 ([0e9e65f5](https://github.com/antvis/g2/commit/0e9e65f56f61cb4da73a1d08bc601ff3f10883d5))

#### 4.0.4 (2020-04-03)

##### New Features

- **event:** 添加 plot:enter 和 plot:leave 事件 ([1f9b96be](https://github.com/antvis/g2/commit/1f9b96be4bac0155dd0063a1197341e6639499ff))
- **interaction:**
  - tooltip 支持移动端 ([8e6cddf7](https://github.com/antvis/g2/commit/8e6cddf71f21d450557eece79622f23f4dd1a488))
  - avoid event error ([3ae581b9](https://github.com/antvis/g2/commit/3ae581b9726d438948ba7eaf297f24118a4c982c))
- **view:**
  - 支持 plot 上的移动事件触发 ([4a86b08a](https://github.com/antvis/g2/commit/4a86b08af931f05e96da1cb462c04fbae6084b64))
  - 添加一些方法的别名，以兼容 3.x，但是这些方法将会在 4.1 版本中移除 ([6356363a](https://github.com/antvis/g2/commit/6356363a02c672f7e6074d8106be06a6558cf6ac))
- **force-fit:** add forceFit api for chart ([719b61b3](https://github.com/antvis/g2/commit/719b61b3d6a8cfb454b08195674c48405a39a698))

##### Bug Fixes

- **theme:**
  - 修复主题切换后，Geometry 样式未更新的问题 ([7e75a543](https://github.com/antvis/g2/commit/7e75a54373a2cb897a2ac01cc9e7f7a65759226f))
  - 修复在 chart 构造函数中设置 theme 对象不生效的问题. Closed [#2258](https://github.com/antvis/g2/pull/2258) ([6863a69f](https://github.com/antvis/g2/commit/6863a69f43af0306f7871ad123b57e27539ccbca))
  - 移除 label 的描边，会带来性能损耗 ([99b799d9](https://github.com/antvis/g2/commit/99b799d9d39a3f9ba74e28fea7771f5047ef257e))
- 移除 coord.getRadius() 的 ts-ignore 注释 ([a02b7316](https://github.com/antvis/g2/commit/a02b7316ffe27ac219aa52ba2f6960092a0fb951))
- **geometry:** 修复层叠点图上下区间点全部绘制的问题。Closed [#2202](https://github.com/antvis/g2/pull/2202) ([d7edf5e6](https://github.com/antvis/g2/commit/d7edf5e658ab32788a94d80eeb65555cf572c8a8))
- **view:** 修复 syncScale() 调用时机不当导致分面渲染性能直线下降的问题 ([d492c0ea](https://github.com/antvis/g2/commit/d492c0ea4090fd784bc1e7e46c44d2e4a80e969e))
- **#2264:** 修复 canvas 样式导致的 resize 问题, 修复容器层级 ([10200851](https://github.com/antvis/g2/commit/10200851cd80799f5aa615e6b1e85af34334b869))
- **#2232:** fix 当 legend item 点击的时候, 图例项变少 ([19ca46ff](https://github.com/antvis/g2/commit/19ca46ff9a64bea6cdf7ce8dc72505db5742c79a))
- **#2173:** fix legend overlap when in same direction ([59db3b59](https://github.com/antvis/g2/commit/59db3b59970a5f9ffee43a37e81afcc3113148f0))
- **#2212:** fix when slider option has no start or end ([36a3b5db](https://github.com/antvis/g2/commit/36a3b5db49d059cea36d2226cc769e37d67af14f))
- **#2222:** fix scale pool memory leak ([7f23a4c0](https://github.com/antvis/g2/commit/7f23a4c0c13f283cc9ff3bca266744edfad01706))
- **#2215:** fix chart min size = 100 ([e49646d3](https://github.com/antvis/g2/commit/e49646d3153ffcc27b71aee38ba3ad0b2ab103b4))
- **#2195:** fix autoFit 不生效 ([92d607ec](https://github.com/antvis/g2/commit/92d607ec5408d1ec949ebd95209c84b04c73b944))

##### Refactors

- use unpkg other than browser field in package.json ([0185949b](https://github.com/antvis/g2/commit/0185949b34b38636eab95f33446611b505bb3a94))
- **theme:** 移除注册样式表机制，只提供根据样式表生成主题的方法 ([9b0020ad](https://github.com/antvis/g2/commit/9b0020adfe26d6853ca391395e7e4769e96b5919))
- **geometry:** 将获取 shape 默认属性时机从 Element 绘制提到 Geometry getDrawCfg() ([cf9b2f4f](https://github.com/antvis/g2/commit/cf9b2f4ff97483cd1fa2bf43e9b2c594e18bdc64))
- **sync-scale:** use Map for perf ([76813745](https://github.com/antvis/g2/commit/7681374565c1c6baf77919b6b090a23ff49af503))

#### 4.0.3 (2020-03-23)

##### New Features

- **axis:** 支持转置极坐标坐标轴的渲染， Closed [#1744](https://github.com/antvis/g2/pull/1744) ([67a8beb0](https://github.com/antvis/g2/commit/67a8beb042093774f6746450251ce2bfd472719f))
- **scale:** 支持用户指定确定数据 id 的字段 ([25caa91f](https://github.com/antvis/g2/commit/25caa91f05dd918b3e798b57b6d6f524f67354cb))
- **tooltip:**
  - `position` 属性新增 'auto' 值配置，并作为默认值 ([8c3fda47](https://github.com/antvis/g2/commit/8c3fda47779d49649776a16e55829f20793004f9))
  - tooltip 体验优化，当鼠标离开 tooltip 内容框时，非 locked 状态自动隐藏 ([9f8fcad2](https://github.com/antvis/g2/commit/9f8fcad2175704dc6f3ba742c77e4f1d95e9e211))
  - 通过 pointer-events 属性来达到 tooltip 躲避鼠标的交互效果 ([2e750aa4](https://github.com/antvis/g2/commit/2e750aa4fab269d573da9d035804e1bcd8fe53de))([d5f1e21c](https://github.com/antvis/g2/commit/d5f1e21ca9508f957d994634dc62d1d2b7f2cfcc))
- **event:** 添加 element:statechange 事件 ([de161f49](https://github.com/antvis/g2/commit/de161f49eb450445269ab8d65291b5a25afae393))
- **interaction:** 新增 legend, axis highlight actions ([ab256905](https://github.com/antvis/g2/commit/ab2569053ceca7d09e63f307a425c819a9886372))
- **action:**
  - export getActionClass, extend action ([db635b7e](https://github.com/antvis/g2/commit/db635b7ed685debf230cf83501c98f2dc11e6c1a))
  - 添加 `throttle` 及 `debounce` 属性配置 ([a7e9f18d](https://github.com/antvis/g2/commit/a7e9f18de090a79116cc85a07d9a06cdc878448c))
- export 所有的类型定义，生成对应的 API 文档 ([219126ed](https://github.com/antvis/g2/commit/219126ed063705f2361484bc99f4002bea0fc2e2))

##### Bug Fixes

- **label:**
  - 修复极坐标下的第一个 label 对齐的问题 ([8be4555d](https://github.com/antvis/g2/commit/8be4555d385b5efb307c7751ec791c59b8e4f1a1))
  - 修复漏斗图 label 问题：更新以及尖底漏斗图最后一个 label 的位置错误，Closed [#1847](https://github.com/antvis/g2/pull/1847) ([cfd7c0a5](https://github.com/antvis/g2/commit/cfd7c0a5e619f2cbb0dd790794913ac28915665a))
  - 默认饼图 label 连接线颜色同图形元素颜色一致 ([78323aae](https://github.com/antvis/g2/commit/78323aae95913d24294258de35a74f73d6c82e3f))
  - 修复 interval 类型 label 在转置直角坐标系下 position 计算错误问题 ([39d02120](https://github.com/antvis/g2/commit/39d02120c272e355a8af72c3af3834da6cd705e9))
- **tooltip:**
  - 修复 tooltip markers 没有正确显示/隐藏的问题 ([394dad27](https://github.com/antvis/g2/commit/394dad272588a0dff42a279e0bfa4ca618c3eacc))
  - 修复 tooltip 数据为空时不隐藏的问题 ([76edffdb](https://github.com/antvis/g2/commit/76edffdbeee5764d2433351cea8cd05e1946ce7e))
  - 修复 tooltip 相同数据显示隐藏再显示时不展示的问题，Closed [#2174](https://github.com/antvis/g2/pull/2174), [#2175](https://github.com/antvis/g2/pull/2175) ([c3357c1f](https://github.com/antvis/g2/commit/c3357c1f2ae09ab7b024c343be52a61dd4c3c83f))
- **Action:**
  - **active-region:** 修复背景框计算错误的问题 ([7b5f651b](https://github.com/antvis/g2/commit/7b5f651b166f108a7c3a366f8859e51aa787a7af))
- **options:** 修复 chart.updateOptions() 更新失败的问题 ([b1dff91b](https://github.com/antvis/g2/commit/b1dff91b0220c38fd68e130d6112d34eb92bc42c))
- **event:** 调整 afterpaint 的抛出时机 ([f1f8206c](https://github.com/antvis/g2/commit/f1f8206c3b6fc9db835012a73515684d3a049634))
- **geometry:** 修复 element 打标策略导致的数据未被全部绘制的问题，Closed [#2141](https://github.com/antvis/g2/pull/2141) ([071fa7c2](https://github.com/antvis/g2/commit/071fa7c2c0959eae2b946c628e65e5fd242c18d6))
- **data:** 修复使用数据引用造成数据未更新的问题 ([bb258fc6](https://github.com/antvis/g2/commit/bb258fc67935838ecc3dc90a2eb6ca834b8bf6e4))
- **event** 修复当鼠标在图表上页面无法滚动的问题，Closed [#2111](https://github.com/antvis/G2/issues/2111)

##### Refactors

- **label:**
  - 重构 GeometryLabel。将 labels 组件的生成渲染移入 GeomtryLabel 中 ([4537b965](https://github.com/antvis/g2/commit/4537b965e61f9fd2774b76647a7d9a845c8d97fa))
  - 重构 Label 相关模块，将饼图 label 的布局调整到 LabelLayout 中 ([402d6c52](https://github.com/antvis/g2/commit/402d6c52c44e83a478abfb3c0567526e22414a1f))

##### Chores

- 更新图表演示实例，优化实现代码，同时新添加动态气泡图以及带坐标轴的极坐标下的层叠柱状图

| ![2020-03-22 18-17-49.2020-03-22 18_20_32.gif](https://user-images.githubusercontent.com/6628666/77248451-62558780-6c74-11ea-951e-02d5ed652edf.gif) | ![image.png](https://user-images.githubusercontent.com/6628666/77175281-55faee80-6afd-11ea-9703-4f501aec74dc.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |


##### Documentation Changes

- 更新事件、交互以及 FAQ 文档

#### 4.0.2 (2020-03-16)

##### New Features

- 将 Util 在从 core.ts 移到 src/index.ts 下 ([e8d05d16](https://github.com/antvis/g2/commit/e8d05d16fc388c525be46366e1646c88b09a1a72))
- 添加一些矩阵变换相关的工具方法 ([921a45f3](https://github.com/antvis/g2/commit/921a45f344c55b80a2fc6c0c5a031c88bafca9d8))
- **interaction:**
  - review and brush-x, update docs ([d1b76068](https://github.com/antvis/g2/commit/d1b76068947fe0d56b437348c813e001b56489b6))
  - path mask improve ([e947ec3e](https://github.com/antvis/g2/commit/e947ec3ea9516e47ca91c088fa7864c8b92f2256))

##### Bug Fixes

- **slider:** when changeData, slider min max text should be update ([b06c9ee3](https://github.com/antvis/g2/commit/b06c9ee346cea637cacf806e154e91a942333ccd))
- **auto-fix:** fix height when autoFit and container has padding ([1102a4a7](https://github.com/antvis/g2/commit/1102a4a7b2125e282747fcd5d0450c58c6e92195))
- **annotation:** 修复 chart.annotation() 接口中 animateOption 属性不生效的问题，Closed [#2146](https://github.com/antvis/g2/pull/2146) ([6a3ecba1](https://github.com/antvis/g2/commit/6a3ecba1df65861818624eb2e711dcbdccbb19f9))
- **scale:** 修复日期正则表达式将 '20200229' 判断为 time 类型的问题, related [#2115](https://github.com/antvis/g2/pull/2115) ([f31ccca7](https://github.com/antvis/g2/commit/f31ccca70fa8ccebc06e66bfa88f65d45b95b849))

#### 4.0.1 (2020-03-09)

##### Chores

- 更新网站 H5 模板 ([624e5023](https://github.com/antvis/g2/commit/624e5023e67a98a06018fefc6a38d2fef1847b1d))

##### New Features

- **action:** 添加新的 Action 类: [ElementLinkByColor](https://github.com/antvis/G2/blob/master/src/interaction/action/element/link-by-color.ts) ([67c66d4e](https://github.com/antvis/g2/commit/67c66d4ede5fd848140b28b3fddeb3f6d3974e36))

## 4.0.0 正式发布 (2020-03-01)

作为图形语法（the Grammar of Graphics）的前端实现，G2 已经经历多个版本的迭代。本次 G2 4.0 是一个新的起点，我们对底层架构做了大量的重构工作，G2 会更加关注于：**图形语法，交互语法**以及**可视化组件体系**的建设。我们希望 G2 4.0 会成为一个专业的、给用户带来更多可能性的可视化底层引擎，在满足传统型统计图表需求的基础上，能够更好地赋能于（但不限于）：

- 让开发者基于 G2 4.0 可以更快更好地封装上层图表库
- 让交互式可视化更简单
- 成为可视化领域的专业工具

虽然我们对 G2 内部进行了大规模的重构工作，包括数据处理流程（引入数据更新机制），图表组件，view 渲染更新逻辑以及事件、交互机制改造等，但是为了保障用户项目能够更平滑得升级，G2 4.0 保持了最大程度上的兼容，但是仍然有一部分 breaking change 需要注意。

### 变更说明

#### 整体变化

- 全面拥抱 TypeScript。
- 全新的可视化组件：面向交互，体验优雅。
- 强大的 View 模块：可单独使用，具备完备的可视化组件、事件，支持 View 嵌套以及自动布局。
- 全新的交互语法。
- 绘图引擎升级至 G 0.4 版本，支持双引擎切换。
- 引入数据更新机制。
- 动画机制改造，更细粒度，体验更好。
- 模块化管理，提供更加灵活的扩展机制。

#### API 变更

G2 4.0 在功能上全面兼容 3.x 的功能，在 API 接口上，我们进行了一些优化，在最大程度兼容 3.x 语法的基础上，提供了对用户更加友好，更易理解的函数命名以及更合理的配置项结构，具体的变化记录如下：

##### 不兼容改动

- ❌ `chart.source()` 接口废弃，请使用 `chart.data()` 接口，同时列定义请通过 `chart.scale()`  接口进行定义。
- ❌ `chart.coord()` 接口废弃，请使用 `chart.coordinate()`。
- ❌ `chart.guide()` 接口废弃，请使用 `chart.annotation()`，同时不再支持 `chart.guide().html()`。
- ❌ `chart.view()`  接口废弃，请使用 `chart.createView()`。
- ❌ `chart.interact()`  接口废弃，请使用 `chart.interaction()`。
- ❌ `chart.repaint()`  接口废弃，请使用 `chart.render(update: boolean)` 接口。
- ❌ `G2.Global` 移除，默认的主题配置可以通过以下方式获取：

```typescript
// 方式 1
import { getTheme } from '@antv/g2';
const defaultTheme = getTheme();

// 方式 2，通过 chart 示例获取当前主题
const theme = chart.getTheme();
```

- ❌ `geometry.active()`  废弃，请使用 `geometry.state()` 接口。
- ❌ `geometry.select()`  废弃，请使用 `geometry.state()` 接口。
- ❌ `geometry.opacity()` 废弃，请使用 `geometry.color()`  中使用带透明度的颜色或者 `geometry.style()`  接口。
- 以下语法糖不再支持：
  - ❌ `pointJitter()`  废弃，请使用 `point().adjust('jitter')`。
  - ❌ `pointDodge()`  废弃，请使用 `point().adjust('dodge')`。
  - ❌ `intervalStack()` 废弃，请使用 `interval().adjust('stack')`。
  - ❌ `intervalDodge()` 废弃，请使用 `interval().adjust('dodge')`。
  - ❌ `intervalSymmetric()` 废弃，请使用 `interval().adjust('symmetric')`。
  - ❌ `areaStack()` 废弃，请使用 `area().adjust('stack')`。
  - ❌ `schemaDodge()` 废弃，请使用  `schema().adjust('stack')`。
- ❌ `Venn`  以及 `Violin`  几何标记暂时移除，后续考虑以更好的方式支持。
- ❌ 移除 Interval 几何标记以下两个 shape: 'top-line' 及  'liquid-fill-gauge'，用户可以通过自定义 Shape 机制自己实现。
- ❌ 移除 tail 类型的图例。
- 内置常量重命名，一致使用小写 + '-' 命名规则，比如 `shape('hollowCircle')` 变更为 `shape('hollow-circle')`。

##### 配置项以及接口变更

我们在 4.0 中对以下接口以及一些接口中的属性进行了部分变更，在兼容 3.x 原有功能的基础上，让配置项更具语义，同时结构更加合理，具体请参考 API 文档。

- `new Chart(cfg)`  接口属性更新([新老接口对比](https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-6477dff11424caa76a176cf710e71023R16))

- `chart.data()`  接口不再支持 DataView 格式数据，只支持标准 JSON 数组，所以在使用 DataSet 时，[要取最后的 JSON 数组结果传入 G2](https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-660f42f89c29e15f5f86a3e8c1023302R23): `chart.data(dv.rows);`

- 所有同绘图相关的配置全部定义在 style 属性中:

```ts
chart.axis('value', {
  label: {
    style: {
      textAlign: 'center',
    }, // 设置坐标轴文本样式
  },
  line: {
    style: {
      stroke: '#E9E9E9',
      lineDash: [3, 3],
    }, // 设置坐标轴线样式
  },
  grid: {
    line: {
      style: {
        lineDash: [3, 3],
      },
    }, // 设置坐标系栅格样式
  },
});
```

- `chart.tooltip()` 配置项更新，同时将 G2 3.x 版本中一些针对特定图表的内置规则删除，需要用户自己通过提供的配置项进行配置，具体配置属性详见 [API](https://g2.antv.vision/zh/api/classes/view#tooltip)。
- `chart.legend()`  配置项更新，详见 [API](https://g2.antv.vision/zh/api/classes/view#legend)。
- `chart.axis()`  配置项更新，详见 [API](https://g2.antv.vision/zh/api/classes/view#axis)。
- `chart.annotation()`  各个类型的 annotation 配置项更新，详见 [API](https://g2.antv.vision/zh/api/classes/view#annotation)。
- `geometry().style()` 方法的回调函数写法变更，不再支持一个配置属性一个回调的方式，而是使用一个回调：

```typescript
style('a', (aVal) => {
  if (a === 1) return { fill: 'red' };
  return { fill: 'blue' };
});
```

详见 [API](https://g2.antv.vision/zh/api/classes/geometry#style)。

- `geometry.label()` 接口更新，不再支持 html 类型的 label，详见 [API](https://g2.antv.vision/zh/api/classes/geometry#label)。
