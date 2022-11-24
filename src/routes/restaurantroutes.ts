import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  createRestaurant,
  createrestrelation,
  deleteRestaurant,
  getRestaurant,
  updateRestaurant,
  getRestaurantImage,
} from '../controllers/resturantController';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

const router = Router();
router.get('/rest', getRestaurant);
router.post('/rest', upload.single('image'), createRestaurant);
router.get('/restimage', getRestaurantImage);
router.post('/createrestrel', createrestrelation);
router.patch('/rest', upload.single('image'), updateRestaurant);
router.delete('/rest', deleteRestaurant);

export { router as restaurantRouter };
