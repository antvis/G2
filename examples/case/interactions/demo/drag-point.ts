import { Chart, registerInteraction, registerAction, Action } from '@antv/g2';

class DragPoint extends Action {
  // Action 开始，不等同于 拖拽开始，需要判定移动的范围
  protected starting = false;
  // 拖拽开始
  protected dragStart = false;
  // 开始的节点
  protected startPoint: any;
  protected target: any = null;

  start() {
    this.starting = true;
    this.startPoint = this.context.getCurrentPoint();
    const { target } = this.context.event;
    // 只对 point 起拖拽作用
    if (String(target.get('name')) === 'element,point') {
      this.target = target;
    }
  }

  drag() {
    if (!this.startPoint || !this.target) return;
    const current = this.context.getCurrentPoint();
    const { view } = this.context;
    const event = this.context.event;
    if (!this.dragStart) {
      // 只能上下移动
      if (Math.abs(current.y - this.startPoint.y) > 4) {
        view.emit('dragstart', {
          target: event.target,
          x: event.x,
          y: event.y,
        });
        this.dragStart = true;
      }
    } else {
      view.emit('drag', {
        target: event.target,
        x: event.x,
        y: event.y,
      });
    }
    const { shape } = this.target.get('element');
    shape.attr('y', current.y);
  }

  end() {
    if (this.dragStart) {
      const view = this.context.view;
      const event = this.context.event;

      const { shape } = this.target.get('element');
      const scale = view.getScalesByDim('y')['nlp'];
      const coordinate = view.getCoordinate();
      const changedValue = scale.invert(coordinate.invertPoint({ x: 0, y: shape.attr('y') }).y);
      const origin = this.target.get('origin');

      view.emit('dragend', {
        target: event.target,
        x: event.x,
        y: event.y,
        changedDatum: { ...origin.data, nlp: changedValue },
      });
    }
    this.target = null;
    this.starting = false;
    this.dragStart = false;
  }
}

registerAction('drag-point', DragPoint);
registerInteraction('custom-interaction', {
  start: [{ trigger: 'element:mousedown', action: 'drag-point:start' }],
  processing: [{ trigger: 'plot:mousemove', action: 'drag-point:drag' }],
  end: [{ trigger: 'plot:mouseup', action: 'drag-point:end' }],
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json')
  .then((data) => data.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);

    chart.line().position('date*blockchain').color('#1890ff');
    chart.line().position('date*nlp').color('#2fc25b');
    chart.point().position('date*nlp').color('#2fc25b').size(3).style({ zIndex: 2 });

    chart.scale('blockchain', { sync: true });
    chart.scale('nlp', { sync: 'blockchain' });
    chart.axis('nlp', false);

    chart.option('slider', { start: 0.2, end: 0.4 });

    chart.interaction('custom-interaction');

    chart.render();

    chart.tooltip({ showCrosshairs: true, showMarkers: false });

    let newData = data;
    chart.on('dragend', ({ changedDatum }) => {
      newData = newData.map((d) => {
        if (d.date === changedDatum.date) {
          return changedDatum;
        }
        return d;
      });
      chart.data(newData);
      chart.render(true);
    });
  });
