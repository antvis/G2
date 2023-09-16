# 如何参入贡献

首先我们需要明确的时候，参入开源项目贡献，不仅仅是指提交代码解决 bug，提交 feature，参入开源贡献有很多种的产出结果，包括且不限于：

1. 提需求：根据自己业务上的需求，确定开源项目无法满足的情况下，详细的提交自己的需求；
2. 文档：发现文档上的小问题，可以顺手提交 PR 解决，或者提交 issue 提交文档问题以及建议；
3. 讨论：发起 discussion 讨论自己的想法、需求、建议等；
4. 答疑：根据自己的使用经验，帮忙回复和处理 issue，discussion；
5. bugfix：在使用过程中，遇到一些问题，如果能定位到问题的代码，并且愿意尝试接受挑战，可以提交 PR 解决问题；
6. 提交特性：根据 issue、discussion 的讨论，实现之后提交 PR，为整个开源用户收益；
7. 生态运营：通过自己的能力，为开源项目添加生态内容，比如：博客、案例、解决方案、扩展包等等；

有任何疑问，欢迎提交 [issue](https://github.com/antvis/g2/issues)，或者直接修改提交 [PR](https://github.com/antvis/g2/pulls)。下面主要介绍几类开源贡献的操作指南。

## 如何本地运行官网代码？

> 如果想帮忙优化`文档`，提交`图表示例`，就一定需要启动官网调试和验证，这里介绍一下如何启动官网。

- clone 代码到本地

```bash
$ git clone git@github.com:antvis/G2.git
```

- 安装项目依赖

```bash
$ cd G2

$ npm install
```

也可以按照自己的习惯，选择其他的包管理工具进行安装。

- 安装官网依赖并启动

```bash
$ cd site

$ npm install

$ npm start
```

然后在命令控制台就能看到访问本地官网的 URL 地址。


## 如何调试项目代码？

> 在学习项目的代码，或者为项目解决 bug，提交 feature 的时候，一定会涉及到代码的调试和运行，这里介绍怎么启动和调试项目。

- clone 项目，并安装依赖

```bash
$ git clone git@github.com:antvis/G2.git

$ cd G2

$ npm install
```

- 启动本地调试案例

G2 使用了 [Vite](https://vitejs.dev/) 来搭建预览环境，通过 `npm run dev` 可以打开预览界面。

```bash
$ npm run dev
```

预览界面可以预览 [`__tests__/plots`](./__tests__/plots) 下面的所有图表案例，并且通过下拉框进行切换。图表案例根据关注点不同，分为以下几类：

- **animation** - 动画相关的案例，放在 [`__tests__/plots/animation`](./__tests__/plots/animation/) 下面。
- **api** - Chart API 相关的案例，放在 [`__tests__/plots/api`](./__tests__/plots/api) 下面。
- **interaction** - 交互相关的案例，放在 [`__tests__/plots/interaction`](./__tests__/plots/interaction) 下面。
- **static** - 静态绘制相关的案例，放在 [`__tests__/plots/static`](./__tests__/plots/static/) 下面。
- **tooltip** - tooltip 相关的案例，放在 [`__tests__/plots/tooltip`](./__tests__/plots/tooltip/) 下面。

在开始开发的时候，首先需要确定即将实现的功能或者修复的 BUG 是属于上面的哪一个分类，然后在对应的分类文件夹下新增一个文件，输入对应的代码，并且在对应的 index.js 导出，这样就可以在预览环境里里面预览了。

- 本地运行 CI

```ts
$ npm run test
```

上面的命令就可以本地运行 CI，保证修改代码之后，不会带来新的问题。


## 贡献 PR 的要求是什么？

为了保证项目长期的代码质量和稳定性，一个 PR 需要至少保障一下规范：

- Commit Message 规范
- 自动化测试要求
- Pull Request 规范


### Commit Message 规范

根据 [angular 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)提交 commit，这样 history 看起来更加清晰，还可以自动生成 changelog。规范格式如下：

```text
type(scope): your commit message subject
```

`type`：提交 commit 的类型，包括以下几种：

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

`scope`：修改文件的范围。

`subject`：修改的具体内容。

示例

```plain
fix(compile): couple of unit tests for IE9
```

### 自动化测试要求

G2 的自动化测试有两个部分：

- **单元测试**：测试纯数据模块或者功能，在 [`__tests__/unit/`](./__tests__/unit/) 下面。
- **集成测试**：通过截图对比像素，测试整个可视化图表的渲染结果，在 [`__tests__/integration/`](./__tests__/integration/) 下面。

对于所有的改动，都需要针对改动点，提交单元测试或者集成测试，保证自己修改的地方能被覆盖到，并且本地运行 `npm run test` 保证 CI 运行通过。

### Pull Request 规范

由于谁也无法保证过了多久之后还记得多少，为了后期回溯历史的方便，请在提交 Pull Request 时确保提供了以下信息。

1. 需求点（一般关联 issue 或者注释都算）
2. 升级原因（不同于 issue，可以简要描述下为什么要处理）
3. 框架测试点（可以关联到测试文件，不用详细描述，关键点即可）
4. 关注点（针对用户而言，可以没有，一般是不兼容更新等，需要额外提示）

更多其他的疑问，可以提交 discussion 寻求帮助，期望早日成为 AntV 的 contributor。
