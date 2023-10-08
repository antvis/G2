import * as React from 'react';
import { Layout } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ConfigPanel } from './components/ConfigPanel';
import { DemosView } from './components/DemosView';
import { getG2SeedTokens, getG2Tokens } from './utils/getG2Tokens';
import { create } from '../../../src/theme/create';
import './index.less';
import { deepMix } from '@antv/util';

const Page: React.FC = () => {
  const [theme, setTheme] = React.useState('light');
  const [tokens, setTokens] = React.useState(getG2Tokens(theme));
  const [seed, setSeed] = React.useState(getG2SeedTokens(theme));
  const [tmpTokens, setTmpTokens] = React.useState({});
  const [collapsed, toggleCollapsed] = React.useState(false);

  function onChangeTheme(theme) {
    setTheme(theme);
    setTokens(getG2Tokens(theme));
    setSeed(getG2SeedTokens(theme));
    setTmpTokens({});
  }

  function onChangeTokens(tmp) {
    setTmpTokens(tmp);
    setTokens(deepMix({}, tokens, tmp));
  }

  function onChangeSeed(name, value) {
    const newSeed = { ...seed, [name]: value };
    const defaults = create(newSeed);
    setSeed(newSeed);
    setTokens(deepMix(defaults, tmpTokens));
  }

  return (
    <div className={`page-theme-set theme-${theme}`}>
      <div className="demos-view-container">
        <DemosView theme={theme} tokens={tokens} />
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
          tokens={tokens}
          seed={seed}
          changeTheme={onChangeTheme}
          changeTokens={onChangeTokens}
          changeSeed={onChangeSeed}
          className="config-panel-affix"
        />
      </Layout.Sider>
    </div>
  );
};

export default Page;
