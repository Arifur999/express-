import { pool } from "../../config/db";

const createTodos=async(user_id:string,title:string)=>{
const result =await pool.query(`INSERT INTO todos(users_id,title) VALUES($1,$2) RETURNING *`,[user_id,title]);
return result;
}

const getTodos=async()=>{
    const result=await pool.query(`SELECT * FROM todos`);
    return result;
}

const singleTodos=async(id:string)=>{
    const result=await pool.query(`SELECT * FROM todos WHERE id=$1`,[id]);
    return result;
}

const updateTodos=async(name:string,email:string,id:string)=>{
    const result=await pool.query(`UPDATE todos SET name=$1, email=2 WHERE id=$3 RETURNING *`,[name,email,id]);
    return result;
}

export const todos={
    createTodos,
    getTodos,
    singleTodos,
    updateTodos,

}