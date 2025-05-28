---
title: Stem-and-Leaf Plot
order: 5
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stem-leaf-demo.png/original'
category: ['distribution']
similar: ['histogram', 'boxplot']
---

<img alt="stem-leaf" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stem-leaf-demo.png/original" width=600/>

## Introduction to Stem-and-Leaf Plots

A stem-and-leaf plot is a statistical chart used to display the distribution of data while preserving the actual values. It is especially useful for small datasets and provides a clear view of the data's shape.

**Other Names**: Stem-and-Leaf Chart, Stem-and-Leaf Display

## Components of a Stem-and-Leaf Plot

- **Stem**: Usually the higher digits of the data, listed in order.
- **Leaf**: The lower digits, attached to the corresponding stem.
- **Separator**: Divides the stem and leaf, often a "|" or space.

> G2 5.0 does not natively support stem-and-leaf plots. You may use a table or custom visualization.

---

## Use Cases of Stem-and-Leaf Plots

### Suitable Use Cases

- Distribution analysis of small datasets.
- Scenarios where retaining original data values is important.
- Teaching and introductory statistics.

### Unsuitable Use Cases

- Large datasets, as the plot becomes cluttered.
- When showing trends or proportions, use histograms or box plots.

---

## Extensions of Stem-and-Leaf Plots

- Can be grouped or layered to show multiple datasets.
- Often used alongside box plots or histograms for deeper analysis.

---

## Comparing Stem-and-Leaf Plots to Other Charts

### Stem-and-Leaf Plots and [Histograms](/en/charts/histogram)

- Histograms are better for large, continuous data; stem-and-leaf plots are better for small, discrete data.

### Stem-and-Leaf Plots and [Box Plots](/en/charts/boxplot)

- Box plots highlight statistical features; stem-and-leaf plots retain original data.

---

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>