import { Annotation } from '@antv/component';
import { AnnotationCfg } from '@antv/component/lib/annotation/base';
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import { Coordinate, Scale } from '../../dependents';
import View from '../view';

type AnnControllerConfig = Partial<{
  xScales: Scale[] | Record<string, Scale>;
  yScales: Scale[] | Record<string, Scale>;
  view: View;
  theme: { annotation: any };
  frontgroundGroup: Group;
  backgroundGroup: Group;
}>;

export default class AnnotationController {
  public options: AnnotationCfg[] = [];
  public annotations: Annotation.Annotation[] = [];
  public xScales?: AnnControllerConfig['xScales'];
  public yScales?: AnnControllerConfig['yScales'];
  public view: AnnControllerConfig['view'];
  public theme?: AnnControllerConfig['theme'];
  public frontgroundGroup: AnnControllerConfig['frontgroundGroup'];
  public backgroundGroup: AnnControllerConfig['backgroundGroup'];
  private coord: Coordinate;

  constructor(acfg: AnnControllerConfig) {
    _.assign(this, acfg);
  }

  /** 为当前controller新增一个辅助元素实例 */
  public add(type: string, annConfig: AnnotationCfg, top: boolean = true): AnnotationController {
    const typeName = _.upperFirst(type);
    if (!Annotation[typeName]) {
      console.error(`Annotation ${type} not exist.`);
    } else {
      this.options.push({
        top,
        type,
        ...annConfig,
      });
    }
    return this;
  }

  /** 通过index获取指定的辅助元素实例 */
  public get(idx: number): Annotation.Annotation {
    return this.annotations[idx];
  }

  public render(coord: Coordinate) {
    this.coord = coord;
    const view = this.view;
    const viewData = view && view.get('filteredData');

    this.createAnnotations();

    _.each(this.annotations, (ann) => {
      if (ann.get('top')) {
        ann.render(coord, this.frontgroundGroup, viewData);
      } else {
        ann.render(coord, this.backgroundGroup, viewData);
      }
    });
  }

  /** 控制全部辅助元素展示与否 */
  public changeVisible(visible: boolean) {
    _.each(this.annotations, (ann) => {
      ann.changeVisible(visible);
    });
  }

  /** 销毁所有辅助元素 */
  public clear() {
    this.reset();
    this.options = [];
    this.backgroundGroup && this.backgroundGroup.remove();
    this.frontgroundGroup && this.frontgroundGroup.remove();
  }

  /** 清空画布中的辅助元素 */
  public reset() {
    _.each(this.annotations, (ann) => {
      ann.clear();
    });
    this.annotations = [];
  }

  /** 重绘所有辅助元素 */
  public repaint() {
    if (this.coord && this.view) {
      const coord = this.coord;
      const viewData = this.view.get('filteredData');
      _.each(this.annotations, (ann) => {
        ann.clear();
        if (ann.get('top')) {
          ann.render(coord, this.frontgroundGroup, viewData);
        } else {
          ann.render(coord, this.backgroundGroup, viewData);
        }
      });
      const canvas = this.view.get('canvas');
      canvas.draw();
    } else {
      throw new Error('need render first');
    }
  }

  private createAnnotations() {
    _.each(this.options, (option) => {
      const { type, top, ...others } = option;
      const ann: Annotation.Annotation = new Annotation[_.upperFirst(type)](
        _.deepMix(
          {},
          {
            xScales: this.xScales,
            yScales: this.yScales,
            ...(_.get(this.theme, `annotation.${type}`) ? this.theme.annotation[type] : {}),
          },
          others,
        ),
      );
      ann.set('top', top); // 标记渲染图层是否为frontgroundGroup
      this.annotations.push(ann);
    });
  }
}
