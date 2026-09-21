import * as React from 'react';
import { Layout } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { deepMix } from '@antv/util';
import { create } from '../../../src/theme/create';
import { ConfigPanel } from './components/ConfigPanel';
import { DemosView } from './components/DemosView';
import { getG2SeedTokens, getG2Tokens } from './utils/getG2Tokens';

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
    <div
      className={`flex w-full max-w-full overflow-hidden [@media(width<=760px)]:flex-col-reverse ${
        theme === 'dark' ? 'bg-[rgba(20,20,20,0.92)]' : 'bg-[#eaf2f6]'
      }`}
    >
      <div className="mx-6 my-5 min-h-[400px] min-w-0 flex-1">
        <DemosView theme={theme} tokens={tokens} />
      </div>
      <Layout.Sider
        collapsed={collapsed}
        theme="light"
        width={320}
        collapsible
        trigger={null}
        className={`bg-[#fafafa] [@media(width<=760px)]:w-full [@media(width<=760px)]:max-w-full [@media(width<=760px)]:min-w-0 [@media(width<=760px)]:basis-auto ${
          collapsed ? 'min-w-0 [@media(width>760px)]:flex-[0]' : ''
        }`}
      >
        <RightOutlined
          className={`absolute top-40 -left-[13px] z-2 flex size-[26px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out [@media(width<=760px)]:hidden ${
            collapsed ? 'rotate-180 [&_svg]:translate-x-1 [&_svg]:scale-80' : ''
          }`}
          onClick={() => toggleCollapsed(!collapsed)}
        />
        <ConfigPanel
          theme={theme}
          tokens={tokens}
          seed={seed}
          changeTheme={onChangeTheme}
          changeTokens={onChangeTokens}
          changeSeed={onChangeSeed}
        />
      </Layout.Sider>
    </div>
  );
};

export default Page;
