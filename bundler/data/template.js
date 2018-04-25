module.exports = blocks => `
const G2 = require('./core');
${blocks}
module.exports = G2;
`;
