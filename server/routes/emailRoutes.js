import express from "express";
import checkToken from "../middleware/checkToken.js";

import { sendEmail } from "../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.post("/", checkToken, sendEmail);

export default emailRouter;
