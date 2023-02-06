const config = {
    production: {
        PORT: 2222,
        SECRET: 'SOMEPRODSECRET'
    },
    development: {
        PORT: 5000,
        SECRET: 'SOMEDEVSECRET'
    }
}

module.exports = config[process.env.node_env || 'development']