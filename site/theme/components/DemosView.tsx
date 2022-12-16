import * as React from 'react';
import { Badge } from 'antd';
import { Chart } from '@antv/g2';
import { examples } from '../examples';
import './DemosView.less';

const DemoContainer = ({ theme, className = '', render }) => {
  const domRef = React.useRef<HTMLDivElement | null>(null);
  const chartRef = React.useRef<Chart | null>(null);

  function init(theme) {
    chartRef.current = render(domRef.current, theme);
  }

  React.useEffect(() => {
    if (!chartRef.current) {
      init(theme);
    } else {
      const chart = chartRef.current;
      chart.theme({ type: theme });
      chart.render();
    }
  }, [theme]);

  React.useLayoutEffect(() => {
    const el = domRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        const chart = chartRef.current;
        chart && chart.forceFit();
      });
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  return <div ref={domRef} className={className} />;
};

export const DemosView = ({ theme, className = '' }) => {
  function openExample(key, example) {
    const hash = `${example.name}`.replace(
      /[A-Z]/g,
      (a) => `-${a.toLowerCase()}`,
    );
    // @ts-ignore
    window.open(`/examples/${key}#${hash}`);
  }

  return (
    <div className={`demos-view ${className} theme-${theme}`}>
      {Object.keys(examples as any).map((key) =>
        Array.from(examples[key]).map((example: any) => {
          if (typeof example.render !== 'function') return;

          return (
            <Badge.Ribbon
              text={
                <span onClick={() => openExample(key, example.render)}>
                  source
                </span>
              }
            >
              <div className="demo">
                <div className="demo-title">{example.title}</div>
                <DemoContainer
                  className="demo-container"
                  theme={theme}
                  render={example.render}
                />
              </div>
            </Badge.Ribbon>
          );
        }),
      )}
    </div>
  );
};
