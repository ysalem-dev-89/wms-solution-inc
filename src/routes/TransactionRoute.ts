import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const router = Router();

router.delete('/:id', TransactionController.deleteOneTransaction);
router.post('/', TransactionController.createNewTransaction);
router.put('/:id', TransactionController.updateOneTransaction);
router.get('/:id', TransactionController.getOneTransaction);
router.get('/', TransactionController.getTransactions);

export default router;
