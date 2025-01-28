import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { errorMessage } from "../constants";

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
    try {
        const { content, user_id, post_id } = req.body;

        if (!content || !user_id || !post_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Validation error: content, user_id, and post_id are required."
            });
            return;
        }

        const user = await prisma.user.findFirst({ where: { id: user_id } });
        const post = await prisma.post.findFirst({ where: { id: post_id } });

        if (!user) {
            res.status(404).json({
                isSuccess: false,
                message: "User not found"
            });
            return;
        }

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "Post not found"
            });
            return;
        }

        const newComment = await prisma.comment.create({
            data: { content, user_id, post_id }
        });

        res.status(201).json({
            isSuccess: true,
            message: "Comment created successfully",
            newComment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: true,
                post: true
            }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Comments retrieved successfully",
            comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!id) {
            res.status(400).json({
                isSuccess: false,
                message: "Comment ID is required"
            });
            return;
        }

        if (!content) {
            res.status(400).json({
                isSuccess: false,
                message: "Content is required to update a comment"
            });
            return;
        }

        const comment = await prisma.comment.findUnique({ where: { id: +id } });

        if (!comment) {
            res.status(404).json({
                isSuccess: false,
                message: "Comment not found"
            });
            return;
        }

        const updatedComment = await prisma.comment.update({
            where: { id: +id },
            data: { content }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Comment updated successfully",
            updatedComment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                isSuccess: false,
                message: "Comment ID is required"
            });
            return;
        }

        const comment = await prisma.comment.findUnique({ where: { id: +id } });

        if (!comment) {
            res.status(404).json({
                isSuccess: false,
                message: "Comment not found"
            });
            return;
        }

        await prisma.comment.delete({ where: { id: +id } });

        res.status(200).json({
            isSuccess: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};