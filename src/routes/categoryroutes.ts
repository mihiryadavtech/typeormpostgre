import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from '../controllers/categoryController';
const router = Router();
router.get('/category', getCategory);
router.post('/category', createCategory);
router.patch('/category', updateCategory);
router.delete('/category', deleteCategory);

export { router as categoryRouter };
