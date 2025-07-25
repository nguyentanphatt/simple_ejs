import { Router } from "express";
import models from '../models/index.js';
const { bio_project, project_template_store, project_template_category } = models;
const router = Router();


// Load 4 templates per page
router.get("/store", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const categories = await project_template_category.find();
  // Get templates with pagination and populate category
  const templates = await project_template_store
    .find()
    .populate('category', 'name')
    .skip(skip)
    .limit(limit)

  res.render("store/index", {
    templates: templates,
    categories
  });
});

// Load more templates
router.get("/api/store", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
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

// API filter templates by category with paging
router.get("/api/store-filter", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;
  const category = req.query.category;

  let filter = {};
  if (category && category !== 'all') {
    filter.category = category;
  }

  const totalTemplates = await project_template_store.countDocuments(filter);

  const templates = await project_template_store
    .find(filter)
    .populate('category', 'name')
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalTemplates / limit);

  res.json({
    templates,
    hasNextPage: page < totalPages
  });
});

export default router;


router.get("/templates/:id/index.html", async (req, res) => {
  // get additional projectId
  const { id } = req.params;
  console.log("id", id);

  try {
    //Change the hardcode id to projectId
    const project = await bio_project.findById("67bd40f7c7a917aaa8603605").lean();
    const relatedProject = await bio_project.find().limit(3).lean();

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
