import {
  Button,
  Collapse,
  ConfigProvider,
  Segmented,
  Radio,
  Space,
  Divider,
  InputNumber,
} from 'antd';
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

const Operations = ({ tokens, isZh }) => {
  return (
    <div className="mb-2 flex min-h-8 items-center justify-between gap-3 border-0 border-b border-solid border-[var(--border-soft)] pb-4">
      <div className="whitespace-nowrap text-sm font-semibold text-[var(--text-strong)]">
        {isZh ? '主题配置' : 'Theme'}
      </div>
      <div className="flex gap-2">
        <Button
          size="small"
          icon={<UploadOutlined />}
          type="primary"
          onClick={() =>
            exportDataToLocal(JSON.stringify(tokens), 'g2-theme.json')
          }
        >
          {isZh ? '导出' : 'Export'}
        </Button>
        <Button
          size="small"
          type="text"
          icon={<CopyOutlined />}
          onClick={() => copyToClipboard(JSON.stringify(tokens))}
        >
          {isZh ? '复制' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};

export const ConfigPanel = (props) => {
  const { theme, changeTheme, tokens, changeTokens, changeSeed, seed, isZh } =
    props;
  const { category10 } = tokens;
  const encodePalette = (d) => d.join('-');

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#691eff',
          colorText: '#383a42',
          borderRadius: 6,
          fontFamily: 'var(--font-sans)',
        },
        components: {
          Collapse: {
            headerBg: 'transparent',
            contentBg: 'transparent',
            headerPadding: '14px 0',
            contentPadding: '0 0 18px',
          },
          Segmented: { trackBg: '#f7f8fa', itemSelectedBg: '#fff' },
        },
      }}
    >
      <div className="px-5 py-5">
        <Operations tokens={tokens} isZh={isZh} />
        <Collapse
          ghost
          expandIconPosition="end"
          collapsible="header"
          defaultActiveKey={['1']}
          className="[&_.ant-collapse-item]:rounded-none [&_.ant-collapse-item]:border-0 [&_.ant-collapse-item]:border-b [&_.ant-collapse-item]:border-solid [&_.ant-collapse-item]:border-[var(--border-soft)] [&_.ant-collapse-header-text]:font-medium"
        >
          <Collapse.Panel header={isZh ? '风格' : 'Style'} key="1">
            <Segmented
              block
              aria-label={isZh ? '主题风格' : 'Theme style'}
              value={theme}
              onChange={changeTheme}
              options={BUILT_THEMES.map((d) => ({
                value: d.key,
                label: isZh ? d.label : d.labelEn,
              }))}
            />
          </Collapse.Panel>
          <Collapse.Panel header={isZh ? '色板' : 'Palette'} key="2">
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
                {isZh ? '自定义' : 'Custom'}
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
          <Collapse.Panel header={isZh ? '颜色' : 'Colors'} key="3">
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
                  <span>{isZh ? d.name : d.nameEn}</span>
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
          <Collapse.Panel header={isZh ? '间距' : 'Spacing'} key="4">
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
                  <span>{isZh ? d.name : d.nameEn}</span>
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
    </ConfigProvider>
  );
};
