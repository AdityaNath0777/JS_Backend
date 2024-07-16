import mongoose from 'mongooose';

// mini-model -> it is only used by orderSchema
// thus no need to make a separate file and export it
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: {
      type: [orderItemSchema],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enums: ['PENDING', 'DELIVERED', 'CANCELED'],
      default: 'PENDING',
    },
  },
  { timstamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
