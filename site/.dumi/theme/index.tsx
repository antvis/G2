import * as React from 'react';
import { Layout } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ConfigPanel } from './components/ConfigPanel';
import { DemosView } from './components/DemosView';
import './index.less';

const Page: React.FC = () => {
  const [theme, changeTheme] = React.useState('light');
  const [collapsed, toggleCollapsed] = React.useState(false);

  return (
    <div className={`page-theme-set theme-${theme}`}>
      <div className="demos-view-container">
        <DemosView theme={theme} />
      </div>
      <Layout.Sider
        collapsed={collapsed}
        theme="light"
        width={320}
        collapsible
        trigger={null}
        style={{ backgroundColor: '#fafafa' }}
      >
        <RightOutlined
          className="sider-trigger"
          onClick={() => toggleCollapsed(!collapsed)}
        />
        <ConfigPanel
          theme={theme}
          changeTheme={changeTheme}
          className="config-panel-affix"
        />
      </Layout.Sider>
    </div>
  );
};

export default Page;
