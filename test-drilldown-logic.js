// 测试下钻逻辑的核心功能
import { DrillDown } from './lib/interaction/drillDown.js';

// 模拟浏览器环境
const mockContainer = {
  ownerDocument: {
    createElement: (tagName) => ({
      appendChild: () => {},
      removeChildren: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      getBBox: () => ({ width: 100, height: 20 }),
      attr: () => {},
      style: {},
      attributes: {}
    })
  }
};

const mockPlotArea = {
  querySelectorAll: () => [],
  appendChild: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  getBBox: () => ({ width: 800 })
};

const mockView = {
  scale: {
    color: {
      getOptions: () => ({ domain: [] })
    }
  }
};

const mockContext = {
  update: async () => { console.log('Update called'); },
  setState: (name, callback) => {
    console.log(`SetState called: ${name}`);
    const result = callback({ marks: [] });
    console.log('State update result:', result);
  },
  container: mockContainer,
  view: mockView,
  options: {
    marks: [{
      id: 'hierarchy',
      state: {
        active: { fillOpacity: 0.8 },
        inactive: { fillOpacity: 0.4 }
      }
    }]
  }
};

console.log('开始测试 DrillDown 交互功能...');

try {
  // 创建下钻交互实例
  const drillDown = DrillDown({
    breadCrumb: {
      rootText: '全部层级',
      style: {
        fill: '#333',
        fontSize: 14,
        y: 20
      }
    }
  });

  console.log('DrillDown 交互创建成功');

  // 执行交互函数
  const cleanup = drillDown(mockContext);

  console.log('交互初始化完成');
  console.log('清理函数:', typeof cleanup);

  // 测试清理函数
  if (cleanup && typeof cleanup === 'function') {
    cleanup();
    console.log('清理函数执行成功');
  }

  console.log('✅ DrillDown 交互测试通过');

} catch (error) {
  console.error('❌ DrillDown 交互测试失败:', error);
  console.error(error.stack);
}