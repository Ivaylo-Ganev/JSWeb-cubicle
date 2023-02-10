const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-z0-9]+$/.test(value)
            },
            message: 'Username should consists only of Latin letters and digits'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password too short'],
        validate: [/^[a-zA-z0-9]+$/, 'Invalid password']
    }
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;