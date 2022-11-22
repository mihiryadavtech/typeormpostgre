import { Router } from 'express';
import {
  createRestaurant,
  createrestrelation,
  deleteRestaurant,
  getRestaurant,
  updateRestaurant,
} from '../controllers/resturantController';
const router = Router();
router.get('/rest', getRestaurant);
router.post('/rest', createRestaurant);
router.post('/createrestrel',createrestrelation)
router.patch('/rest', updateRestaurant);
router.delete('/rest', deleteRestaurant);

export { router as restaurantRouter };
