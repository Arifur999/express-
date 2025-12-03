import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


const createUser = async(req: Request, res: Response) => {
    

try {


    const result = await userServices.createUser(req.body);
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


const getSingleUser =async(req: Request, res: Response) => {
 

try {

    const result =await userServices.getSingleUser(req.params.id as string);
    // console.log(result.rows[0]);

if (result.rows.length===0) {
    res.status(404).json({
        success:false,
        message:'user not found'
    })
}else{
    res.status(200).json({
        success:true,
        message:"user data successfully retrieved with dynamic id",
        data:result.rows[0]
    })
}

     res.status(200).json({
        success:true,
        message:"user data successfully retrieved",
        data:result.rows
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}

const getChange=async(req: Request, res: Response) => {
 
const {name,email}=req.body;
try {


    const result =await userServices.getChange(name,email,req.params.id as string);
    // console.log(result.rows[0]);  

if (result.rows.length===0) {
    res.status(404).json({
        success:false,
        message:'user not found'
    })
}else{
    res.status(200).json({
        success:true,
        message:"user data successfully updated with dynamic id",
        data:result.rows[0]
    })
}

     res.status(200).json({
        success:true,
        message:"user data successfully retrieved",
        data:result.rows
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}

const deleteUser = async(req: Request, res: Response) => {
 

try {


    const result =await userServices.deleteUser(req.params.id as string)
    // console.log(result.rows[0]);

if (result.rowCount===0) {
    res.status(404).json({
        success:false,
        message:'user not found'
    })
}else{
    res.status(200).json({
        success:true,
        message:"user deleted successfully retrieved with dynamic id",
        data:null
    })
}

     res.status(200).json({
        success:true,
        message:"user data successfully retrieved",
        data:result.rows
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
    getUser,
    getSingleUser,
    getChange,
    deleteUser
    
}