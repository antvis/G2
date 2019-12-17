import { deepMix, each, isObject } from '@antv/util';
import { GroupComponent, GroupComponentCfg, IGroup, IShape } from '../dependents';
import { LooseObject } from '../interface';

interface TextOption extends GroupComponentCfg {
  readonly isHorizontal?: boolean;
  readonly text?: string;
  readonly attributes?: object;
}

/**
 * 纯文本组件
 */
export class Text extends GroupComponent<TextOption> {
  private text: IShape;

  public getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return {
      ...cfg,
      type: 'text',
      text: '',
      isHorizontal: true,
    };
  }

  public update(option: TextOption) {
    // 直接 copy component.ts 中的写法，无法继承过来
    const defaultCfg = this.get('defaultCfg');
    each(option, (value, name) => {
      const originCfg = this.get(name);
      let newCfg = value;
      if (originCfg !== value) {
        // 判断两者是否相等，主要是进行 null 的判定
        if (isObject(value) && defaultCfg[name]) {
          // 新设置的属性与默认值进行合并
          newCfg = deepMix({}, defaultCfg[name], value);
        }
        this.set(name, newCfg);
      }
    });

    if (this.text) {
      this.text.attr(this.getAttributes());
    }
  }

  protected renderInner(group: IGroup): void {
    const container = this.get('container');

    // 添加文本
    this.text = container.addShape('text', {
      attrs: this.getAttributes(),
    });
  }

  private getAttributes() {
    const x = this.get('x');
    const y = this.get('y');
    const text = this.get('text');
    const attributes = this.get('attributes');
    const isHorizontal = this.get('isHorizontal');

    let attrs: LooseObject = {
      x,
      y,
      text,
      textAlign: 'center',
      textBaseline: 'middle',
      fill: '#333',
      ...attributes,
    };

    if (!isHorizontal) {
      attrs = {
        ...attrs,
        rotate: -Math.PI / 2,
      };
    }
    return attrs;
  }

  public getEvents(): any {}

  public getBBox() {
    return this.get('container').getBBox();
  }
}
