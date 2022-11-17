import { Router } from 'express';
import {
  createFood,
  deleteFood,
  getFood,
  updateFood,
} from '../controllers/foodController';
const router = Router();
router.get('/food', getFood);
router.post('/food', createFood);
router.patch('/food', updateFood);
router.delete('/food', deleteFood);

export { router as foodRouter };
