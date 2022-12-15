import * as React from 'react';
import { Menu } from 'antd';

export const ConfigPanel = (props) => {
  const { theme, changeTheme, className = '' } = props;

  return (
    <div className={`config-panel ${className}`}>
      <Menu
        theme={theme === 'dark' ? 'dark' : 'light'}
        onClick={(e) => changeTheme(e.key)}
        selectedKeys={[theme]}
        style={{ width: 120 }}
        mode="vertical"
        items={[
          { label: '默认风格', key: 'light' },
          { label: '暗色风格', key: 'dark' },
          { label: '学术风格', key: 'academy' },
        ]}
      />
    </div>
  );
};
