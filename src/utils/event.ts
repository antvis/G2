// Life cycle stage.
export enum CHART_LIFE_CIRCLE {
  BEFORE_RENDER = 'beforerender',
  AFTER_RENDER = 'afterrender',

  BEFORE_PAINT = 'beforepaint',
  AFTER_PAINT = 'afterpaint',

  BEFORE_CHANGE_DATA = 'beforechangedata',
  AFTER_CHANGE_DATA = 'afterchangedata',

  BEFORE_CLEAR = 'beforeclear',
  AFTER_CLEAR = 'afterclear',

  BEFORE_DESTROY = 'beforedestroy',
  AFTER_DESTROY = 'afterdestroy',

  BEFORE_CHANGE_SIZE = 'beforechangesize',
  AFTER_CHANGE_SIZE = 'afterchangesize',
}
