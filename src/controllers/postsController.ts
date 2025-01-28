import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Request, Response } from "express";
import { errorMessage } from "../constants";

interface IcreatePost {
    title: string;
    content: string;
    user_id: number;
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const {title, content, user_id} = req.body as IcreatePost;

        if(!title || !content || !user_id) {
            res.status(400).json({
                isSuccess: false,
                message: "validation error"
            });
            return;
        }


        const user = await prisma.user.findFirst ({
            where: {
                id: user_id 
            }
        });

        if(!user) {
            res.status(404).json({
                isSuccess: false,
                message: "user not found"
            });
            return;
        }

        const newPost = await prisma.post.create({
            data: {
                title: title,
                content: content,
                user_id: user_id
            }
        });

        res.status(201).json({
            isSuccess: true,
            newPost
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};


export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
        include: {
            user: true
        }
    });

    res.status(200).json({
        isSuccess: true,
        posts
    });

}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!id) {
            res.status(400).json({
                isSuccess: false,
                message: "Post ID is required"
            });
            return;
        }

        if (!title || !content) {
            res.status(400).json({
                isSuccess: false,
                message: "At least one of 'title' or 'content' must be provided"
            });
            return;
        }

        const post = await prisma.post.findUnique({
            where: { 
                id: +id
            }
        });

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "Post not found"
            });
            return;
        }

        const updatedPost = await prisma.post.update({
            where: { 
                id: +id 
            },
            data: { 
                title: title,
                content: content
            }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Post updated successfully",
            updatedPost
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                isSuccess: false,
                message: "Post ID is required"
            });
            return;
        }

        const post = await prisma.post.findUnique({
            where: {
             id: +id  
            }
        });

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "Post not found"
            });
            return;
        }

        await prisma.post.delete({
            where: {
                 id: +id 
            }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: errorMessage
        });
    }
};