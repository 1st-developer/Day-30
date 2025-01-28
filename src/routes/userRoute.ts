import {Router} from 'express';
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/userController';
const userRouter = Router();

userRouter.post("/create", createUser);
userRouter.get("/list", getAllUsers);
userRouter.get("/details/:id", getOneUser);
userRouter.patch("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);


export default userRouter;