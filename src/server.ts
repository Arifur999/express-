import express, { Request, Response } from "express";
import { Pool} from "pg";

const app = express();
const port = 5000;



const pool = new Pool({
  connectionString: process.env.DATABASE_URL!, // non-null assertion
  // যদি certificate সমস্যা আসে, নিম্নলিখিত ssl object use করতে পারো:
  // ssl: {
  //   rejectUnauthorized: false
  // }
});



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
