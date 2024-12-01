import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  nutrition: {
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number,
    sugar: Number
  },
  featured: {
    type: Boolean,
    default: false
  },
  recommended: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);