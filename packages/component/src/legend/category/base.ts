/**
 * @description 分类图例的基类
 */
import { CategoryLegendCfg } from '../../interface';
import LegendBase from '../base';

const DEFAULT_THEME = {
  layout: 'horizontal', // 图例项布局方式
  titleDistance: 15, // 标题距离图例项的距离
  itemDistance: 5, // layout 为 horizontal 时，图例项水平方向之间的间距
  itemMarginBottom: 8, // 图例项 margin bottom 像素值
  wordSpacing: 8, // 图例项中 marker 同文本之间的距离
  backgroundPadding: 0, // 图例背景的内边距，可以是数组，使用同 css padding
  unSelectedColor: '#ccc', // 图例项取消选中时的颜色
  offsetX: 0, // 图例 x 方向的偏移量
  offsetY: 0, // 图例 y 方向的偏移量
};

export default abstract class CategoryBase extends LegendBase {
  constructor(cfg: CategoryLegendCfg) {
    super({
      /**
       * 鼠标 hover 到图例上的默认交互是否开启
       */
      hoverable: true,
      /**
       * 图例是否允许点击交互
       */
      clickable: true,
      /**
       * 图例项的选择模式，支持 'multiple'、'single'，默认 'multiple'
       */
      selectedMode: 'multiple',
      /**
       * 是否允许全部取消，默认 false，即必须保留一个被选中
       */
      allowAllCanceled: false,
      /**
       * 图例项的顺序是否要逆序，默认为 false
       */
      reversed: false,
      /**
       * 是否自动换行，默认自动换行
       */
      autoWrap: true,
      ...DEFAULT_THEME,
      ...cfg,
    });
  }
}
