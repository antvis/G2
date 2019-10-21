import Component from '../../component';
import { Position } from '../../interface';

interface MockComponentProps {
  readonly text: string;
  readonly attributes?: object;
}

/**
 * 用于测试的组件
 */
export class MockComponent extends Component {
  // 组件的属性
  private text: string = '';
  protected attributes: object;

  constructor(container: any, position: Position, props: MockComponentProps) {
    super(container, position);

    const { text = '', attributes } = props;
    this.text = text;
    this.attributes = attributes;

    this.initial();
  }

  protected initial() {
    this.container.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        text: this.text,
        textAlign: 'left',
        textBaseline: 'top',
        fill: '#333',
        ...this.attributes,
      },
    });

    this.move(...this.position);
  }

  /**
   * 绑定事件
   */
  protected proxyEvents() {
    this.container.on('click', (evt: any) => {
      this.emit('click', evt);
    });
  }
}
