const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 300 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roadmapItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoadmapItem",
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  depth: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

commentSchema.pre("save", async function (next) {
  if (this.parentId) {
    const parent = await this.constructor.findById(this.parentId);
    if (parent.depth >= 3) {
      return next(new Error("Maximum reply depth reached"));
    }
    this.depth = parent.depth + 1;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
