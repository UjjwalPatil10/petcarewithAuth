const mongoose = require("mongoose")

require("dotenv").config()
const Url = process.env.DB_URL
async function dbConnect() {
    mongoose.connect(Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB successfully");

    })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = dbConnect