import mongoose from 'mongoose';
const setting_model = new mongoose.Schema({
    analyticsInsight: {
        type: Number,
        default: 0,
    },
    publicWorkFeed: {
        type: Number,
        default: 1,
    },
    quickContact: {
        type: Number,
        default: 0,
    },
    relate: {
        type: {
            type: Number,
            enum: [0, 1, 2], // 0: Off, 1: Auto, 2: Manual
            default: 0, // Mặc định là Off
        },
        manualIds: [{
            default: [],
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bio_Project', // Tham chiếu đến các dự án khác (chỉ khi relate = 2)
        }],
    },
    accessPersonalLink: {
        type: {
            type: Number,
            enum: [0, 1], // 0: Disable, 1: Enable
            default: 0, // Mặc định là Disable
        },
        url: {
            trim: true,
            type: String,
            maxlength: [150, 'url accessPersonalLink should be less than or equal to 150 characters long'],
            default: "",
        },
    },
    googleAnalytics: {
        type: {
            type: Number,
            enum: [0, 1], // 0: Disable, 1: Enable
            default: 0, // Mặc định là Disable
        },
        id: {
            trim: true,
            type: String,
            maxlength: [150, 'googleAnalytics should be less than or equal to 150 characters long'],
            default: "",
        },
    },
    facebookPixel: {
        type: {
            type: Number,
            enum: [0, 1], // 0: Disable, 1: Enable
            default: 0, // Mặc định là Disable
        },
        id: {
            trim: true,
            type: String,
            maxlength: [150, 'facebookPixel should be less than or equal to 150 characters long'],
            default: "",
        },
    },
});

const projectSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    settings: { type: setting_model, default: () => ({}) },
    status: { type: Number, enum: [0, 1, 2], default: 2 }, // 0: Deleted, 1: Public, 2: Draft
    isPrivate: { type: Number, enum: [0, 1], default: 0 },
    projectName: {
        trim: true,
        type: String,
        maxlength: [500, 'Project name should be less than or equal to 500 characters long']
    },
    clientName: {
        trim: true,
        type: String,
        maxlength: [500, 'Client name should be less than or equal to 500 characters long']
    },
    agencyName: {
        trim: true,
        type: String,
        maxlength: [500, 'Agency name should be less than or equal to 500 characters long']
    },
    time: {
        trim: true,
        type: String,
        maxlength: [100, 'Time should be less than or equal to 100 characters long']
    },
    role: {
        trim: true,
        type: String,
        maxlength: [300, 'Role should be less than or equal to 300 characters long']
    },
    projectOverview: {
        trim: true,
        type: String,
        maxlength: [20000, 'Project overview should be less than or equal to 20000 characters long']
    },
    persionalSOW: {
        trim: true,
        type: String,
        maxlength: [20000, 'Personal SOW should be less than or equal to 20000 characters long']
    },
    description: {
        type: [{
            title: {
                type: String,
                maxlength: [1000, 'Description title should be less than or equal to 1000 characters long']
            },
            content: {
                type: String,
                maxlength: [80000, 'Description content should be less than or equal to 80000 characters long']
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }],
        maxlength: [50, 'Description array should not exceed 50 elements']
    },
    embedvideo: {
        type: [{
            url: {
                type: String,
                required: [true, 'Video URL is required'],
                maxlength: [500, 'Video URL should be less than or equal to 500 characters long'],
                match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please provide a valid URL']
            },
            alt: {
                type: String,
                maxlength: [500, 'ALT description should be less than or equal to 500 characters long'],
                default: ''
            }
        }],
        maxlength: [50, 'Embedvideo array should not exceed 50 elements']
    },
    op_description: {
        trim: true,
        type: String,
        maxlength: [500, 'op_description should be less than or equal to 500 characters long']
    },
    category: {
        trim: true,
        type: String,
        maxlength: [500, 'Category should be less than or equal to 500 characters long']
    },
    files: {
        type: [{
            dbfilename: { type: String },
            size: { type: Number },
            url: { type: String },
            name: { type: String },
            bucketName: { type: String },
            type: { type: String },
            alt: { type: String }
        }],
        maxlength: [50, 'Files array should not exceed 50 elements']
    },
    link: {
        type: [{
            type: String,
            maxlength: [300, 'Link should be less than or equal to 300 characters long']
        }],
        maxlength: [50, 'Link array should not exceed 50 elements']
    },
    clicks: { type: Number, default: 0 },
    pin: { type: Number, enum: [0, 1], default: 0 }, // 0: Not pin, 1: Pinned
    modifined: { type: Number, enum: [0, 1], default: 0 },
    collaborators: {
        type: [{
            googleName: { type: String },
            googleEmail: { type: String },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            role: {
                trim: true,
                type: String,
                maxlength: [300, 'Role should be less than or equal to 300 characters long'],
                default: 'Member'
            },
            isShowOnMyPortfolio: {
                type: Boolean,
                default: false
            }
        }],
        maxlength: [200, 'Collaborators array should not exceed 200 elements']
    },
    categories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "bio_project_category",
            required: false
        }],
        maxlength: [5, 'Categories array should not exceed 5 elements']
    },
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});
projectSchema.index({ idUser: 1 });
const Project = mongoose.model('Bio_Project', projectSchema);

export default Project;