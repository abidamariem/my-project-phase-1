const User = require('../models/User.model')
const jwt = require("jsonwebtoken") 
const { hashPassword, comparePassword } = require("../helpers/hashPassword")



// GET :  RETURN ALL USERS 

const users = async(req,res)=> {
    try {
        const allUser=await User.find()
        res.status(200).json(allUser)
    } 
    
    catch (error) {
        console.log(error.message)
    }
}


const register = async (req, res) => {
    const userInfo = req.body
    try {
        const user = await User.findOne({ email: userInfo.email })
        if (user) {
            res.status(400).json({
                message: " Existe déja un compte avec cet email"
            })
        
        } else {
        const hashed = await hashPassword(userInfo.password)
        userInfo.password = hashed
        const user = new User(userInfo)
        const data = await user.save()
        res.status(200).json({
            message: " User created",
            data
        })
    }
    } catch (error) {
        console.log(error.message)
    }
}
// authentification -- user

const login = async (req, res) => {

    const { email, password } = req.body
    let passwordValidation
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(400).json("Email invalid !")
        } else {

            passwordValidation = await comparePassword(password, user.password)
        }
        if (!passwordValidation) {
            res.status(400).json("Email or password invalid!")
        } 
        else {
            const { _id, name } = user
            const token = jwt.sign({ _id, name }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.status(200).cookie("authToken", token, { maxAge: 60000 * 60, httpOnly: true }).json({ message: "successfuly login" })
        
        }

    } catch (error) {
        console.log(error.message)
    }
}

const me = async (req, res) => {
    if (req.cookies.authToken) {
        try {
            const decoded = jwt.verify(req.cookies.authToken, process.env.SECRET_KEY)
            res.status(200).json({
                name: decoded.name,
                state : "Connecté",
                isLoggedIn: true
            })
        } catch (error) {
            console.log(error.message)
            res.status(403).json({
                message: "not authorized",
                name: "",
                isLoggedIn: false
            })

        }

    } else
        if (!req.cookies.authToken) {
            res.status(403).json({
                message: "not authorized!",
                name: "",
                isLoggedIn: false
            })
        }
}

const logout = (req, res) => {
    const authToken = req.cookies.authToken
    if (authToken) {
        res.clearCookie("authToken").json({ message: "Logged out" })
    } else {
        res.json({ message: "no token" })
    }
}

module.exports = { register, login, users, me, logout }