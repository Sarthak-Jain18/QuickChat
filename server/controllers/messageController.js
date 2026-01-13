import User from "../models/User.js"
import Message from "../models/Message.js"
import connectCloudinary from "../lib/cloudinary.js"
import { io, userSocketMap } from "../server.js"

// Get users list
export async function getUsersForSidebar(req, res) {
    try {
        const userId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        // Count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length
            }
        })
        await Promise.all(promises)
        res.json({ success: true, users: filteredUsers, unseenMessages })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get messages for selected user
export async function getMessages(req, res) {
    try {
        const { id: selectedUserId } = req.params
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        })
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, { seen: true })
        res.json({ success: true, messages })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to mark "msg as seen"
export async function markMessageAsSeen(req, res) {
    try {
        const { id } = req.params
        await Message.findByIdAndUpdate(id, { seen: true })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Send msg to "selected user"
export async function sendMessage(req, res) {
    try {
        const { text, image } = req.body
        const receiverId = req.params.id
        const senderId = req.user._id
        let imageUrl
        if (image) {
            const upload = await connectCloudinary.uploader.upload(image)
            imageUrl = upload.secure_url
        }
        const newMessage = await Message.create({
            senderId, receiverId, text, image: imageUrl
        })

        // Emit new message to receiver's socket
        const receiverSocketId = userSocketMap[receiverId]
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.json({ success: true, newMessage })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
