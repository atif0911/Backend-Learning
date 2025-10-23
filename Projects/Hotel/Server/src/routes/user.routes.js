import express from "express";
import { registerController,loginController } from "../controllers/user.controller.js";

const app = express.Router();

app.post("/register", registerController);
app.post("/login", loginController);

export default app;