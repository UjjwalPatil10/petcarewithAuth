//Implementing authentication using JWT token

const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const passportJWT = require("passport-jwt")
const JWT = require("jsonwebtoken")
const UserModel = require("./model/UserModel")
const db = require("./db/dbConnect")
db()
const SECRET_KEY = "kjjjjjoefjijfwoj"

app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    exposedHeaders: "x-token"
}))

app.use(passport.initialize())


const jwtStrategy = passportJWT.Strategy

const extractStrategy = passportJWT.ExtractJwt
const userRoutes = require("./routes/userRoutes")
const { CustomAPIError, BadErrorRequest, NotFoundError } = require("./customError")

app.use("/user", userRoutes)
require("dotenv").config()
//middleware is for some extra functionality
app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "x-token")
    next()
})



const port = process.env.PORT || 6000


//configure jwt strategy by passport
// passport.use(new jwtStrategy({
//     jwtFromRequest: extractStrategy.fromAuthHeaderAsBearerToken(),
//     secretOrKey: SECRET_KEY
// }, async (jsonpayload, done) => {

//     try {

//         const user = await UserModel.findById(jsonpayload.sub);

//         if (user) {
//             // If user found, authentication successful
//             return done(null, user);
//         } else {
//             // If user not found, authentication failed
//             return done(null, false);
//         }
//     } catch (error) {
//         console.error('Error during authentication:', error);
//         return done(error, false);
//     }
// }
// ))
//protected route
// app.get("/protected", passport.authenticate("jwt", { session: false }), (req, res) => {
//     res.json({ message: "Protected route accessed successfully" })

// })
// Users not found
app.get("/users/*", (req, res, next) => {
    // const err = new CustomAPIError("Users not found", statusCode)
    next(new CustomAPIError("Users not found", 400))


})

// apply the middleware
const errorHandler = ((err, req, res, next) => {
    return res.status(err.statusCode || 500).send({ message: err.message, statusCode: err.statusCode || 500 })

})
app.use(errorHandler)


// BadErrorRequest
app.post("/users/", async (req, res, next) => {


    try {
        const { email, password, username } = req.body

        if (!email || !password || !username) {
            // Fix: Use status code 400 for Bad Request
            // throw new BadErrorRequest("Missing required fields", statusCode);
            return next(new BadErrorRequest("Missing required fields", 400))
        }
        const newUser = new UserModel({ email, password, username });
        await newUser.save();
        return res.status(200).send({ message: "User created successfully", User: newUser });
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
});
// handle the middleware
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).send({
        error: {
            message: err.message,
            statusCode: err.statusCode || 500,
        },
    });
});

// Not Found Error
app.get("/users/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);  // Use userId directly

        if (!user) {
            throw new NotFoundError("User Not Found", 404);
        }

        res.status(200).send({ message: "User found successfully", user });
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).send({
        message: err.message,
        statusCode: err.status || 500
    })
})





app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})





// Bad error request(missing required fields)
