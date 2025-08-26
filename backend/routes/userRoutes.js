import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getUserProfile, loginUser, registerUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, getUserProfile);

export default userRouter;