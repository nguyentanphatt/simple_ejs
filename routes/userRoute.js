import express, { Router } from "express";
import {
  addUser,
  deleteUser,
  fetchUser,
  fetchUserDetail,
  updateUser,
} from "../controller/userController.js";
const router = Router();

router.get("/", fetchUser);
router.post("/add", addUser);
router.get("/user/:id", fetchUserDetail);
router.post("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);

export default router;
