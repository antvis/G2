import Action from './base';
import Element from '../../geometry/element';
import { getItemsOfView } from './active-region';
import { getAngle, getSectorPath } from '../../util/graphics';
import { each, isEqual, isNil, head, last, get } from '@antv/util';

import type { LooseObject } from '../../interface';
import type { IShape, ShapeAttrs, PathCommand } from '../../dependents';

const DEFAULT_REGION_PATH_STYLE = {
  fill: '#CCD6EC',
  opacity: 0.3,
};

/**
 * 参考 ActiveRegion
 */
export default class extends Action {
  private items: any[];
  private regionPaths: IShape[] = [];

  public show(args?: { style: ShapeAttrs; appendRatio?: number; appendWidth?: number }) {
    const {
      view,
      event: { x, y },
    } = this.context;
    const tooltipCfg = view.getController('tooltip').getTooltipCfg();
    const tooltipItems = getItemsOfView(view, { x, y }, tooltipCfg);

    if (isEqual(tooltipItems, this.items)) return;
    if (tooltipItems.length === 0) return;

    this.items = tooltipItems;
    const elements: Element[][] = [];
    each(view.views, (v, idx) => {
      const xField = v.getXScale().field;
      const xValue = tooltipItems[idx].data[xField];
      elements[idx] = [];
      each(v.geometries, (geometry) => {
        if (['interval', 'schema'].includes(geometry.type)) {
          const result = geometry.getElementsBy((ele) => {
            return ele.getData()[xField] === xValue;
          });
          elements[idx].push(...result);
        }
      });
    });

    each(elements, (els, idx) => {
      if (els.length > 0) {
        const v = view.views[idx];
        each(els, () => {
          const coordinate = v.getCoordinate();

          let firstBBox = els[0].shape.getCanvasBBox();
          let lastBBox = els[0].shape.getCanvasBBox();
          const groupBBox: LooseObject = firstBBox;

          each(els, (ele: Element) => {
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

          const { backgroundGroup, coordinateBBox } = v;
          let path: PathCommand[];
          if (coordinate.isRect) {
            const xScale = v.getXScale();

            let { appendRatio, appendWidth } = args || {};
            if (isNil(appendWidth)) {
              appendRatio = isNil(appendRatio) ? (xScale.isLinear ? 0 : 0.25) : appendRatio;
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
            const innerRadius = coordinate.innerRadius * radius;
            path = getSectorPath(center.x, center.y, radius, startAngle, endAngle, innerRadius) as PathCommand[];
          }

          if (this.regionPaths[idx]) {
            this.regionPaths[idx].attr({ path });
            this.regionPaths[idx].show();
          } else {
            const style = get(args, 'style', DEFAULT_REGION_PATH_STYLE);
            this.regionPaths[idx] = backgroundGroup.addShape({
              type: 'path',
              name: 'facet-active-region',
              capture: false,
              attrs: {
                path,
                ...style,
              },
            });
          }
        });
      }
    });
  }

  public hide() {
    each(this.regionPaths, (region) => {
      region.hide();
    });
    this.items = null;
  }

  public destroy() {
    this.hide();
    // each(this.regionPaths, (region) => {
    //   region.remove(true);
    // });
    this.regionPaths.forEach((region) => region.remove(true));
    this.regionPaths = [];
    super.destroy();
  }
}
