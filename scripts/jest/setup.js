const { exec } = require('child_process');

module.exports = async function (globalConfig, projectConfig) {
  const command = exec("npm run dev");
  globalThis.VITE_COMMAND = command;
};