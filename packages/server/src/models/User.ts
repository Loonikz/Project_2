const {Schema, model} = require('mongoose')

interface user {
  login: string,
  password: string
}

const UserSchema = new Schema({
  login: {type: String, unique: true},
  password: {type: String}
});

module.exports.User = model('User', UserSchema)
