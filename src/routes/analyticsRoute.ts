import { Router } from 'express';
import AnalyticsController from '../controllers/AnalyticsController';

const router = Router();

router.get('/revenue/:year', AnalyticsController.getMonthlyRevenue);
router.get('/total', AnalyticsController.getTotalStatistics);
router.get('/topselling', AnalyticsController.getTopSelling);
router.get('/stockalert', AnalyticsController.getStockAlert);

export default router;
