import { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Category } from '../entitiy/Category';
import { Food } from '../entitiy/Food';
import { Restaurant } from '../entitiy/Restaurant';

// const createcategoryrel = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   //   res.json('hiii relation');
//   //   // const { restName, catName } = req.body;
//   //   const { catName, name, address, image } = req.body;
//   //   // const restExist = await Restaurant.findOneBy({ name: restName });
//   //   const catExist = await Category.findOneBy({ name: catName });
//   //   // console.log(restExist);
//   //   console.log(catExist);
//   //   // if (restExist && catExist) {
//   //   // const id = restExist.id;
//   //   // const newCategory = await AppDataSource.createQueryBuilder()
//   //   //   .insert()
//   //   //   .into(Category)
//   //   //   .values({
//   //   //     name: '',
//   //   //     restaurant: [restExist],
//   //   //   })
//   //   //   .returning('*')
//   //   //   .execute();
//   //   //   console.log(restExist);
//   //   // console.log(newCategory);
//   //   // const question = new Restaurant();
//   //   // question.id = id;
//   //   // question.restaurant = [restExist];
//   //   // await AppDataSource.manager.save(question);
//   //   if (catExist) {
//   //     const restaurant = new Restaurant();
//   //     restaurant.name = name;
//   //     restaurant.address = address;
//   //     restaurant.image = image;
//   //     restaurant.category = [catExist];
//   //     await AppDataSource.manager.save(restaurant);
//   //     console.log(restaurant);
//   //   } else {
//   //     console.log('error ');
//   //   }
// };

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  try {
    if (id) {
      const getCategory = await AppDataSource.getRepository(Category)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.restaurant', 'restaurantCategory')
        .leftJoinAndSelect('restaurantCategory.relRestaurant', 'restaurant')
        .where({ id: id })
        .getOne();
      res.status(201).json({ data: getCategory });
    } else {
      const getCategory = await AppDataSource.getRepository(Category)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.restaurant', 'restaurantCategory')
        .leftJoinAndSelect('restaurantCategory.relRestaurant', 'restaurant')
        .getMany();
      res.status(201).json({ data: getCategory });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Some Error has happen' });
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (typeof name === 'string' && name.length > 1) {
      const newCategory = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Category)
        .values({
          name: name,
        })
        .returning('*')
        .execute();

      res.status(201).json({ data: newCategory.raw[0] });
    } else {
      res.status(404).json({ message: 'Name must be string' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const { name } = req.body;
    const categoryExist = await AppDataSource.getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id=:id', { id: id })
      .execute();
    // console.log(categoryExist.length);
    // console.log(typeof categoryExist);
    if (categoryExist?.length) {
      const newupdatedCategory = await AppDataSource.createQueryBuilder()
        .update(Category)
        .set({ name: name })
        .where({ id: id })
        .returning('*')
        .execute();

      res.status(200).json({ data: newupdatedCategory.raw[0] });
    } else {
      res.status(404).json({ message: "Category Doesn't Exist" });
    }
  } catch (error) {
    res.status(404).json({ data: 'SomeKind of Error', error: error.message });
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const deleteCategory = await AppDataSource.getRepository(Category)
      .createQueryBuilder('category')
      .delete()
      .where('category.id=:id', { id: id })
      .returning('*')
      .execute();

    res.status(200).json({ data: deleteCategory.raw[0] });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
  // createcategoryrel,
};
