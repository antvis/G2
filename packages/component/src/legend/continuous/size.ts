import { Group, Shape, Polygon } from '@antv/g';
import Continuous from './base';
import { CreateBgType } from './interface';

// circle 的时候，背景的高度
const CircleBackgroundHalfHeight = 2;

export default class Size extends Continuous {

  constructor(cfg) {
    super({
      type: 'size-legend',
      ...cfg,
    });
  }

  private getBackgroundShapeAttr() {
    const width = this.get('width');
    const height = this.get('height');
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    let points = [];

    if (this.get('handleIcon') === 'rect') {
      points = this.isHorizontal() ? [
        [ 0, height ],
        [ 0, height - 4 ], // 最小的留 4px 大小
        [ width, 0 ],
        [ width, height ],
      ] : [
        [ 0, 0 ],
        [ width, 0 ],
        [ width, height ],
        [ width - 4, height ],
      ];
    } else {
      points = this.isHorizontal() ? [
        [ 0, halfHeight + CircleBackgroundHalfHeight ],
        [ 0, halfHeight - CircleBackgroundHalfHeight ],
        [ width, halfHeight - CircleBackgroundHalfHeight ],
        [ width, halfHeight + CircleBackgroundHalfHeight ],
      ] : [
        [ halfWidth + CircleBackgroundHalfHeight, 0 ],
        [ halfWidth - CircleBackgroundHalfHeight, 0 ],
        [ halfWidth - CircleBackgroundHalfHeight, height ],
        [ halfWidth + CircleBackgroundHalfHeight, height ],
      ];
    }

    return {
      points,
    };
  }

  /* 背景的样式，size 和 color 的背景完全不一样 */
  protected createBackgroundGroup(): CreateBgType {
    const shapeAttribute = this.getBackgroundShapeAttr();

    const backgroundStyle = this.get('backgroundStyle');
    const fillStyle = this.get('fillStyle');

    const background = new Polygon({
      attrs: {
        ...shapeAttribute,
        ...backgroundStyle,
      },
    });

    const frontend = new Polygon({
      attrs: {
        ...shapeAttribute,
        ...backgroundStyle, // 灰色
        ...fillStyle, // 蓝色
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
}
