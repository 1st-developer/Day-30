import { Router } from "express";
import {createReaction, getAllReactions, updateReaction, deleteReaction } from "../controllers/reactionController";
const router = Router();


router.post('/create', createReaction);
router.get('/list', getAllReactions);
router.patch('/update/:id', updateReaction);
router.delete('/delete/:id', deleteReaction);


export default router;