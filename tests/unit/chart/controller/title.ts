import { each } from '@antv/util';
import { DIRECTION, LAYER } from '../../../../src';
import { Controller } from '../../../../src/chart/controller/base';
import { ComponentOption } from '../../../../src/chart/interface';
import View from '../../../../src/chart/view';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { IGroup, IShape } from '../../../../src/dependents';
import { BBox } from '../../../../src/util/bbox';
import { Text } from './component';

interface TitleOption {
  readonly title: string;
  readonly style: object;
  readonly padding: number[];
}

export class Title extends Controller<TitleOption> {
  private container: IGroup;

  constructor(view: View) {
    super(view);

    this.container = this.view.getLayer(LAYER.FORE).addGroup();
  }

  public get name(): string {
    return 'title';
  }

  public init() {}

  public layout() {
    const { padding } = this.option;
    const [top, right, bottom, left] = padding;

    const viewBBox = this.view.viewBBox;

    const bboxObject = this.container.getBBox();
    // padding bottom = 16
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height + bottom);

    this.view.viewBBox = viewBBox.cut(componentBBox, DIRECTION.TOP);
  }

  public render() {
    this.option = this.view.getOptions().title;

    // 没有配置，则不处理
    if (!this.option) {
      return;
    }

    this.components.push(this.drawTitle());
  }

  public update() {
    this.option = this.view.getOptions().title;

    each(this.getComponents(), (co: ComponentOption) => {
      const { component } = co;
      component.update(this.getTextOption());
    });
  }

  private getTextOption() {
    const { style, title, padding } = this.option;
    const [top, right, bottom, left] = padding;
    return {
      id: 'title',
      text: title,
      attributes: {
        x: left,
        y: top,
        ...style,
        textAlign: 'left',
        textBaseline: 'top',
      },
    };
  }

  private drawTitle() {
    // 添加文本组件
    const component = new Text({
      container: this.container,
      ...this.getTextOption(),
    });

    component.render();

    return {
      component,
      layer: LAYER.FORE,
      direction: DIRECTION.NONE,
      type: COMPONENT_TYPE.OTHER,
    };
  }
}
