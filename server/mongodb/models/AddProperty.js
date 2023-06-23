import mongoose from 'mongoose';

const Property = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  short_address: { type: String, required: true },
  complete_address: { type: String, required: true },
  desc: { type: String, required: true },
  property_type: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'NewUser' }, // Reference to User schema
});

const PropertySchema = new mongoose.model('Properties', Property);

export default PropertySchema;
