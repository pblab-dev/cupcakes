import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  cupcake: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  couponCode: {
    type: String
  },
  discount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

cartSchema.methods.updateTotal = async function() {
  const populatedCart = await this.populate('items.cupcake');
  this.total = populatedCart.items.reduce((sum, item) => {
    return sum + (item.cupcake.price * item.quantity);
  }, 0);
  
  if (this.discount) {
    this.total = this.total * (1 - this.discount);
  }
  
  return this.save();
};

export default mongoose.model('Cart', cartSchema);