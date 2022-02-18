const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  login: {type: String, unique: true},
  password: {type: String}
});

export default model('User', UserSchema)
