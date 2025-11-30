import express, { Request, Response } from "express";
import dotenv from "dotenv"; 
import { Pool} from "pg";
import path from "path";


dotenv.config({path:path.join(process.cwd(),".env")});
const app = express();
const port = 5000;



const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`
});


const initDB=async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR (15), 
        address TEXT,
        create_at TIMESTAMP DEFAULT NOW (),
        update_at TIMESTAMP DEFAULT NOW ()

        
        )
        
        
        `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        users_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        create_at TIMESTAMP DEFAULT NOW (),
        update_at TIMESTAMP DEFAULT NOW ()
        )
        
        
        `)
}

initDB()
//parser============> middle ware

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//users CRUD
app.post("/users", async(req: Request, res: Response) => {
    const {name,email}=req.body;

try {


    const result =await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,[name,email]);
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

});


app.get("/users", async(req: Request, res: Response) => {
 

try {


    const result =await pool.query(`SELECT * FROM users`);
    // console.log(result.rows[0]);
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

// single user
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


