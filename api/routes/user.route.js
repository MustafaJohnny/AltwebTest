import e from "express";
import { deleteUser, signout,getUsers, getUser } from "../controllers/user.controller.js";

const router = e.Router();

router.delete("/delete/:userId",deleteUser)
router.post('/signout',signout)
// router.get('/getusers',verifyToken,getUsers)
router.get('/getusers',getUsers)
router.get('/:userId',getUser)

export default router