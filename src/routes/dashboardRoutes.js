import express from 'express';
import { getSummary, getCategoryTotals, getRecentActivity } from '../services/dashboardService.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/summary', getSummary);
router.get('/categories', getCategoryTotals);
router.get('/recent', getRecentActivity);

export default router;
