// to prevent users from tampering with internal values.
export const ChartEvent = {
  BEFORE_RENDER: 'beforerender',
  AFTER_RENDER: 'afterrender',

  BEFORE_PAINT: 'beforepaint',
  AFTER_PAINT: 'afterpaint',

  BEFORE_CHANGE_DATA: 'beforechangedata',
  AFTER_CHANGE_DATA: 'afterchangedata',

  BEFORE_CLEAR: 'beforeclear',
  AFTER_CLEAR: 'afterclear',

  BEFORE_DESTROY: 'beforedestroy',
  AFTER_DESTROY: 'afterdestroy',

  BEFORE_CHANGE_SIZE: 'beforechangesize',
  AFTER_CHANGE_SIZE: 'afterchangesize',

  POINTER_TAP: 'pointertap',
  POINTER_DOWN: 'pointerdown',
  POINTER_UP: 'pointerup',
  POINTER_OVER: 'pointerover',
  POINTER_OUT: 'pointerout',
  POINTER_MOVE: 'pointermove',
  POINTER_ENTER: 'pointerenter',
  POINTER_LEAVE: 'pointerleave',
  POINTER_UPOUTSIDE: 'pointerupoutside',
  DRAG_START: 'dragstart',
  DRAG: 'drag',
  DRAG_END: 'dragend',
  DRAG_ENTER: 'dragenter',
  DRAG_LEAVE: 'dragleave',
  DRAG_OVER: 'dragover',
  DROP: 'DROP',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
};
