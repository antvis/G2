# `__tests__/plots` 目录中的测试运行方式

## 1. 浏览器预览环境

通过 `npm run dev` 命令启动基于 Vite 的开发服务器，在浏览器中手动预览和测试图表。

这个命令会启动一个服务器，访问 `http://localhost:8080`。

### 运行机制

`__tests__/main.ts` 是预览环境的入口文件，它会：

1. **导入所有测试用例**：从 `plots` 目录的各个子目录导入测试用例

2. **组织测试用例**：将它们按命名空间组织并创建渲染函数

3. **提供交互界面**：创建下拉选择框、搜索框和渲染器选择器，允许开发者切换查看不同的测试用例

4. **支持多种渲染器**：支持 canvas、svg、webgl 三种渲染器

## 2. 自动化集成测试

通过 `npm run test:integration` 命令运行自动化测试。

### 测试配置

使用 Vitest 作为测试运行器，配置在 `vitest.config.ts` 中：

### 测试执行方式
1. 通过像 spec-legend.spec.ts 这样的集成测试文件来批量导入 & 执行 plots 目录中的测试
2. 对每个测试用例进行快照对比测试

```typescript
// tests/integration/spec-tooltip.spec.ts

import * as chartTests from '../plots/tooltip';

describe('Charts', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    let gCanvas: Canvas;
    it(`[Canvas]: ${name}`, async () => {
      try {
        // @ts-ignore
        const { before, after } = generateOptions;
        // @ts-ignore
        generateOptions.preprocess = compose([disableAnimation]);
        before?.();
        gCanvas = await renderSpec(generateOptions);
        after?.();
        const dir = `${__dirname}/snapshots/tooltip`;
        await expect(gCanvas).toMatchDOMSnapshot(dir, name, {
          fileFormat: 'svg',
          keepSVGElementId: false,
        });
      } finally {
        gCanvas?.destroy();
        await sleep(50);
      }
    });
  }
```

1. **使用 Node.js Canvas**：在 jsdom 环境中创建 canvas 实例进行测试

2. **快照测试**：使用自定义的 `toMatchDOMSnapshot` 匹配器进行 DOM 快照对比

## Notes

- **测试目录组织**：`__tests__/plots` 下按功能分类为 `static/`（静态渲染）、`interaction/`（交互）、`animation/`（动画）、`tooltip/`（提示框）、`api/`（API 测试）、`bugfix/`（bug 修复）等子目录
- **运行环境**：手动预览在浏览器中运行，自动化测试在 Node.js + jsdom 环境中运行
- **时区设置**：所有测试命令都设置了 `TZ=Asia/Shanghai` 以确保时间相关测试的一致性
- **运行特定测试**：npm run test -- tooltip