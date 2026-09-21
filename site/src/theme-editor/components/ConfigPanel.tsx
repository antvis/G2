import { Button, Collapse, Radio, Space, Divider, InputNumber } from 'antd';
import { UploadOutlined, CopyOutlined } from '@ant-design/icons';
import { copyToClipboard } from '../utils/copyToBoard';
import { exportDataToLocal } from '../utils/exportDataToLocal';
import { ColorPicker } from './ColorPicker';
import {
  BUILT_CATEGORIES,
  BUILT_THEMES,
  BUILT_COLOR_ATTRIBUTES,
  BUILT_PADDING_ATTRIBUTES,
} from './builtins';

const Operations = ({ tokens }) => {
  return (
    <div className="flex items-center justify-between bg-white p-3">
      <div className="text-lg font-bold">Theme</div>
      <div className="flex gap-2">
        <Button
          icon={<UploadOutlined />}
          type="primary"
          onClick={() =>
            exportDataToLocal(JSON.stringify(tokens), 'g2-theme.json')
          }
        >
          导出
        </Button>
        <Button
          icon={<CopyOutlined />}
          onClick={() => copyToClipboard(JSON.stringify(tokens))}
        >
          复制
        </Button>
      </div>
    </div>
  );
};

export const ConfigPanel = (props) => {
  const { theme, changeTheme, tokens, changeTokens, changeSeed, seed } = props;
  const { category10 } = tokens;
  const encodePalette = (d) => d.join('-');

  function onThemeChange(e) {
    changeTheme(e.target.value);
  }

  function updatePalette(palette: string[]) {
    const [defaultColor] = palette;
    const { category20 } = tokens;
    changeTokens({
      category10: palette,
      category20: [...palette, ...category20.slice(10)],
      color: defaultColor,
    });
  }

  function onColorChange(d, i) {
    updatePalette(category10.map((color, index) => (index === i ? d : color)));
  }

  return (
    <div>
      <Operations tokens={tokens} />
      <Collapse collapsible="header" defaultActiveKey={['1']}>
        <Collapse.Panel header="风格" key="1">
          <Radio.Group onChange={onThemeChange} value={theme}>
            {BUILT_THEMES.map((d) => (
              <Radio.Button value={d.key} key={d.key}>
                {d.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Collapse.Panel>
        <Collapse.Panel header="色板" key="2">
          <Radio.Group
            onChange={(e) => updatePalette(e.target.value.split('-'))}
            value={encodePalette(category10)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {BUILT_CATEGORIES.map((category10) => (
                <Radio.Button
                  value={encodePalette(category10)}
                  key={encodePalette(category10)}
                  className="w-full overflow-hidden rounded-[5px] p-0 [&>span]:grid [&>span]:h-full [&>span]:grid-cols-10"
                >
                  {category10.map((d) => (
                    <span
                      key={d}
                      style={{
                        background: d,
                        display: 'inline-block',
                        height: '100%',
                      }}
                    ></span>
                  ))}
                </Radio.Button>
              ))}
            </Space>
            <Divider style={{ fontSize: 14, fontWeight: 'normal' }}>
              自定义
            </Divider>
            <div
              className="w-full overflow-hidden rounded-[5px] p-0"
              style={{
                height: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 10%)',
                border: '1px solid #d9d9d9',
                borderColor: BUILT_CATEGORIES.find(
                  (d) => encodePalette(d) === encodePalette(category10),
                )
                  ? '#d9d9d9'
                  : '#873bf4',
              }}
            >
              {category10.map((d, i) => (
                <ColorPicker
                  key={i}
                  value={d}
                  onChange={(d) => onColorChange(d, i)}
                />
              ))}
            </div>
          </Radio.Group>
        </Collapse.Panel>
        <Collapse.Panel header="颜色" key="3">
          <Space direction="vertical" style={{ width: '100%' }}>
            {BUILT_COLOR_ATTRIBUTES.map((d) => (
              <div
                key={d.value}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{d.name}</span>
                <ColorPicker
                  value={seed[d.value]}
                  onChange={(color) => changeSeed(d.value, color)}
                  style={{
                    display: 'block',
                    height: 32,
                    width: 32,
                    borderRadius: 5,
                    border: '1px solid #d9d9d9',
                  }}
                />
              </div>
            ))}
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header="间距" key="4">
          <Space direction="vertical" style={{ width: '100%' }}>
            {BUILT_PADDING_ATTRIBUTES.map((d) => (
              <div
                key={d.value}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{d.name}</span>
                <InputNumber
                  onChange={(value) => changeSeed(d.value, value)}
                  value={seed[d.value]}
                />
              </div>
            ))}
          </Space>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
