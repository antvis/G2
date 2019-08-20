/**
 * @description 坐标轴组件的主题样式
 */
import { FONT_FAMILY } from '../const';

export default {
  title: {
    textStyle: {
      fontSize: 12,
      fill: '#595959',
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
      textAlign: 'center',
    },
    offset: 20,
  },
  label: {
    textStyle: {
      fontSize: 12,
      fill: '#ccc',
      textBaseline: 'middle',
      fontFamily: FONT_FAMILY,
    },
    offset: 10,
    offsetX: 0,
    offsetY: 0,
  },
  grid: {
    lineWidth: 1,
    stroke: '#C0D0E0',
  },
};
