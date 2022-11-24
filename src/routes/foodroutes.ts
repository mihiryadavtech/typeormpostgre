import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  createFood,
  deleteFood,
  foodrel,
  getFood,
  updateFood,
} from '../controllers/foodController';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/food');
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const router = Router();
router.get('/food', getFood);
router.post('/food', upload.single('image'), createFood);
router.post('/foodrel', upload.single('image'), foodrel);
router.patch('/food', upload.single('image'), updateFood);
router.delete('/food', deleteFood);

export { router as foodRouter };
