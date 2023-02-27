// @ts-nocheck
import * as d3 from 'd3';
import type { Chart } from '../types';

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/sortable-bar-chart
function BarChart(
  data,
  {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = (d) => d, // given d in data, returns the (quantitative) y-value
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = 'currentColor', // bar fill color
    duration: initialDuration = 250, // transition duration, in milliseconds
    delay: initialDelay = (_, i) => i * 20, // per-element transition delay, in milliseconds
  } = {},
) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);

  // Compute default domains, and unique the x-domain.
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];
  xDomain = new d3.InternSet(xDomain);

  // Omit any data not present in the x-domain.
  const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  const format = yScale.tickFormat(100, yFormat);

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  const yGroup = svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick').call(grid))
    .call((g) =>
      g
        .append('text')
        .attr('x', -marginLeft)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text(yLabel),
    );

  let rect = svg
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(I)
    .join('rect')
    .property('key', (i) => X[i]) // for future transitions
    .call(
      position,
      (i) => xScale(X[i]),
      (i) => yScale(Y[i]),
    )
    .style('mix-blend-mode', 'multiply')
    .call((rect) =>
      rect.append('title').text((i) => [X[i], format(Y[i])].join('\n')),
    );

  const xGroup = svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(xAxis);

  // A helper method for updating the position of bars.
  function position(rect, x, y) {
    return rect
      .attr('x', x)
      .attr('y', y)
      .attr(
        'height',
        typeof y === 'function'
          ? (i) => yScale(0) - y(i)
          : (i) => yScale(0) - y,
      )
      .attr('width', xScale.bandwidth());
  }

  // A helper method for generating grid lines on the y-axis.
  function grid(tick) {
    return tick
      .append('line')
      .attr('class', 'grid')
      .attr('x2', width - marginLeft - marginRight)
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1);
  }

  return svg.node();
}

export const d3SVG: Chart = (data, { start, end }) => {
  start();

  const node = BarChart(data, {
    x: (d) => d.letter,
    y: (d) => d.frequency,
    color: 'steelblue',
  });
  end(node);
};
