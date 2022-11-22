import { Router } from 'express';
import {
  createCategory,
  // createcategoryrel,
  deleteCategory,
  getCategory,
  updateCategory,
} from '../controllers/categoryController';
const router = Router();
router.get('/category', getCategory);
router.post('/category', createCategory);
// router.post('/catrel', createcategoryrel);
router.patch('/category', updateCategory);
router.delete('/category', deleteCategory);

export { router as categoryRouter };
