import express from 'express';
import { login, signup, verifyToken } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/signup', signup);
router.get('/verify', verifyToken);

// Protected route example
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;