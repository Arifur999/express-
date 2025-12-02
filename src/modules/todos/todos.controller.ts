import { Request, Response } from "express";
import { todos } from "./todos.service";

const createTodos=async(req: Request, res: Response) => {
    const {user_id,title}=req.body;

try {


    const result =await todos.createTodos(user_id,title)
    // console.log(result.rows[0]);
     res.status(201).json({
        success:true,
        message:"todos successfully insert",
        data:result.rows[0]
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}


const getTodos=async(req: Request, res: Response) => {
 

try {


    const result =await todos.getTodos();
    // console.log(result.rows[0]);
     res.status(200).json({
        success:true,
        message:"todos data successfully retrieved",
        data:result.rows
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}

const singleTodos=async(req: Request, res: Response) => {
 

try {


    const result =await todos.singleTodos(req.params.id as string)
    // console.log(result.rows[0]);

if (result.rows.length===0) {
    res.status(404).json({
        success:false,
        message:'user not found'
    })
}else{
    res.status(200).json({
        success:true,
        message:"todos data successfully retrieved with dynamic id",
        data:result.rows[0]
    })
}

     res.status(200).json({
        success:true,
        message:"todos data successfully retrieved",
        data:result.rows
    })
} catch (err:any) {
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}
export const todosController={
createTodos,
getTodos,
singleTodos,

}