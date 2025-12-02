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

export const todosController={
createTodos,

}