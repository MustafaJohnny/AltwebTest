import e from "express";
import { deleteUser, signout,getUsers, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = e.Router();

router.delete("/delete/:userId",verifyToken,deleteUser)

router.post('/signout',signout)

router.get('/getusers',verifyToken,getUsers)

router.get('/:userId',getUser)

export default router