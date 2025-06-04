import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String },
  price: { type: Number },
});

export default mongoose.model("Product", productSchema);

// const product = mongoose.model("Product", productSchema);

