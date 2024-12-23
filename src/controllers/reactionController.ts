import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { errorMessage } from "../constants";

const prisma = new PrismaClient();

export const createReaction = async (req: Request, res: Response) => {
    try {
        const { type, user_id, post_id } = req.body;

        if (!type || !user_id || !post_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Validation error: type, user_id, and post_id are required."
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

        const newReaction = await prisma.reaction.create({
            data: { type, user_id, post_id }
        });

        res.status(201).json({
            isSuccess: true,
            message: "Reaction created successfully",
            newReaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const getAllReactions = async (req: Request, res: Response) => {
    try {
        const reactions = await prisma.reaction.findMany({
            include: {
                user: true,
                post: true
            }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Reactions retrieved successfully",
            reactions
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const updateReaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type } = req.body;

        if (!id) {
            res.status(400).json({
                isSuccess: false,
                message: "Reaction ID is required"
            });
            return;
        }

        if (!type) {
            res.status(400).json({
                isSuccess: false,
                message: "Type is required to update a reaction"
            });
            return;
        }

        const reaction = await prisma.reaction.findUnique({
             where: { 
                id: +id
            } 
        });

        if (!reaction) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction not found"
            });
            return;
        }

        const updatedReaction = await prisma.reaction.update({
            where: {
                 id: +id
            },
            data: { type }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Reaction updated successfully",
            updatedReaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                isSuccess: false,
                message: "Reaction ID is required"
            });
            return;
        }

        const reaction = await prisma.reaction.findUnique({
             where: { 
                id: +id 
            } 
        });

        if (!reaction) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction not found"
            });
            return;
        }

        await prisma.reaction.delete({
             where: { 
                id: +id
            } 
        });

        res.status(200).json({
            isSuccess: true,
            message: "Reaction deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};