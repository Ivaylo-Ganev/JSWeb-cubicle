const express = require('express');
const routes = require('./routes');

const setupViewEngine = require('./config/viewEngine');
const config = require('./config');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(routes);


app.listen(config.PORT, () => console.log(`Server is working at port ${config.PORT}...`));