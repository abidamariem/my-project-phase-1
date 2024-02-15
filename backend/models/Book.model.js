const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
 title: { type: String, required: true },
 author : {type: String, required: true},
 description :  { type: String, required: true },
 genre : {
  type: mongoose.Types.ObjectId,
    ref: "Genre"
},
 rating : {
    nbUser : {type : Number},
    totalRating : {type : Number},
    averageRate : {type : Number}
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
}, 
userName : {type : String}
}, { timestamps: true })

module.exports = mongoose.model('Book', BookSchema);