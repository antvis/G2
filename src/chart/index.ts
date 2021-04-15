/**
 * View 是 G2 中串联逻辑的类，也是核心的 API 承载的地方，Chart 继承于 View。
 * View 需要实现：
 * 1. 管理 Geometry、Component 的生命周期
 * 2. 嵌套、布局
 * 3. 交互（Interaction）的生命周期管理
 * 4. 提供 API
 */

 export { Chart } from './chart';
 export { View } from './view';