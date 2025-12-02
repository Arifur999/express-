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

// app.get("/", logger,(req: Request, res: Response) => {
//   res.send("Hello World!");
// });

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

// app.get("/users/:id", );

// PUT

// app.put("/users/:id", );


//Delete

// app.delete("/users/:id",);

//------------------todos crud-------


app.use("/todos",userRoutes)

// app.post("/todos", async(req: Request, res: Response) => {
//     const {user_id,title}=req.body;

// try {


//     const result =await pool.query(`INSERT INTO todos(users_id,title) VALUES($1,$2) RETURNING *`,[user_id,title]);
//     // console.log(result.rows[0]);
//      res.status(201).json({
//         success:true,
//         message:"todos successfully insert",
//         data:result.rows[0]
//     })
// } catch (err:any) {
//     res.status(500).json({
//         success:false,
//         message:err.message
//     })
// }

// });


// app.get("/todos", );

// app.get("/todos/:id", );


// app.put("/todos/:id", );

app.delete("/todos/:id", );


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


