#### 4.0.0-alpha.1 (2019-11-21)

G2 作为图形语法（the Grammar of Graphics）的前端实现，G2 已经历多个版本的迭代。本次 G2 4.0 是一个新的起点，我们对底层架构做了大量的重构工作，G2 会更加关注于：

- 图形语法，数据到图形的映射；
- 交互语法，交互同数据、图形的连接机制；
- 组件体系，面向交互、体验优雅。

以下是 4.0-alpha 版本的主要更新：

- 🏗️ 全面拥抱 TypeScript
- 🖌️ 底层绘制引擎升级，详见 [🔗](https://www.yuque.com/antv/blog/kxzk9g)
- 🧩 模块化，结构更清晰，G2 4.0 将由以下功能模块组成，各个功能模块互相解耦：
  - Chart、View、Geometry、Component 四个模块组成 G2 的图表
  - Geometry、Scale、Coordinate、Attribute、Adjust、Element、Shape 模块组成图形语法，处理数据到图形的映射逻辑
  - Interaction 与 State 模块组成交互语法
- 🦍View 模块改造：支持嵌套 View，同时支持图表组件的自由布局
- 😃 引入更新机制
- 💄 图表组件重构，提供面向交互、体验优雅的可视化组件体系
- 🤩 交互与渲染解耦，引入状态量机制

详细的思考及设计文档详见 👉 [G2 4.0](https://www.yuque.com/antv/g2-docs/nmzh8r)
