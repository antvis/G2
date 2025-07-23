// Tree.tsx
import React, { type FC, useMemo } from 'react';
import { Tree as AntdTree, Tag } from 'antd';
import type { DataNode } from 'antd/es/tree';
import g2ConfigData from './config';

// 树节点接口定义
interface TreeNode {
  id: string;
  label: string;
  type?: string;
  description?: string;
  optional?: boolean;
  important?: boolean;
  children?: TreeNode[];
  defaultExpanded?: boolean;
}

// 组件Props接口
interface TreeStructureProps {
  data?: TreeNode[];
  showTypes?: boolean;
  showOptional?: boolean;
  highlightImportant?: boolean;
  maxDepth?: number;
}

// 解析描述中的标签和内容
const parseDescription = (
  description?: string,
): { tag?: string; content: string } => {
  if (!description) return { content: '' };

  const parts = description.split('|');
  if (parts.length === 2) {
    return { tag: parts[0], content: parts[1] };
  }
  return { content: description };
};

// 将TreeNode转换为Antd Tree需要的DataNode格式
const convertToTreeData = (
  nodes: TreeNode[],
  showTypes: boolean,
  showOptional: boolean,
  highlightImportant: boolean,
): DataNode[] => {
  return nodes.map((node) => ({
    key: node.id,
    title: renderTreeNode(node, showTypes, showOptional, highlightImportant),
    children: node.children
      ? convertToTreeData(
          node.children,
          showTypes,
          showOptional,
          highlightImportant,
        )
      : undefined,
  }));
};

// 获取默认展开的keys
const getDefaultExpandedKeys = (nodes: TreeNode[]): string[] => {
  const keys: string[] = [];

  const traverse = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (node.defaultExpanded || node.important) {
        keys.push(node.id);
      }
      if (node.children) {
        traverse(node.children);
      }
    });
  };

  traverse(nodes);
  return keys;
};

// 自定义节点渲染函数
const renderTreeNode = (
  node: TreeNode,
  showTypes: boolean,
  showOptional: boolean,
  highlightImportant: boolean,
): React.ReactNode => {
  const { tag, content } = parseDescription(node.description);

  const labelStyle: React.CSSProperties = {
    fontFamily:
      "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
    fontSize: '14px',
    fontWeight: node.important && highlightImportant ? 600 : 400,
    color: node.important && highlightImportant ? '#722ed1' : '#262626',
  };

  const typeStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#1890ff',
    backgroundColor: '#f0f9ff',
    padding: '2px 6px',
    borderRadius: '3px',
    marginLeft: '8px',
    fontFamily: "'JetBrains Mono', monospace",
  };

  const optionalStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#52c41a',
    marginLeft: '4px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#8c8c8c',
    marginLeft: '8px',
    fontStyle: 'italic',
  };

  // Tag颜色映射
  const getTagColor = (tag: string) => {
    const colorMap: Record<string, string> = {
      基础: 'blue',
      标记: 'purple',
      位置: 'green',
      间距: 'orange',
      数据: 'red',
      标记转换: 'magenta',
      编码: 'cyan',
      比例尺: 'geekblue',
      坐标系: 'gold',
      布局: 'lime',
      样式: 'volcano',
      状态: 'pink',
      动画: 'yellow',
      交互: 'teal',
      标签: 'purple',
      组件: 'indigo',
    };
    return colorMap[tag] || 'default';
  };

  return (
    <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={labelStyle}>
        {node.label}
        {showOptional && node.optional && <span style={optionalStyle}>?</span>}
      </span>
      {showTypes && node.type && <span style={typeStyle}>{node.type}</span>}
      {tag && (
        <Tag
          color={getTagColor(tag)}
          style={{ marginLeft: '8px', fontSize: '10px' }}
        >
          {tag}
        </Tag>
      )}
      {content && <span style={descriptionStyle}>// {content}</span>}
    </span>
  );
};

// 主树结构组件
const TreeComponent: FC<TreeStructureProps> = ({
  data = g2ConfigData,
  showTypes = true,
  showOptional = true,
  highlightImportant = true,
}) => {
  const treeData = useMemo(
    () => convertToTreeData(data, showTypes, showOptional, highlightImportant),
    [data, showTypes, showOptional, highlightImportant],
  );

  const defaultExpandedKeys = useMemo(
    () => getDefaultExpandedKeys(data),
    [data],
  );

  const containerStyle: React.CSSProperties = {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    border: '1px solid #e8e8e8',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    padding: '16px',
    margin: '16px 0',
    position: 'relative',
    overflow: 'auto',
  };

  // 添加全局样式
  const globalStyles = `
    .ant-tree .ant-tree-node-content-wrapper {
      padding: 2px 4px;
      border-radius: 4px;
    }

    .ant-tree .ant-tree-node-content-wrapper:hover {
      background-color: #f5f5f5;
    }

    .ant-tree .ant-tree-switcher {
      color: #1890ff;
    }

    .ant-tree .ant-tree-treenode {
      padding: 2px 0;
    }

    .tree-container::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    .tree-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .tree-container::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }

    .tree-container::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={containerStyle} className="tree-container">
        <AntdTree
          treeData={treeData}
          defaultExpandedKeys={defaultExpandedKeys}
          showLine={true}
          showIcon={false}
          blockNode={false}
          selectable={false}
        />
      </div>
    </>
  );
};

export default TreeComponent;
export type { TreeNode, TreeStructureProps };
