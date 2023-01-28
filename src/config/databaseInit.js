const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/cubicles';

async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);

    console.log('Database conected');
}

module.exports = main;