const fs = require('fs').promises;
const { TMP_DIR } = require('./constants');

module.exports = async function (_globalConfig, _projectConfig) {
  const server = globalThis.VITE_SERVER;
  await server.close();

  // clean-up the tmp file
  await fs.rm(TMP_DIR, { recursive: true, force: true });
};
