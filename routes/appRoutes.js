import express from 'express';
import {
    getRoadmapItems,
    upvoteRoadmapItem,
    addComment,
    editComment,
    deleteComment,
    replyToComment
} from '../controllers/appController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/roadmap', verifyToken, getRoadmapItems);
router.post('/roadmap/:id/upvote', verifyToken, upvoteRoadmapItem);
router.post('/roadmap/:id/comment', verifyToken, addComment);
router.put('/comment/:id', verifyToken, editComment);
router.delete('/comment/:id', verifyToken, deleteComment);
router.post('/comment/:id/reply', verifyToken, replyToComment);

export default router;
