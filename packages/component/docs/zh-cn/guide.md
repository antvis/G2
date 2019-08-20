# Guide

Guide 是一个抽象基类，所有辅助元素都从这个类派生。

```ts
import { Guide, Interface } from `@antv/guide`;
```

## Properties

### cfg

辅助元素的配置项 cfg:GuideCfg

```ts
interface GuideCfg {
  readonly id?: string | null;

  // 容器
  readonly canvas?: any; // TODO G.Canvas
  readonly container?: string | HTMLDivElement | null; // html，可选
  readonly group?: any; // TODO G.Group

  // 交互属性
  readonly capture?: boolean;

  // props
  // readonly coordinate: any; // TODO Coordinate
  readonly panelRange?: any; // BBox
  // readonly offset: [ number, number ];
  readonly offsetX?: number;
  readonly offsetY?: number;
  readonly position?: [ number, number ];
  readonly visible?: boolean;
  readonly zIndex?: number;
  [key: string]: any;
}
```

- destroyed

> boolean

## Methods

### constructor

创建 Guide 实例 `new Guide(cfg:GuideCfg)`

### get

从 cfg 里获取属性值 `get(key:string, defaultValue?:any)`

```ts
const capture = guide.get('capture');
```

### set

给 cfg 设置属性值 `set(key:string, value:any):Guide`

```ts
guide
  .set('capture', true)
  .set('id', 'guide-label');
```

### destroy

销毁实例，并设置 destroyed 为 true `destroy()`

```ts
guide.destroy();
// guide.destroyed === true
```
