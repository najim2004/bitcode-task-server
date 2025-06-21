const express = require("express");
const router = express.Router();
const roadmapController = require("../controllers/roadmapController");
const authMiddleware = require("../middleware/auth");

router.get("/", roadmapController.getRoadmapItems);
router.post("/:id/upvote", authMiddleware, roadmapController.upvoteItem);

module.exports = router;
