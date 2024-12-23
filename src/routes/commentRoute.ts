import { Router } from "express";
import {createComment, getAllComments, updateComment, deleteComment } from "../controllers/commentController";
const router = Router();


router.post('/create', createComment);
router.get('/list', getAllComments);
router.patch('/update/:id', updateComment);
router.delete('/delete/:id', deleteComment);


export default router;