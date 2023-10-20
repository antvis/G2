const tsConfigPaths = require("tsconfig-paths");
const baseUrl = "./scripts";
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