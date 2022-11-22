import { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Food } from '../entitiy/Food';
import { Category } from '../entitiy/Category';
import { Restaurant } from '../entitiy/Restaurant';

const createFoodRestaurantCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // res.send('food relation');
    const { categoryId, restaurantId } = req.query;
    const { name, price, image } = req.body;

    const restaurantExist = await AppDataSource.getRepository(Restaurant)
      .createQueryBuilder('restaurant')
      .where('restaurant.id=:id', { id: restaurantId })
      .execute();
    console.log('======>>>>>>', restaurantExist);

    const categoryExist = await AppDataSource.getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id=:id', { id: categoryId })
      .execute();

    if (restaurantExist && categoryExist) {
      const foodExist = await AppDataSource.getRepository(Food)
        .createQueryBuilder('food')
        .where('food.name =:name', { name: name })
        .andWhere('food.categoryId = :catId', {
          catId: categoryExist[0].category_id,
        })
        .andWhere('food.restaurantId = :restId', {
          restId: restaurantExist[0].restaurant_id,
        })
        .execute();

      if (foodExist.length) {
        res.status(200).json({ messsage: 'Food   Exist' });
      } else {
        const newFood = await AppDataSource.createQueryBuilder()
          .insert()
          .into(Food)
          .values({
            name: name,
            price: price,
            image: image,
            category: categoryExist[0].category_id,
            restaurant: restaurantExist[0].restaurant_id,
          })
          .returning('*')
          .execute();
        res.status(200).json({ data: newFood.raw });
      }
    } else {
      res.status(404).json({ data: 'First Add Category And Restaurant' });
    }
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

const getFood = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  try {
    if (id) {
      const getFood = await AppDataSource.getRepository(Food)
        .createQueryBuilder('food')
        .leftJoinAndSelect('food.restaurant', 'restaurant')
        .leftJoinAndSelect('food.category', 'category')
        // .leftJoinAndSelect('restaurant.category', 'restaurantCategory')
        // .leftJoinAndSelect('restaurantCategory.relCategory', 'category')
        // .where({ id: id })
        // .getOne();
        .where({ id: id })
        .getOne();
      res.status(201).json({ data: getFood });
    } else {
      const getFood = await AppDataSource.getRepository(Food)
        .createQueryBuilder('food')
        .leftJoinAndSelect('food.restaurant', 'restaurant')
        .leftJoinAndSelect('food.category', 'category')
        .getMany();
      res.status(201).json({ data: getFood });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'SomeKind of error' });
  }
};

const createFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, image } = req.body;
    const newFood = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Food)
      .values({
        name: name,
        price: price,
        image: image,
      })
      .returning('*')
      .execute();

    res.status(201).json({ data: newFood.raw });
  } catch (error) {
    console.log(error);
  }
};

const updateFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.query;
    const { name, price, image } = req.body;

    const newupdatedFood = await AppDataSource.createQueryBuilder()
      .update(Food)
      .set({ name: name, price: price, image: image })
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: newupdatedFood });
  } catch (error) {
    console.log(error);
  }
};

const deleteFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json('hiiii delete')
    const { id } = req.query;
    const deleteFood = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Food)
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: deleteFood.raw });
  } catch (error) {
    console.log(error);
  }
};

export {
  createFood,
  deleteFood,
  getFood,
  updateFood,
  createFoodRestaurantCategory as foodrel,
};
