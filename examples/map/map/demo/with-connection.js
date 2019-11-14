fetch('../data/usa.geo.json')
  .then(res => res.json())
  .then(mapData => {
    const map = [];
    const features = mapData.features;
    // 获取出所有的地图区域名称
    for (let i = 0; i < features.length; i++) {
      const name = features[i].properties.name;
      map.push({
        name
      });
    }
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      animate: false,
      padding: 0
    });
    chart.tooltip({
      showTitle: false
    });
    // 同步度量
    chart.scale({
      longitude: {
        max: -66,
        min: -125,
        sync: true
      },
      latitude: {
        max: 50,
        min: 24,
        sync: true
      }
    });
    chart.axis(false);
    chart.legend('trend', {
      position: 'left'
    });
    const mapDv = new DataSet.View().source(mapData, {
      type: 'GeoJSON'
    });
    mapDv.transform({
      type: 'map',
      callback: row => {
        row.code = row.properties.code;
        return row;
      }
    });
    const bgView = chart.view();
    bgView.source(mapDv);
    bgView.tooltip(false);
    bgView.polygon()
      .position('longitude*latitude')
      .style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85
      });

    fetch('../data/flights-airport.json')
      .then(res => res.json())
      .then(flights => {
        const countByAirport = {};
        let subFlights = [];
        // 计算飞机的起飞、降落数
        flights.forEach(function(flight) {
          const origin = flight.origin,
            destination = flight.destination;
          countByAirport[origin] = (countByAirport[origin] || 0) + 1;
          countByAirport[destination] = (countByAirport[destination] || 0) + 1;
        });
        fetch('../data/airport.json')
          .then(res => res.json())
          .then(airports => {
            // Only consider airports with at least one flight.
            const airportByIata = {};
            airports = airports.filter(function(airport) {
              airportByIata[airport.iata] = airport;
              if (countByAirport[airport.iata]) {
                airport.count = countByAirport[airport.iata]; // 加入班次数量
                airport.id = airport.iata;
                return true;
              }
              return null;
            });
            flights.forEach(function(flight) {
              const origin = airportByIata[flight.origin];
              const destination = airportByIata[flight.destination];
              flight.longitude = [ origin.longitude, destination.longitude ];
              flight.latitude = [ origin.latitude, destination.latitude ];
            });
            const airView = chart.view();
            airView.source(airports);
            airView.point().position('longitude*latitude')
              .color('rgb(97,145,185)')
              .shape('circle')
              .style({
                stroke: '#eee',
                lineWidth: 1
              })
              .size('count', [ 3, 18 ])
              .tooltip('iata*count');
            const flightView = chart.view(); // 飞行路线
            flightView.tooltip(false);
            flightView.source(subFlights);
            flightView.edge()
              .position('longitude*latitude');
            chart.render();

            function getFlights(iata) {
              const rst = [];
              flights.forEach(function(flight) {
                if (flight.origin === iata || flight.destination === iata) {
                  rst.push(flight);
                }
              });
              return rst;
            }

            let preId;
            chart.on('plotmove', function(ev) {
              const records = airView.getSnapRecords({
                x: ev.x,
                y: ev.y
              });
              if (records.length) {
                const obj = records[0]._origin;
                const iata = obj.iata;
                if (preId !== iata) {
                  subFlights = getFlights(iata);
                  flightView.changeData(subFlights);
                  preId = iata;
                }
              }
            });
            chart.on('plotleave', function() {
              if (subFlights.length) {
                subFlights = [];
                flightView.changeData([]);
              }
            });
          });
      });
  });
