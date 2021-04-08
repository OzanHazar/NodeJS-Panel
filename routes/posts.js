const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get("/list", postController.getPostList);

router.get("/add", postController.getPostAdd);

router.post("/add", postController.postPostAdd);

router.get("/approve", postController.getPostApprove);

router.post("/approve", postController.postPostApprove);

module.exports = router;