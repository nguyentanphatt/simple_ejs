import { Router } from "express";
import fs from "fs";
import path from "path";
import models from '../models/index.js';
const { bio_project, project_template_store } = models;
const router = Router();

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

// Load 4 templates per page
router.get("/store", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  const totalTemplates = await project_template_store.countDocuments();

  // Get templates with pagination and populate category
  const templates = await project_template_store
    .find()
    .populate('category', 'name')
    .skip(skip)
    .limit(limit)

  res.render("store/index", {
    project: templates
  });
});

// Load more templates
router.get("/api/store", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;
  const totalTemplates = await project_template_store.countDocuments();

  const templates = await project_template_store
    .find()
    .populate('category', 'name')
    .skip(skip)
    .limit(limit)

  const totalPages = Math.ceil(totalTemplates / limit);

  res.json({
    templates,
    hasNextPage: page < totalPages
  });
});

export default router;


router.get("/templates/:id/index.html", async (req, res) => {
  const { id } = req.params; // Lấy id từ URL
  console.log("id", id);

  try {
    // Lấy project theo id (nên dùng id này, không hardcode)
    const project = await bio_project.findById("67bd40f7c7a917aaa8603605").lean();
    

    // Lấy 3 project đầu tiên làm related
    const relatedProject = await bio_project.find().limit(3).lean();

    // Dữ liệu info userData cố định
    const info = {
      _id: { $oid: "67625275d65d4173604a4354" },
      twoFA: { login: 0, publishWebsite: 0 },
      embed: { contact: "1", project: "1" },
      key: { public: "a", private: "b" },
      requiredPublish: { bio: false, project: false, client: false, service: false },
      systemDomain: "4work.click",
      status: 1,
      template: "19",
      expiredTime: { $date: "2084-12-11T09:47:52.293Z" },
      idTelegram: "",
      googleName: "Trịnh Gia Nghi",
      titlePage: "Trịnh Gia Nghi",
      subdomain: "carii",
      url: "carii",
      idRole: "PREMIUM",
      visible: 1,
      verifyBadge: 1,
      collectEmail: 1,
      pushToEmail: 0,
      pushToTelegram: 0,
      GoogleAnalyticsID: "",
      FacebookPixelID: "",
      domainName: "",
      verifyKey: "a",
      username: "b",
      email: "c",
      googleId: "d",
      password: "e",
      googleEmail: "f",
      createdAt: { $date: "2024-12-18T04:41:25.936Z" },
      __v: 0
    };

    if (!project) {
      return res.status(404).send("Project not found");
    }

    res.render(`templates/${id}/index.html`, {
      project,
      info,
      relatedProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading project detail");
  }
});
