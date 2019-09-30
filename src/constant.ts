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

/**
 * View 的生命周期阶段（和 3.x 的生命周期略有不同）
 * 我们需要先确定在那写场景需要用到生命周期，如果只是为了在生命周期插入一下什么组件之类的，那么在现有架构就是不需要的
 */
export enum ViewLifeCircle {
  BEFORE_RENDER = 'beforerender',
  AFTER_RENDER = 'afterrender',

  BEFORE_CHANGE_DATA = 'beforechangedata',
  AFTER_CHANGE_DATA = 'afterchangedata',

  BEFORE_CLEAR = 'beforeclear',
  AFTER_CLEAR = 'afterclear',

  BEFORE_DESTROY = 'beforedestroy',
}
