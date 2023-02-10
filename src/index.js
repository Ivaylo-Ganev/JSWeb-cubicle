const express = require('express');
const routes = require('./routes');
const databaseInit = require('./config/databaseInit');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const setupViewEngine = require('./config/viewEngine');
const config = require('./config');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(authMiddleware.authentication);
app.use(routes);
app.use(errorHandler);

databaseInit()
    .then(()=> app.listen(config.PORT, () => console.log(`Server is working at port ${config.PORT}...`)))
    .catch((err)=> console.error(err.message));
