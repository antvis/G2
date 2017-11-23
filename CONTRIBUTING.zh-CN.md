# 代码贡献规范

有任何疑问，欢迎提交 [issue](https://github.com/antvis/g2/issues)，
或者直接修改提交 [PR](https://github.com/antvis/g2/pulls)!

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

提交后就可以在 [g2](https://github.com/antvis/g2/pulls) 创建 Pull Request 了。

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

```
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

g2 基于 [semver] 语义化版本号进行发布。

`master` 分支为当前稳定发布的版本。

- 直接从 `master` 切出开发分支
- 所有 API 的废弃都需要在当前的稳定版本上 `deprecate` 提示，并保证在当前的稳定版本上一直兼容到新版本的发布。

### 发布策略

每个大版本都有一个发布经理管理（PM），他/她要做的事情

#### 准备工作：

- 建立 milestone，确认需求关联 milestone，指派和更新 issues。

#### 发布前：

- 确认当前 Milestone 所有的 issue 都已关闭或可延期，完成性能测试。
- 发起一个新的 [Release Proposal MR]，按照 [node CHANGELOG] 进行 `History` 的编写，修正文档中与版本相关的内容，commits 可以自动生成。
    ```bash
    $ npm run commits
    ```
- 指定下一个大版本的 PM。

#### 发布时：

- 将老的稳定版本（master）备份到以当前大版本为名字的分支上（例如 `1.x`），并设置 tag 为 {v}.x`（ v 为当前版本，例如 `1.x`）。
- 发布新的稳定版本到 [npm]，并通知上层框架进行更新。
- `npm publish` 之前，请先阅读[『我是如何发布一个 npm 包的』]。


[semver]: http://semver.org/lang/zh-CN/
[Release proposal MR]: https://github.com/nodejs/node/pull/4181
[node CHANGELOG]: https://github.com/nodejs/node/blob/master/CHANGELOG.md
[npm]: http://npmjs.com/
[『我是如何发布一个 npm 包的』]: https://fengmk2.com/blog/2016/how-i-publish-a-npm-package
