import express, { Request, Response } from "express";


import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";


const app = express();
const port = config.port;



initDB()
//parser============> middle ware


app.use(express.json());
app.use(express.urlencoded());

app.get("/", logger,(req: Request, res: Response) => {
  res.send("Hello World!");
});

//users CRUD
// user ==> post  =====> clean code
app.use("/users",userRoutes)

// app.post("/users", async(req: Request, res: Response) => {
//     const {name,email}=req.body;

// try {


//     const result =await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,[name,email]);
//     // console.log(result.rows[0]);
//      res.status(201).json({
//         success:true,
//         message:"data successfully insert",
//         data:result.rows[0]
//     })
// } catch (err:any) {
//     res.status(500).json({
//         success:false,
//         message:err.message
//     })
// }

// });


//------------------get user----------------------------------------
// app.use("/users",userRoutes)

//--------------------------------------------------//

// app.get("/users", async(req: Request, res: Response) => {
 

// try {


//     const result =await pool.query(`SELECT * FROM users`);
//     // console.log(result.rows[0]);
//      res.status(200).json({
//         success:true,
//         message:"user data successfully retrieved",
//         data:result.rows
//     })
// } catch (err:any) {
//     res.status(500).json({
//         success:false,
//         message:err.message
//     })
// }

// });

// single user



//---------------------------------- id --------------

app.get("/users/:id", async(req: Request, res: Response) => {
 

try {


    const result =await pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id]);
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

});

// PUT

app.put("/users/:id", async(req: Request, res: Response) => {
 
const {name,email}=req.body;
try {


    const result =await pool.query(`UPDATE users SET name=$1, email=2 WHERE id=$3 RETURNING *`,[name,email,req.params.id]);
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

});


//Delete

app.delete("/users/:id", async(req: Request, res: Response) => {
 

try {


    const result =await pool.query(`DELETE FROM users WHERE id=$1`,[req.params.id]);
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

});

//------------------todos crud-------

app.post("/todos", async(req: Request, res: Response) => {
    const {user_id,title}=req.body;

try {


    const result =await pool.query(`INSERT INTO todos(users_id,title) VALUES($1,$2) RETURNING *`,[user_id,title]);
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

});


app.get("/todos", async(req: Request, res: Response) => {
 

try {


    const result =await pool.query(`SELECT * FROM todos`);
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

});

app.get("/todos/:id", async(req: Request, res: Response) => {
 

try {


    const result =await pool.query(`SELECT * FROM todos WHERE id=$1`,[req.params.id]);
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

});


app.put("/todos/:id", async(req: Request, res: Response) => {
 
const {name,email}=req.body;
try {


    const result =await pool.query(`UPDATE todos SET name=$1, email=2 WHERE id=$3 RETURNING *`,[name,email,req.params.id]);
    // console.log(result.rows[0]);  

if (result.rows.length===0) {
    res.status(404).json({
        success:false,
        message:'todos not found'
    })
}else{
    res.status(200).json({
        success:true,
        message:"todos data successfully updated with dynamic id",
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

});

app.delete("/todos/:id", async(req: Request, res: Response) => {
 

try {


    const result =await pool.query(`DELETE FROM todos WHERE id=$1`,[req.params.id]);
    // console.log(result.rows[0]);

if (result.rowCount===0) {
    res.status(404).json({
        success:false,
        message:'todos not found'
    })
}else{
    res.status(200).json({
        success:true,
        message:"todos deleted successfully retrieved with dynamic id",
        data:null
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

});


// invalid routes error
app.use((req,res)=>{
res.status(404).json({
    success:false,
    message:"route not found",
    path:req.path,


})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


