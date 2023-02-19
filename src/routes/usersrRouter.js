import express from "express";
import getAllUsers from "./usersControllers";

const usersRouter = express.Router();

usersRouter.get("/user", getAllUsers);

export default usersRouter;
