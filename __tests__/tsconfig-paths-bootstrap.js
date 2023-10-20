const tsConfigPaths = require("tsconfig-paths");
const baseUrl = "./__tests__";
tsConfigPaths.register({
    baseUrl,
    paths: {
        'd3-*': [
            './stub.js'
        ],
        '@antv/data-set': [
            './stub.js'
        ],
    }
});