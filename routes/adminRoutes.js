import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import models from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const { project_template_category, project_template_store } = models;

// Middleware to check if user is admin (you can add authentication here)
const isAdmin = (req, res, next) => {
    // Add your admin authentication logic here
    // For now, we'll allow all requests
    next();
};

// Apply admin middleware to all routes
router.use(isAdmin);

// Admin index page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/index.html'));
});

// Categories routes
router.get('/categories', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const totalCategories = await project_template_category.countDocuments();
        
        // Get categories with pagination
        const categories = await project_template_category
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by newest first

        // Calculate pagination info
        const totalPages = Math.ceil(totalCategories / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const pagination = {
            currentPage: page,
            totalPages,
            totalItems: totalCategories,
            hasNextPage,
            hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null,
            startIndex: skip + 1,
            endIndex: Math.min(skip + limit, totalCategories)
        };

        res.render('admin/categories/list', {
            categories,
            pagination,
            title: 'Categories'
        });
    } catch (error) {
        console.error('Categories list error:', error);
        res.status(500).send('Failed to load categories');
    }
});

// Add category form
router.get('/categories/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/categories/add.html'));
});

// Add category POST
router.post('/categories/add', async (req, res) => {
    try {
        const { name } = req.body;

        // Validate required fields
        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category name already exists
        const existingCategory = await project_template_category.findOne({ name: name.trim() });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        // Create new category
        const newCategory = new project_template_category({
            name: name.trim()
        });

        await newCategory.save();

        // Redirect to categories list
        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Add category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create category'
        });
    }
});

// Templates routes
router.get('/templates', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const totalTemplates = await project_template_store.countDocuments();
        
        // Get templates with pagination and populate category
        const templates = await project_template_store
            .find()
            .populate('category', 'name')
            .skip(skip)
            .limit(limit)
            .sort({ timestamp: -1 }); // Sort by newest first

        // Calculate pagination info
        const totalPages = Math.ceil(totalTemplates / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const pagination = {
            currentPage: page,
            totalPages,
            totalItems: totalTemplates,
            hasNextPage,
            hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null,
            startIndex: skip + 1,
            endIndex: Math.min(skip + limit, totalTemplates)
        };

        // Get categories for filter dropdown
        const categories = await project_template_category.find({ status: 'active' });

        res.render('admin/templates/list', {
            templates,
            categories,
            pagination,
            title: 'Templates'
        });
    } catch (error) {
        console.error('Templates list error:', error);
        res.status(500).send('Failed to load templates');
    }
});

// Add template form
router.get('/templates/add', async (req, res) => {
    try {
        const categories = await project_template_category.find();
        const datas = await models.bio_project.find();
        res.render('admin/templates/add', { categories, datas });
    } catch (error) {
        console.error('Add template form error:', error);
        res.status(500).send('Failed to load add template form');
    }
});

// Add template POST
router.post('/templates/add', async (req, res) => {
    try {
        const { templateName, description, category, createdBy, data, images } = req.body;
        
        // Validate required fields
        if (!templateName || !description || !category || !createdBy || !data) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }
        
        // Validate JSON data
        try {
            JSON.parse(data);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON data'
            });
        }
        
        // Create new template
        const newTemplate = new project_template_store({
            templateName: templateName.trim(),
            description: description.trim(),
            category: category,
            createdBy: createdBy.trim(),
            data: data,
            images: Array.isArray(images) ? images.filter(url => url.trim() !== '') : []
        });
        
        await newTemplate.save();
        
        res.json({
            success: true,
            message: 'Template created successfully',
            template: newTemplate
        });
    } catch (error) {
        console.error('Add template error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create template'
        });
    }
});

export default router; 