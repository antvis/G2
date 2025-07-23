import { TreeNode } from '../Tree';

// Shared transform configuration factories
const createTransposeTransform = (coordinateType: string): TreeNode => ({
  id: `mark.coordinate.${coordinateType}.transform.transpose`,
  label: 'TransposeCoordinate',
  type: 'Object',
  description: '转置坐标变换',
  children: [
    {
      id: `mark.coordinate.${coordinateType}.transform.transpose.type`,
      label: 'type',
      type: "'transpose'",
      description: '变换类型',
      optional: true,
    },
  ],
});

const createFisheyeTransform = (coordinateType: string): TreeNode => ({
  id: `mark.coordinate.${coordinateType}.transform.fisheye`,
  label: 'FisheyeCoordinate',
  type: 'Object',
  description: '鱼眼坐标变换',
  children: [
    {
      id: `mark.coordinate.${coordinateType}.transform.fisheye.type`,
      label: 'type',
      type: "'fisheye'",
      description: '变换类型',
      optional: true,
    },
    {
      id: `mark.coordinate.${coordinateType}.transform.fisheye.focusX`,
      label: 'focusX',
      type: 'number',
      description: 'X轴焦点',
      optional: true,
    },
    {
      id: `mark.coordinate.${coordinateType}.transform.fisheye.focusY`,
      label: 'focusY',
      type: 'number',
      description: 'Y轴焦点',
      optional: true,
    },
    {
      id: `mark.coordinate.${coordinateType}.transform.fisheye.distortionX`,
      label: 'distortionX',
      type: 'number',
      description: 'X轴扭曲度',
      optional: true,
    },
    {
      id: `mark.coordinate.${coordinateType}.transform.fisheye.distortionY`,
      label: 'distortionY',
      type: 'number',
      description: 'Y轴扭曲度',
      optional: true,
    },
    {
      id: `mark.coordinate.${coordinateType}.transform.fisheye.visual`,
      label: 'visual',
      type: 'boolean',
      description: '是否可视化变换',
      optional: true,
    },
  ],
});

// Factory function to create transform configurations for a coordinate type
const createTransformConfig = (coordinateType: string): TreeNode => ({
  id: `mark.coordinate.${coordinateType}.transform`,
  label: 'transform',
  type: 'CoordinateTransform[]',
  description: '坐标变换',
  optional: true,
  children: [
    createTransposeTransform(coordinateType),
    createFisheyeTransform(coordinateType),
  ],
});

export const coordinateConfig: TreeNode[] = [
  // 坐标系配置
  {
    id: 'mark.coordinate',
    label: 'coordinate',
    type: 'Coordinate',
    description: '坐标系|坐标系',
    optional: true,
    children: [
      // 直角坐标系
      {
        id: 'mark.coordinate.cartesian',
        label: 'CartesianCoordinate',
        type: 'Object',
        description: '直角坐标系',
        children: [
          {
            id: 'mark.coordinate.cartesian.type',
            label: 'type',
            type: "'cartesian'",
            description: '坐标系类型',
            optional: true,
          },
          createTransformConfig('cartesian'),
        ],
      },
      // 极坐标系
      {
        id: 'mark.coordinate.polar',
        label: 'PolarCoordinate',
        type: 'Object',
        description: '极坐标系',
        children: [
          {
            id: 'mark.coordinate.polar.type',
            label: 'type',
            type: "'polar'",
            description: '坐标系类型',
            optional: true,
          },
          {
            id: 'mark.coordinate.polar.startAngle',
            label: 'startAngle',
            type: 'number',
            description: '起始角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.polar.endAngle',
            label: 'endAngle',
            type: 'number',
            description: '结束角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.polar.innerRadius',
            label: 'innerRadius',
            type: 'number',
            description: '内半径',
            optional: true,
          },
          {
            id: 'mark.coordinate.polar.outerRadius',
            label: 'outerRadius',
            type: 'number',
            description: '外半径',
            optional: true,
          },
          createTransformConfig('polar'),
        ],
      },
      // 螺旋坐标系
      {
        id: 'mark.coordinate.helix',
        label: 'HelixCoordinate',
        type: 'Object',
        description: '螺旋坐标系',
        children: [
          {
            id: 'mark.coordinate.helix.type',
            label: 'type',
            type: "'helix'",
            description: '坐标系类型',
            optional: true,
          },
          {
            id: 'mark.coordinate.helix.startAngle',
            label: 'startAngle',
            type: 'number',
            description: '起始角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.helix.endAngle',
            label: 'endAngle',
            type: 'number',
            description: '结束角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.helix.innerRadius',
            label: 'innerRadius',
            type: 'number',
            description: '内半径',
            optional: true,
          },
          {
            id: 'mark.coordinate.helix.outerRadius',
            label: 'outerRadius',
            type: 'number',
            description: '外半径',
            optional: true,
          },
          createTransformConfig('helix'),
        ],
      },
      // 角度坐标系
      {
        id: 'mark.coordinate.theta',
        label: 'ThetaCoordinate',
        type: 'Object',
        description: '角度坐标系',
        children: [
          {
            id: 'mark.coordinate.theta.type',
            label: 'type',
            type: "'theta'",
            description: '坐标系类型',
            optional: true,
          },
          {
            id: 'mark.coordinate.theta.startAngle',
            label: 'startAngle',
            type: 'number',
            description: '起始角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.theta.endAngle',
            label: 'endAngle',
            type: 'number',
            description: '结束角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.theta.innerRadius',
            label: 'innerRadius',
            type: 'number',
            description: '内半径',
            optional: true,
          },
          {
            id: 'mark.coordinate.theta.outerRadius',
            label: 'outerRadius',
            type: 'number',
            description: '外半径',
            optional: true,
          },
          createTransformConfig('theta'),
        ],
      },
      // 径向坐标系
      {
        id: 'mark.coordinate.radial',
        label: 'RadialCoordinate',
        type: 'Object',
        description: '径向坐标系',
        children: [
          {
            id: 'mark.coordinate.radial.type',
            label: 'type',
            type: "'radial'",
            description: '坐标系类型',
            optional: true,
          },
          {
            id: 'mark.coordinate.radial.startAngle',
            label: 'startAngle',
            type: 'number',
            description: '起始角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.radial.endAngle',
            label: 'endAngle',
            type: 'number',
            description: '结束角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.radial.innerRadius',
            label: 'innerRadius',
            type: 'number',
            description: '内半径',
            optional: true,
          },
          {
            id: 'mark.coordinate.radial.outerRadius',
            label: 'outerRadius',
            type: 'number',
            description: '外半径',
            optional: true,
          },
          createTransformConfig('radial'),
        ],
      },
      // 雷达坐标系
      {
        id: 'mark.coordinate.radar',
        label: 'RadarCoordinate',
        type: 'Object',
        description: '雷达坐标系',
        children: [
          {
            id: 'mark.coordinate.radar.type',
            label: 'type',
            type: "'radar'",
            description: '坐标系类型',
            optional: true,
          },
          {
            id: 'mark.coordinate.radar.startAngle',
            label: 'startAngle',
            type: 'number',
            description: '起始角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.radar.endAngle',
            label: 'endAngle',
            type: 'number',
            description: '结束角度',
            optional: true,
          },
          {
            id: 'mark.coordinate.radar.innerRadius',
            label: 'innerRadius',
            type: 'number',
            description: '内半径',
            optional: true,
          },
          {
            id: 'mark.coordinate.radar.outerRadius',
            label: 'outerRadius',
            type: 'number',
            description: '外半径',
            optional: true,
          },
          createTransformConfig('radar'),
        ],
      },
      // 平行坐标系
      {
        id: 'mark.coordinate.parallel',
        label: 'ParallelCoordinate',
        type: 'Object',
        description: '平行坐标系',
        children: [
          {
            id: 'mark.coordinate.parallel.type',
            label: 'type',
            type: "'parallel'",
            description: '坐标系类型',
            optional: true,
          },
          createTransformConfig('parallel'),
        ],
      },
      // 地理坐标系
      {
        id: 'mark.coordinate.geo',
        label: 'GeoCoordinate',
        type: 'Object',
        description: '地理坐标系',
        children: [
          {
            id: 'mark.coordinate.geo.type',
            label: 'type',
            type: 'string',
            description: '地理投影类型（如mercator、albers等）',
            optional: false,
          },
          createTransformConfig('geo'),
          {
            id: 'mark.coordinate.geo.properties',
            label: '[key: string]',
            type: 'any',
            description: 'd3-geo相关属性',
            optional: true,
          },
        ],
      },
    ],
  },
];
