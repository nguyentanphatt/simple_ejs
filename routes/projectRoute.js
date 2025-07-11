import { Router } from "express";
import fs from "fs";
import path from "path";
const router = Router();
const filePath = path.join(process.cwd(), "data", "data.json");
const userFilePath = path.join(process.cwd(), "data", "4work.Users.json");
const relatedFilePath = path.join(process.cwd(), "data", "related.json");

function convertUserData(user) {
  return {
    idUser: {
      _id: user._id && user._id.$oid ? user._id.$oid : user._id || "",
      url: user.url || "",
      verifyBadge: user.verifyBadge || 0,
      key: {
        public: user.key && user.key.public ? user.key.public : ""
      }
    },
    fullName: user.googleName || ""
  };
}

function formatViews(views) {
  if (views === 1) {
      return "1 View"; // Trường hợp đặc biệt khi chỉ có 1 lượt xem
  } else if (views >= 1e9) {
      return (views / 1e9).toFixed(1) + 'B Views';
  } else if (views >= 1e6) {
      return (views / 1e6).toFixed(1) + 'M Views';
  } else if (views >= 1e3) {
      return (views / 1e3).toFixed(1) + 'K Views';
  } else {
      return views + ' Views';
  }
}

router.get("/project-detail", (req, res) => {
  const rawData = fs.readFileSync(filePath, "utf-8");
  const projectData = JSON.parse(rawData);
  const userData = fs.readFileSync(userFilePath, "utf-8");
  const userDataParsed = JSON.parse(userData);
  const info = convertUserData(userDataParsed[0]);
  const relatedData = fs.readFileSync(relatedFilePath, "utf-8");
  const relatedDataParsed = JSON.parse(relatedData);
  res.render("project-detail", {
    project: projectData,
    info: info,
    relatedProject: relatedDataParsed,
    formatViews: formatViews,
  });
});

export default router;
