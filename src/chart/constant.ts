/**
 * view 中三层 group 分层 key
 */
export enum LAYER {
  FORE = 'fore',
  MID = 'mid',
  BG = 'bg',
}

/**
 * 组件在画布的布局方位
 */
export enum DIRECTION {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

/**
 * 组件的类型，可能会影响到布局算法
 */
export enum ComponentType {
  AXIS = 'axis',
  LEGEND = 'legend',
  OTHER = 'other',
}
