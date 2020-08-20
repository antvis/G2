---
title: G2 basic concepts overview
order: 2
---

In order to better use G2 for data visualization, we need to understand the composition of G2 charts and related concepts.

## Graphic grammar

The power of G2 is supported by a set of graphics grammar behind it. Based on the book ["The Grammar of Graphics" (by Leland Wilkinson)](https://book.douban.com/subject/10123863/), it is a set of grammatical rules used to describe the in-depth characteristics of all statistical charts. This grammar answers The question "What is a statistical chart" organizes the most basic elements in a bottom-up manner to form more advanced elements.

![image.png](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*PDXtQYx4gAYAAAAAAAAAAABkARQnAQ)

Therefore, the chart constructed by G2 is composed of a series of independent graphic syntax elements:

- **Data**: The most basic part of visualization.
- **Attribute**: responsible for mapping the variables in the data to the graphic space.
- **Geometry**: the graphic elements you actually see in the chart, such as points, lines, polygons, etc. Each geometric mark object contains multiple graphic attributes. The core of G2 is to establish a series of variables in the data to the graphic attributes. Mapping.
- **Scale**: A conversion bridge from data space to graphic attribute space. Each graphic attribute corresponds to one or more metrics.
- **Coordinate**: Describes how the data is mapped to the plane where the graph is located. The same geometric mark will behave differently in different coordinate systems. G2 provides support for multiple coordinate systems: Cartesian coordinates, polar coordinates, spiral coordinates, etc.
- **Component**: It can also be used as an auxiliary element of the chart to enhance the readability and comprehensibility of the chart. In G2, a wealth of visual components are provided, including Axis, Legend, Tooltip, and Graphical Mark Annotation , Slider, etc.
- **Facet**：Describes how to decompose data into subsets, and how to map these subsets and jointly display them, mainly for multi-dimensional data analysis.

Therefore, in G2, we usually describe a chart like this: **a chart is a mapping from data to the graphic properties of the geometric marker object. In addition, the graphic may also contain statistical transformations of the data, and finally drawn at a specific coordinate system.**。

## Interaction grammar

G2's graphic grammar essentially disassembles the process of mapping data to graphics into the most basic elements, and then generates ever-changing charts through combination and collocation. The interaction syntax is the same. We disassemble an interaction and then combine to form a complete interaction.

In G2, we believe that an **interactive behavior** is composed of a series of **interaction links**, and each interaction link is composed of the following two parts:

1. **Trigger**，, the triggering of interaction links, including trigger objects and trigger events
2. **Feedback**，the result of the interaction link

For the interactive link, we can classify it as:

- Demonstration: indicates that the interaction can be carried out
- Start: Interaction starts
- Continue: Interaction continues
- End: End of Interaction
- Pause: Interaction pause
- Rollback: cancel the interaction and restore to the original state

Therefore, the interactive syntax of G2 becomes the assembly of interactive links. Taking the interactive behavior of frame selection chart as an example, we use the interactive syntax to describe as follows:

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*W1vOSalgrxQAAAAAAAAAAABkARQnAQ)

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*iv-ESoJg8noAAAAAAAAAAABkARQnAQ)

For more details on interactive syntax, please read [Interaction Grammar](./concepts/interaction)。

## View

View is a container that has an independent data source and can draw multiple graphics, which will contain Geometry, components, interactions, events, etc., while Chart is inherited from View and directly exposed to the developer's convenient entry point, so Chart is also View, Therefore, users can create sub-views through Chart, and then create sub-Views through sub-views, which are often used as a visualization solution for heterogeneous data and multi-dimensional data.

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*xW6bT7-4E1sAAAAAAAAAAABkARQnAQ)

## Chart composition

The common G2 chart composition is shown in the following figure:

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vS9aS7nrfH4AAAAAAAAAAABkARQnAQ)

### Axis

Each chart usually contains two coordinate axes. In the Cartesian coordinate system, they are the x-axis and the y-axis. In the polar coordinate system, they are composed of two dimensions: angle and radius.

Each coordinate axis is composed of coordinate axis (line), tickline (tickLine), tick text (label), title (title) and grid line (grid).

See the [Axis tutorial](tutorial/axis) for more information.

### Legend

As an auxiliary element of the chart, the legend is used to calibrate different data types and data ranges, assist in reading the chart, and help users to filter the data in the chart.

See the [Legend tutorial](tutorial/legend) for more information.

### Geometry

Geometry, which is what we call points, lines, and planes, these geometric figures. The type of geometry mark in G2 determines the type of chart generated, which is the actual performance of the data after visualization. Different geometric marks include The corresponding graphic attribute Attribute.

See the [Geometry tutorial](./concepts/geometry/) for more information.

### Tooltip

When the mouse hovers over a certain point, the information of the data corresponding to the current point will be displayed in the form of a prompt box, such as the value of the point, the data unit, etc. The information prompted in the data prompt box can also be dynamically specified through the formatting function.

See the [Tooltip tutorial](tutorial/tooltip) for more information.

### Annotation

When you need to draw some auxiliary lines, auxiliary boxes or pictures on the chart, such as adding the average line, the highest value line or marking the obvious range area, you can use the auxiliary mark annotation.

See the [Annotation tutorial](tutorial/annotation) for more information.
