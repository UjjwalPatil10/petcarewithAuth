const UserModel = require("../model/UserModel");
const express = require("express")
const app = express()
const JWT = require("jsonwebtoken");
const { createToken } = require("../token");
// require("dotenv").config()
const bcrypt = require("bcryptjs")


//create user
const createRegisterUser = async (req, res) => {


    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).send({ message: "Please provide all fields" });
        }
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }
        //hash password
        const hashPassword = await bcrypt.hash(password, 10)
        //save user
        const user = new UserModel({ username, password: hashPassword, email });
        await user.save();
        return res.status(200).send({ message: "User created successfully", users: user });
    } catch (error) {
        return res.status(500).send({ message: "Error creating user", error });
    }
}
//login user
const loginUser = async (req, res) => {

    try {
        const { password, email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "email is not registered" });
        }
        //password match
        const isMatch = await bcrypt.compare(password, user?.password)
        //create token

        if (isMatch) {
            const token = createToken({ id: user?._id, email: user?.email })


            // add token in res
            // res.header("x-token", token)
            res.set("x-token", token);
            // send response
            res.status(200).send({ message: "Login succsssfully", data: user })


        } else {
            return res.status(400).send({ message: "Invalid user name or password" })


        }


        // User is authenticated, create a JWT token
        //     const payload = { id: user._id, username: user.username };
        //     const token = JWT.sign(payload, SECRET_KEY);


        //     res.json({ token: token });

        //     // add token in response 
        //     res.set("Header", token)
        //     //send response
        //     res.status(200).send({ message: "Login succsssful", data: user })
        // } catch (error) {
        //     console.error("Error during login:", error);
        //     res.status(500).json({ message: "Error during login", error });
        // }
    } catch (err) {
        console.log(err)
    }
}

//verify token
// const verifyToken = (token, req, res) => {
//     try {
//         return JWT.verify(token, SECRET_KEY, (err, authData) => {
//             if (err) {
//                 res.send({ message: "Invalid token" })
//             } else {
//                 res.send({ message: "Profile accessed", authData })
//             }
//         })
//     }
//     catch (err) {
//         console.log(err);
//     }
//     return null
// }

//profile accessed
//update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;

        // Check if username, password, and email are provided
        if (!username || !password || !email) {
            return res.status(400).send({ message: "Please provide all fields" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            id, //filter base on id
            { username, password, email },// req body
            { new: true } // Return the updated user
        );

        if (updatedUser) {
            return res.status(200).send({ message: "User updated successfully", user: updatedUser });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error updating user", error });
    }
}
// get All users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({})
        return res.status(200).send({ userCount: users.length, message: "Users get successfully", users })

    } catch (error) {
        return res.status(500).send({ message: "Error getting users" })

    }
}
//get user by id 

//delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findOneAndDelete(id);

        if (user) {
            return res.status(200).send({ message: "User deleted successfully", user });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error deleting user", error });
    }
}




module.exports = { createRegisterUser, loginUser, updateUser, getAllUsers, deleteUser }






