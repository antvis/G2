module.exports = async function (globalConfig, projectConfig) {
  const command = globalThis.VITE_COMMAND;
  command.kill();
};