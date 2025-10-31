import { transform } from 'topojson-client';
import { Chart } from '../src';

const chart = new Chart({ container: 'container', autoFit: true });

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
        inset: 0.5,
        radius: 2,
      },
      legend: false,
      scale: {
        color: {
          range: [
            'rgb(236, 160, 57)',
            'rgb(196, 68, 57)',
            'rgb(211, 180, 60)',
            'rgb(230, 67, 63)',
          ],
        },
      },
      tooltip: {
        title: 'name',
        items: [
          (d) => {
            return {
              name: '执行时间',
              value: d.value + 'ms',
            };
          },
          (d) => ({
            name: '占比',
            value: ((d.value / 1000) * 100).toFixed(1) + '%',
          }),
        ],
      },
      state: {
        // active: { fillOpacity: 0.8 },
      },
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
