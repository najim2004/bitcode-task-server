const RoadmapItem = require("../models/RoadmapItem");
const asyncHandler = require("../utils/asyncHandler");

exports.getRoadmapItems = asyncHandler(async (req, res) => {
  const { category, status, sort } = req.query;
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;
  const items = await RoadmapItem.find(query)
    .sort(sort === "popularity" ? { upvotes: -1 } : { createdAt: -1 })
    .lean();
  res.json(items);
});

exports.upvoteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const item = await RoadmapItem.findById(id);
  if (!item) {
    return res.status(404).json({ message: "Roadmap item not found" });
  }
  if (item.upvotes.includes(userId)) {
    item.upvotes = item.upvotes.filter(
      (uid) => uid.toString() !== userId.toString()
    );
  } else {
    item.upvotes.push(userId);
  }
  await item.save();
  res.json(item);
});
