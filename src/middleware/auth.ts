import jwt from 'jsonwebtoken';


//higher order function  => return korbe function

import { NextFunction, Request, Response } from "express"
import config from '../config';

const auth =()=>{
    return (req:Request,res:Response,next:NextFunction)=>{
const token=req.headers.authorization;
if (!token) {
    return res.status(500).json({message:"you are not valid"})
}

const decoded=jwt.verify(token,config.jwtSecret as string);
console.log({decoded});
        next()
    }
}

export default auth;
