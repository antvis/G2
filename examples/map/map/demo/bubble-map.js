// 数据来源于 https://github.com/react-d3/react-d3-map-bubble
fetch('../data/world.geo.json')
  .then(res => res.json())
  .then(mapData => {
    fetch('../data/earthquake.json')
      .then(res => res.json())
      .then(data => {

        const chart = new G2.Chart({
          container: 'container',
          forceFit: true,
          height: 500,
          padding: [ 0, 20, 40 ]
        });
        // force sync scales
        chart.scale({
          x: { sync: true, nice: false },
          y: { sync: true, nice: false }
        });
        chart.coord().reflect();
        chart.legend(false);
        chart.axis(false);

        // style the tooltip
        chart.tooltip({
          showTitle: false,
          containerTpl: '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
          itemTpl: '<tr data-index="{index}"><td style="padding:5px;background-color:#545454;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
          'g2-tooltip': {
            borderRadius: '2px',
            backgroundColor: '#DDDDDD',
            padding: 0,
            border: '1px solid #333'
          }
        });
        // data set
        const ds = new DataSet();

        // draw the map
        const dv = ds.createView('back')
          .source(mapData, {
            type: 'GeoJSON'
          })
          .transform({
            type: 'geo.projection',
            projection: 'geoMercator',
            as: [ 'x', 'y', 'centroidX', 'centroidY' ]
          });
        const bgView = chart.view();
        bgView.source(dv);
        bgView.tooltip(false);
        bgView.polygon()
          .position('x*y')
          .style({
            fill: '#DDDDDD',
            stroke: '#b1b1b1',
            lineWidth: 0.5,
            fillOpacity: 0.85
          });

        // draw the bubble plot
        const userData = ds.createView().source(data);
        userData.transform({
          type: 'map',
          callback: obj => {
            const projectedCoord = dv.geoProjectPosition([ obj.lng * 1, obj.lat * 1 ], 'geoMercator');
            obj.x = projectedCoord[0];
            obj.y = projectedCoord[1];
            obj.deaths = obj.deaths * 1;
            obj.magnitude = obj.magnitude * 1;
            return obj;
          }
        });
        const pointView = chart.view();
        pointView.source(userData);
        pointView.point()
          .position('x*y')
          .size('deaths', [ 2, 30 ])
          .shape('circle')
          .opacity(0.45)
          .color('#FF2F29')
          .tooltip('date*location*lat*lng*deaths*magnitude');

        chart.render();
      });
  });
