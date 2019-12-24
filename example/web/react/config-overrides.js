module.exports = function override(config, env) {

    // these are modules require by node, not need by web
    let externals = {
        os: 'os',
        worker_threads: 'worker_threads',
        https: 'https',
        http: 'http',
        fs: 'fs',
        path: 'path',
    };
    if(!config.externals){
        config.externals = {};
    }
    for(let field in externals){
        config.externals[field] = externals[field];
    }
    // config.node = false; // completely turn off webpack injection

    return config;
}
