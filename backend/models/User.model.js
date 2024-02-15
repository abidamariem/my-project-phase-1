const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 name: { type: String, required: true },
 email:{ type: String, required: true ,unique: true},
 password: { type: String, required: true , min: 8},
 phone: { type: String },
 Adress :  {
    street: { type: String },
    city: { type: String },
    state: { type: String},
    zip: { type: String }
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
}
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);