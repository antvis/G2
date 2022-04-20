/**
 * view 中三层 group 分层 key
 */
export enum LAYER {
  /** 前景层 */
  FORE = 'fore',
  /** 中间层 */
  MID = 'mid',
  /** 背景层 */
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
  RADIUS = 'radius',
  CIRCLE = 'circle',
  // no direction information
  NONE = 'none',
}

/**
 * 组件的类型，可能会影响到布局算法
 */
export enum COMPONENT_TYPE {
  /** axis 组件 */
  AXIS = 'axis',
  /** grid 组件 */
  GRID = 'grid',
  /** legend 组件 */
  LEGEND = 'legend',
  /** tooltip 组件 */
  TOOLTIP = 'tooltip',
  /** annotation 组件 */
  ANNOTATION = 'annotation',
  /** 缩略轴组件 */
  SLIDER = 'slider',
  /** 滚动条组件 */
  SCROLLBAR = 'scrollbar',
  /** 其他组件，自定义组件 */
  OTHER = 'other',
}

/**
 * 三层 group 的 z index
 */
export const GROUP_Z_INDEX = {
  FORE: 3,
  MID: 2,
  BG: 1,
};

/**
 * View 的生命周期阶段（和 3.x 的生命周期略有不同）
 * 我们需要先确定在那写场景需要用到生命周期，如果只是为了在生命周期插入一下什么组件之类的，那么在现有架构就是不需要的
 */
export enum VIEW_LIFE_CIRCLE {
  BEFORE_RENDER = 'beforerender',
  AFTER_RENDER = 'afterrender',

  BEFORE_PAINT = 'beforepaint',
  AFTER_PAINT = 'afterpaint',

  BEFORE_CHANGE_DATA = 'beforechangedata',
  AFTER_CHANGE_DATA = 'afterchangedata',

  BEFORE_CLEAR = 'beforeclear',
  AFTER_CLEAR = 'afterclear',

  BEFORE_DESTROY = 'beforedestroy',

  BEFORE_CHANGE_SIZE = 'beforechangesize',
  AFTER_CHANGE_SIZE = 'afterchangesize',
}

/**
 * geometry 的生命周期
 */
export enum GEOMETRY_LIFE_CIRCLE {
  BEFORE_DRAW_ANIMATE = 'beforeanimate',
  AFTER_DRAW_ANIMATE = 'afteranimate',

  BEFORE_RENDER_LABEL = 'beforerenderlabel',
  AFTER_RENDER_LABEL = 'afterrenderlabel',
}

/**
 * 绘图区的事件列表
 */
export enum PLOT_EVENTS {
  // mouse 事件
  MOUSE_ENTER = 'plot:mouseenter',
  MOUSE_DOWN = 'plot:mousedown',
  MOUSE_MOVE = 'plot:mousemove',
  MOUSE_UP = 'plot:mouseup',
  MOUSE_LEAVE = 'plot:mouseleave',
  // 移动端事件
  TOUCH_START = 'plot:touchstart',
  TOUCH_MOVE = 'plot:touchmove',
  TOUCH_END = 'plot:touchend',
  TOUCH_CANCEL = 'plot:touchcancel',
  // click 事件
  CLICK = 'plot:click',
  DBLCLICK = 'plot:dblclick',
  CONTEXTMENU = 'plot:contextmenu',

  LEAVE = 'plot:leave',
  ENTER = 'plot:enter',
}

/**
 * Element 图形交互状态
 */
export enum ELEMENT_STATE {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SELECTED = 'selected',
  DEFAULT = 'default',
}

/** 参与分组的图形属性名 */
export const GROUP_ATTRS = ['color', 'shape', 'size'];
/** 存储原始数据的字段名 */
export const FIELD_ORIGIN = '_origin';
/** 最小的图表宽度 */
export const MIN_CHART_WIDTH = 1;
/** 最小的图表高度 */
export const MIN_CHART_HEIGHT = 1;
/** 辅助组件占图表的尺寸的最大比例：如图表上方的图例最多占图表高度的25% */
export const COMPONENT_MAX_VIEW_PERCENTAGE = 0.25;
