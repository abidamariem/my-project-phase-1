const mongoose = require("mongoose")

const userProfilSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    imageURL: {
        type: String,

    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const userProfil = mongoose.model("UserProfil", userProfilSchema)

module.exports = userProfil