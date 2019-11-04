import { getWrapBehavior, wrapBehavior } from '@antv/util';
import { Chart } from '../../../src/index';
import { getInteraction, Interaction, registerInteraction } from '../../../src/interaction/index';
import { registerStateAction } from '../../../src/state/index';
import { createDiv } from '../../util/dom';
import { getClientPoint, simulateMouseEvent } from '../../util/simulate';

describe('Interaction', () => {
  registerStateAction('activeline', {
    init(stateManager) {
      stateManager.on('activeline', this.activeLine);
    },
    destroy(stateManager) {
      stateManager.off('activeline', this.activeLine);
    },
    activeLine(obj) {
      const { value: currentShape, preValue: preShape } = obj;
      if (currentShape) {
        currentShape.attr('strokeOpacity', 1);
      }

      if (preShape) {
        preShape.attr('strokeOpacity', 0.2);
      }
    },
  });

  class AInteraction extends Interaction {
    protected initEvents() {
      this.view.on('mousedown', this.onMousedown);
      this.view.on('mouseup', this.onMouseup);
    }

    private onMousedown(e) {
      const shape = e.target;
      this.stateManager.setState('activeline', shape);
    }

    private onMouseup() {
      this.stateManager.setState('activeline', null);
    }

    public destroy() {
      this.view.canvas.off('mouseenter', this.onMousedown);
      this.view.canvas.off('mouseup', this.onMouseup);
    }
  }

  it('getInteraction', () => {
    expect(getInteraction('test')).toBe(undefined);
  });

  it('registerInteraction', () => {
    registerInteraction('activeLine', AInteraction);

    expect(getInteraction('activeLine')).not.toBeUndefined();
  });

  it('call', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 400,
      autoFit: false,
    });

    chart.data([
      { year: '1991', value: 13 },
      { year: '1992', value: 34 },
      { year: '1993', value: 5 },
      { year: '1994', value: 34 },
      { year: '1995', value: 20 },
      { year: '1996', value: 7 },
      { year: '1997', value: 23 },
      { year: '1998', value: 90 },
      { year: '1999', value: 3 },
    ]);
    chart.animate(false);
    chart
      // @ts-ignore
      .line()
      .position('year*value')
      .style({
        strokeOpacity: 0.2,
        lineWidth: 30,
      });
    chart.interaction('activeLine');
    chart.render();

    simulateMouseEvent(chart.canvas.get('el'), 'mousedown', getClientPoint(chart.canvas, 371, 249));

    const stateManager = chart.getStateManager();
    const shape = stateManager.getState('activeline');
    expect(shape.attr('strokeOpacity')).toBe(1);
  });
});
