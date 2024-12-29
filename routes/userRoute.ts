import express from 'express'
import {blockUser, editDetails, getAllUsers, seacrhByUser, searchUser, sortUsers, unblockUser} from '../controllers/userController'
const userRoute = express.Router()
userRoute.get('/user',searchUser)
userRoute.patch('/block-user',blockUser)
userRoute.patch('/unblock-user',unblockUser)
userRoute.patch('/edit-details',editDetails)
userRoute.get('/users',getAllUsers)
userRoute.get('/sort',sortUsers)
userRoute.get('/search',seacrhByUser)
export default userRoute