import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productImage: {
      // we store the path of the img
      // MDB can store it but it will make the DB heavy
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timstamps: true }
);

export const Product = mongoose.model('Product', productSchema);
