const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/auth");

router.get("/", commentController.getComments);
router.post("/", authMiddleware, commentController.addComment);
router.put("/:id", authMiddleware, commentController.editComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
