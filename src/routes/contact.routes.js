import { Router } from "express";
import { contactEmail } from "../controllers/contact.controllers.js";

const router = Router();

router.get("/email", contactEmail);


export default router;