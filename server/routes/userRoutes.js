import { signup, login, updateProfile, checkAuth } from "../controllers/userController.js"
import { protectRoute } from "../middleware/auth.js"

import express from "express"
const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.put("/updateProfile", protectRoute, updateProfile)
userRouter.get("/check", protectRoute, checkAuth)

export default userRouter


