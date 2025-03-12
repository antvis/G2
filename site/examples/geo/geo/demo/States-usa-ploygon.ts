import { Chart } from '@antv/g2';
// import rewind from '@mapbox/geojson-rewind';

const layout = (data) => {
  data.features = data.features.filter((item) => {
    const geometry = item.geometry;
    return (
      item != null &&
      geometry &&
      geometry.type &&
      geometry.coordinates &&
      geometry.coordinates.length > 0
    );
  });

  // rewind(data, true);

  return data.features.map((feature) => {
    const { id, geometry, properties } = feature;
    const ploygonData = {
      id,
      x: [],
      y: [],
      ...properties,
    };

    geometry?.coordinates.forEach((item) => {
      item.forEach((v, i) => {
        ploygonData.y.push(v[1]);
        ploygonData.x.push(v[0]);
      });
    });

    return ploygonData;
  });
};

const chart = new Chart({
  container: 'container',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
});

chart
  .polygon()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/d36ad90e-3902-4742-b8a2-d93f7e5dafa2.json',
    transform: [
      {
        type: 'custom',
        callback: layout,
      },
    ],
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', (d) => d?.density)
  .scale('x', { domain: [-130, -60] })
  .scale('y', { domain: [10, 50] })
  .axis(false)
  .style('stroke', 'red')
  .style('fillOpacity', 0.65);

chart.render();
