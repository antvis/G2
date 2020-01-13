import * as _ from '@antv/util';
import { Group, Shape, Rect } from '@antv/g';
import colorUtil from '@antv/color-util';
import Continuous from './base';
import { CreateBgType } from './interface';
import { ColorItemType } from '../../interface';
import { TEXT_OFFSET } from './constant';

export default class Color extends Continuous {
  constructor(cfg) {
    super({
      type: 'color-legend',
      ...cfg,
    });
  }

  /* 计算占比，是否需要缓存以提高重复渲染的性能；是否需要排序 */
  private calculatePercent(items: ColorItemType[]) {
    const min = _.head(items).value;
    const max = _.last(items).value;
    const diff = max - min;

    return _.map(items, (item) => {
      return {
        ...item,
        percentage: (Number(item.value) - min) / diff,
      };
    });
  }

  /* 颜色是否分段 */
  private isSegment() {
    return !!this.get('isSegment');
  }

  /* 可交互的情况 */
  private getOperationalGroup(): CreateBgType {
    const width = this.get('width');
    const height = this.get('height');
    const items = this.calculatePercent(this.get('items'));

    const backgroundStyle = this.get('backgroundStyle');

    let fill = '';
    let rgbColor;

    if (this.isHorizontal()) {
      fill += 'l (0) ';
      _.each(items, (v: ColorItemType) => {
        rgbColor = colorUtil.toRGB(v.color);
        fill += `${v.percentage}:${rgbColor} `;
      });
    } else {
      fill += 'l (90) ';
      _.each(items, (v: ColorItemType) => {
        rgbColor = colorUtil.toRGB(v.color);
        fill += `${1 - v.percentage}:${rgbColor} `;
      });
    }

    const background = new Rect({
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        strokeOpacity: 0,
        ...backgroundStyle, // 灰色
      },
    });

    const frontend = new Rect({
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        fill, // 渐变色
        strokeOpacity: 0,
      },
    });

    const group = new Group();

    if (this.isOperational()) {
      group.add(background);
      group.add(frontend);
    } else {
      // 不可交互的时候，不需要 frontend
      group.add(frontend);
    }

    return {
      group,
      background,
      frontend,
    };
  }

  /**
   * 不可交互的情况：
   * 1. 无滑块
   * 2. 可以连续和分段
   * 3. 分段的时候下面有文字
   */
  private getUnOperationalGroup(): CreateBgType {
    const width = this.get('width');
    const height = this.get('height');
    const items = this.calculatePercent(this.get('items'));
    const textStyle = this.get('textStyle');

    const group = new Group();

    let fill = '';
    let rgbColor;
    const path = [];
    const isize = items.length;

    // gradient color distributed according to the percentage
    if (this.isHorizontal()) {
      fill += 'l (0) ';

      _.each(items, (item: ColorItemType, i: number) => {
        if (i !== 0 && (i !== isize - 1)) {
          path.push([ 'M', item.percentage * width, 0 ]);
          path.push([ 'L', item.percentage * width, height ]);
        }
        rgbColor = colorUtil.toRGB(items[i].color);
        if (this.isSegment() && i > 0) {
          const preRgbColor = colorUtil.toRGB(items[i - 1].color);
          fill += `${item.percentage}:${preRgbColor} `;
        }
        fill += `${item.percentage}:${rgbColor} `;
        group.addShape('text', {
          attrs: {
            x: item.percentage * width,
            y: height + TEXT_OFFSET,
            text: `${this.formatterValue(item.value)}`, // 以字符串格式展示
            ...textStyle,
            textBaseline: 'top',
            textAlign: 'center',
          },
        });
      });
    } else {
      fill += 'l (90) ';

      _.each(items, (item: ColorItemType, i: number) => {
        if (i !== 0 && (i !== isize - 1)) {
          path.push([ 'M', 0, height - item.percentage * height ]);
          path.push([ 'L', width, height - item.percentage * height ]);
        }

        rgbColor = colorUtil.toRGB(items[i].color);
        fill += `${1 - item.percentage}:${rgbColor} `;
        // one color instead of gradient color for a block while isSegment === true
        if (this.isSegment() && i > 0) {
          const preRgbColor = colorUtil.toRGB(items[i - 1].color);
          fill += `${1 - item.percentage}:${preRgbColor} `;
        }

        group.addShape('text', {
          attrs: {
            x: width + TEXT_OFFSET,
            y: (1 - item.percentage) * height,
            text: `${this.formatterValue(item.value)}`, // 以字符串格式展示
            ...textStyle,
            textAlign: 'start',
            textBaseline: 'middle',
          },
        });
      });
    }

    const background = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        fill,
        strokeOpacity: 0,
      },
    });

    // the white line segment to seperate color blocks
    group.addShape('path', {
      attrs: {
        path,
        lineWidth: 1,
        stroke: '#fff',
      },
    });

    return {
      group,
      background,
      frontend: undefined,
    };
  }

  /* 背景的样式，size 和 color 的背景完全不一样 */
  protected createBackgroundGroup(): CreateBgType {
    return this.isOperational() ? this.getOperationalGroup() : this.getUnOperationalGroup();
  }
}
