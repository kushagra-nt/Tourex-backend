import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  creatorId: String,
  imageUrl: String,
  likes: {
    type: [],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const PostMessage = mongoose.model("Posts", postSchema);

export default PostMessage;
