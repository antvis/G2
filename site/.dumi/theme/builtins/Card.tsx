// Card.tsx
import React, { type FC, useState, useRef, useEffect } from 'react';
import { Card as AntdCard, Tooltip } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Meta } = AntdCard;

interface CardProps {
  title: string;
  description: string;
  href: string;
  cover?: string;
  width?: string | number;
  height?: string | number;
}

const Card: FC<CardProps> = ({
  title,
  description,
  href,
  cover,
  width = '50%',
  height,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // 智能适配高度：有cover时300px，无cover时150px
  const adaptiveHeight = height || (cover ? '300px' : '150px');

  // 检测文本是否被截断
  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current) {
        const element = descriptionRef.current;
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setIsTextTruncated(isOverflowing);
      }
    };

    checkTruncation();
    // 监听窗口大小变化
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [description]);

  const ctaStyles = {
    fontSize: 14,
    fontWeight: 500,
    color: isHovered ? '#722ed1' : '#1890ff',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 'auto',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
  };

  // 生成唯一的CSS类名
  const cardId = `card-${Math.random().toString(36).substr(2, 9)}`;

  // 动态生成CSS样式
  const dynamicStyles = `
    .${cardId} {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .${cardId}:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(114, 46, 209, 0.15), 0 8px 16px rgba(114, 46, 209, 0.1);
    }

    .${cardId}:hover .ant-card-head-title {
      color: #722ed1 !important;
      transform: translateX(4px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .${cardId}:hover .ant-card-cover img {
      transform: scale(1.05);
      filter: brightness(1.05) contrast(1.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .${cardId}:hover .card-meta-description {
      color: #595959;
      transition: all 0.3s ease;
    }

    .${cardId} .ant-card-head-title {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 600;
    }

    .${cardId} .ant-card-cover img {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .${cardId} .card-meta-description {
      transition: all 0.3s ease;
      color: #8c8c8c;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
      max-height: 4.5em; /* 3行的高度 */
    }
  `;

  // 创建描述组件
  const DescriptionComponent = () => (
    <div
      ref={descriptionRef}
      className="card-meta-description"
      style={{
        marginTop: '10px',
      }}
      onMouseEnter={(e) => {
        // 阻止事件冒泡，避免触发卡片的hover
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        // 阻止点击事件冒泡，避免触发卡片的跳转
        e.stopPropagation();
      }}
    >
      {description}
    </div>
  );

  return (
    <>
      <style>{dynamicStyles}</style>
      <AntdCard
        title={title}
        hoverable={true}
        className={cardId}
        onClick={() => window.open(href, '_blank')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: width,
          height: adaptiveHeight,
          cursor: 'pointer',
          display: 'inline-flex',
          flexDirection: 'column',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #f0f0f0',
          marginBottom: '10px',
          marginTop: '10px',
          marginRight: '20px',
          verticalAlign: 'top',
        }}
        bodyStyle={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        cover={
          cover ? (
            <div
              style={{
                height: '120px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px 8px 0 0',
                position: 'relative',
              }}
            >
              <img
                alt="example"
                src={cover}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '8px 8px 0 0',
                }}
              />
              {/* 渐变叠加层 */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(114, 46, 209, 0.08), rgba(24, 144, 255, 0.06))'
                    : 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ) : undefined
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          {isTextTruncated ? (
            <Tooltip
              title={description}
              placement="topLeft"
              overlayStyle={{
                maxWidth: '400px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                zIndex: 1050, // 确保tooltip在最上层
              }}
              mouseEnterDelay={0.3} // 延迟显示，避免误触
              mouseLeaveDelay={0.1}
              trigger="hover"
              destroyTooltipOnHide={false}
            >
              <div style={{ cursor: 'help' }}>
                <DescriptionComponent />
              </div>
            </Tooltip>
          ) : (
            <DescriptionComponent />
          )}
        </div>
      </AntdCard>
    </>
  );
};

export default Card;
