import postMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postMessage.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

export const createPosts = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({ message: "unautherized" });
  }

  let post = req.body;
  try {
    const newPost = new postMessage({ ...post, creatorId: userId, createdAt: new Date().toISOString() });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

export const likePost = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(403).json({ message: "unautherized" });
  }

  const postId = req.body.id;

  try {
    const post = await postMessage.findById(postId);
    if (post) {
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((id) => id !== userId);
        await post.save();
        return res.status(200).json(post);
      } else {
        post.likes.push(userId);
        await post.save();
        return res.status(200).json(post);
      }
    } else {
      res.status(404).json({ message: "no post with that id" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const deletePost = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(403).json({ message: "unautherized" });
  }
  const id = req.body.id;
  try {
    await postMessage.findByIdAndDelete(id);
    res.status(200).json();
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
};
