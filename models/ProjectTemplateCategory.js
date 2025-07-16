import mongoose from 'mongoose';

const project_template_category_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

// Index for name
project_template_category_Schema.index({ name: 1 });

// Virtual field to get id as string
project_template_category_Schema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized when converting to JSON
project_template_category_Schema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('project_template_category', project_template_category_Schema); 