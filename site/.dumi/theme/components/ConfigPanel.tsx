import * as React from 'react';
import { Button, Collapse, Radio } from 'antd';
import { UploadOutlined, CopyOutlined } from '@ant-design/icons';
import { stdlib } from '@antv/g2';
import { copyToClipboard } from '../utils/copyToBoard';
import { exportDataToLocal } from '../utils/exportDataToLocal';
import './ConfigPanel.less';

const BUILT_THEMES = [
  { label: '默认风格', key: 'light' },
  { label: '暗色风格', key: 'classicDark' },
  { label: '学术风格', key: 'academy' },
];

function getG2Theme(theme: string | Record<string, any>) {
  if (typeof theme === 'object') return theme;

  const library = stdlib();
  const themeToken = library[`theme.${theme}`]();
  return themeToken;
}

const Operations = ({ theme }) => {
  return (
    <div className="config-panel-operations">
      <div className="config-panel-title">Theme</div>
      <div>
        <Button
          icon={<UploadOutlined />}
          type="primary"
          className="config-panel-button"
          onClick={() =>
            exportDataToLocal(
              JSON.stringify(getG2Theme(theme)),
              'g2-theme.json',
            )
          }
        >
          导出
        </Button>
        <Button
          icon={<CopyOutlined />}
          className="config-panel-button"
          onClick={() => copyToClipboard(JSON.stringify(getG2Theme(theme)))}
        >
          复制
        </Button>
      </div>
    </div>
  );
};

export const ConfigPanel = (props) => {
  const { theme, changeTheme, className = '' } = props;

  return (
    <div className={`config-panel ${className}`}>
      <Operations theme={theme} />
      <Collapse collapsible="header" defaultActiveKey={['1']}>
        <Collapse.Panel header="内置风格" key="1">
          <Radio.Group
            onChange={(e) => changeTheme(e.target.value)}
            value={theme}
          >
            {BUILT_THEMES.map((d) => (
              <Radio.Button value={d.key} key={d.key}>
                {d.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
