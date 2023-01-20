const express = require('express');
const config = require('./config');
const port = config.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello')
});

app.listen(port, () => console.log(`Server is working at port ${port}...`));