const express = require('express');
const routes = require('./routes');
const databaseInit = require('./config/databaseInit');

const setupViewEngine = require('./config/viewEngine');
const config = require('./config');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

databaseInit()
    .then(()=> app.listen(config.PORT, () => console.log(`Server is working at port ${config.PORT}...`)))
    .catch((err)=> console.error(err.message));
