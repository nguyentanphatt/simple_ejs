import mongoose from 'mongoose';

const project_template_store_Schema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  images: [{
    type: String, // Array of image URLs
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v); // Validate URL format
      },
      message: 'Image must be a valid URL'
    }
  }],
  data: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project_template_category',
    required: true
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo indexes cho các trường thường được query
project_template_store_Schema.index({ templateName: 1 });
project_template_store_Schema.index({ category: 1 });
project_template_store_Schema.index({ createdBy: 1 });
project_template_store_Schema.index({ timestamp: -1 }); // Descending order for latest first

// Virtual field để lấy id dưới dạng string
project_template_store_Schema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Middleware để populate category khi query
project_template_store_Schema.pre('find', function() {
  this.populate('category', 'name');
});

project_template_store_Schema.pre('findOne', function() {
  this.populate('category', 'name');
});

// Đảm bảo virtual fields được serialize khi chuyển thành JSON
project_template_store_Schema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Static method để tìm templates theo category
project_template_store_Schema.statics.findByCategory = function(categoryId) {
  return this.find({ category: categoryId }).populate('category', 'name');
};

// Static method để tìm templates theo creator
project_template_store_Schema.statics.findByCreator = function(createdBy) {
  return this.find({ createdBy: createdBy }).populate('category', 'name');
};

// Instance method để update timestamp
project_template_store_Schema.methods.updateTimestamp = function() {
  this.timestamp = new Date();
  return this.save();
};

export default mongoose.model('project_template_store', project_template_store_Schema); 