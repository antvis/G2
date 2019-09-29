/**
 * view 中三层 group 分层 key
 */
export enum LAYER {
  FORE = 'fore',
  MID = 'mid',
  BG = 'bg',
}

/**
 * 组件在画布的布局方位 12 方位
 */
export enum DIRECTION {
  TOP = 'top',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  RIGHT = 'right',
  RIGHT_TOP = 'right-top',
  RIGHT_BOTTOM = 'right-bottom',
  LEFT = 'left',
  LEFT_TOP = 'left-top',
  LEFT_BOTTOM = 'left-bottom',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

/**
 * 组件的类型，可能会影响到布局算法
 */
export enum ComponentType {
  AXIS = 'axis',
  LEGEND = 'legend',
  OTHER = 'other',
}

/**
 * 三层 group 的 z index
 */
export const GroupZIndex = {
  FORE: 3,
  MID: 2,
  BG: 1,
};
