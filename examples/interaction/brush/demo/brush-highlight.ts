import { Chart, registerInteraction } from '@antv/g2';

registerInteraction('highlight-view', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'mask:mouseenter', action: 'cursor:move' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
    { trigger: 'mask:mouseleave', action: 'cursor:crosshair' },
  ],
  start: [
    { trigger: 'plot:mousedown',isEnable(context) {
      return !context.isInShape('mask');
    }, action: ['rect-mask:start', 'rect-mask:show'] },
    {trigger: 'mask:dragstart', action: 'rect-mask:moveStart'}
  ],
  processing: [
    { trigger: 'plot:mousemove', action: 'rect-mask:resize' },
    { trigger: 'mask:drag', isEnable(context) {
      return context.isInPlot();
    }, action: 'rect-mask:move'},
    { trigger: 'mask:change', action: ['element-sibling-highlight:highlight', 'element-range-highlight:highlight'] }
  ],
  end: [
    { trigger: 'plot:mouseup', action: 'rect-mask:end' },
    { trigger: 'mask:dragend', action: 'rect-mask:moveEnd' },
    {
      trigger: 'document:mousedown',
      isEnable(context) {
        return !context.isInPlot();
      },
      action: ['element-sibling-highlight:clear','element-range-highlight:clear', 'rect-mask:end', 'rect-mask:hide'],
      once: true,
    },
    {
      trigger: 'document:mouseup',
      isEnable(context) {
        return !context.isInPlot();
      },
      action: ['rect-mask:end'],
      once: true,
    }
  ],
  rollback: [
    { trigger: 'dblclick', action: ['rect-mask:hide', 'element-sibling-highlight:clear', 'element-range-highlight:clear']}
  ]
});
fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/iris.json')
  .then(res => res.json())
  .then(data => {
    const COLOR = [ '#880000', '#008800', '#000088' ];
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [16, 16, 48, 48],
    });

    chart.data(data);
    chart.animate(false);
    chart.scale({
      Species: {
        sync: true
      },
      SepalLength: {
        nice: true
      },
      SepalWidth: {
        nice: true
      },
      PetalLength: {
        nice: true
      },
      PetalWidth: {
        nice: true
      }
    });
    chart.tooltip(false);
    chart.facet('matrix', {
      fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ],
      eachView(view, facet) {
        view.interaction('highlight-view');
        view.point()
          .position([ facet.columnField, facet.rowField ])
          .color('Species', COLOR)
          .shape('circle')
          .style({ fillOpacity: 0.65 })
          .size(3);
      }
    });
    chart.render();

  });
