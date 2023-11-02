const { createRegisterUser, loginUser, getAllUsers, updateUser, deleteUser, customApiError, verifyToken } = require("../controllers/UserController")

const router = require("express").Router()


router.post("/register", createRegisterUser)
router.post("/login", loginUser)
router.get("/getAllUsers", getAllUsers)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)



module.exports = router