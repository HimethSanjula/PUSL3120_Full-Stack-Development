const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: '',
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Review
 * @property {number} rating.required - Rating of the product - eg: 5
 * @property {string} comment - Comment of the product
 * @property {ObjectId} product.required - Product id
 * @property {ObjectId} user.required - User id
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of last update
 * 
 */
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;



