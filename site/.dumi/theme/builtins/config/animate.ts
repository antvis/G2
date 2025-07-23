import { TreeNode } from '../Tree';

// Helper function to create animation configuration nodes
function createAnimationNode(
  animationType: string,
  label: string,
  description: string,
): TreeNode {
  return {
    id: `mark.animate.${animationType}`,
    label,
    type: 'Object',
    description,
    children: [
      {
        id: `mark.animate.${animationType}.type`,
        label: 'type',
        type: `'${animationType}'`,
        description: '动画类型',
        optional: true,
      },
      {
        id: `mark.animate.${animationType}.duration`,
        label: 'duration',
        type: 'number',
        description: '动画持续时间（毫秒）',
        optional: true,
      },
      {
        id: `mark.animate.${animationType}.delay`,
        label: 'delay',
        type: 'number',
        description: '动画延迟时间（毫秒）',
        optional: true,
      },
      {
        id: `mark.animate.${animationType}.easing`,
        label: 'easing',
        type: 'string',
        description: '缓动函数',
        optional: true,
      },
      {
        id: `mark.animate.${animationType}.fill`,
        label: 'fill',
        type: "'forwards' | 'none' | 'backwards' | 'both' | 'auto'",
        description: '动画填充模式',
        optional: true,
      },
    ],
  };
}

export const animateConfig: TreeNode[] = [
  // 动画配置
  {
    id: 'mark.animate',
    label: 'animate',
    type: 'Animation',
    description: '动画|动画配置',
    optional: true,
    children: [
      // 淡入动画
      createAnimationNode('fadeIn', 'FadeInAnimation', '淡入动画'),
      // 淡出动画
      createAnimationNode('fadeOut', 'FadeOutAnimation', '淡出动画'),
      // X轴缩放入场动画
      createAnimationNode('scaleInX', 'ScaleInXAnimation', 'X轴缩放入场动画'),
      // X轴缩放退场动画
      createAnimationNode('scaleOutX', 'ScaleOutXAnimation', 'X轴缩放退场动画'),
      // Y轴缩放入场动画
      createAnimationNode('scaleInY', 'ScaleInYAnimation', 'Y轴缩放入场动画'),
      // Y轴缩放退场动画
      createAnimationNode('scaleOutY', 'ScaleOutYAnimation', 'Y轴缩放退场动画'),
      // 波浪入场动画
      createAnimationNode('waveIn', 'WaveInAnimation', '波浪入场动画'),
      // 形变动画
      createAnimationNode('morphing', 'MorphingAnimation', '形变动画'),
      // 缩放入场动画
      createAnimationNode('zoomIn', 'ZoomInAnimation', '缩放入场动画'),
      // 缩放退场动画
      createAnimationNode('zoomOut', 'ZoomOutYAnimation', '缩放退场动画'),
      // 路径入场动画
      createAnimationNode('pathIn', 'PathInAnimation', '路径入场动画'),
      // X轴生长入场动画
      createAnimationNode('growInX', 'GrowInXAnimation', 'X轴生长入场动画'),
      // Y轴生长入场动画
      createAnimationNode('growInY', 'GrowInYAnimation', 'Y轴生长入场动画'),
    ],
  },
];
