---
title: 茎叶图
order: 5
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stem-leaf-demo.png/original'
category: ['distribution']
similar: ['histogram', 'boxplot']
---

<img alt="stem-leaf" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stem-leaf-demo.png/original" width=600/>

## 茎叶图的简介

茎叶图（Stem-and-Leaf Plot）是一种用于展示数据分布的统计图表，能够保留原始数据的具体数值，同时直观显示数据的分布形态。常用于小样本数据的分布分析。

**英文名**：Stem-and-Leaf Plot

**其他名称**：茎叶图表、茎叶分布图

## 茎叶图的构成

- **茎（Stem）**：通常为数据的高位部分，按顺序排列。
- **叶（Leaf）**：为数据的低位部分，附在对应的茎后面。
- **分隔符**：将茎和叶分开，常用“|”或空格。

> 目前 G2 5.0 暂不支持茎叶图的标准可视化，推荐用表格或自定义方式实现。

---

## 茎叶图的应用场景

### 适合的场景

- 小样本数据的分布分析。
- 需要保留原始数据具体数值的场景。
- 教学、统计基础课程。

### 不适合的场景

- 大样本数据，茎叶图会变得冗长难以阅读。
- 需要展示趋势或占比时，建议用直方图、箱形图等。

---

## 茎叶图的扩展

- 可结合分组、分层等方式展示多组数据。
- 可与箱形图、直方图等联合使用，辅助分析。

---

## 茎叶图与其他图表的对比

### 茎叶图和[直方图](/charts/histogram)

- 直方图适合大样本、连续数据，茎叶图适合小样本、离散数据。

### 茎叶图和[箱形图](/charts/boxplot)

- 箱形图突出统计特征，茎叶图保留原始数据。

---

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>