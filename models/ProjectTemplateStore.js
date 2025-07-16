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
    type: String, // Array of image URLs or file paths
    validate: {
      validator: function(v) {
        // Accept both URLs and relative paths
        return /^(https?:\/\/.+|\/uploads\/.+)$/.test(v);
      },
      message: 'Image must be a valid URL or upload path'
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
  timestamps: true
});

// Create indexes for commonly queried fields
project_template_store_Schema.index({ templateName: 1 });
project_template_store_Schema.index({ category: 1 });
project_template_store_Schema.index({ createdBy: 1 });
project_template_store_Schema.index({ timestamp: -1 });

// Virtual field to get id as string
project_template_store_Schema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Middleware to populate category when querying
project_template_store_Schema.pre('find', function() {
  this.populate('category', 'name');
});

project_template_store_Schema.pre('findOne', function() {
  this.populate('category', 'name');
});

// Ensure virtual fields are serialized when converting to JSON
project_template_store_Schema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Static method to find templates by category
project_template_store_Schema.statics.findByCategory = function(categoryId) {
  return this.find({ category: categoryId }).populate('category', 'name');
};

// Static method to find templates by creator
project_template_store_Schema.statics.findByCreator = function(createdBy) {
  return this.find({ createdBy: createdBy }).populate('category', 'name');
};

// Instance method to update timestamp
project_template_store_Schema.methods.updateTimestamp = function() {
  this.timestamp = new Date();
  return this.save();
};

export default mongoose.model('project_template_store', project_template_store_Schema); 