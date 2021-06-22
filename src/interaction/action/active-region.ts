import { each, head, isEqual, last, get, flatten, isArray, uniq, isNil } from '@antv/util';
import { View } from 'src/chart';
import { findItemsFromViewRecurisive } from '../../util/tooltip';
import { IShape, Point, ShapeAttrs } from '../../dependents';
import Element from '../../geometry/element';
import { LooseObject, TooltipCfg } from '../../interface';
import { getAngle, getSectorPath } from '../../util/graphics';
import Action from './base';

const DEFAULT_REGION_PATH_STYLE = {
  fill: '#CCD6EC',
  opacity: 0.3,
};

export function getItemsOfView(view: View, point: Point, tooltipCfg: TooltipCfg) {
  let items = findItemsFromViewRecurisive(view, point, tooltipCfg);
  if (items.length) {
    // 三层
    items = flatten(items);
    for (const itemArr of items) {
      for (const item of itemArr) {
        const { x, y } = item.mappingData;
        item.x = isArray(x) ? x[x.length - 1] : x;
        item.y = isArray(y) ? y[y.length - 1] : y;
      }
    }

    const { shared } = tooltipCfg;
    // shared: false 代表只显示当前拾取到的 shape 的数据，但是一个 view 会有多个 Geometry，所以有可能会拾取到多个 shape
    if (shared === false && items.length > 1) {
      let snapItem = items[0];
      let min = Math.abs(point.y - snapItem[0].y);
      for (const aItem of items) {
        const yDistance = Math.abs(point.y - aItem[0].y);
        if (yDistance <= min) {
          snapItem = aItem;
          min = yDistance;
        }
      }
      items = [snapItem];
    }

    return uniq(flatten(items));
  }

  return [];
}

/**
 * 背景框的 Action. 只作用于 interval 和 schema geometry
 * @ignore
 */
class ActiveRegion extends Action {
  private items: any[];
  private regionPath: IShape;
  /**
   * 显示
   * @param {ShapeAttrs} style region-path 的样式
   * @param {number} appendRatio 适用于笛卡尔坐标系. 对于 x 轴非 linear 类型: 默认：0.25, x 轴 linear 类型: 默认 0
   * @param {number} appendWidth  适用于笛卡尔坐标系. 像素级别，优先级 > appendRatio
   */
  public show(args?: { style: ShapeAttrs; appendRatio?: number; appendWidth?: number }) {
    const view = this.context.view;
    const ev = this.context.event;

    const tooltipCfg = view.getController('tooltip').getTooltipCfg();
    const tooltipItems = getItemsOfView(
      view,
      {
        x: ev.x,
        y: ev.y,
      },
      tooltipCfg
    );

    if (isEqual(tooltipItems, this.items)) {
      // 如果拾取数据同上次相同，则不重复绘制
      return;
    }
    this.items = tooltipItems;
    if (tooltipItems.length) {
      const xField = view.getXScale().field;
      const xValue = tooltipItems[0].data[xField];
      // 根据 x 对应的值查找 elements
      let elements: Element[] = [];
      const geometries = view.geometries;
      each(geometries, (geometry) => {
        if (geometry.type === 'interval' || geometry.type === 'schema') {
          const result = geometry.getElementsBy((ele) => {
            const eleData = ele.getData();
            return eleData[xField] === xValue;
          });

          elements = elements.concat(result);
        }
      });

      // 根据 bbox 计算背景框的面积区域
      if (elements.length) {
        const coordinate = view.getCoordinate();

        let firstBBox = elements[0].shape.getCanvasBBox();
        let lastBBox = elements[0].shape.getCanvasBBox();
        const groupBBox: LooseObject = firstBBox;

        each(elements, (ele: Element) => {
          const bbox = ele.shape.getCanvasBBox();
          if (coordinate.isTransposed) {
            if (bbox.minY < firstBBox.minY) {
              firstBBox = bbox;
            }
            if (bbox.maxY > lastBBox.maxY) {
              lastBBox = bbox;
            }
          } else {
            if (bbox.minX < firstBBox.minX) {
              firstBBox = bbox;
            }
            if (bbox.maxX > lastBBox.maxX) {
              lastBBox = bbox;
            }
          }

          groupBBox.x = Math.min(bbox.minX, groupBBox.minX);
          groupBBox.y = Math.min(bbox.minY, groupBBox.minY);
          groupBBox.width = Math.max(bbox.maxX, groupBBox.maxX) - groupBBox.x;
          groupBBox.height = Math.max(bbox.maxY, groupBBox.maxY) - groupBBox.y;
        });

        const { backgroundGroup, coordinateBBox } = view;
        let path;
        if (coordinate.isRect) {
          const xScale = view.getXScale();

          let { appendRatio, appendWidth } = args || {};
          if (isNil(appendWidth)) {
            appendRatio = isNil(appendRatio) ? (xScale.isLinear ? 0 : 0.25) : appendRatio; // 如果 x 轴是数值类型，如直方图，默认不需要加额外的宽度
            appendWidth = coordinate.isTransposed ? appendRatio * lastBBox.height : appendRatio * firstBBox.width;
          }

          let minX: number;
          let minY: number;
          let width: number;
          let height: number;
          if (coordinate.isTransposed) {
            minX = coordinateBBox.minX;
            minY = Math.min(lastBBox.minY, firstBBox.minY) - appendWidth;
            width = coordinateBBox.width;
            height = groupBBox.height + appendWidth * 2;
          } else {
            minX = Math.min(firstBBox.minX, lastBBox.minX) - appendWidth;
            // 直角坐标系 非转置：最小值直接取 坐标系 minY
            minY = coordinateBBox.minY;
            width = groupBBox.width + appendWidth * 2;
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
          const firstElement = head(elements);
          const lastElement = last(elements);
          const { startAngle } = getAngle(firstElement.getModel(), coordinate);
          const { endAngle } = getAngle(lastElement.getModel(), coordinate);
          const center = coordinate.getCenter();
          const radius = coordinate.getRadius();
          const innterRadius = coordinate.innerRadius * radius;
          path = getSectorPath(center.x, center.y, radius, startAngle, endAngle, innterRadius);
        }

        if (this.regionPath) {
          this.regionPath.attr('path', path);
          this.regionPath.show();
        } else {
          const style = get(args, 'style', DEFAULT_REGION_PATH_STYLE);
          this.regionPath = backgroundGroup.addShape({
            type: 'path',
            name: 'active-region',
            capture: false,
            attrs: {
              ...style,
              path,
            },
          });
        }
      }
    }
  }
  /**
   * 隐藏
   */
  public hide() {
    if (this.regionPath) {
      this.regionPath.hide();
    }
    // this.regionPath = null;
    this.items = null;
  }
  /**
   * 销毁
   */
  public destroy() {
    this.hide();
    if (this.regionPath) {
      this.regionPath.remove(true);
    }
    super.destroy();
  }
}

export default ActiveRegion;
