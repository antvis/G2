import * as React from 'react';
import { Badge } from 'antd';
import { examples } from '../examples';

const DemoContainer = ({ theme, className = '', render, tokens = {} }) => {
  const domRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = domRef.current!;
    const chart = render({
      container,
      theme,
      width: container.clientWidth,
      height: container.clientHeight,
      tokens,
    });
    const resizeObserver = new ResizeObserver(() => {
      chart.changeSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      chart.destroy();
    };
  }, [theme, tokens, render]);

  return <div ref={domRef} className={className} />;
};

export const DemosView = ({ theme, tokens }) => {
  const locale = location.pathname.split('/')[1];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4 [&>div]:w-full">
      {examples.map((example) => (
        <Badge.Ribbon
          key={example.link}
          className="-top-1 h-3.5 cursor-pointer text-[10px] leading-3"
          text={
            <a
              href={`/${locale}/examples/${example.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit! no-underline!"
            >
              source
            </a>
          }
        >
          <div
            className={`w-full px-3 pt-[18px] ${
              theme === 'academy' ? 'pb-3' : 'pb-[18px]'
            } ${theme === 'dark' ? 'bg-[#141414]' : 'bg-white'}`}
          >
            <div
              className={`ml-3 text-base font-medium tracking-[-0.2px] opacity-85 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {example.title}
            </div>
            <DemoContainer
              className="relative mt-3.5 h-0 w-full pt-[75%] [&>canvas]:absolute [&>canvas]:top-0 [&>canvas]:left-0"
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
