const Book = require('../models/Book.model')
const Genre = require('../models/Genre.model')
const jwt = require("jsonwebtoken") 




// RETURN ALL GENRE 

const genres = async(req,res)=> {
    try {
        const allGenre=await Genre.find()
        res.status(200).json(allGenre)
    } 
    
    catch (error) {
        console.log(error.message)
    }
}


// CREATE GENRE
const createGenre = async (req, res) => {
    const genreData = req.body
    try {
        const genre = await new Genre(genreData)
        const data = await genre.save()
        res.status(200).json({
            message: "Genre created",
            data,
        })
    } catch (error) {
        console.log(error.message)
    }
}

// UPDATE GENRE
const updateGenre = async (req, res) => {
    const genreData = req.body
    const genreID = req.body._id
    try {
        const data = await Genre.findOneAndUpdate({_id :genreID },genreData,{new:true})
        
        res.status(200).json({
            message: "Genre updated succefully !",
            data,
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { genres, createGenre, updateGenre }