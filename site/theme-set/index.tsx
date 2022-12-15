import * as React from 'react';
import { Layout } from 'antd';
import { RightOutlined, UpOutlined } from '@ant-design/icons';
import { ConfigPanel } from './components/ConfigPanel';
import { DemosView } from './components/DemosView';
import './index.less';

const Page: React.FC = () => {
  const [theme, changeTheme] = React.useState('academy');
  const [collapsed, toggleCollapsed] = React.useState(false);

  return (
    <div className={`page-theme-set theme-${theme}`}>
      <DemosView className="demos-view-container" theme={theme} />
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
          onClick={() => toggleCollapsed((old) => !old)}
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
