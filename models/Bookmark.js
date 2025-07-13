import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: String,
  description: String,
  tags: [String],
  favorite: { type: Boolean, default: false },
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
}, { timestamps: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
