/**
 * 桑基图布局代码，Fork from https://github.com/d3/d3-sankey/tree/master/src
 * 主要修改：
 * 1. 删除 d3-array 依赖
 * 2. 修改一些 set map 的遍历
 * 3. 数组创建出 [empty] 导致出错
 * 4. 通过 align 方法实现 depth 自定义
 */
import { Sankey as sankey } from './sankey';
export { center, left, right, justify } from './align';
export { sankey };
