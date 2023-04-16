import express from "express";
import auth from "../middleware/auth.js";
import { getPosts, createPosts, likePost, deletePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPosts);
router.post("/like", auth, likePost);
router.post("/delete", auth, deletePost);

export default router;
