const os = require('os');
const path = require('path');
const TMP_DIR = path.join(os.tmpdir(), 'jest_global_setup');

module.exports = { TMP_DIR };
