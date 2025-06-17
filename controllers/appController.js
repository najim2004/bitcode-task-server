import RoadmapItem from '../models/roadmapItemModel.js';
import Comment from '../models/commentModel.js';

export const getRoadmapItems = async (req, res) => {
    try {
        const roadmapItems = await RoadmapItem.find();
        res.status(200).json(roadmapItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const upvoteRoadmapItem = async (req, res) => {
    try {
        const roadmapItemId = req.params.id;
        const userId = req.user.id;

        const roadmapItem = await RoadmapItem.findById(roadmapItemId);

        if (!roadmapItem) {
            return res.status(404).json({ message: 'Roadmap item not found' });
        }

        if (roadmapItem.upvotes.includes(userId)) {
            return res.status(400).json({ message: 'You have already upvoted this item' });
        }

        roadmapItem.upvotes.push(userId);
        await roadmapItem.save();

        res.status(200).json({ message: 'Roadmap item upvoted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addComment = async (req, res) => {
    try {
        const roadmapItemId = req.params.id;
        const userId = req.user.id;
        const { text } = req.body;

        const roadmapItem = await RoadmapItem.findById(roadmapItemId);

        if (!roadmapItem) {
            return res.status(404).json({ message: 'Roadmap item not found' });
        }

        const newComment = new Comment({
            text,
            author: userId,
            roadmapItem: roadmapItemId
        });

        await newComment.save();

        roadmapItem.comments.push(newComment._id);
        await roadmapItem.save();

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;
        const { text } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this comment' });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const replyToComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;
        const { text } = req.body;

        const parentComment = await Comment.findById(commentId);

        if (!parentComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const newComment = new Comment({
            text,
            author: userId,
            parentComment: commentId,
            roadmapItem: parentComment.roadmapItem
        });

        await newComment.save();

        parentComment.replies.push(newComment._id);
        await parentComment.save();

        res.status(201).json({ message: 'Reply added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
