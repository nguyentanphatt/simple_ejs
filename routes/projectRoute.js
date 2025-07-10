import { Router } from "express";
import fs from "fs";
import path from "path";
const router = Router();
const filePath = path.join(process.cwd(), "data", "data.json");
const userFilePath = path.join(process.cwd(), "data", "4work.Users.json");
router.get("/project-detail", (req, res) => {
  const rawData = fs.readFileSync(filePath, "utf-8");
  const projectData = JSON.parse(rawData);
  const userData = fs.readFileSync(userFilePath, "utf-8");
  const userDataParsed = JSON.parse(userData);
  res.render("project-detail", {
    project: projectData,
    info: userDataParsed,
  });
});

export default router;
