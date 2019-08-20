// 滑块的宽度，高度 = 宽度 * 2
import { FONT_FAMILY } from '../../../const';

export const SLIDER_WIDTH = 8;
export const SLIDER_HEIGHT = SLIDER_WIDTH * 2;
export const SLIDER_CIRCLE_MAX_SIZE = SLIDER_HEIGHT * 2;

export const TEXT_OFFSET = 4;

export const SliderBtnStyle = {
  fill: '#fff',
  // shadowOffsetX: -2,
  // shadowOffsetY: 2,
  shadowBlur: 10,
  shadowColor: 'rgba(0,0,0,0.65)',
  radius: 2,
};

export const SliderTextStyle = {
  fill: '#333',
  textAlign: 'center',
  textBaseline: 'middle',
  stroke: '#fff',
  lineWidth: 5,
  fontFamily: FONT_FAMILY,
};

export const SliderMiddleBackgroundStyle = {
  fill: '#D9D9D9', // 灰色
};

export const SliderMiddleFrontendStyle = {
  fill: 'rgb(64, 141, 251)', // 蓝色
};

export const DefaultTitleStyle = {
  fill: '#333',
  textBaseline: 'top',
  textAlign: 'start',
  fontFamily: FONT_FAMILY,
};
