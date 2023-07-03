import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verficationCode: Number,
  isVerified: { type: Boolean, default: false },
  mobile: String,
});

export default mongoose.model('Account', accountSchema);
