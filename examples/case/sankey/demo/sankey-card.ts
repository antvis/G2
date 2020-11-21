
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import inserCss from 'insert-css';

// ============= DOM 结构和样式
const $container = document.getElementById('container');

$container.innerHTML = `
<div id="app-container">
  <div class="indicators">
    <div class="indicator">
      <div class="title">访问 UV</div>
      <div class="measure">
        <div class="value">2.211</div>
        <div class="unit">亿</div>
      </div>
      <div class="compare">
        <div class="name">日环比</div>
        <div class="icon up"></div>
        <div class="value up">8.9%</div>
      </div>
    </div>
    <div class="indicator">
      <div class="title">点击 UV</div>
      <div class="measure">
        <div class="value">15.2</div>
        <div class="unit">%</div>
      </div>
      <div class="compare">
        <div class="name">日环比</div>
        <div class="icon up"></div>
        <div class="value up">2.3%</div>
      </div>
    </div>
    <div class="indicator">
      <div class="title">UV 点击率</div>
      <div class="measure">
        <div class="value">875</div>
        <div class="unit">%</div>
      </div>
      <div class="compare">
        <div class="name">日环比</div>
        <div class="icon down"></div>
        <div class="value down">1.83%</div>
      </div>
    </div>
	</div>
	<div id="g2-container"></div>
</div>
`;

inserCss(`
#app-container .indicators {
  font-family: PingFangSC-Regular;
  display: flex;
}
#app-container .indicators .indicator {
  padding: 16px;
}
#app-container .indicators .indicator .title {
  font-size: 12px;
  color: #000000;
  opacity: 0.65;
}
#app-container .indicators .indicator .measure {
  margin-top: 4px;
  display: flex;
  align-items: baseline;
}
#app-container .indicators .indicator .measure .value {
  margin-right: 12px;
  opacity: 0.85;
  font-family: Helvetica;
  font-size: 24px;
  color: #000000;
}
.indicators .indicator .measure .unit {
  font-size: 12px;
  color: #333;
  opacity: 0.65;
}
#app-container .indicators .indicator .compare {
  display: flex;
  align-items: baseline;
}
#app-container .indicators .indicator .compare .name {
  color: #666;
  margin-right: 4px;
}
#app-container .indicators .indicator .compare .icon {
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-bottom: 9px solid #000;
  margin-right: 4px;
}
#app-container .indicators .indicator .compare .icon.up {
  transform: rotate(0deg);
  color: #f5684a;
  border-bottom-color: #f5684a;
}
#app-container .indicators .indicator .compare .icon.down {
  transform: rotate(180deg);
  color: #28a995;
  border-bottom-color: #28a995;
}
#app-container .indicators .indicator .compare .value.up {
  color: #f5684a;
}
#app-container .indicators .indicator .compare .value.down {
  color: #28a995;
}
`);

// ============= 数据准备
const DATA = {
  nodes: [
    {
      name: '首次打开',
    },
    {
      name: '结果页',
    },
    {
      name: '验证页',
    },
    {
      name: '我的',
    },
    {
      name: '朋友',
    },
    {
      name: '其他来源',
    },
    {
      name: '首页 UV',
    },
    {
      name: '我的',
    },
    {
      name: '扫一扫',
    },
    {
      name: '服务',
    },
    {
      name: '蚂蚁森林',
    },
    {
      name: '跳失',
    },
    {
      name: '借呗',
    },
    {
      name: '花呗',
    },
    {
      name: '其他流向',
    },
  ],
  links: [
    {
      source: 0,
      target: 6,
      value: 160,
    },
    {
      source: 1,
      target: 6,
      value: 40,
    },
    {
      source: 2,
      target: 6,
      value: 10,
    },
    {
      source: 3,
      target: 6,
      value: 10,
    },
    {
      source: 4,
      target: 6,
      value: 8,
    },
    {
      source: 5,
      target: 6,
      value: 27,
    },
    {
      source: 6,
      target: 7,
      value: 30,
    },
    {
      source: 6,
      target: 8,
      value: 40,
    },
    {
      source: 6,
      target: 9,
      value: 35,
    },
    {
      source: 6,
      target: 10,
      value: 25,
    },
    {
      source: 6,
      target: 11,
      value: 10,
    },
    {
      source: 6,
      target: 12,
      value: 30,
    },
    {
      source: 6,
      target: 13,
      value: 40,
    },
    {
      source: 6,
      target: 14,
      value: 45,
    },
  ],
};

// arc diagram layout
const ds = new DataSet();
const dv = ds.createView().source(DATA, {
  type: 'graph',
  edges: (d) => d.links,
});
dv.transform({
  type: 'diagram.sankey',
  nodeWidth: 0.008,
  nodePadding: 0.03,
  sort: (a, b) => {
    if (a.value > b.value) {
      return 0;
    } else if (a.value < b.value) {
      return -1;
    }
    return 0;
  },
});

const edges = dv.edges.map((edge) => {
  return {
    source: edge.source.name,
    target: edge.target.name,
    name: edge.source.name === '首页 UV' ? edge.target.name : edge.source.name,
    x: edge.x,
    y: edge.y,
    value: edge.value,
  };
});

const nodes = dv.nodes.map((node) => {
  return {
    x: node.x,
    y: node.y,
    name: node.name,
  };
});

// ============= 绘图
const chart = new Chart({
  container: 'g2-container',
  autoFit: true,
  height: 500,
  appendPadding: 16,
  syncViewPadding: true,
});

chart.legend(false);

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart.axis(false);

chart.scale({
  x: { sync: true, nice: true },
  y: { sync: true, nice: true },
  source: { sync: 'color' },
  name: { sync: 'color' },
});

// node view
const nodeView = chart.createView();
nodeView.data(nodes);
nodeView
  .polygon()
  .position('x*y') // nodes数据的x、y由layout方法计算得出
  .color('name')
  .label('x*name', (x, name) => {
    const isLast = x[1] === 1;
    return {
      style: {
        fill: '#545454',
        textAlign: isLast ? 'end' : 'start',
      },
      offsetX: isLast ? -8 : 8,
      content: name,
    };
  })
  .tooltip(false)
  .style('name', (name) => {
    if (name === '跳失') {
      return {
        fill: '#FF6010',
        stroke: '#FF6010',
      };
    }
    if (name === '首页 UV') {
      return {
        fill: '#5D7092',
        stroke: '#5D7092',
      };
    }
    return {};
	});

// edge view
const edgeView = chart.createView();
edgeView.data(edges);

console.log(edges);
edgeView
  .edge()
  .position('x*y')
  .shape('arc')
  .color('name')
  .tooltip('target*source*value', (target, source, value) => {
    return {
      name: source + ' to ' + target,
      value,
    };
  })
	.style('source*target', (source, target) => {
    if (source.includes('其他') || target.includes('其他')) {
      return {
        lineWidth: 0,
        opacity: 0.4,
        fill: '#CCC',
        stroke: '#CCC',
      };
    }

    if (target === '跳失') {
      return {
        lineWidth: 0,
        opacity: 0.4,
        fill: 'l(0) 0:#FFBB9E 0.2:#FFC8B4 1:#FFFCF2',
        stroke: 'l(0) 0:#FFBB9E 0.2:#FFC8B4 1:#FFFCF2',
      };
    }

    return {
      opacity: 0.2,
      lineWidth: 0,
    };
	})
  .state({
    active: {
      style: {
        opacity: 0.8,
        lineWidth: 0,
      },
    },
  });

chart.interaction('element-active');

chart.render();
