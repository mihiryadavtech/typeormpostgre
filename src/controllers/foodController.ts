import { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Food } from '../entities/Food';

const getFood = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (id) {
    const getFood = await AppDataSource.getRepository(Food)
      .createQueryBuilder('food')
      .where({ id: id })
      .getOne();
    res.status(201).json({ data: getFood });
  } else {
    const getFood = await AppDataSource.getRepository(Food)
      .createQueryBuilder('food')
      .getMany();
    res.status(201).json({ data: getFood });
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
    const { name, address, image } = req.body;

    const newupdatedFood = await AppDataSource.createQueryBuilder()
      .update(Food)
      .set({ name: name, address: address, image: image })
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

export { createFood, deleteFood, getFood, updateFood };
