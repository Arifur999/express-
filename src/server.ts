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

app.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "API Is Working",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


