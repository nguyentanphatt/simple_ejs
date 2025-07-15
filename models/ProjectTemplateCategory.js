import mongoose from 'mongoose';

const project_template_category_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo index cho name để tìm kiếm nhanh hơn
project_template_category_Schema.index({ name: 1 });

// Virtual field để lấy id dưới dạng string
project_template_category_Schema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Đảm bảo virtual fields được serialize khi chuyển thành JSON
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