import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

// Signup new user
export async function signup(req, res) {

    const { fullName, email, password, bio } = req.body

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing details" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: "Account already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            name: fullName, email, password: hashed, bio
        })
        const token = generateToken(newUser._id)
        res.json({ success: true, userData: newUser, token, message: "Account created successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Login user
export async function login(req, res) {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Missing details" })
        }

        const userData = await User.findOne({ email })
        if (!userData) {
            return res.json({ success: false, message: "Account doesn't exists" })
        }

        const check = await bcrypt.compare(password, userData.password)
        if (!check) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = generateToken(userData._id)
        res.json({ success: true, userData, token, message: "Account login successful" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Check user auth
export async function checkAuth(req, res) {
    res.json({ success: true, user: req.user })
}

// Update user profile
export async function updateProfile(req, res) {
    try {
        const { profilePic, bio, name } = req.body
        const userId = req.user._id

        let updatedUser
        if (!profilePic) {
            // profile not updated
            updatedUser = await User.findByIdAndUpdate(userId, { bio, name }, { new: true })
        }
        else {
            // upload to cloudinary
            const updateImg = await cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: updateImg.secure_url, bio, name }, { new: true })
        }

        res.json({ success: true, user: updatedUser })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


