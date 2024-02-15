const Book = require('../models/Book.model')
const User = require('../models/User.model')
const jwt = require("jsonwebtoken") 




// GET :  RETURN ALL BOOKS 

const books = async(req,res)=> {
    try {
        const allBook=await Book.find()
        res.status(200).json(allBook)
    } 
    
    catch (error) {
        console.log(error.message)
    }
}

// GET BOOK BY USER 
const bookByUser = async(req,res)=> {
    const { id } = req.user
    try {
        const data=await Book.find({userId : id})
        res.status(200).json(data)
    } 
    
    catch (error) {
        console.log(error.message)
    }
}

// SEARCH BOOK 
const bookSearch = async(req,res)=> {
   
    const search = req.query.q
    console.log(search)
    try {
        const data=await Book.find({$or: [{title :{$regex: search, '$options' : 'i'}}, {author :{$regex: search, '$options' : 'i'}}]})
        res.status(200).json(data)
    } 
    
    catch (error) {
        console.log(error.message)
    }
}

// CREATE BOOK
const createBook = async (req, res) => {
    const bookData = req.body
    const { id } = req.user
    try {
        const user = await User.findById(id)
        const book = await new Book(bookData)
        book.userId = id
        book.userName = user.name
        const data = await book.save()
        res.status(200).json({
            message: "Book created",
            data,
        })
    } catch (error) {
        console.log(error.message)
    }
}

// UPDATE BOOK
const updateBook = async (req, res) => {
    const bookData = req.body
    const bookID = req.body._id
    try {
        const data = await Book.findOneAndUpdate({_id :bookID },bookData,{new:true})
        
        res.status(200).json({
            message: "Book updated succefully !",
            data,
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { books, bookByUser, createBook, updateBook, bookSearch }