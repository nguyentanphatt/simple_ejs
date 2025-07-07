import { Router } from "express";
import fs from "fs";
import path from "path";
const router = Router();
const filePath = path.join(process.cwd(), "data", "data.json");
router.get("/project-detail", (req, res) => {
  const rawData = fs.readFileSync(filePath, "utf-8");
  const projectData = JSON.parse(rawData);

  res.render("project-detail", { project: projectData });
});

export default router;
