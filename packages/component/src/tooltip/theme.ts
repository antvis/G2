import { FONT_FAMILY } from '../const';

// tooltip 相关 dom 的 css 类名
const TOOLTIP_CONTAINER_CLASS = 'g2-tooltip';
const TOOLTIP_TITLE_CLASS = 'g2-tooltip-title';
const TOOLTIP_LIST_CLASS = 'g2-tooltip-list';
const TOOLTIP_LIST_ITEM_CLASS = 'g2-tooltip-list-item';
const TOOLTIP_MARKER_CLASS = 'g2-tooltip-marker';
const TOOLTIP_VALUE_CLASS = 'g2-tooltip-value';

export default {
  // css style for tooltip
  [`${TOOLTIP_CONTAINER_CLASS}`]: {
    position: 'absolute',
    display: 'none',
    // @2018-07-25 by blue.lb 这里去掉浮动，火狐上存在样式错位
    // whiteSpace: 'nowrap',
    zIndex: 8,
    transition:
      'visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), ' +
      'left 0.4s cubic-bezier(0.23, 1, 0.32, 1), ' +
      'top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 0px 10px #aeaeae',
    borderRadius: '3px',
    color: 'rgb(87, 87, 87)',
    fontSize: '12px',
    fontFamily: FONT_FAMILY,
    lineHeight: '20px',
    padding: '10px 10px 6px 10px',
  },
  [`${TOOLTIP_TITLE_CLASS}`]: {
    marginBottom: '4px',
  },
  [`${TOOLTIP_LIST_CLASS}`]: {
    margin: 0,
    listStyleType: 'none',
    padding: 0,
  },
  [`${TOOLTIP_LIST_ITEM_CLASS}`]: {
    marginBottom: '4px',
  },
  [`${TOOLTIP_MARKER_CLASS}`]: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
  },

  [`${TOOLTIP_VALUE_CLASS}`]: {
    display: 'inline-block',
    float: 'right',
    marginLeft: '30px',
  },
};
