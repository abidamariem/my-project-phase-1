const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection")
const port = process.env.PORT || 5000;
const User = require('./models/User.model')

// Routes Import
const userRoute = require("./routes/user.route")
const profilRoute = require("./routes/profil.route")
const bookRoute = require('./routes/book.route')
const genreRoute = require('./routes/genre.route')

const cookieParser = require('cookie-parser')
const cors = require("cors")

// var bodyParser = require('body-parser')

dbConnection();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// cokie parser middleware 
app.use(cookieParser())

// cors
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

// user Routes
app.use("/api/user",userRoute)
// profil Routes
app.use("/api/profil", profilRoute)
// books Routes
app.use("/api/book", bookRoute)
// genres Routes
app.use("/api/genre", genreRoute)



//Runing the Server to listen for request
app.listen(port, () => console.log(`Server runing on port: ${port}`))


