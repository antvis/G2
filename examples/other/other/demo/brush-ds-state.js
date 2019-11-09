// 插入 Slider 滑块组件需要的 DOM
const canvasDiv1 = document.createElement('div');
canvasDiv1.id = 'canvas1';
const canvasDiv2 = document.createElement('div');
canvasDiv2.id = 'canvas2';
const container = document.getElementById('container');
container.appendChild(canvasDiv1);
container.appendChild(canvasDiv2);

fetch('../data/sp500.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet({
      state: {
        dates: null
      }
    });
    const totalDv = ds.createView().source(data);
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          if (ds.state.dates) {
            return ds.state.dates.indexOf(obj.date) > -1;
          }
          return obj;
        }
      });
    const chart1 = new G2.Chart({
      container: 'canvas1',
      forceFit: true,
      height: 400,
      animate: false,
      padding: [ 100, 40, 50, 80 ]
    });
    chart1.source(dv, {
      date: {
        tickCount: 10,
        type: 'time',
        mask: 'MMM D YYYY'
      },
      price: {
        min: totalDv.min('price'),
        max: totalDv.max('price')
      }
    });
    chart1.area().position('date*price').shape('smooth')
      .opacity(0.85);
    chart1.render();

    // second chart
    const chart2 = new G2.Chart({
      container: 'canvas2',
      forceFit: true,
      height: 100,
      padding: [ 5, 40, 60, 80 ]
    });
    chart2.source(data, {
      date: {
        tickCount: 10,
        type: 'time',
        mask: 'YYYY'
      }
    });
    chart2.tooltip(false);
    chart2.axis('price', false);
    chart2.area().position('date*price').active(false)
      .shape('smooth')
      .opacity(0.85);
    chart2.render();

    chart2.interact('brush', {
      type: 'X',
      draggable: true,
      inPlot: false,
      onBrushmove(ev) {
        const { date } = ev;
        ds.setState('dates', date);
      },
      onDragmove(ev) {
        const { date } = ev;
        ds.setState('dates', date);
      }
    });
  });
