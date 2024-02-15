const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
 name: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Genre', GenreSchema);