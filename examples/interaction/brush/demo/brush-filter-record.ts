import { Chart, registerInteraction } from '@antv/g2';

// 定义新的交互
registerInteraction('other-visible', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'mask:mouseenter', action: 'cursor:move' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
    { trigger: 'mask:mouseleave', action: 'cursor:crosshair' },
  ],
  start: [
    {
      trigger: 'plot:mousedown', isEnable(context) {
        return !context.isInShape('mask');
      }, action: ['rect-mask:start', 'rect-mask:show']
    },
    { trigger: 'mask:dragstart', action: 'rect-mask:moveStart' }
  ],
  processing: [
    { trigger: 'plot:mousemove', action: 'rect-mask:resize' },
    {
      trigger: 'mask:drag', isEnable(context) {
        return context.isInPlot();
      }, action: 'rect-mask:move'
    },
    { trigger: 'mask:change', action: 'element-sibling-filter-record:filter' }
  ],
  end: [
    { trigger: 'plot:mouseup', action: 'rect-mask:end' },
    { trigger: 'mask:dragend', action: 'rect-mask:moveEnd' }
  ],
  rollback: [
    { trigger: 'dblclick', action: ['rect-mask:hide', 'element-sibling-filter-record:reset'] }
  ]
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const subData = data.slice(0, 400);
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.tooltip(false);
    const view1 = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 1 }
      },
      padding: [10, 20, 40, 50]
    });

    view1.data(subData);
    view1.scale('price', { nice: true });
    view1.interaction('other-visible');
    view1.point().position('carat*price');

    const view2 = chart.createView({
      region: {
        start: { x: 0.5, y: 0 },
        end: { x: 1, y: 1 }
      },
      padding: [10, 20, 40, 50]
    });

    view2.data(subData);
    view2.scale('x', { nice: true });
    view2.point().position('depth*x');

    chart.render();
  });
