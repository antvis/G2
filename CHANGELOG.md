#### 4.1.14 (2021-04-12)

##### Chores

*  解决本地开发控制台warning & babel 解析 tsx、jsx 语法 ([#3360](https://github.com/antvis/g2/pull/3360)) ([e63fa397](https://github.com/antvis/g2/commit/e63fa397f9e52483e34cf50ba06a4efa91ecd17e))
*  添加 release create to trigger publish site ([#3355](https://github.com/antvis/g2/pull/3355)) ([857c5d06](https://github.com/antvis/g2/commit/857c5d06f8afdbc03c42feb45c623d596241a977))
*  修复 import type 导致网站无法启动，更新为 export type ([#3350](https://github.com/antvis/g2/pull/3350)) ([35e37bd1](https://github.com/antvis/g2/commit/35e37bd1d209982aef0e8375af733ce71979fca8))

##### Continuous Integration

*  remove surge preview ([#3357](https://github.com/antvis/g2/pull/3357)) ([7d29b28b](https://github.com/antvis/g2/commit/7d29b28b04e8c4297e6a2c53a128d0aa1975d5b1))

##### Documentation Changes

* **legend:**  图例完善默认不选中以及点击选中交互的文档 & 增加 demo ([#3351](https://github.com/antvis/g2/pull/3351)) ([2841641a](https://github.com/antvis/g2/commit/2841641aa4e12eaa8f1061062c0dba39a263b7c0))

##### New Features

*  补充兼容性文档&修改webpack配置 ([#3346](https://github.com/antvis/g2/pull/3346)) ([292a7b02](https://github.com/antvis/g2/commit/292a7b0292dd0aa4f2865d6b37d233c6f6991a81))

##### Bug Fixes

* **issue-3160:**  修复饼图使用连续型图例，标签无法展示 ([#3366](https://github.com/antvis/g2/pull/3366)) ([a392a8b4](https://github.com/antvis/g2/commit/a392a8b45d68ecaec73b4346afe5c6486dcfb53e))
*  修复主题相关的错误拼写 ([#3358](https://github.com/antvis/g2/pull/3358)) ([804dbc69](https://github.com/antvis/g2/commit/804dbc694ad58ebb2ddaedc0c717d248d86d87d5))

#### 4.1.13 (2021-03-17)

##### Documentation Changes

*  update old code in docs ([#3320](https://github.com/antvis/g2/pull/3320)) ([7a30d48b](https://github.com/antvis/g2/commit/7a30d48b1c7f5a135d855d4b47ef8e3d292738d2))
* **typo:**  dblclick, not dbclick ([#3308](https://github.com/antvis/g2/pull/3308)) ([8f557d6b](https://github.com/antvis/g2/commit/8f557d6ba242d81a971f61172a093b1f0a4ea42f))

##### New Features

*  单 view 支持默认图例选中 ([#3327](https://github.com/antvis/g2/pull/3327)) ([6aa4000b](https://github.com/antvis/g2/commit/6aa4000ba095330e279e6202ab167acd21e9114a))
* **legend:**  图例支持配置分页器的主题样式 ([#3324](https://github.com/antvis/g2/pull/3324)) ([74afc606](https://github.com/antvis/g2/commit/74afc6062b14d1731bf5ae766968fca1f7b705f1))

##### Bug Fixes

*  getArcStartPoint function support path C ([#3213](https://github.com/antvis/g2/pull/3213)) ([#3300](https://github.com/antvis/g2/pull/3300)) ([0d68ee0d](https://github.com/antvis/g2/commit/0d68ee0dbcdd5c10c8d6f155ca60d6f49802295d))

#### 4.1.12 (2021-02-19)

##### New Features

* **typings:**  增强类型声明 ([fd18579e](https://github.com/antvis/g2/commit/fd18579eb4695cd03c1e574f98fd7c605892b23b))
* **scrollbar:**  滚动条增加一个滚道激活样式配置 ([#3291](https://github.com/antvis/g2/pull/3291)) ([aed93a19](https://github.com/antvis/g2/commit/aed93a1969055a857befa70614f55e025c5b1b27))
* **legend:** legend 增加 checked 单选交互 ([#3289](https://github.com/antvis/g2/pull/3289)) ([3a16db62](https://github.com/antvis/g2/commit/3a16db620672f5550f878e1d1db01a065b1d27f2))
* **animation:**  动画添加重复执行参数 ([#3290](https://github.com/antvis/g2/pull/3290)) ([38585ac4](https://github.com/antvis/g2/commit/38585ac4dc16316876e2c10fa232b9dc16ecc28b))
* **life-circle:**  view 生命周期事件触发，携带事件内容 ([#3288](https://github.com/antvis/g2/pull/3288)) ([657eb978](https://github.com/antvis/g2/commit/657eb978d3b08b7842320b557b4a91c74231b4ee))

##### Bug Fixes

*  cr 建议修改，统一变量命名 ([6b3f5b7b](https://github.com/antvis/g2/commit/6b3f5b7badd036efd2b5d60ead0cd5c50673277a))

#### 4.1.11 (2021-02-10)

##### Documentation Changes

*  日常文档走查, 层级处理 ([#3277](https://github.com/antvis/g2/pull/3277)) ([d4fec82e](https://github.com/antvis/g2/commit/d4fec82e02c17a76fc5204607591bac3853dae45))

##### New Features

* **active-region:**  支持配置底色样式，全局统一注册一个 配置样式 ([#3284](https://github.com/antvis/g2/pull/3284)) ([48c5bd12](https://github.com/antvis/g2/commit/48c5bd1211b0cd681b5363aba57de4c86782c149))
* **scrollbar:**  滚动条增加主题样式设置，允许设置滑道、滑块颜色 ([#3286](https://github.com/antvis/g2/pull/3286)) ([2c3e9d37](https://github.com/antvis/g2/commit/2c3e9d37c34eb2fa61d81ec02f0ca67ad1190f1b))
* **interaction:**  注册交互的时候，允许注册带上触发action的参数 ([#3280](https://github.com/antvis/g2/pull/3280)) ([89aa37fe](https://github.com/antvis/g2/commit/89aa37fe4c3c9080b3906487b49baa351638d87c))

##### Bug Fixes

* **event:**  修复相同 type 事件触发两次 ([#3282](https://github.com/antvis/g2/pull/3282)) ([9d61410b](https://github.com/antvis/g2/commit/9d61410b8248282eab15d45737c393708dfba274))
* **pie:**  饼图数据 NaN 导致页面崩溃数据边界处理([#2930](https://github.com/antvis/g2/pull/2930)) ([#3248](https://github.com/antvis/g2/pull/3248)) ([cabe1f0b](https://github.com/antvis/g2/commit/cabe1f0b225d3ed94260c895bda9b893d452f1f9))
* **pie** 修复饼图在动画更新过程中如果宽度变为 0 导致的问题 ([#3271](https://github.com/antvis/g2/pull/3271)) ([9f561499](https://github.com/antvis/g2/commit/9f5614990fc4c3acc192fa089471a03f09a93720))
* **rose:**  修复 TooltipItem data 类型 ([#3273](https://github.com/antvis/g2/pull/3273)) ([8ed68854](https://github.com/antvis/g2/commit/8ed68854e25b7587dfccd857986193458723dc0a))

##### Other Changes

* **constants** export constant varaibles of view-life-circle ([#3281](https://github.com/antvis/g2/pull/3281)) ([d0f96c48](https://github.com/antvis/g2/commit/d0f96c48ef764c24bd699b8fd736406aae1d37c2))

#### 4.1.10 (2021-02-03)

##### Documentation Changes

* **labels.ts:**  修改注释错别字 ([#3262](https://github.com/antvis/g2/pull/3262)) ([9e1af1c1](https://github.com/antvis/g2/commit/9e1af1c16a7dbcf3f038945d1e81386cf36f9dfd))
*  补充 geometry 和 element 的 api 文档 ([#3249](https://github.com/antvis/g2/pull/3249)) ([c2d061e0](https://github.com/antvis/g2/commit/c2d061e02b9de242cffbe466068bf7e5a1c83037))

##### New Features

* **tooltip:**  tooltip.shwoContent support function ([#3261](https://github.com/antvis/g2/pull/3261)) ([a26c0732](https://github.com/antvis/g2/commit/a26c0732c31de57501b88210db6731344ed4cdf1))
*  增加 getAction 的返回参数类型定义 ([#3256](https://github.com/antvis/g2/pull/3256)) ([024f9f9e](https://github.com/antvis/g2/commit/024f9f9e7ddaf6962760c819b964726575f1ad49))

##### Bug Fixes

*  判断提前,预防 time 类型出现的错误 ([#3258](https://github.com/antvis/g2/pull/3258)) ([a143ef54](https://github.com/antvis/g2/commit/a143ef54b14f23afc8f443867473a07449400321))
*  修复实心的 shape 设置空心的 marker，会导致 marker.style 设置不生效 ([#3250](https://github.com/antvis/g2/pull/3250)) ([88c45f88](https://github.com/antvis/g2/commit/88c45f88bad81581f727a644cbbcfcddc5bb460c))
*  提示增强 ([#3259](https://github.com/antvis/g2/pull/3259)) ([4ffac0b0](https://github.com/antvis/g2/commit/4ffac0b001df319ed7149d495451c98b681ffca7))

#### 4.1.8 (2021-01-27)

##### Feature

- 暴露获取扇形 path 的方法 ([#3240](https://github.com/antvis/G2/pull/3240)) ([ee974ad](https://github.com/antvis/G2/commit/ee974ad936135d899578ec48d6cfb89983c012f2))
- add tooltip.customItems config ([#3239](https://github.com/antvis/G2/pull/3239)) ([7e389e4](https://github.com/antvis/G2/pull/3239))
- tooltip.title support callback function ([#3218](https://github.com/antvis/G2/pull/3218)) ([1746f6a](https://github.com/antvis/G2/commit/1746f6a7e6abcd71cdfea44bd58fb06d8fcea070))
- tooltip: add tooltip.showNil ([#3216](https://github.com/antvis/G2/pull/3216)) ([edc1cee](https://github.com/antvis/G2/commit/edc1cee53820cf6c39a317480b738ed07364d2a8))

##### Performance Improvements

- 优化鼠标事件在 path 上的拾取性能 ([#3230](https://github.com/antvis/G2/pull/3230)) ([71b0a2e](https://github.com/antvis/G2/commit/71b0a2e65042a17906fddcb7a7d564219de94da8))

##### Docs

- 修复 scrollbar 文档错误 ([#3236](https://github.com/antvis/G2/pull/3236)) ([e38cf5d](https://github.com/antvis/G2/commit/e38cf5d723b97ad8642d1f5c39e7db649c8c1ae2))
- 完善 interaction 英文文档 ([#3234](https://github.com/antvis/G2/pull/3234)) ([b6b334e](https://github.com/antvis/G2/commit/b6b334ef99a904250aa698d68e8b9b77c304ce7e))
- 移除图例废弃的 api & tooltipStyles 类型定义修整 ([#3227](https://github.com/antvis/G2/pull/3227)) ([69540f6](https://github.com/antvis/G2/commit/69540f677dd1a60112cbffa30eeef780301d1c9c))
- 文档走查优化 ([#3221](https://github.com/antvis/G2/pull/3221)) ([f25e30e](https://github.com/antvis/G2/commit/f25e30edbc5d53c2e95d1f975a0842a37360a720))
- 移除 legend useHtml api ([#3202](https://github.com/antvis/G2/pull/3202)) ([56bc7f1](https://github.com/antvis/G2/commit/56bc7f1c40be1bd5be07e0409c2062a1c05d295b))

#### 4.1.7 (2021-01-13)

##### Documentation Changes

- 添加钉钉联系方式 ([#3199](https://github.com/antvis/g2/pull/3199)) ([302b26eb](https://github.com/antvis/g2/commit/302b26eb8e29d2b8bacf244e488ee5e87b34bac7))

##### New Features

- interval rect shape support cornerRadius ([#3170](https://github.com/antvis/g2/pull/3170)) ([31f41bf4](https://github.com/antvis/g2/commit/31f41bf44511097aa6cb4ee7513fed0a22ef02c7))

##### Tests

- make ci pass ([#3196](https://github.com/antvis/g2/pull/3196)) ([ae651fe7](https://github.com/antvis/g2/commit/ae651fe7e9997ed8bce4154e5ae490fbbaf4ee8c))

#### 4.1.6 (2021-01-08)

##### Performance

- 优化 G2 图形渲染性能 ([#3188](https://github.com/antvis/G2/pull/3188)) ([#63e137b](https://github.com/antvis/G2/pull/3188/commits/63e137b932ff5602664878711dbfd02dc0f3047c))

#### 4.1.5 (2021-01-07)

##### Documentation Changes

- add mask documents ([#3176](https://github.com/antvis/g2/pull/3176)) ([e53f8d40](https://github.com/antvis/g2/commit/e53f8d406b5ab94fe5c0f7dc78a06ddf45283862))
- 添加 chart 和 view 对象的 api 文档 & 修复 shapeAttrs 链接文档 404 ([#3172](https://github.com/antvis/g2/pull/3172)) ([5658ae73](https://github.com/antvis/g2/commit/5658ae73dc450f1293f974df1a437e875c98b86f))
- 404 ([#3165](https://github.com/antvis/g2/pull/3165)) ([baebc300](https://github.com/antvis/g2/commit/baebc300faa981f0b2acad7b95b7dd632d59ab7a))

##### New Features

- interval shape 支持 background ([#3175](https://github.com/antvis/g2/pull/3175)) ([0a9ee039](https://github.com/antvis/g2/commit/0a9ee039e7e5d06c799fc311118280197df5fb7f))
- 支持对 geometry 下的 elements zIndex 进行降序 ([#3173](https://github.com/antvis/g2/pull/3173)) ([612cf971](https://github.com/antvis/g2/commit/612cf971fc35656650b460bae6e51c4465983891))

##### Bug Fixes

- **tooltip-tip:** label tip max width 50%, and break word ([#3177](https://github.com/antvis/g2/pull/3177)) ([b7a86fec](https://github.com/antvis/g2/commit/b7a86fec2be9abf5609269f704f7af886f9401a5))
- **geometry:** geometry.update should update scale when data is changed ([#3174](https://github.com/antvis/g2/pull/3174)) ([86f2c570](https://github.com/antvis/g2/commit/86f2c570c5531b4d421c032ed25d8190cef85277))
- correct label position for histogram ([#3156](https://github.com/antvis/g2/pull/3156)) ([0f6e7167](https://github.com/antvis/g2/commit/0f6e716709990d0ea32a81996de052e10ab0859c))

#### 4.1.4 (2020-12-22)

##### Documentation Changes

- 调整文档导航顺序 ([#3135](https://github.com/antvis/g2/pull/3135)) ([d2f1118a](https://github.com/antvis/g2/commit/d2f1118a404fdc714172d9fd79250c752f55dec1))
- fix legend filter bug on case line demo ([#3116](https://github.com/antvis/g2/pull/3116)) ([b3165704](https://github.com/antvis/g2/commit/b3165704b73f8b99303ffb69529cb81c63ebe1d9))
- 增加 faq,升级指南等文档 ([#3119](https://github.com/antvis/g2/pull/3119)) ([2033d030](https://github.com/antvis/g2/commit/2033d030bd989df6e9e6a3e7fc49a10fce741305))
- 增加 element, view.en, dataset 等若干文档 ([#3118](https://github.com/antvis/g2/pull/3118)) ([8d112f15](https://github.com/antvis/g2/commit/8d112f15c74ea2f489366b8579c830f752043d3b))

##### New Features

- 增强饼图标签跟随切片颜色 ([#3147](https://github.com/antvis/g2/pull/3147)) ([4f0f5665](https://github.com/antvis/g2/commit/4f0f5665a8b80f2bd6977c9c5e682bcc98cfae61))
- **esm:** remove all lib import ([#3141](https://github.com/antvis/g2/pull/3141)) ([72b0275a](https://github.com/antvis/g2/commit/72b0275a3f25655f3d14b57ddc601662a24cd172))
- **export:** add some export method ([#3142](https://github.com/antvis/g2/pull/3142)) ([6247e3db](https://github.com/antvis/g2/commit/6247e3db927e8ea5885fc88d64403349983688d9))

##### Bug Fixes

- 修复路径错误 ([#3148](https://github.com/antvis/g2/pull/3148)) ([bd49fbe1](https://github.com/antvis/g2/commit/bd49fbe1801df6bab5ff916c808e6a064d0bd1dc))
- fix line geometry fail to set dot or dash shape([#3144](https://github.com/antvis/g2/pull/3144)) ([239e8a67](https://github.com/antvis/g2/commit/239e8a675b0b6d50beeaef840e7fcc75a8e1d420))
- 修复 element shape 进行 syncShapeStyle 时，可能存在空对象的情况 ([#3110](https://github.com/antvis/g2/pull/3110)) ([904202d1](https://github.com/antvis/g2/commit/904202d19d3c769aeb6a1d18c1283fa45823da5b))
- fix empty div container for annotation ([#3112](https://github.com/antvis/g2/pull/3112)) ([f3739657](https://github.com/antvis/g2/commit/f3739657333f8f6b84611bae6cafcbbec86f96af))
- **testcases:** 增加单测，g 层修复 animate shape 在 changesize 的时候报错 ([#3113](https://github.com/antvis/g2/pull/3113)) ([28d235b0](https://github.com/antvis/g2/commit/28d235b027f4f81442422893232a58f1df4694ac))

#### 4.1.3 (2020-12-17)

##### Documentation Changes

- 增加 faq,升级指南等文档 ([#3119](https://github.com/antvis/g2/pull/3119)) ([2033d030](https://github.com/antvis/g2/commit/2033d030bd989df6e9e6a3e7fc49a10fce741305))
- 增加 element, view.en, dataset 等若干文档 ([#3118](https://github.com/antvis/g2/pull/3118)) ([8d112f15](https://github.com/antvis/g2/commit/8d112f15c74ea2f489366b8579c830f752043d3b))

##### Bug Fixes

- **testcases:** 增加单测，g 层修复 animate shape 在 changesize 的时候报错 ([#3113](https://github.com/antvis/g2/pull/3113)) ([28d235b0](https://github.com/antvis/g2/commit/28d235b027f4f81442422893232a58f1df4694ac))
- fix empty div container for annotation ([#3112](https://github.com/antvis/g2/pull/3112)) ([f3739657](https://github.com/antvis/g2/commit/f3739657333f8f6b84611bae6cafcbbec86f96af))

#### 4.1.2 (2020-12-11)

##### Chores

- add src to files for sourceMap ([#3099](https://github.com/antvis/g2/pull/3099)) ([ab3d9e5c](https://github.com/antvis/g2/commit/ab3d9e5c66db3fdc23bdcfffbddbb360463486a2))
- update ci worfklow ([#3080](https://github.com/antvis/g2/pull/3080)) ([eab91e3b](https://github.com/antvis/g2/commit/eab91e3bf7fb0d8331dccd4cea8ee1c70c88dd9b))
- fix preview build workflow ([#3078](https://github.com/antvis/g2/pull/3078)) ([f9eacbee](https://github.com/antvis/g2/commit/f9eacbee6d8167206bd504228d24763114c39a15))
- try to fix preview action vulnerability ([#3067](https://github.com/antvis/g2/pull/3067)) ([77a18410](https://github.com/antvis/g2/commit/77a18410695a5db224fe93893a88a17f5f95f800))

##### Documentation Changes

- update time bar demo ([#3095](https://github.com/antvis/g2/pull/3095)) ([d3da3443](https://github.com/antvis/g2/commit/d3da344379d7e78adb50451c04fa03295e6ae49e))

##### Bug Fixes

- fix early create canvas context cause build error in server side ([#3081](https://github.com/antvis/g2/pull/3081)) ([773abdd9](https://github.com/antvis/g2/commit/773abdd9ba07a3779f3a1fe7887e4f94df0ec379))
- **issue-3073:** 修复数据存在 null 值，在 pie-outer 标签布局下报错 ([#3074](https://github.com/antvis/g2/pull/3074)) ([73708e93](https://github.com/antvis/g2/commit/73708e93daeb66588b7e97069525ba5faf954085))

#### 4.1.1 (2020-12-02)

##### Bug Fixes

- **issue-3073:** 修复数据存在 null 值，在 pie-outer 标签布局下报错 ([#3074](https://github.com/antvis/g2/pull/3074)) ([73708e93](https://github.com/antvis/g2/commit/73708e93daeb66588b7e97069525ba5faf954085))

#### 4.1.0 (2020-12-01)

##### Chores

- upgrade site theme ([#3015](https://github.com/antvis/g2/pull/3015)) ([00b919b4](https://github.com/antvis/g2/commit/00b919b4661878d03df7a573bfae8242c723d36e))
- only sync gh-pages to Gitee Mirror ([#3014](https://github.com/antvis/g2/pull/3014)) ([ba9bc23c](https://github.com/antvis/g2/commit/ba9bc23cd322a55b2ae4f97dde38c1d37ecc3a12))
- update preview.yml ([#3011](https://github.com/antvis/g2/pull/3011)) ([f1c7b6b8](https://github.com/antvis/g2/commit/f1c7b6b8f7031e414487c01f9c0d47a721be1ac5))

##### Documentation Changes

- 补充丢失的分面&交互的英文文档 ([#3040](https://github.com/antvis/g2/pull/3040)) ([b64fae45](https://github.com/antvis/g2/commit/b64fae4586099be9a0a12a2f954ed56c2eb85ee6))
- add guide for sankey ([#3030](https://github.com/antvis/g2/pull/3030)) ([e9ba7649](https://github.com/antvis/g2/commit/e9ba7649bfaafd8a8593fc3491268b151f82bb09))
- fix the parameter description of TooltipCrosshairsTextCallback function ([#3005](https://github.com/antvis/g2/pull/3005)) ([3b996b1b](https://github.com/antvis/g2/commit/3b996b1bcf8fcd1ffa4c744c963c651c0b19b8ec))
- add G2Plot in readme ([#3002](https://github.com/antvis/g2/pull/3002)) ([48ccebfd](https://github.com/antvis/g2/commit/48ccebfd44d5aa88c1a442d605e162b6b9b1f228))
- **magi:**
  - adjust styles of monitor line chart ([#3035](https://github.com/antvis/g2/pull/3035)) ([3f7eab60](https://github.com/antvis/g2/commit/3f7eab60e45055402fcdcb0b6ab3720984760883))
  - adjust pin position of monitor line chart ([#3032](https://github.com/antvis/g2/pull/3032)) ([877a7127](https://github.com/antvis/g2/commit/877a7127140b4114c76f4c032e2a5cc19db96310))
  - add monitor line chart demo ([#3029](https://github.com/antvis/g2/pull/3029)) ([2a36e161](https://github.com/antvis/g2/commit/2a36e16165bdd6b6dbf813f2f1528f291e028527))
- **sankey:** add indicator sankey demo ([#3027](https://github.com/antvis/g2/pull/3027)) ([0db5f81f](https://github.com/antvis/g2/commit/0db5f81fda485479b590fb44fe8b056f3c6780f7))

##### New Features

- **label-layout:** 标签布局 limit-in-plot 支持 ellipsis 展示 ([#3066](https://github.com/antvis/g2/pull/3066)) ([4eec0d2c](https://github.com/antvis/g2/commit/4eec0d2cd37ecc73686a788a4289f83d8799790a))
- **label:** add limitInPlot label layout ([#3062](https://github.com/antvis/g2/pull/3062)) ([8cdf428e](https://github.com/antvis/g2/commit/8cdf428e322ddefca882e4c6efe0e4173f3fc37e))
- support tooltip reversed cfg ([#3055](https://github.com/antvis/g2/pull/3055)) ([8cff406e](https://github.com/antvis/g2/commit/8cff406e16f980533aa090b91049fc6062c9ea0c))
- interval support lineCap round ([#3036](https://github.com/antvis/g2/pull/3036)) ([2907ac77](https://github.com/antvis/g2/commit/2907ac77ac78374a3d17b71af0fdadc0cf3624b9))
- pixel interval padding and dodge padding ([#2881](https://github.com/antvis/g2/pull/2881)) ([d27fff29](https://github.com/antvis/g2/commit/d27fff29d725020e0c8e3c91977c7aff41b0f5e1))
- **view:** add syncViewPadding support callback ([#2995](https://github.com/antvis/g2/pull/2995)) ([c8355f21](https://github.com/antvis/g2/commit/c8355f215a1dc426f92766754cc427b5b7613ff6))

##### Bug Fixes

- 更改默认 scale type 设置：time -> timeCat ([#3059](https://github.com/antvis/g2/pull/3059)) ([82470868](https://github.com/antvis/g2/commit/82470868d98d7d63cd52fdecb0e851c6ce6fd51d))
- return early from sectorPathUpdate if path is invalid ([#3047](https://github.com/antvis/g2/pull/3047)) ([694f2096](https://github.com/antvis/g2/commit/694f209659c37f63f03e62b61fa13559204292d6))
- limitInPlot 更新后需要清除 clip ([#3043](https://github.com/antvis/g2/pull/3043)) ([b641da2f](https://github.com/antvis/g2/commit/b641da2fa7bc2ab8a3a6c173da3c7d9f692490e2))
- change the triggering condition ([#3028](https://github.com/antvis/g2/pull/3028)) ([449188ff](https://github.com/antvis/g2/commit/449188ffc13602553179aefc1567f1f8b40805c8))
- support adjust-color for overflow labels ([#3016](https://github.com/antvis/g2/pull/3016)) ([ac6d9428](https://github.com/antvis/g2/commit/ac6d9428664c67377391268f644795a51e172aee))
- tooltip clear ([#3010](https://github.com/antvis/g2/pull/3010)) ([1cc9354f](https://github.com/antvis/g2/commit/1cc9354f5d9b7fc54000cbf4aff4746972d0c7c0))
- [#2996](https://github.com/antvis/g2/pull/2996) ([#2998](https://github.com/antvis/g2/pull/2998)) ([c6256760](https://github.com/antvis/g2/commit/c625676045afd293776c520bb0249bb0ed926335))
- **pie-label:** 修复饼图 label 溢出 ([#3057](https://github.com/antvis/g2/pull/3057)) ([44e88a4f](https://github.com/antvis/g2/commit/44e88a4faf03fe474adf3b89261d40dab3a43719))
- **san-key:** 贝塞尔曲线的方向不对 ([#3023](https://github.com/antvis/g2/pull/3023)) ([0210319f](https://github.com/antvis/g2/commit/0210319f9b50d129d308fbcb0a18fb08735f76bf))
- **slider:** slider, scrollbar filter data ([#3013](https://github.com/antvis/g2/pull/3013)) ([71d9e448](https://github.com/antvis/g2/commit/71d9e448e292374f6bf17a19593bc6864132af34))

##### Refactors

- **theme:** 主题重构，暴露 createTheme 方法 ([#3018](https://github.com/antvis/g2/pull/3018)) ([e7471d70](https://github.com/antvis/g2/commit/e7471d70b8293ef91a50e33a98c893f2dfb1c619))

#### 4.1.0-beta.21 (2020-11-25)

##### Bug Fixes

- limitInPlot 更新后需要清除 clip ([#3043](https://github.com/antvis/g2/pull/3043)) ([b641da2f](https://github.com/antvis/g2/commit/b641da2fa7bc2ab8a3a6c173da3c7d9f692490e2))

#### 4.1.0-beta.20 (2020-11-21)

##### Chores

- release 4.1.0-beta.19 ([#3021](https://github.com/antvis/g2/pull/3021)) ([fcf024e4](https://github.com/antvis/g2/commit/fcf024e493ddbf1b82afcd85497a532acdd692c9))
- upgrade site theme ([#3015](https://github.com/antvis/g2/pull/3015)) ([00b919b4](https://github.com/antvis/g2/commit/00b919b4661878d03df7a573bfae8242c723d36e))
- only sync gh-pages to Gitee Mirror ([#3014](https://github.com/antvis/g2/pull/3014)) ([ba9bc23c](https://github.com/antvis/g2/commit/ba9bc23cd322a55b2ae4f97dde38c1d37ecc3a12))
- update preview.yml ([#3011](https://github.com/antvis/g2/pull/3011)) ([f1c7b6b8](https://github.com/antvis/g2/commit/f1c7b6b8f7031e414487c01f9c0d47a721be1ac5))

##### Documentation Changes

- **magi:** add monitor line chart demo ([#3029](https://github.com/antvis/g2/pull/3029)) ([2a36e161](https://github.com/antvis/g2/commit/2a36e16165bdd6b6dbf813f2f1528f291e028527))
- add guide for sankey ([#3030](https://github.com/antvis/g2/pull/3030)) ([e9ba7649](https://github.com/antvis/g2/commit/e9ba7649bfaafd8a8593fc3491268b151f82bb09))
- fix the parameter description of TooltipCrosshairsTextCallback function ([#3005](https://github.com/antvis/g2/pull/3005)) ([3b996b1b](https://github.com/antvis/g2/commit/3b996b1bcf8fcd1ffa4c744c963c651c0b19b8ec))
- add G2Plot in readme ([#3002](https://github.com/antvis/g2/pull/3002)) ([48ccebfd](https://github.com/antvis/g2/commit/48ccebfd44d5aa88c1a442d605e162b6b9b1f228))
- **sankey:** add indicator sankey demo ([#3027](https://github.com/antvis/g2/pull/3027)) ([0db5f81f](https://github.com/antvis/g2/commit/0db5f81fda485479b590fb44fe8b056f3c6780f7))

##### New Features

- pixel interval padding and dodge padding ([#2881](https://github.com/antvis/g2/pull/2881)) ([d27fff29](https://github.com/antvis/g2/commit/d27fff29d725020e0c8e3c91977c7aff41b0f5e1))
- **view:** add syncViewPadding support callback ([#2995](https://github.com/antvis/g2/pull/2995)) ([c8355f21](https://github.com/antvis/g2/commit/c8355f215a1dc426f92766754cc427b5b7613ff6))

##### Bug Fixes

- change the triggering condition ([#3028](https://github.com/antvis/g2/pull/3028)) ([449188ff](https://github.com/antvis/g2/commit/449188ffc13602553179aefc1567f1f8b40805c8))
- support adjust-color for overflow labels ([#3016](https://github.com/antvis/g2/pull/3016)) ([ac6d9428](https://github.com/antvis/g2/commit/ac6d9428664c67377391268f644795a51e172aee))
- tooltip clear ([#3010](https://github.com/antvis/g2/pull/3010)) ([1cc9354f](https://github.com/antvis/g2/commit/1cc9354f5d9b7fc54000cbf4aff4746972d0c7c0))
- [#2996](https://github.com/antvis/g2/pull/2996) ([#2998](https://github.com/antvis/g2/pull/2998)) ([c6256760](https://github.com/antvis/g2/commit/c625676045afd293776c520bb0249bb0ed926335))
- **san-key:** 贝塞尔曲线的方向不对 ([#3023](https://github.com/antvis/g2/pull/3023)) ([0210319f](https://github.com/antvis/g2/commit/0210319f9b50d129d308fbcb0a18fb08735f76bf))
- **slider:** slider, scrollbar filter data ([#3013](https://github.com/antvis/g2/pull/3013)) ([71d9e448](https://github.com/antvis/g2/commit/71d9e448e292374f6bf17a19593bc6864132af34))

##### Refactors

- **theme:** 主题重构，暴露 createTheme 方法 ([#3018](https://github.com/antvis/g2/pull/3018)) ([e7471d70](https://github.com/antvis/g2/commit/e7471d70b8293ef91a50e33a98c893f2dfb1c619))

#### 4.1.0-beta.19 (2020-11-19)

##### Chores

- only sync gh-pages to Gitee Mirror ([#3014](https://github.com/antvis/g2/pull/3014)) ([ba9bc23c](https://github.com/antvis/g2/commit/ba9bc23cd322a55b2ae4f97dde38c1d37ecc3a12))

##### Documentation Changes

- fix the parameter description of TooltipCrosshairsTextCallback function ([#3005](https://github.com/antvis/g2/pull/3005)) ([3b996b1b](https://github.com/antvis/g2/commit/3b996b1bcf8fcd1ffa4c744c963c651c0b19b8ec))
- add G2Plot in readme ([#3002](https://github.com/antvis/g2/pull/3002)) ([48ccebfd](https://github.com/antvis/g2/commit/48ccebfd44d5aa88c1a442d605e162b6b9b1f228))
- upgrade site theme ([#3015](https://github.com/antvis/g2/pull/3015)) ([00b919b4](https://github.com/antvis/g2/commit/00b919b4661878d03df7a573bfae8242c723d36e))
- update preview.yml ([#3011](https://github.com/antvis/g2/pull/3011)) ([f1c7b6b8](https://github.com/antvis/g2/commit/f1c7b6b8f7031e414487c01f9c0d47a721be1ac5))

##### New Features

- pixel interval padding and dodge padding ([#2881](https://github.com/antvis/g2/pull/2881)) ([d27fff29](https://github.com/antvis/g2/commit/d27fff29d725020e0c8e3c91977c7aff41b0f5e1))
- **view:** add syncViewPadding support callback ([#2995](https://github.com/antvis/g2/pull/2995)) ([c8355f21](https://github.com/antvis/g2/commit/c8355f215a1dc426f92766754cc427b5b7613ff6))
- **theme:** 主题重构，暴露 createTheme 方法 ([#3018](https://github.com/antvis/g2/pull/3018)) ([e7471d70](https://github.com/antvis/g2/commit/e7471d70b8293ef91a50e33a98c893f2dfb1c619))

##### Bug Fixes

- support adjust-color for overflow labels ([#3016](https://github.com/antvis/g2/pull/3016)) ([ac6d9428](https://github.com/antvis/g2/commit/ac6d9428664c67377391268f644795a51e172aee))
- tooltip clear ([#3010](https://github.com/antvis/g2/pull/3010)) ([1cc9354f](https://github.com/antvis/g2/commit/1cc9354f5d9b7fc54000cbf4aff4746972d0c7c0))
- [#2996](https://github.com/antvis/g2/pull/2996) ([#2998](https://github.com/antvis/g2/pull/2998)) ([c6256760](https://github.com/antvis/g2/commit/c625676045afd293776c520bb0249bb0ed926335))
- **slider:** slider, scrollbar filter data ([#3013](https://github.com/antvis/g2/pull/3013)) ([71d9e448](https://github.com/antvis/g2/commit/71d9e448e292374f6bf17a19593bc6864132af34))

#### 4.1.0-beta.17 (2020-11-10)

##### Chores

- 4.1.0-beta.16 ([#2975](https://github.com/antvis/g2/pull/2975)) ([43cbb83b](https://github.com/antvis/g2/commit/43cbb83be295b1134cf69b722792e1f012c455af))
- 4.1.0-beta.14 ([#2947](https://github.com/antvis/g2/pull/2947)) ([68964cfd](https://github.com/antvis/g2/commit/68964cfdd56029b084d9e3b8117db62acdcc678e))
- v4.1.0-beta.13 ([#2926](https://github.com/antvis/g2/pull/2926)) ([102c906f](https://github.com/antvis/g2/commit/102c906f4ae02ce4a524ac96ee47eeb2250cd869))
- v4.1.0-beta.11 ([#2898](https://github.com/antvis/g2/pull/2898)) ([091f73d5](https://github.com/antvis/g2/commit/091f73d57d2b7fe76109e581b2cde975f741599d))

##### Documentation Changes

- new documents ([#2990](https://github.com/antvis/g2/pull/2990)) ([982ba8b3](https://github.com/antvis/g2/commit/982ba8b3e7d7492581e6ab57c0044b8879981931))
- modify some descriptions ([#2917](https://github.com/antvis/g2/pull/2917)) ([0512365b](https://github.com/antvis/g2/commit/0512365b9bd92a2865f70c3eda4c54db78f545e4))
- marker 单词拼写错误修正 ([#2911](https://github.com/antvis/g2/pull/2911)) ([645bb2d9](https://github.com/antvis/g2/commit/645bb2d9fa0b6e9906a2436338473a22248c281c))

##### New Features

- **label:** add adjust-position for path geometry and hide-overlap for interval ([#2991](https://github.com/antvis/g2/pull/2991)) ([b66f4005](https://github.com/antvis/g2/commit/b66f400559a0e84143234ad1f780be7de4284171))
- **theme:** 更新主题色,更新三个色值 ([#2963](https://github.com/antvis/g2/pull/2963)) ([b5a00425](https://github.com/antvis/g2/commit/b5a004259cc35e44ff03bd9ef6dc4a942f2ece0b))
- **line-style:** default use round style ([#2953](https://github.com/antvis/g2/pull/2953)) ([30b7655a](https://github.com/antvis/g2/commit/30b7655ae3467e2366cd927c5d3dad9c4da15f9d))
- G2 层支持 custom annotation html annotation ([#2934](https://github.com/antvis/g2/pull/2934)) ([6209203a](https://github.com/antvis/g2/commit/6209203a55f8183acfcd1bcda23328016211310e))
- **annotation:** add support for mean / median ([#2922](https://github.com/antvis/g2/pull/2922)) ([f8054857](https://github.com/antvis/g2/commit/f80548579a13e936706ee7172e040cd02f20b6d6))
- **legend:** set default maxItemWidth = 200 ([#2889](https://github.com/antvis/g2/pull/2889)) ([9e1b2585](https://github.com/antvis/g2/commit/9e1b25852d6fd97ed557d174818ff3c852df39bc))
- **region-filter:** add geometry life circle, after draw animate ([#2879](https://github.com/antvis/g2/pull/2879)) ([2738acb5](https://github.com/antvis/g2/commit/2738acb57c524d2649e356465dd624bf0f145616))

##### Bug Fixes

- **annotation:**
  - :smile: 修复 html-annotation 没有 clear ([#2987](https://github.com/antvis/g2/pull/2987)) ([7b887a6a](https://github.com/antvis/g2/commit/7b887a6a4f1a8edb5b76407d2ec6de11ba3820ea))
  - text annotation re-render will be hidden ([#2916](https://github.com/antvis/g2/pull/2916)) ([9891f40b](https://github.com/antvis/g2/commit/9891f40b6c6fd02af2312542c01ec430d004d974))
- the event variable is misspelled ([#2984](https://github.com/antvis/g2/pull/2984)) ([4dcf6c90](https://github.com/antvis/g2/commit/4dcf6c90cf340364d5ade014ab247aa1e6e5532d))
- ci hang ([#2979](https://github.com/antvis/g2/pull/2979)) ([bdde7f3a](https://github.com/antvis/g2/commit/bdde7f3a4d7df147519cf2019cf188352c69c0d8))
- delete fill attr in interval-line ([#2974](https://github.com/antvis/g2/pull/2974)) ([8848b788](https://github.com/antvis/g2/commit/8848b78893fb933c12a550544bb37b28e71ee4e3))
- median typo ([#2925](https://github.com/antvis/g2/pull/2925)) ([57648275](https://github.com/antvis/g2/commit/57648275072082a6226500d9e2ee6ec1748a9cd3))
- 修复 adjust-color label layout 对一些颜色不生效的问题 ([#2919](https://github.com/antvis/g2/pull/2919)) ([b1f2c2a1](https://github.com/antvis/g2/commit/b1f2c2a103388f67b8edbba572d557e4545abe7a))
- 漏斗图 label position 可生效 ([#2909](https://github.com/antvis/g2/pull/2909)) ([c2727a82](https://github.com/antvis/g2/commit/c2727a82e0311ecd7c06ed71d3d9fe5fe8a93905))
- **tooltip:** 先对 Geometry 数据判空再进行查找 ([#2970](https://github.com/antvis/g2/pull/2970)) ([1822bf41](https://github.com/antvis/g2/commit/1822bf41612f7f40d0b7d492e3fe2df9114a30f1))
- **interaction:** fix link-by-color path for transposed coord ([#2972](https://github.com/antvis/g2/pull/2972)) ([7793c419](https://github.com/antvis/g2/commit/7793c4195ad285850b65d31375244b3d87c021ab))
- **label:** fix label position for zero data ([#2973](https://github.com/antvis/g2/pull/2973)) ([60e34b17](https://github.com/antvis/g2/commit/60e34b17fffb766235edc35f8d0694c9b27d5100))
- **#2905:** 无需传入 color,color 必须来源于字段映射 ([#2945](https://github.com/antvis/g2/pull/2945)) ([acf7ad40](https://github.com/antvis/g2/commit/acf7ad4073410107082d2ac100258e79688a7a05))
- **issue-2905:** 自定义 shape 的默认样式设置 ([#2906](https://github.com/antvis/g2/pull/2906)) ([dac96901](https://github.com/antvis/g2/commit/dac96901ea55db6ba7442cc32b07b4d5b8173725))
- **issue-2541:** state 状态依然存在时，但由于 changeSize, changeData 等重绘后丢失 ([#2871](https://github.com/antvis/g2/pull/2871)) ([dcb39aa3](https://github.com/antvis/g2/commit/dcb39aa3df8d42b8574a9aee9f76d5d0c133daeb))
- **pie-demo:** typo, fixed [#2884](https://github.com/antvis/g2/pull/2884) ([#2897](https://github.com/antvis/g2/pull/2897)) ([6aa10078](https://github.com/antvis/g2/commit/6aa100780ea98a5636cb578dc19dd0ed75d40eb8))
- **types:** add legend option ([#2892](https://github.com/antvis/g2/pull/2892)) ([bf3531ff](https://github.com/antvis/g2/commit/bf3531ff2cef51ab0d1fbc05b8b402a16f8ea92b))

##### Refactors

- walkthrough label ([#2981](https://github.com/antvis/g2/pull/2981)) ([49051d4c](https://github.com/antvis/g2/commit/49051d4cf5bbd0716b330e219fa7324b06941247))
- **legend:** legend update and render with same logic ([#2890](https://github.com/antvis/g2/pull/2890)) ([10666c0c](https://github.com/antvis/g2/commit/10666c0c622afef9f5ec17f87d8156bf5e451f78))

#### 4.1.0-beta.16 (2020-11-04)

##### Chores

- 4.1.0-beta.14 ([#2947](https://github.com/antvis/g2/pull/2947)) ([68964cfd](https://github.com/antvis/g2/commit/68964cfdd56029b084d9e3b8117db62acdcc678e))
- v4.1.0-beta.13 ([#2926](https://github.com/antvis/g2/pull/2926)) ([102c906f](https://github.com/antvis/g2/commit/102c906f4ae02ce4a524ac96ee47eeb2250cd869))
- v4.1.0-beta.11 ([#2898](https://github.com/antvis/g2/pull/2898)) ([091f73d5](https://github.com/antvis/g2/commit/091f73d57d2b7fe76109e581b2cde975f741599d))

##### Documentation Changes

- modify some descriptions ([#2917](https://github.com/antvis/g2/pull/2917)) ([0512365b](https://github.com/antvis/g2/commit/0512365b9bd92a2865f70c3eda4c54db78f545e4))
- marker 单词拼写错误修正 ([#2911](https://github.com/antvis/g2/pull/2911)) ([645bb2d9](https://github.com/antvis/g2/commit/645bb2d9fa0b6e9906a2436338473a22248c281c))

##### New Features

- **theme:** 更新主题色,更新三个色值 ([#2963](https://github.com/antvis/g2/pull/2963)) ([b5a00425](https://github.com/antvis/g2/commit/b5a004259cc35e44ff03bd9ef6dc4a942f2ece0b))
- **line-style:** default use round style ([#2953](https://github.com/antvis/g2/pull/2953)) ([30b7655a](https://github.com/antvis/g2/commit/30b7655ae3467e2366cd927c5d3dad9c4da15f9d))
- G2 层支持 custom annotation html annotation ([#2934](https://github.com/antvis/g2/pull/2934)) ([6209203a](https://github.com/antvis/g2/commit/6209203a55f8183acfcd1bcda23328016211310e))
- **annotation:** add support for mean / median ([#2922](https://github.com/antvis/g2/pull/2922)) ([f8054857](https://github.com/antvis/g2/commit/f80548579a13e936706ee7172e040cd02f20b6d6))
- **legend:** set default maxItemWidth = 200 ([#2889](https://github.com/antvis/g2/pull/2889)) ([9e1b2585](https://github.com/antvis/g2/commit/9e1b25852d6fd97ed557d174818ff3c852df39bc))
- **region-filter:** add geometry life circle, after draw animate ([#2879](https://github.com/antvis/g2/pull/2879)) ([2738acb5](https://github.com/antvis/g2/commit/2738acb57c524d2649e356465dd624bf0f145616))

##### Bug Fixes

- delete fill attr in interval-line ([#2974](https://github.com/antvis/g2/pull/2974)) ([8848b788](https://github.com/antvis/g2/commit/8848b78893fb933c12a550544bb37b28e71ee4e3))
- median typo ([#2925](https://github.com/antvis/g2/pull/2925)) ([57648275](https://github.com/antvis/g2/commit/57648275072082a6226500d9e2ee6ec1748a9cd3))
- 修复 adjust-color label layout 对一些颜色不生效的问题 ([#2919](https://github.com/antvis/g2/pull/2919)) ([b1f2c2a1](https://github.com/antvis/g2/commit/b1f2c2a103388f67b8edbba572d557e4545abe7a))
- 漏斗图 label position 可生效 ([#2909](https://github.com/antvis/g2/pull/2909)) ([c2727a82](https://github.com/antvis/g2/commit/c2727a82e0311ecd7c06ed71d3d9fe5fe8a93905))
- **tooltip:** 先对 Geometry 数据判空再进行查找 ([#2970](https://github.com/antvis/g2/pull/2970)) ([1822bf41](https://github.com/antvis/g2/commit/1822bf41612f7f40d0b7d492e3fe2df9114a30f1))
- **interaction:** fix link-by-color path for transposed coord ([#2972](https://github.com/antvis/g2/pull/2972)) ([7793c419](https://github.com/antvis/g2/commit/7793c4195ad285850b65d31375244b3d87c021ab))
- **label:** fix label position for zero data ([#2973](https://github.com/antvis/g2/pull/2973)) ([60e34b17](https://github.com/antvis/g2/commit/60e34b17fffb766235edc35f8d0694c9b27d5100))
- **#2905:** 无需传入 color,color 必须来源于字段映射 ([#2945](https://github.com/antvis/g2/pull/2945)) ([acf7ad40](https://github.com/antvis/g2/commit/acf7ad4073410107082d2ac100258e79688a7a05))
- **annotation:** text annotation re-render will be hidden ([#2916](https://github.com/antvis/g2/pull/2916)) ([9891f40b](https://github.com/antvis/g2/commit/9891f40b6c6fd02af2312542c01ec430d004d974))
- **issue-2905:** 自定义 shape 的默认样式设置 ([#2906](https://github.com/antvis/g2/pull/2906)) ([dac96901](https://github.com/antvis/g2/commit/dac96901ea55db6ba7442cc32b07b4d5b8173725))
- **issue-2541:** state 状态依然存在时，但由于 changeSize, changeData 等重绘后丢失 ([#2871](https://github.com/antvis/g2/pull/2871)) ([dcb39aa3](https://github.com/antvis/g2/commit/dcb39aa3df8d42b8574a9aee9f76d5d0c133daeb))
- **pie-demo:** typo, fixed [#2884](https://github.com/antvis/g2/pull/2884) ([#2897](https://github.com/antvis/g2/pull/2897)) ([6aa10078](https://github.com/antvis/g2/commit/6aa100780ea98a5636cb578dc19dd0ed75d40eb8))
- **types:** add legend option ([#2892](https://github.com/antvis/g2/pull/2892)) ([bf3531ff](https://github.com/antvis/g2/commit/bf3531ff2cef51ab0d1fbc05b8b402a16f8ea92b))

##### Refactors

- **legend:** legend update and render with same logic ([#2890](https://github.com/antvis/g2/pull/2890)) ([10666c0c](https://github.com/antvis/g2/commit/10666c0c622afef9f5ec17f87d8156bf5e451f78))

#### 4.1.0-beta.14 (2020-10-22)

##### Documentation Changes

- modify some descriptions ([#2917](https://github.com/antvis/g2/pull/2917)) ([0512365b](https://github.com/antvis/g2/commit/0512365b9bd92a2865f70c3eda4c54db78f545e4))
- marker 单词拼写错误修正 ([#2911](https://github.com/antvis/g2/pull/2911)) ([645bb2d9](https://github.com/antvis/g2/commit/645bb2d9fa0b6e9906a2436338473a22248c281c))

##### New Features

- G2 层支持 custom annotation html annotation ([#2934](https://github.com/antvis/g2/pull/2934)) ([6209203a](https://github.com/antvis/g2/commit/6209203a55f8183acfcd1bcda23328016211310e))
- **annotation:** add support for mean / median ([#2922](https://github.com/antvis/g2/pull/2922)) ([f8054857](https://github.com/antvis/g2/commit/f80548579a13e936706ee7172e040cd02f20b6d6))
- **legend:** set default maxItemWidth = 200 ([#2889](https://github.com/antvis/g2/pull/2889)) ([9e1b2585](https://github.com/antvis/g2/commit/9e1b25852d6fd97ed557d174818ff3c852df39bc))
- **region-filter:** add geometry life circle, after draw animate ([#2879](https://github.com/antvis/g2/pull/2879)) ([2738acb5](https://github.com/antvis/g2/commit/2738acb57c524d2649e356465dd624bf0f145616))

##### Bug Fixes

- **#2905:** 无需传入 color,color 必须来源于字段映射 ([#2945](https://github.com/antvis/g2/pull/2945)) ([acf7ad40](https://github.com/antvis/g2/commit/acf7ad4073410107082d2ac100258e79688a7a05))
- **annotation:** text annotation re-render will be hidden ([#2916](https://github.com/antvis/g2/pull/2916)) ([9891f40b](https://github.com/antvis/g2/commit/9891f40b6c6fd02af2312542c01ec430d004d974))
- median typo ([#2925](https://github.com/antvis/g2/pull/2925)) ([57648275](https://github.com/antvis/g2/commit/57648275072082a6226500d9e2ee6ec1748a9cd3))
- 修复 adjust-color label layout 对一些颜色不生效的问题 ([#2919](https://github.com/antvis/g2/pull/2919)) ([b1f2c2a1](https://github.com/antvis/g2/commit/b1f2c2a103388f67b8edbba572d557e4545abe7a))
- 漏斗图 label position 可生效 ([#2909](https://github.com/antvis/g2/pull/2909)) ([c2727a82](https://github.com/antvis/g2/commit/c2727a82e0311ecd7c06ed71d3d9fe5fe8a93905))
- **issue-2905:** 自定义 shape 的默认样式设置 ([#2906](https://github.com/antvis/g2/pull/2906)) ([dac96901](https://github.com/antvis/g2/commit/dac96901ea55db6ba7442cc32b07b4d5b8173725))
- **issue-2541:** state 状态依然存在时，但由于 changeSize, changeData 等重绘后丢失 ([#2871](https://github.com/antvis/g2/pull/2871)) ([dcb39aa3](https://github.com/antvis/g2/commit/dcb39aa3df8d42b8574a9aee9f76d5d0c133daeb))
- **pie-demo:** typo, fixed [#2884](https://github.com/antvis/g2/pull/2884) ([#2897](https://github.com/antvis/g2/pull/2897)) ([6aa10078](https://github.com/antvis/g2/commit/6aa100780ea98a5636cb578dc19dd0ed75d40eb8))
- **types:** add legend option ([#2892](https://github.com/antvis/g2/pull/2892)) ([bf3531ff](https://github.com/antvis/g2/commit/bf3531ff2cef51ab0d1fbc05b8b402a16f8ea92b))

##### Refactors

- **legend:** legend update and render with same logic ([#2890](https://github.com/antvis/g2/pull/2890)) ([10666c0c](https://github.com/antvis/g2/commit/10666c0c622afef9f5ec17f87d8156bf5e451f78))

#### 4.1.0-beta.11 (2020-10-09)

##### New Features

- **legend:** set default maxItemWidth = 200 ([#2889](https://github.com/antvis/g2/pull/2889)) ([9e1b2585](https://github.com/antvis/g2/commit/9e1b25852d6fd97ed557d174818ff3c852df39bc))
- **region-filter:** add geometry life circle, after draw animate ([#2879](https://github.com/antvis/g2/pull/2879)) ([2738acb5](https://github.com/antvis/g2/commit/2738acb57c524d2649e356465dd624bf0f145616))

##### Bug Fixes

- **pie-demo:** typo, fixed [#2884](https://github.com/antvis/g2/pull/2884) ([#2897](https://github.com/antvis/g2/pull/2897)) ([6aa10078](https://github.com/antvis/g2/commit/6aa100780ea98a5636cb578dc19dd0ed75d40eb8))
- **types:** add legend option ([#2892](https://github.com/antvis/g2/pull/2892)) ([bf3531ff](https://github.com/antvis/g2/commit/bf3531ff2cef51ab0d1fbc05b8b402a16f8ea92b))

##### Refactors

- **legend:** legend update and render with same logic ([#2890](https://github.com/antvis/g2/pull/2890)) ([10666c0c](https://github.com/antvis/g2/commit/10666c0c622afef9f5ec17f87d8156bf5e451f78))

#### 4.1.0-beta.10 (2020-09-28)

##### Chores

- 4.1.0-beta.8 release ([#2850](https://github.com/antvis/g2/pull/2850)) ([73d6fbce](https://github.com/antvis/g2/commit/73d6fbce86f56a3364beacca0ead9a0c21977d3a))
- upgrade version ([#2832](https://github.com/antvis/g2/pull/2832)) ([e823c8b6](https://github.com/antvis/g2/commit/e823c8b62a82583baaa6c1899547ef43cbb25126))

##### Documentation Changes

- walkthrough api link in manual ([#2826](https://github.com/antvis/g2/pull/2826)) ([0f90a1de](https://github.com/antvis/g2/commit/0f90a1de34ead9a82a893bd1b8048130f26e1fe4))
- upgrade api docs ([#2818](https://github.com/antvis/g2/pull/2818)) ([e472de59](https://github.com/antvis/g2/commit/e472de596bea764fa68fa89bda8e768d741984ee))

##### New Features

- improve interval label position ([#2869](https://github.com/antvis/g2/pull/2869)) ([81ae97fa](https://github.com/antvis/g2/commit/81ae97faa8655b03c11df9e29e46635f09a23c50))
- view padding sync ([#2843](https://github.com/antvis/g2/pull/2843)) ([032e9208](https://github.com/antvis/g2/commit/032e9208fc7b1a3251c38f36a9e0f704cbfa5055))
- 添加 supportCSSTransform 属性, 使图表在 css transform 下事件和交互都生效 ([#2829](https://github.com/antvis/g2/pull/2829)) ([c2190595](https://github.com/antvis/g2/commit/c2190595c78807bf0f359c30847aa3828308491d))
- support scrollbar component ([#2813](https://github.com/antvis/g2/pull/2813)) ([93436c11](https://github.com/antvis/g2/commit/93436c11a7d2312b60d9470774350e895be4e00a))
- **geometry:** add geometry.custom API for registerShape ([#2831](https://github.com/antvis/g2/pull/2831)) ([ab589e30](https://github.com/antvis/g2/commit/ab589e309bc4a7b247f2f27ac913ea3c67f46fb3))
- **options:** 支持配置项式声明分面 ([#2788](https://github.com/antvis/g2/pull/2788)) ([67cfdf34](https://github.com/antvis/g2/commit/67cfdf34ef75702e7b8ec23a831e41491840b752))

##### Bug Fixes

- 修复数据为空时 slider 报错的问题 ([#2855](https://github.com/antvis/g2/pull/2855)) ([1b706bec](https://github.com/antvis/g2/commit/1b706becf01fa7a73430fd4f1c1f6802fbfa7bc3))
- fix slider changeSize bug and scrollbar overlap with legend ([#2840](https://github.com/antvis/g2/pull/2840)) ([38f07d4b](https://github.com/antvis/g2/commit/38f07d4b695c57b9a98fe237a52af6985de6bf7b))
- build before deploy to get latest type definition ([#2833](https://github.com/antvis/g2/pull/2833)) ([167daa3e](https://github.com/antvis/g2/commit/167daa3e7e8ac5d5f1cb55dfdb5dce18ab17f47e))
- slider bugfix ([#2828](https://github.com/antvis/g2/pull/2828)) ([10edf2e6](https://github.com/antvis/g2/commit/10edf2e6c049cfd227771df92eb5682b9a85d3cd))
- add dom-util dependence ([#2789](https://github.com/antvis/g2/pull/2789)) ([0c54f436](https://github.com/antvis/g2/commit/0c54f43642fc37abd870018e61a63bb9dc341170))
- **demo:** 修复环图自定义 label 的 demo, 获取 labelItems 为空 ([#2838](https://github.com/antvis/g2/pull/2838)) ([c1c764cf](https://github.com/antvis/g2/commit/c1c764cf522a3d6f80dc076917255c00d7075c7e))
- **typos:** correct spelling ([#2811](https://github.com/antvis/g2/pull/2811)) ([7c671d0d](https://github.com/antvis/g2/commit/7c671d0da836425068d9e8e678559a593c13fe8f))
- **clear:** chart.clear then render, momery leak ([#2800](https://github.com/antvis/g2/pull/2800)) ([a6f56a73](https://github.com/antvis/g2/commit/a6f56a73dea49170ec75fb5fd6b6d7af9973d1e1))
- **#2763:** 修复 legend-filter 在 view 中行为错误 ([#2802](https://github.com/antvis/g2/pull/2802)) ([4432e0ed](https://github.com/antvis/g2/commit/4432e0ed43249ff65e18884207b946bf6ac9c0bd))
- **offscreen:** sync clip style in offscreen group ([#2795](https://github.com/antvis/g2/pull/2795)) ([554f619f](https://github.com/antvis/g2/commit/554f619fb75c605e3f62fab15cf18446a8d74e1f))
- **#2433:** fix slider collide legend ([#2793](https://github.com/antvis/g2/pull/2793)) ([6b6479d5](https://github.com/antvis/g2/commit/6b6479d52deba8281df98dc25e03bf51f0502626))
- **issue-2778:** 修复 label 点击的时候，没有获取到数据 ([#2791](https://github.com/antvis/g2/pull/2791)) ([85e3b147](https://github.com/antvis/g2/commit/85e3b147b1fcd6305c3512a33241fbaaf05426ef))

##### Other Changes

- "g2-tooltip" ([#2834](https://github.com/antvis/g2/pull/2834)) ([cafecfd1](https://github.com/antvis/g2/commit/cafecfd1d86e44db87298998d0909e2c257dec4e))

##### Tests

- **padding:** add a test case ([#2803](https://github.com/antvis/g2/pull/2803)) ([87e8344b](https://github.com/antvis/g2/commit/87e8344b9daf8be4530546890e71a7444dbd8d82))

#### 4.1.0-beta.1 (2020-09-02)

##### Chores

- **view-recursive:** add warning message before refactor ([#2768](https://github.com/antvis/g2/pull/2768)) ([c7f1e6a8](https://github.com/antvis/g2/commit/c7f1e6a82277a674272ab602036423ccbdbe97df))
- **slider:** export typedefine ([#2766](https://github.com/antvis/g2/pull/2766)) ([b35d925b](https://github.com/antvis/g2/commit/b35d925b0e46d4d84be057587fc51883696edddb))

##### Documentation Changes

- **manual:** update english documentation ([#2761](https://github.com/antvis/g2/pull/2761)) ([ff7d4cec](https://github.com/antvis/g2/commit/ff7d4cec4f25d6df917ba1b39c965fb2c505c495))

##### New Features

- **spider-label:** 增加蜘蛛标签 & spider label layout ([#2755](https://github.com/antvis/g2/pull/2755)) ([dd765cc9](https://github.com/antvis/g2/commit/dd765cc91f9fa02477c76d5cf804bf002c3df3cb))
- **label:** add adjust-color label layout ([#2753](https://github.com/antvis/g2/pull/2753)) ([b242cb44](https://github.com/antvis/g2/commit/b242cb44fd7ea123c1920c6ca1f3efd286af43f9))
- **label 增强:** ([#2747](https://github.com/antvis/g2/pull/2747)) ([e52544d0](https://github.com/antvis/g2/commit/e52544d0f7b4c84770bb3babc3a96be0c7a33746))

##### Bug Fixes

- **slider:** slider + layout, add slider padding ([#2776](https://github.com/antvis/g2/pull/2776)) ([9a9d0679](https://github.com/antvis/g2/commit/9a9d0679f461c7d354f7e60ff283b62c2c2f8dad))
- **legend:** add legend padding ([#2785](https://github.com/antvis/G2/pull/2785)) ([de295ba5](https://github.com/antvis/G2/commit/de295ba596adf7b01e1ceb81a162013d04e5520c))
- **tooltip:** make tooltip enterable ([#2762](https://github.com/antvis/g2/pull/2762)) ([b98a42b0](https://github.com/antvis/g2/commit/b98a42b04f3335b7db2c98c1c440a54ace71ace8))
- **background:**
  - 背景色 shape z-index 顺序不对 ([#2760](https://github.com/antvis/g2/pull/2760)) ([0b74478d](https://github.com/antvis/g2/commit/0b74478d907082bf882674d353629452126f60be))
  - backgroup shape should set capture = false ([#2748](https://github.com/antvis/g2/pull/2748)) ([425846dd](https://github.com/antvis/g2/commit/425846dd34d9a2da04412d0d9d6eb9f33f2c76ba))
- gitee mirror action don't work when push gh-pages only ([#2742](https://github.com/antvis/g2/pull/2742)) ([36ddf10f](https://github.com/antvis/g2/commit/36ddf10f396b1432e6477c76de8c260bb4f0b372))
- 移除 0.5px 的边框以及文本的描边 ([#2759](https://github.com/antvis/g2/pull/2759)) ([0d8a9d6f](https://github.com/antvis/g2/commit/0d8a9d6f788a775d0325524ce0bb2fabbdabd78c))
- the doc example error ([#2750](https://github.com/antvis/g2/pull/2750)) ([7bfc513c](https://github.com/antvis/g2/commit/7bfc513c3df2f25b8edf27fa24ba9db8428e9e72))

#### 4.0.15 (2020-08-14)

##### Documentation Changes

- add part API documents ([#2718](https://github.com/antvis/g2/pull/2718)) ([6e5769f9](https://github.com/antvis/g2/commit/6e5769f94a47aab9083305d53cc0584fe3d65f3b))

##### New Features

- **background:** 使用 shape 来绘制 dark 的背景色 ([#2745](https://github.com/antvis/g2/pull/2745)) ([6adbdbf4](https://github.com/antvis/g2/commit/6adbdbf4e23bab95e924475f0e4cdf706594e731))
- **annotation:** text annotation 提供 content 回调，将图表 filteredData 作为回调参数 ([#2735](https://github.com/antvis/g2/pull/2735)) ([0e4d1f12](https://github.com/antvis/g2/commit/0e4d1f12e955f71bb7129219312af817f09228ff))
- Tooltip supported customContent ([#2739](https://github.com/antvis/g2/pull/2739)) ([5dc5a36e](https://github.com/antvis/g2/commit/5dc5a36e92e5704719acb13d96b4c8194f9766e8))
- add api-extractor for extract typescript declare file ([#2725](https://github.com/antvis/g2/pull/2725)) ([22620898](https://github.com/antvis/g2/commit/22620898ae650ea0da70ee2ec211bfd32c1d8303))
- **pie-label:** add pie-outer label layout ([#2726](https://github.com/antvis/g2/pull/2726)) ([d94157da](https://github.com/antvis/g2/commit/d94157dad468a306443634dc4b4df48f5bfea5c0))

##### Bug Fixes

- **change-size:** when size is equal, not render ([#2734](https://github.com/antvis/g2/pull/2734)) ([3f9f0ac1](https://github.com/antvis/g2/commit/3f9f0ac1a8b1e4da9d84134cbd4625cd017a257a))
- resolve tooltip debounce ([#2733](https://github.com/antvis/g2/pull/2733)) ([f5114f47](https://github.com/antvis/g2/commit/f5114f473fb17661fe65aaa61550e341dba0e8f5))
- bugs in wordcloud demo ([#2723](https://github.com/antvis/g2/pull/2723)) ([61abf9de](https://github.com/antvis/g2/commit/61abf9de512bd2fc5e9877b6353b13daf9b8663e))
- [#2706](https://github.com/antvis/g2/pull/2706) ([#2710](https://github.com/antvis/g2/pull/2710)) ([897e2bbb](https://github.com/antvis/g2/commit/897e2bbb455e02ede853e6ff1103dab016b18e9b))

##### Refactors

- **axis:** axis update 包含有 create 逻辑,删除容易的 create 逻辑,简化代码 ([#2741](https://github.com/antvis/g2/pull/2741)) ([757e21d6](https://github.com/antvis/g2/commit/757e21d641d83913cd7c8e0fcdadd88489d9f3d4))

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
