import { Router } from 'express';
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  updateRestaurant,
} from '../controllers/resturantControl';
const router = Router();
router.get('/rest', getRestaurant);
router.post('/rest', createRestaurant);

router.patch('/rest', updateRestaurant);
router.delete('/rest', deleteRestaurant);

export { router as restaurantRouter };
