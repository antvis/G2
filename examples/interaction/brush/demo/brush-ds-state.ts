import { Chart, registerInteraction } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sp500.json')
.then(res => res.json())
.then(data => {

  // 定义新的交互
  registerInteraction('other-filter', {
    showEnable: [
      { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
      { trigger: 'mask:mouseenter', action: 'cursor:move' },
      { trigger: 'plot:mouseleave', action: 'cursor:default' },
      { trigger: 'mask:mouseleave', action: 'cursor:crosshair' },
    ],
    start: [
      { trigger: 'plot:mousedown',isEnable(context) {
        return !context.isInShape('mask');
      }, action: ['x-rect-mask:start', 'x-rect-mask:show'] },
      {trigger: 'mask:dragstart', action: 'x-rect-mask:moveStart'}
    ],
    processing: [
      { trigger: 'plot:mousemove', action: 'x-rect-mask:resize' },
      { trigger: 'mask:drag', action: 'x-rect-mask:move'},
      { trigger: 'mask:change', action: 'sibling-x-filter:filter' }
    ],
    end: [
      { trigger: 'plot:mouseup', action: 'x-rect-mask:end' },
      { trigger: 'mask:dragend', action: 'x-rect-mask:moveEnd' }
    ],
    rollback: [
      { trigger: 'dblclick', action: ['x-rect-mask:hide', 'sibling-x-filter:reset']}
    ]
  });
  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 500,
    defaultInteractions:[]
  });
  
  chart.scale('date', {
    tickCount: 5,
    range: [0, 1]
  });
  chart.scale('price', {
    sync: true
  });
  const view1 = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 1,
        y: 0.6
      }
    },
    padding: [10, 10, 40, 60]
  });
  view1.animate(false);
  view1.data(data);
  view1.interaction('tooltip');
  view1.area().position('date*price');

  const view2 = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0.6
      },
      end: {
        x: 1,
        y: 0.8
      }
    },
    padding: [0, 10, 20, 60]
  });
  view2.data(data);
  view2.animate(false);
  view2.axis(false);
  view2.interval().position('date*price');

  const view3 = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0.8
      },
      end: {
        x: 1,
        y: 1
      }
    },
    padding: [0, 10, 20, 60]
  });
  
  view3.interaction('other-filter');
  view3.data(data);
  view3.tooltip(false);
  view3.axis(false);
  view3.area().position('date*price');
  
  chart.render();

});
