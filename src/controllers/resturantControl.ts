import { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Restaurant } from '../entities/Restaurant';

const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  if (id) {
    const getRestaurant = await AppDataSource.getRepository(Restaurant)
      .createQueryBuilder('resturant')
      .where({ id: id })
      .getOne();
    res.status(201).json({ data: getRestaurant });
  } else {
    const getRestaurant = await AppDataSource.getRepository(Restaurant)
      .createQueryBuilder('resturant')
      .getMany();
    res.status(201).json({ data: getRestaurant });
  }
};

const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, address, image } = req.body;
    const newRestaurant = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Restaurant)
      .values({
        name: name,
        address: address,
        image: image,
      })
      .returning('*')
      .execute();

    res.status(201).json({ data: newRestaurant.raw });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const { name, address, image } = req.body;

    const newupdatedRestaurant = await AppDataSource.createQueryBuilder()
      .update(Restaurant)
      .set({ name: name, address: address, image: image })
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: newupdatedRestaurant });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const deleteRestaurant = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Restaurant)
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: deleteRestaurant.raw });
  } catch (error) {
    console.log(error);
  }
};

export { createRestaurant, deleteRestaurant, getRestaurant, updateRestaurant };
