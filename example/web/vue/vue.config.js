module.exports = {
    configureWebpack: {
        // these are modules require by node, not need by web
        externals: {
            os: 'os',
            worker_threads: 'worker_threads',
            https: 'https',
            http: 'http',
            fs: 'fs',
            path: 'path',
        },
        // node: false, // completely turn off webpack injection
    }
};
