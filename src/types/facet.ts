export type FacetOptions = any;
export type RectOptions = any;
export type MirrorOptions = any;
export type ListOptions = any;
export type MatrixOptions = any;
export type CircleOptions = any;
export type TreeOptions = any;

export type FacetOptionsMap = {
  /** rect 类型分面配置 */
  readonly rect: RectOptions;
  /** mirror 类型分面配置 */
  readonly mirror: MirrorOptions;
  /** list 类型分面配置 */
  readonly list: ListOptions;
  /** matrix 类型分面配置 */
  readonly matrix: MatrixOptions;
  /** circle 类型分面配置 */
  readonly circle: CircleOptions;
  /** tree 类型分面配置 */
  readonly tree: TreeOptions;
}
