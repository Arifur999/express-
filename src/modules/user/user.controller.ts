import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


const createUser = async(req: Request, res: Response) => {
    const {name,email}=req.body;

try {


    const result = await userServices.createUser(name,email);
    // console.log(result.rows[0]);
     res.status(201).json({
        success:true,
        message:"data successfully insert",
        data:result.rows[0]
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

} 



const getUser=async(req: Request, res: Response) => {


try {


    const result = await userServices.getUser();
    // console.log(result.rows[0]);
     res.status(200).json({
        success:true,
        message:"user data successfully retrieved",
        data:result.rows,
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}

export const userControllers={
    createUser,
    getUser
}