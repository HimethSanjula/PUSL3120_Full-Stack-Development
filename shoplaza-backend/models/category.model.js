const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Category
 * @property {string} name.required - Name of the category - eg: Electronics
 * @property {ObjectId} createdBy - User id
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of last update
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;