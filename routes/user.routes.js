// routes/user.routes.js
import express from "express";
import { getUsers, updateUser, deleteUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;