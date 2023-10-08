import * as React from 'react';
import { Badge } from 'antd';
import { Chart } from '@antv/g2';
import { examples } from '../examples';
import './DemosView.less';

const DemoContainer = ({ theme, className = '', render, tokens = {} }) => {
  const domRef = React.useRef<HTMLDivElement | null>(null);
  const chartRef = React.useRef<Chart | null>(null);

  function init(theme) {
    const container = domRef.current;
    chartRef.current = render({
      container,
      theme,
      width: container.clientWidth,
      height: container.clientHeight,
      tokens,
    });
  }

  React.useEffect(() => {
    if (!chartRef.current) {
      init(theme);
    } else {
      const chart = chartRef.current;
      chart.destroy();
      init(theme);
    }
  }, [theme, tokens]);

  React.useLayoutEffect(() => {
    const el = domRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      entries.forEach(() => {
        const chart = chartRef.current;
        chart && chart.changeSize(width, height);
      });
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  return <div ref={domRef} className={className} />;
};

export const DemosView = ({ theme, tokens, className = '' }) => {
  function openExample(example) {
    // @ts-ignore
    window.open(`/examples/${example.link}`);
  }

  return (
    <div className={`demos-view ${className} theme-${theme}`}>
      {examples.map((example) => (
        <Badge.Ribbon
          text={<span onClick={() => openExample(example)}>source</span>}
        >
          <div className="demo">
            <div className="demo-title">{example.title}</div>
            <DemoContainer
              key={example.link}
              className="demo-container"
              theme={theme}
              render={example.render}
              tokens={tokens}
            />
          </div>
        </Badge.Ribbon>
      ))}
    </div>
  );
};
