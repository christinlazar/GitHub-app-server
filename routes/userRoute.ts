import express from 'express'
import {blockUser, editDetails, getAllUsers, searchUser, sortUsers, unblockUser} from '../controllers/userController'
const userRoute = express.Router()
console.log("in  userRoute")
userRoute.get('/user',searchUser)
userRoute.patch('/block-user',blockUser)
userRoute.patch('/unblock-user',unblockUser)
userRoute.patch('/edit-details',editDetails)
userRoute.get('/users',getAllUsers)
userRoute.get('/sort',sortUsers)
export default userRoute