fetch('../data/tempChange.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(data);
    chart.area().position('year*change').color('white')
      .shape('smooth');
    chart.line().position('year*change').color('white')
      .shape('smooth');
    chart.guide().regionFilter({
      top: true,
      start: [ 'min', 0 ],
      end: [ 'max', 'min' ],
      color: '#18a1cd'
    });
    chart.guide().regionFilter({
      top: true,
      start: [ 'min', 'max' ],
      end: [ 'max', 0 ],
      color: '#FF4D4F'
    });
    chart.guide().region({
      top: false,
      start: [ 2000, 'max' ],
      end: [ 2016, 'min' ]
    });
    chart.guide().dataMarker({
      top: true,
      position: [ 1977, 0.18 ],
      content: '时间进入1977年后，全球气\n温开始呈现整体升高趋势。',
      lineLength: 50,
      style: {
        text: { textAlign: 'right', fontSize: 13 },
        point: { stroke: '#FF4D4F' }
      }
    });
    chart.guide().dataMarker({
      top: true,
      position: [ 1940, 0.08 ],
      content: '1940年，气温变化首次出现正值。',
      lineLength: 50,
      style: {
        text: { textAlign: 'right', fontSize: 13 },
        point: { stroke: '#FF4D4F' }
      }
    });
    chart.render();
  });
