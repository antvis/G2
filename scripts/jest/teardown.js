module.exports = async function (globalConfig, projectConfig) {
  const server = globalThis.VITE_SERVER;
  await server.close();
};
