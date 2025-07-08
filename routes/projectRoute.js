import { Router } from "express";
import fs from "fs";
import path from "path";
import { renderImage } from "../utils/_image_utils.js";
const router = Router();
const filePath = path.join(process.cwd(), "data", "data.json");
router.get("/project-detail", (req, res) => {
  const rawData = fs.readFileSync(filePath, "utf-8");
  const projectData = JSON.parse(rawData);

  res.render("project-detail", {
    project: projectData,
    helpers: {
      renderImage,
    },
  });
});

export default router;
