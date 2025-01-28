import {Request, Response} from 'express'
import { errorMessage } from '../constants'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface IcreateUserPayload {
    username : string;
    password : string;
    phone_number : string;
}

export const createUser = async (req: Request, res: Response) =>{
    try {
        const {username, phone_number, password} = req.body as IcreateUserPayload;
        if(!username || !phone_number || !password) {
            res.status(404).json({
            isSuccess: false,
            message: "Please enter a username and password"
        });
            return;
        }
        const createdUser = await prisma.user.create({
            data: {
                username: username,
                phone_number: phone_number,
                password: password
            }
        })
        res.status(201).json({
            isSuccess : true,
            message: "User created successfully",
            user: createdUser
        })
    
    } catch (error) {
        res.status(500).json({
            error: errorMessage
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({
            isSuccess: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            error: errorMessage
        });
    }
};


export const getOneUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
    if(!userId) {
        res.status(404).json({
            isSucess: false,
            message: "Please provide a valid user id"
        });
        return;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: +userId
        },
        include: {
            posts: true
        }
    })
    if(!user) {
        res.status(404).json({
            isSuccess: false,
            message: "User not found"
        });
        return;
    }
    res.status(200).json({
        isSuccess: true,
        user
    })
    } catch (error) {
        res.status(500).json({
            error: errorMessage
        });
    }
};

export const updateUser = async(req:Request, res:Response) => {
    try {
    const userId = req.params.id;
    const {username, phone_number, password} = req.body;
    
    if(!userId) {
        res.status(404).json({
            isSuccess: false,
            message: "Please provide valid user id and username, password, and phone_number"
        });
        return;
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: +userId
        },
        data: {
            username: username,
            phone_number: phone_number,
            password: password
        }
    })
    if(!updatedUser) {
        res.status(404).json({
            isSuccess: false,
            message: "User not found"
        });
        return;
    }
    res.status(200).json({
        isSuccess: true,
        user: updatedUser
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            Message: errorMessage
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
        if(!userId) {
            res.status(404).json({
                isSuccess: false,
                message: "Please provide a valid user id"
            });
            return;
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id: +userId
            }
        });
        if(!deletedUser) {
            res.status(404).json({
                isSucess: false,
                message: "User not found"
            });
            return;
        }
        res.status(200).json({
            isSuccess: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            Message: errorMessage
        });
    }
};
