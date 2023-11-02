const { createServer } = require('vite');

module.exports = async function (globalConfig, projectConfig) {
  // @see https://vitejs.dev/guide/api-javascript.html#createserver
  const server = await createServer({
    configFile: './vite.config.js',
    server: {
      port: 9090,
      open: false,
    },
  });
  await server.listen();

  server.printUrls();
  globalThis.VITE_SERVER = server;
};
