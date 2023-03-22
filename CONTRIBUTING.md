# 代码贡献指引

有任何疑问，欢迎提交 [issue](https://github.com/antvis/g2/issues)，
或者直接修改提交 [PR](https://github.com/antvis/g2/pulls)!

## 开发

G2 使用了 [Vite](https://vitejs.dev/) 来搭建预览环境，通过 `npm run dev` 可以打开预览界面。预览界面可以预览 [`__tests__/plots`](./__tests__/plots) 下面的所有图表案例，并且通过下拉框进行切换。图表案例根据关注点不同，分为以下几类：

- **animation** - 动画相关的案例，放在 [`__tests__/plots/animation`](./__tests__/plots/animation/) 下面。
- **api** - Chart API 相关的案例，放在 [`__tests__/plots/tooltip`](./__tests__/plots/tooltip) 下面。
- **interaction** - 交互相关的案例，放在 [`__tests__/plots/interaction`](./__tests__/plots/interaction) 下面。
- **static** - 静态绘制相关的案例，放在 [`__tests__/plots/static`](./__tests__/plots/static/) 下面。
- **tooltip** - tooltip 相关的案例，放在 [`__tests__/plots/tooltip`](./__tests__/plots/tooltip/) 下面。

在开始开发的时候，首先需要确定即将实现的功能或者修复的 BUG 是属于上面的哪一个分类，然后在对应的分类文件夹下新增一个文件，输入对应的代码，并且在对应的 index.js 注册，这样就可以在预览环境里里面预览了。

```js
// __tests__/integration/plots/static/test-case.ts
// 在 static 下增加一个分类
import { data } from '../data/sales';

export async function testCase() {
  // ...
}
```

```js
// __tests__/integration/plots/static/index.ts
// 在 static 里面的 index.js 注册案例
export { testCase } from './test-case';
```

对于 animation，interaction，static 和 tooltip 这四个分类来说，图表案例的命名格式是`[数据名字]-[mark 名字]-[测试点]`。该文件导出一个函数，该函数的名字和文件名的驼峰形式保持一致，同时返回一个 G2 的 options。这个函数可以是同步的，也可以是异步的。

```js
// __tests__/integration/plots/static/sales-basic-interval.ts
import { data } from '../data/sales';

export async function salesBasicInterval() {
  return {
    type: 'interval',
    data,
    encode: {
      x: 'genre',
      y: 'sold',
      color: 'genre',
    },
  };
}
```

对于 api 这个分类来说，图表案例的命名格式 `[api-name]-[测试点]`。该文件导出一个函数，可以通过函数的参数获得对应的 container 和 canvas 对象，用于实例化 Chart 对象。该函数可以返回任意值用于测试断言。

```js
import { Chart } from '../../../src/api';
import { data } from '../data/basic';

export function chartRender(context) {
  // 获得 container 和 canvas 对象
  const { container, canvas } = context;

  // 实例化图表
  const chart = new Chart({
    container,
    canvas,
  });

  chart
    // 声明可视化
    .interval()
    .data(data)
    .encode('x', 'genre')
    .encode('y', 'sold');

  // 渲染图表
  const finished = chart.render();

  // 返回任意值
  return { finished };
}
```

对于案例中的数据，如果是数据是内联数据，可以在 [`__tests__/data/`](./__tests__/data/) 创建一个 `[name].js` 文件，并且在图表案例中通过 `import` 使用，参考上面的例子。如果数据是 JSON 或者 CSV 等格式的数据，同样在 [`__tests/data/`](./__tests__/data/) 创建一个 `[name].[format]` 的文件，只不过通过 G2 提供的 `fetch` 能力去获得数据。

```js
export async function salesBasicInterval() {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/[name].[format]',
    },
    // ...
  };
}
```

**注意，为了保证测试的独立性，不要使用远程数据。**

```js
export async function salesBasicInterval() {
  return {
    data: {
      type: 'fetch',
      value: 'https://xxx', // ❌
    },
    // ...
  };
}
```

## 测试

G2 的测试有两个部分：

- **单元测试**：测试纯数据模块或者功能，在 [`__tests__/unit/`](./__tests__/unit/) 下面。
- **集成测试**：测试整个可视化图表的渲染结果，在 [`__tests__/integration/`](./__tests__/integration/) 下面。

### 单元测试

在 G2 中有一系列模块参与把抽象的数据转换成视觉模块的流程，比如 scale、coordinate 和 transform 等，对于这类模块来说，需要去断言这个转换过程。

在进行单元测试的时候，首先在对应的模块文件夹下增加一个测试文件，按照如下的格式书写测试。

```ts
describe('ModuleName', () => {
  it('foo(...params) should ....', () => {
    // 测试逻辑
  });
});
```

最后通过运行 `npm run test:unit` 保证测试的正确性。

### 集成测试

和单元测试测试单独的模块不同，集成测试用于测试整个可视化图表。所有的测试案例和预览案例 [`__tests__/plots`](./__tests__/plots/) 里面的保持一致。

对于 animation，interaction，static 和 tooltip 这四个分类来说，并不需要新增测试文件，它们会分别在下面四个测试文件中统一测试：

- **animation** - [`__tests__/integration/spec-animation.spec.ts`](./__tests__/integration/spec-animation.spec.ts)
- **interaction** - [`__tests__/integration/spec-interaction.spec.ts`](./__tests__/integration/spec-interaction.spec.ts)
- **static** - [`__tests__/integration/spec-static.spec.ts`](./__tests__/integration/spec-static.spec.ts)
- **tooltip** - [`__tests__/integration/spec-tooltip.spec.ts`](./__tests__/integration/spec-tooltip.spec.ts)

默认所有的案例都会测试，在调试过程中，可以通过给导出函数增加范围控制属性 `only` 和 `skip` 来控制测试的范围。

```js
// static
export async function salesBasicInterval() {
  // ...
}
```

```js
// static 下的文件只有它会被测试
salesBasicInterval.only = true;
```

```js
// 跳过这个测试案例
salesBasicInterval.skip = true;
```

注意：**调试完成之后，需要把对应的范围控制属性去掉，防止改变测试范围。**

当运行 `npm run test:integration` 的时候，会对每一个测试案例渲染的结果进行截图，然后和 [`__tests__/integration/snapshots`](./__tests__/integration/snapshots/) 里面的基准图片进行比较。如果其中的测试案例没有对应的截图，那么会生成基准图片，并且通过测试，否则只有当两者的误差在一定范围内的时候才能通过测试。

对于一对一的测试来说，截图的名字和测试文件导出的函数名对应。

```js
// static
export async function salesBasicInterval() {
  // ...
}
```

```text
__tests__/integration/snapshots/static/salesBasicInterval.png
```

对于一对多的测试来说，截图存在的文件名字和测试文件导出的函数名对应。

```js
// interaction
export async function salesBasicIntervalElementHighlight() {
  // ...
}
```

```text
__tests__/integration/snapshots/static/salesBasicIntervalElementHighlight/step0.png
__tests__/integration/snapshots/static/salesBasicIntervalElementHighlight/step1.png
```

如果测试案例不通过，则会生成 `-diff` 标记的图片。如果该图片复合预期，那么删除基准图片，重新运行 `npm run test:integration` 生成新的基准图片，否则修改代码，直到通过测试。注意：**新增测试案例之后，一定要本地生成基准图片之后，再把代码推到远程，否则对应的 PR 不会合并。**

由于截图存在一定误差，对于复杂图表来说，CI 环境和本地环境的误差可能较大，如果该误差在容忍范围内，可以通过给测试案例导出函数增加 `maxError` 去通过测试。

```js
// static
export async function salesBasicInterval() {
  // ...
}

// 误差在 1000 以下都会通过测试
salesBasicInterval.maxError = 1000;
```

对于 api 下面的测试，仍然需要在 [`__tests__/integration/`](./__tests__/integration/) 下面增加对应的测试文件，如果需要截图的话，需要显式的调用 `expect.toMatchCanvasSnapshot` 或者 `expect.toMatchSVGSnapshot`，参考：[`__tests__/integration/api-chart-render.spec.ts`](./__tests__/integration/api-chart-render.spec.ts)。

## 提交 issue

- 请确定 issue 的类型。
- 请避免提交重复的 issue，在提交之前搜索现有的 issue。
- 在标签(分类参考**标签分类**), 标题 或者内容中体现明确的意图。

随后 AntV 负责人会确认 issue 意图，更新合适的标签，关联 milestone，指派开发者。

## 提交代码

### 提交 Pull Request

如果你有仓库的开发者权限，而且希望贡献代码，那么你可以创建分支修改代码提交 PR，AntV 开发团队会 review 代码合并到主干。

```bash
# 先创建开发分支开发，分支名应该有含义，避免使用 update、tmp 之类的
$ git checkout -b branch-name

# 开发完成后跑下测试是否通过，必要时需要新增或修改测试用例
$ npm test

# 测试通过后，提交代码，message 见下面的规范

$ git add . # git add -u 删除文件
$ git commit -m "fix(role): role.use must xxx"
$ git push origin branch-name
```

提交后就可以在 [G2](https://github.com/antvis/g2/pulls) 创建 Pull Request 了。

由于谁也无法保证过了多久之后还记得多少，为了后期回溯历史的方便，请在提交 MR 时确保提供了以下信息。

1. 需求点（一般关联 issue 或者注释都算）
2. 升级原因（不同于 issue，可以简要描述下为什么要处理）
3. 框架测试点（可以关联到测试文件，不用详细描述，关键点即可）
4. 关注点（针对用户而言，可以没有，一般是不兼容更新等，需要额外提示）

### 代码风格

你的代码风格必须通过 eslint，你可以运行 `$ npm run lint` 本地测试。

### Commit 提交规范

根据 [angular 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)提交 commit，
这样 history 看起来更加清晰，还可以自动生成 changelog。

```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

（1）type

提交 commit 的类型，包括以下几种

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

（2）scope

修改文件的范围

（3）subject

用一句话清楚的描述这次提交做了什么

（4）body

补充 subject，适当增加原因、目的等相关因素，也可不写。

（5）footer

- **当有非兼容修改(Breaking Change)时必须在这里描述清楚**
- 关联相关 issue，如 `Closes #1, Closes #2, #3`

示例

```plain
fix($compile): [BREAKING_CHANGE] couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Document change on antvis/g2#12

Closes #392

BREAKING CHANGE:

  Breaks foo.bar api, foo.baz should be used instead
```

查看具体[文档](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)

## 发布管理

G2 基于 [semver] 语义化版本号进行发布。

`master` 分支为当前稳定发布的版本。

- 直接从 `master` 切出开发分支
- 所有 API 的废弃都需要在当前的稳定版本上 `deprecate` 提示，并保证在当前的稳定版本上一直兼容到新版本的发布。

### 发布策略

每个大版本都有一个发布经理管理（PM），他/她要做的事情

#### 准备工作

- 建立 milestone，确认需求关联 milestone，指派和更新 issues。

#### 发布前

- 确认当前 Milestone 所有的 issue 都已关闭或可延期，完成性能测试。
- 发起一个新的 [Release Proposal MR]，按照 [node CHANGELOG] 进行 `History` 的编写，修正文档中与版本相关的内容，commits 可以自动生成。
  ```bash
  $ npm run commits
  ```
- 指定下一个大版本的 PM。

#### 发布时

- 将老的稳定版本（master）备份到以当前大版本为名字的分支上（例如 `1.x`），并设置 tag 为 {v}.x`（ v 为当前版本，例如`1.x`）。
- 发布新的稳定版本到 [npm]，并通知上层框架进行更新。
- `npm publish` 之前，请先阅读[『我是如何发布一个 npm 包的』]。

[semver]: http://semver.org/lang/zh-CN/
[release proposal mr]: https://github.com/nodejs/node/pull/4181
[node changelog]: https://github.com/nodejs/node/blob/master/CHANGELOG.md
[npm]: http://npmjs.com/
[『我是如何发布一个 npm 包的』]: https://fengmk2.com/blog/2016/how-i-publish-a-npm-package
