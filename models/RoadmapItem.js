const mongoose = require("mongoose");

const roadmapItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Feature", "Bug", "Enhancement", "Authentication", "Features"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Planned", "In Progress", "Completed"],
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    author: { type: String, required: true },
  },
  {
    timestamps:true,
  }
);

module.exports = mongoose.model("RoadmapItem", roadmapItemSchema);
