const express = require("express");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const router = express.Router();
router.post("/new", postController.createPost);
router.get("/all", postController.getPosts);
//get comments of specific post
router.get("/:post_id/comments", commentController.getComments);
router.get("/:post_id", postController.getPostsByPostID);
module.exports = router;
