const nodemon = require("nodemon")

const config = {
    production: {
        PORT: 2222
    },
    development: {
        PORT: 5000
    }
}

module.exports = config[process.env.node_env || 'development']