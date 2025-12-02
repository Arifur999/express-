import express, { Request, Response } from "express"
import { userControllers } from "./user.controller";
const router =express.Router();

router.post("/",userControllers.createUser)



router.get("/",userControllers.getUser)

//single id
router.get("/:id",userControllers.getSingleUser)
//put
router.put("/:id",userControllers.getChange)
//delete
router.delete("/:id",userControllers.deleteUser)

export const userRoutes=router;