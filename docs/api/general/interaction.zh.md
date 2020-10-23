---
title: 交互 - Interaction
order: 17
---

```sign
(name: string, cfg?: object) => View;
```

```ts
chart.interaction('my-interaction', { extra: 'hello world' });
```

配置交互类型，可以传入 G2 默认支持的交互类型，也可以通过 `registerInteraction` 自己注册交互方式。第二个参数是用来给自定义交互传入参数的，目前 G2 默认支持的交互类型无需传入第二个参数。
