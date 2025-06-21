const Comment = require("../models/Comment");
const asyncHandler = require("../utils/asyncHandler");

exports.addComment = asyncHandler(async (req, res) => {
  const { content, roadmapItem, parentId } = req.body;
  const userId = req.userId;
  if (content.length > 300) {
    return res.status(400).json({ message: "Comment exceeds 300 characters" });
  }
  const comment = new Comment({ content, user: userId, roadmapItem, parentId });
  await comment.save();
  const populatedComment = await Comment.findById(comment._id).populate(
    "user",
    "email"
  );
  res.status(201).json(populatedComment);
});

exports.editComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.userId;
  if (content.length > 300) {
    return res.status(400).json({ message: "Comment exceeds 300 characters" });
  }
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (comment.user.toString() !== userId) {
    return res.status(403).json({ message: "Not authorized" });
  }
  comment.content = content;
  await comment.save();
  res.json(comment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (comment.user.toString() !== userId) {
    return res.status(403).json({ message: "Not authorized" });
  }
  await Comment.deleteMany({ $or: [{ _id: id }, { parentId: id }] });
  res.json({ message: "Comment deleted" });
});

exports.getComments = asyncHandler(async (req, res) => {
  const { roadmapItem } = req.query;
  const comments = await Comment.find({ roadmapItem, parentId: null })
    .populate("user", "email")
    .lean();
  const populateReplies = async (comment) => {
    const replies = await Comment.find({ parentId: comment._id })
      .populate("user", "email")
      .lean();
    comment.replies = await Promise.all(replies.map(populateReplies));
    return comment;
  };
  const nestedComments = await Promise.all(comments.map(populateReplies));
  res.json(nestedComments);
});
