import { Chart } from '../src';

const chart = new Chart({ container: 'container', autoFit: true });

const getColor = (value) => {
  if (value > 200) return '#ff4d4f'; // Red - performance hotspot
  if (value > 60) return '#ffa940'; // Orange - high consumption
  if (value > 40) return '#fadb14'; // Yellow - medium consumption
  else return '#73d13d'; // Green - low consumption
};

const performanceData = [
  {
    name: 'main',
    value: 1000,
    children: [
      {
        name: 'render',
        value: 650,
        children: [
          {
            name: 'ReactDOM.render',
            value: 150,
            children: [
              {
                name: 'createRoot',
                value: 50,
                children: [],
              },
              {
                name: 'hydrate',
                value: 100,
                children: [],
              },
            ],
          },
          {
            name: 'App Component',
            value: 350,
            children: [
              {
                name: 'Header',
                value: 120,
                children: [
                  {
                    name: 'Navigation',
                    value: 45,
                    children: [
                      {
                        name: 'Menu Items',
                        value: 20,
                        children: [],
                      },
                      {
                        name: 'Search Box',
                        value: 15,
                        children: [],
                      },
                    ],
                  },
                  {
                    name: 'Logo',
                    value: 30,
                    children: [],
                  },
                  {
                    name: 'User Profile',
                    value: 45,
                    children: [],
                  },
                ],
              },
              {
                name: 'Main Content',
                value: 180,
                children: [
                  {
                    name: 'Article List',
                    value: 100,
                    children: [
                      {
                        name: 'Article Item 1',
                        value: 35,
                        children: [
                          {
                            name: 'Title',
                            value: 5,
                            children: [],
                          },
                          {
                            name: 'Content',
                            value: 25,
                            children: [],
                          },
                        ],
                      },
                      {
                        name: 'Article Item 2',
                        value: 30,
                        children: [],
                      },
                      {
                        name: 'Article Item 3',
                        value: 35,
                        children: [],
                      },
                    ],
                  },
                  {
                    name: 'Sidebar',
                    value: 60,
                    children: [
                      {
                        name: 'Related Posts',
                        value: 35,
                        children: [],
                      },
                      {
                        name: 'Advertisement',
                        value: 25,
                        children: [],
                      },
                    ],
                  },
                  {
                    name: 'Pagination',
                    value: 20,
                    children: [],
                  },
                ],
              },
              {
                name: 'Footer',
                value: 50,
                children: [],
              },
            ],
          },
          {
            name: 'ErrorBoundary',
            value: 50,
            children: [],
          },
        ],
      },
      {
        name: 'data fetching',
        value: 200,
        children: [
          {
            name: 'GraphQL Query',
            value: 120,
            children: [
              {
                name: 'postsQuery',
                value: 70,
                children: [
                  {
                    name: 'parseQuery',
                    value: 20,
                    children: [],
                  },
                  {
                    name: 'executeQuery',
                    value: 50,
                    children: [],
                  },
                ],
              },
              {
                name: 'userQuery',
                value: 50,
                children: [],
              },
            ],
          },
          {
            name: 'REST API',
            value: 80,
            children: [
              {
                name: 'fetchUserProfile',
                value: 45,
                children: [],
              },
              {
                name: 'fetchComments',
                value: 35,
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'state management',
        value: 100,
        children: [
          {
            name: 'Redux Store',
            value: 60,
            children: [
              {
                name: 'postsReducer',
                value: 30,
                children: [],
              },
              {
                name: 'userReducer',
                value: 30,
                children: [],
              },
            ],
          },
          {
            name: 'Local State',
            value: 40,
            children: [
              {
                name: 'useState hooks',
                value: 25,
                children: [],
              },
              {
                name: 'useEffect hooks',
                value: 15,
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'routing',
        value: 50,
        children: [
          {
            name: 'React Router',
            value: 35,
            children: [
              {
                name: 'Route Matching',
                value: 20,
                children: [],
              },
              {
                name: 'History API',
                value: 15,
                children: [],
              },
            ],
          },
          {
            name: 'URL Parsing',
            value: 15,
            children: [],
          },
        ],
      },
    ],
  },
];

chart.options({
  type: 'view',
  data: performanceData,
  children: [
    {
      type: 'hierarchy',
      encode: {
        value: 'value',
        color: 'name',
      },
      style: {
        fill: (d) => getColor(d.value),
        stroke: '#fff',
        lineWidth: 0.5,
      },
      tooltip: {
        title: 'name',
        items: [
          (d) => {
            let color = getColor(d.value);
            return {
              name: '执行时间',
              value: d.value + 'ms',
              color,
            };
          },
          (d) => ({
            name: '占比',
            value: ((d.value / 1000) * 100).toFixed(1) + '%',
          }),
        ],
      },
      state: {
        active: { stroke: '#000', lineWidth: 2, fillOpacity: 0.8 },
        selected: { stroke: '#ff4d4f', lineWidth: 3, fillOpacity: 1 },
        unselected: { fillOpacity: 0.4 },
      },
      // Use unified drilldown interaction
      interaction: {
        drillDown: {
          breadCrumb: {
            y: 20,
            style: {
              fill: 'rgba(0, 0, 0, 0.7)',
              fontSize: 12,
            },
          },
          showBreadCrumb: true,
        },
      },
    },
  ],
});

// Add event listeners
chart.render().then(() => {
  console.log('Hierarchy chart rendered, testing drilldown interaction...');

  // Listen for select events - drilldown interaction handles automatically
  chart.on('element:select', (e) => {
    console.log('Select event:', e);
    if (e.data) {
      console.log('Current path:', e.data.path);
    }
  });
});
