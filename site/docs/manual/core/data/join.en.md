---
title: join
order: 2
---

## Overview

The function of `join` is to connect two datasets together, similar to the `JOIN` operation in SQL. This functionality is usually used to merge data from two data sources based on common fields, allowing records from two data sources to be combined according to specified conditions to form a new dataset. This functionality is very useful for displaying relational information between multiple data sources in visualizations. This operation is completed during the data preprocessing stage, and the newly generated fields can be directly used for graphic drawing, field mapping, annotations, and other operations.

## Configuration

| Property  | Description                                     | Type                                                               | Default     | Required |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------ | ----------- | -------- |
| `join`    | The data source to be joined                    | `object[]`                                                         | -           | Yes      |
| `on`      | Fields for connecting the two data sources      | `[string \| ((d: any) => string), string \| ((d: any) => string)]` | -           | Yes      |
| `select`  | Fields to select from the joined data source    | `string[]`                                                         | `[]`        | No       |
| `as`      | Rename the fields selected by `select`          | `string[]`                                                         | No renaming | No       |
| `unknown` | Default value if no matching join data is found | `any`                                                              | NaN         | No       |

### Detailed Property Description

1. **`join`**: Specifies the second data source to be joined, which can be an object array representing all join data.
2. **`on`**: Defines join conditions, passing in an array containing two fields or function arrays that can return field names. Used to match based on these fields in the two data sources.
3. **`select`**: Specifies which fields to select from the joined data source. Defaults to an empty array, meaning the joined data source contains all fields.
4. **`as`**: Specifies aliases for fields selected by `select`. If not specified, defaults to the original field names.
5. **`unknown`**: When there is no matching data between the two data sources, use this value as the default value.

> 📌 join can significantly enhance data organization capabilities in complex scenarios and is an indispensable tool for combining and cleaning data.

## Use Cases

- **Data Merging**: Merge multi-source data to complete missing fields. Combine two data sources with related fields into one data source for further analysis or visualization.
- **Data Alignment**: Align two datasets based on common fields to generate the structure needed for visualization.
- **Conditional Selection**: Map codes (such as user IDs, product IDs) to descriptive information. Select specified fields from the joined data source for display while avoiding redundant data.

## Examples

### Basic Usage

#### on Field Description

on: ['id', 'code']
// Or use function approach
on: [(d) => d.id, (d) => d.code]

- Connect two data sources by fields and extract fields from external data for merging:

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

const joinData = [
  { c: 1, d: 2, e: 3 },
  { c: 4, d: 5, e: 6 },
];

chart.options({
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'join',
        join: joinData,
        on: ['a', 'c'],
        select: ['d', 'e'],
      },
    ],
  },
});
```

- The transformation result is:

```js
[
  { a: 1, b: 2, c: 3, d: 2, e: 3 },
  { a: 4, b: 5, c: 6, d: 5, e: 6 },
];
```

#### Field Renaming

- Use as to rename fields selected by select:

```ts
chart.options({
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'join',
        join: joinData,
        on: ['a', 'c'],
        select: ['d', 'e'],
        as: ['dd', 'ee'],
      },
    ],
  },
});
```

- The transformation result is:

```js
[
  { a: 1, b: 2, c: 3, dd: 2, ee: 3 },
  { a: 4, b: 5, c: 6, dd: 5, ee: 6 },
];
```

#### Setting Default Value unknown

- When there is no matching data between the two data sources, use unknown to specify a default value:

```ts
const data = [{ id: 1 }, { id: 2 }];
const joinData = [{ code: 1, label: 'A' }];

chart.options({
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'join',
        join: joinData,
        on: ['id', 'code'],
        select: ['label'],
        unknown: 'Unknown',
      },
    ],
  },
});
```

- The transformation result is:

```js
[
  { id: 1, label: 'A' },
  { id: 2, label: 'Unknown' },
];
```

#### Tips

- join is a left join, meaning the main data is always retained.

- When select is not specified, no fields are extracted by default, only used to determine join relationships.

- It's recommended to deduplicate join data in advance to avoid ambiguity in many-to-one joins.

- Supports dynamic functions to extract join fields, adapting to complex structures.
