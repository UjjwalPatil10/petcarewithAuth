const express = require("express")
const app = express()
app.use(express.json())
const users = [
    {
        id: 1,
        name: "abc",
        city: "dhule"
    },
    {
        id: 2,
        name: "abcd",
        city: "pune"
    },
    {
        id: 3,
        name: "njkhjj",
        city: "seatle"
    },
]

app.get("/", (req, res) => {
    res.send("Hello from server")

})

app.get("/users", (req, res) => {
    res.status(200).send(users)

})

app.get("/users/:id", (req, res) => {
    const { id } = req.params
    const user = users.find((u) => u.id == id)
    if (user) {
        return res.send(user)
    } else {
        return res.status(400).send("iNVALID USER")
    }

})





app.listen(4000, () => {
    console.log("server is running on port 4000");
})