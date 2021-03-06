const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
        unique: 'This email already exist',
    },
    name: {
       type: String,
       required: 'Name is required',
    },
    passwordHash: String,
    salt: String,
}, {timestamps: true});

UserSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;

        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password.toString(), this.salt, 1, 128, 'sha1');

        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

UserSchema.methods.checkPassword = function (password) {
    if (!password || !this.passwordHash) {
        return false;
    }

    // TODO: why strict equal do not work?
    return crypto.pbkdf2Sync(password.toString(), this.salt, 1, 128, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('User', UserSchema);

