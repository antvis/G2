import { Chart } from '@antv/g2';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/7fbb7084-cf34-4e7c-91b3-09e4748dc5e9.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      width: 800,
    });
    const padding = (node) =>
      node.attr('paddingRight', 120).attr('paddingLeft', 70);

    const encode = (node) =>
      node
        .encode('shape', 'smooth')
        .encode('x', (d) => new Date(d.date))
        .encode('y', 'unemployed')
        .encode('color', 'industry')
        .encode('key', 'industry');

    const utcX = (node) => node.scale('x', { utc: true });

    const keyframe = chart
      .timingKeyframe()
      .attr('direction', 'alternate')
      .attr('iterationCount', 2);

    keyframe
      .facetRect()
      .call(padding)
      .attr('paddingBottom', 60)
      .data(data)
      .encode('y', 'industry')
      .area()
      .attr('class', 'area')
      .attr('frame', false)
      .call(encode)
      .call(utcX)
      .scale('y', { facet: false })
      .style('fillOpacity', 1)
      .animate('enter', { type: 'scaleInY' });

    keyframe
      .area()
      .call(padding)
      .data(data)
      .attr('class', 'area')
      .transform({ type: 'stackY', reverse: true })
      .call(encode)
      .call(utcX)
      .style('fillOpacity', 1);

    keyframe
      .area()
      .call(padding)
      .data(data)
      .attr('class', 'area')
      .call(encode)
      .call(utcX)
      .style('fillOpacity', 0.8);

    chart.render();
  });
