import { Router } from "express";
import { createPost, getAllPosts, updatePost, deletePost } from "../controllers/postsController";
const router = Router();


router.post('/create', createPost);
router.get('/list', getAllPosts);
router.patch('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);


export default router;