---
title: Components of G2 Charts
order: 1
---

## Introduction
To effectively use G2 for data visualization, it's important to understand the components of G2 charts and related concepts.

Here's a simple example:

<img alt="built-in-tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-8XRSYHZ8S8AAAAAAAAAAAAAemJ7AQ/original"/>

## Title

The title provides a brief summary of the data displayed in the chart. It is a commonly used component and supports both main titles and subtitles, along with their style and positioning options.

Refer to the [Title](/manual/component/title) tutorial for more information.

## Axis

Draws the coordinate axes, currently supporting both Cartesian and polar coordinate axes.

Each axis is composed of the axis line, ticks, tick labels, title, and grid lines.

Refer to the [Axis](/manual/component/axis) tutorial for more information.

## Legend

Draws the legend, with G2 offering two types: Category Legend and Continuous Legend, used for displaying categorical and continuous data, respectively.

Refer to the [Legend](/manual/component/legend) tutorial for more information.

## Scrollbar

The scrollbar is an interactive component that hides any overflow when the display area is not large enough to show all information. Users can reveal hidden parts by scrolling vertically or horizontally.

Whether content exceeds the display area depends on the amount of content and the size of the display area. When vertical content exceeds the display area, a vertical scrollbar should be used to control what is shown; the same logic applies to horizontal scrollbars.

Refer to the [Scrollbar](/manual/component/scrollbar) tutorial for more information.

## Slider

The slider is an auxiliary component for viewing data, compressing large volumes of data onto one axis. It allows users to both view an overall data landscape and zoom into specific data segments, enabling drag-and-drop for observing data evolution within a certain range.

The slider compresses value-range data and is closely tied to the type of scale corresponding to the position channels x and y. Generally, it is used more frequently for time-based scales, less for continuous axes, and rarely for categorical axes.

Refer to the [Slider](/manual/component/slider) tutorial for more information.

## Tooltip

When the mouse hovers over a point, a tooltip appears showing information related to that point, such as its value and data units. The tooltip's content can also be dynamically specified using a formatting function.

Refer to the [Tooltip](/manual/component/tooltip) tutorial for more information.  
