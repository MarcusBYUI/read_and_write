const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    excerpt: req.body.excerpt,
  });

  post
    .save()
    .then((createdpost) => {
      res.status(201).json({
        message: "Post added successfully",
        post: createdpost,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", async (req, res, next) => {
  //const result = await Post.updateOne({_id: req.params.id}, {$set: {}})
  Post.findById(req.params.id)
    .then((post) => {
      (post.title = req.body.title),
        (post.content = req.body.content),
        (post.excerpt = req.body.excerpt),
        Post.updateOne({ id: req.params.id }, post)
          .then((result) => {
            res.status(204).json({
              message: "Post updated successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "An error occurred",
              error: error,
            });
          });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Post not found.",
        error: { post: "Post not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Post.findOne({ id: req.params.id })
    .then((post) => {
      Post.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Post deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Post not found.",
        error: { post: "Post not found" },
      });
    });
});

module.exports = router;
