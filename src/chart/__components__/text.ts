import Component from '../../component';
import { LooseObject, Position } from '../../interface';

interface TextProps {
  readonly isHorizontal?: boolean;
  readonly text?: string;
  readonly attributes?: object;
}

/**
 * 纯文本组件
 */
export class Text extends Component {
  // 组件的属性
  private text: string = '';
  private isHorizontal: boolean;
  private attributes: LooseObject;

  constructor(container: any, position: Position, props: TextProps) {
    super(container, position);

    const { text = '', isHorizontal = true, attributes } = props;
    this.text = text;
    this.isHorizontal = isHorizontal;
    this.attributes = attributes;

    this.init();
  }

  protected init() {
    let attrs: LooseObject = {
      x: 0,
      y: 0,
      text: this.text,
      textAlign: 'center',
      textBaseline: 'middle',
      fill: '#333',
      ...this.attributes,
    };

    if (!this.isHorizontal) {
      attrs = {
        ...attrs,
        rotate: -Math.PI / 2,
      };
    }

    // 添加文本
    this.container.addShape('text', {
      attrs,
    });

    this.move(...this.position);
  }

  /**
   * 绑定事件
   */
  protected proxyEvents() {}
}
