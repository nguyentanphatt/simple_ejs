import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import models from '../models/index.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const { project_template_category, project_template_store } = models;

// Middleware to check if user is admin (you can add authentication here)
const isAdmin = (req, res, next) => {
    //admin authentication logic
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
        const limit = 8;
        const skip = (page - 1) * limit;
        const totalCategories = await project_template_category.countDocuments();
        
        // Get categories with pagination
        const categories = await project_template_category
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

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

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

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

        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Add category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create category'
        });
    }
});

// Get single category by ID
router.get('/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await project_template_category.findById(id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get category'
        });
    }
});

// Update category
router.put('/categories/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category exists
        const existingCategory = await project_template_category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if name already exists (excluding current category)
        const duplicateCategory = await project_template_category.findOne({
            name: name.trim(),
            _id: { $ne: id }
        });
        
        if (duplicateCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        // Update category
        const updatedCategory = await project_template_category.findByIdAndUpdate(
            id,
            { name: name.trim() },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update category'
        });
    }
});
// Delete category
router.delete('/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await project_template_category.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Delete category failed' });
    }
});

// Templates routes
router.get('/templates', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;
        const totalTemplates = await project_template_store.countDocuments();
        
        // Get templates with pagination and populate category
        const templates = await project_template_store
            .find()
            .populate('category', 'name')
            .skip(skip)
            .limit(limit)
            .sort({ timestamp: -1 });

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
        res.render('admin/templates/add', { categories });
    } catch (error) {
        console.error('Add template form error:', error);
        res.status(500).send('Failed to load add template form');
    }
});

// Get single template by ID
router.get('/templates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const template = await project_template_store.findById(id).populate('category', 'name _id');
        
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        res.json({
            success: true,
            data: template
        });
    } catch (error) {
        console.error('Get template error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get template'
        });
    }
});

// Add template POST
router.post('/templates/add',upload.array('images'), async (req, res) => {
    try {
        const { templateName, description, category, createdBy } = req.body;

        if (!templateName || !description || !category || !createdBy) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one image is required'
            });
        }

        // Extract filenames and create URLs from uploaded files
        const images = req.files.map(file => `/uploads/${file.filename}`);

        const newTemplate = new project_template_store({
            templateName: templateName.trim(),
            description: description.trim(),
            category,
            createdBy: createdBy.trim(),
            images
        });

        await newTemplate.save();

        // Redirect về danh sách templates
        res.redirect('/admin/templates');
    } catch (error) {
        console.error('Add template error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create template'
        });
    }
});

// Update template
router.put('/templates/update/:id', upload.array('images'), async (req, res) => {
    try {
        const { id } = req.params;
        const { templateName, description, category, createdBy } = req.body;

        if (!templateName || !description || !category || !createdBy) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Find existing template
        const existingTemplate = await project_template_store.findById(id);
        if (!existingTemplate) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        // Handle images: nếu có ảnh mới thì thay thế, không thì giữ nguyên
        let images = existingTemplate.images || [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Update template
        const updatedTemplate = await project_template_store.findByIdAndUpdate(
            id,
            {
                templateName: templateName.trim(),
                description: description.trim(),
                category,
                createdBy: createdBy.trim(),
                images
            },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Template updated successfully',
            data: updatedTemplate
        });
    } catch (error) {
        console.error('Update template error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update template'
        });
    }
});
// Delete template
router.delete('/templates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await project_template_store.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Delete template failed' });
    }
});

export default router; 
