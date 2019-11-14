import * as _ from '@antv/util';
import { IShape, PathCommand } from '../dependents';
import Element from '../geometry/element/index';
import { LooseObject, Point } from '../interface';
import { getAngle, getSectorPath } from '../util/graphics';
import Interaction from './base';

/**
 * 交互反馈：鼠标 hover 到一组数据时，显示背景框以起到强调作用
 */
export default class ActiveRegion extends Interaction {
  public readonly type: string = 'activeRegion';

  // 存储背景框
  private regionPath: IShape;
  // 存储上一次拾取到的数据
  private items;

  protected initEvents() {
    // FIXME: 待事件 bug 修复后，监听 view 上的事件
    this.view.on('plot:mousemove', this.onMousemove);
    this.view.on('plot:mouseleave', this.onMouseleave);
  }

  /**
   * destroy
   */
  public destroy() {
    this.view.off('plot:mousemove', this.onMousemove);
    this.view.off('plot:mouseleave', this.onMouseleave);
  }

  private onMousemove = (ev) => {
    const view = this.view;
    const tooltipItems = view.getTooltipItems(ev);

    if (_.isEqual(tooltipItems, this.items)) {
      // 如果拾取数据同上次相同，则不重复绘制
      return;
    }
    this.items = tooltipItems;

    if (tooltipItems.length) {
      const xField = view.getXScale().field;
      const xValue = tooltipItems[0].data[xField];

      // 根据 x 对应的值查找 elements
      let elements: Element[] = [];
      const geometries = this.view.geometries;
      _.each(geometries, (geometry) => {
        const result = geometry.getElementsBy((ele) => {
          const eleData = ele.getData();
          return eleData[xField] === xValue;
        });

        elements = elements.concat(result);
      });

      // 根据 bbox 计算背景框的面积区域
      if (elements.length) {
        const firstBBox = elements[0].shape.getBBox();
        const lastBBox = elements[elements.length - 1].shape.getBBox();
        const groupBBox: LooseObject = firstBBox;
        _.each(elements, (ele: Element) => {
          const bbox = ele.shape.getBBox();
          groupBBox.x = Math.min(bbox.minX, groupBBox.minX);
          groupBBox.y = Math.min(bbox.minY, groupBBox.minY);
          groupBBox.width = Math.max(bbox.maxX, groupBBox.maxX) - groupBBox.x;
          groupBBox.height = Math.max(bbox.maxY, groupBBox.maxY) - groupBBox.y;
        });

        const { backgroundGroup, coordinateBBox } = view;
        const coordinate = view.getCoordinate();
        let path;
        if (coordinate.isRect) {
          let minX: number;
          let minY: number;
          let width: number;
          let height: number;
          if (coordinate.isTransposed) {
            minX = coordinateBBox.minX;
            minY = lastBBox.minY - 0.25 * lastBBox.height;
            width = coordinateBBox.width;
            height = groupBBox.height + 0.5 * lastBBox.height;
          } else {
            minX = firstBBox.minX - 0.25 * firstBBox.width;
            minY = coordinateBBox.minY;
            width = groupBBox.width + 0.5 * firstBBox.width;
            height = coordinateBBox.height;
          }
          path = [
            ['M', minX, minY],
            ['L', minX + width, minY],
            ['L', minX + width, minY + height],
            ['L', minX, minY + height],
            ['Z'],
          ];
        } else {
          const { startAngle, endAngle } = getAngle(elements[0].getModel(), coordinate);
          const center = coordinate.getCenter();
          // @ts-ignore
          const radius = coordinate.getRadius();
          path = getSectorPath(center.x, center.y, radius, startAngle, endAngle);
        }

        if (this.regionPath) {
          this.regionPath.remove(true);
        }

        this.regionPath = backgroundGroup.addShape({
          type: 'path',
          attrs: {
            path,
            fill: '#CCD6EC',
            opacity: 0.3,
          },
        });
      }
    }
  };

  private onMouseleave = (ev) => {
    this.regionPath.remove(true);
    this.regionPath = null;
    this.items = null;
  };
}
