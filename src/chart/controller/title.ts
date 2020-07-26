import { deepMix, each, isString, clone } from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Annotation, GroupComponent, IGroup } from '../../dependents';
import { ComponentOption, TitleOption, TitleCfg } from '../../interface';
import Geometry from '../../geometry/base';
import { parsePadding } from '../../util/padding';
import View from '../view';
import { Controller } from './base';

/**
 * @ignore
 * title Controller
 */
export default class Title extends Controller<TitleOption> {
  /** the draw group of axis */
  private container: IGroup;

  constructor(view: View) {
    super(view);
    this.container = this.view.getLayer(LAYER.FORE).addGroup();
  }

  public get name(): string {
    return 'title';
  }

  public init() {}

  public layout() {}

  /**
   * 获取标题默认配置
   */
  public getTitleCfg() {
    const { title } = this.view.getOptions();
    if (!title) {
      return false;
    }
    // @ts-ignore
    const titleCfg = deepMix({}, this.getDefaultCfg(), title);
    return titleCfg;
  }

  /**
   * 获取标题默认配置
   */
  public getDefaultCfg() {
    const {
      title: { alignTo = 'left' },
    } = this.view.getOptions();
    const alignInfo = {
      left: 'left',
      middle: 'center',
      right: 'right',
    };
    return {
      visible: true,
      content: '',
      style: {
        fontSize: 24,
        fontWeight: 500,
        fill: '#000',
        lineHeight: 1,
        textAlign: alignInfo[alignTo],
        textBaseline: 'top',
      },
      alignTo: 'left',
      subContent: '',
      subStyle: {
        fontSize: 14,
        fontWeight: 200,
        fill: 'rgba(0,0,0,0.45)',
        lineHeight: 1,
        textAlign: alignInfo[alignTo],
        textBaseline: 'top',
      },
    };
  }

  public render() {
    this.option = this.view.getOptions().title;
    // 绘制 title
    this.drawTitle();
  }

  public update() {
    this.option = this.view.getOptions().title;
    if (!this.option) {
      return;
    }
    this.clear();
    this.drawTitle();
  }

  public clear() {
    super.clear();
    this.container.clear();
  }

  public destroy() {
    super.destroy();
    this.container.remove(true);
  }

  /**
   * 生成 id
   * @param key
   */
  private getId(key: string): string {
    return `${this.name}-${key}`;
  }

  /**
   * 递归获取所有的 Geometry
   */
  private getGeometries(view: View): Geometry[] {
    let geometries = view.geometries;

    each(view.views, (v: View) => {
      geometries = geometries.concat(this.getGeometries(v));
    });
    return geometries;
  }

  /**
   * 遍历 Geometry，处理 title 逻辑
   */
  private drawTitle() {
    const isRootView = this.view.getRootView() === this.view;
    // 非根 view，不处理 title
    if (!isRootView) {
      return;
    }
    // 递归 view 中所有的 Geometry，进行创建 title
    const geometries = this.getGeometries(this.view);
    each(geometries, (geometry: Geometry) => {
      const titleComponent = this.createFieldTitle();
      const subTitleComponent = this.createFieldTitle(true);
      if (titleComponent) {
        this.setComponents(titleComponent);
      }
      if (subTitleComponent) {
        this.setComponents(subTitleComponent);
      }
    });
  }

  /**
   * 统一设置 components
   * @param {ComponentOption} titleComponent
   */
  private setComponents(titleComponent: ComponentOption) {
    (titleComponent.component as GroupComponent).init();
    const currentComponents = this.components.filter((co) => co.id !== titleComponent.id);
    currentComponents.push(titleComponent);
    this.components = currentComponents;
  }

  /**
   * 创建一个 title
   * @param {boolean} isSubTitle
   */
  private createFieldTitle(isSubTitle = false): ComponentOption {
    let component;
    const titleCfg = this.getTitleCfg();
    const layer = LAYER.FORE;
    const position = this.getPosition(titleCfg, isSubTitle);

    // if the title option is not false, means title should be created.
    if (titleCfg.visible) {
      const titleStyle: TitleCfg = {
        content: isSubTitle ? titleCfg.subContent : titleCfg.content,
        style: isSubTitle ? titleCfg.subStyle : titleCfg.style,
      };
      component = new Annotation.Text({
        container: this.container,
        ...position,
        ...titleStyle,
      });
    }
    if (component) {
      return {
        id: isSubTitle ? this.getId(`${this.view.id}-sub`) : this.getId(this.view.id),
        component,
        layer,
        direction: DIRECTION.TOP,
        type: COMPONENT_TYPE.TITLE,
      };
    }
  }

  /**
   * 获取坐标信息
   * @param {TitleOption} cfg 标题配置信息
   * @param {boolean}sSubTitle 是否子标题
   * 仅计算 textBaseline: 'top'的情况，其它情况不做处理，意义不大
   */
  private getPosition(cfg: TitleOption, isSubTitle: boolean) {
    const { padding, appendPadding, viewBBox } = this.view;
    const pPadding = parsePadding(isString(padding) ? 0 : padding);
    const pAppendPaddingPadding = parsePadding(appendPadding);
    const { style = {}, content, alignTo, subContent } = cfg;
    const { fontSize, lineHeight } = style;
    let x = 0;
    let y = 0;
    let titleHeight = 0;
    if (content) {
      titleHeight += fontSize * lineHeight;
    }
    if (isSubTitle && subContent) {
      y += titleHeight;
    }
    if (alignTo === 'left') {
      x = pPadding[3] + pAppendPaddingPadding[3];
    }
    if (alignTo === 'middle') {
      x = viewBBox.width / 2;
    }
    if (alignTo === 'right') {
      x = viewBBox.width - pPadding[1] - pAppendPaddingPadding[1];
    }
    return { x, y };
  }
}
