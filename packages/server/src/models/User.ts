const {Schema, model} = require('mongoose')

export type User = {
  id: string,
  login: string,
  password: string
}

const UserSchema = new Schema({
  login: {type: String, unique: true},
  password: {type: String}
});

export default model('User', UserSchema)
