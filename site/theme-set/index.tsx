import * as React from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { DemosView } from './components/DemosView';
import './index.less';

const Page: React.FC = () => {
  const [theme, changeTheme] = React.useState('light');

  return (
    <div className={`gallery-page theme-${theme}`}>
      <DemosView className="demos-view-container" theme={theme} />
      <ConfigPanel
        theme={theme}
        changeTheme={changeTheme}
        className="config-panel-affix"
      />
    </div>
  );
};

export default Page;
