import { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Category } from '../entities/Category';

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (id) {
    const getCategory = await AppDataSource.getRepository(Category)
      .createQueryBuilder('category')
      .where({ id: id })
      .getOne();
    res.status(201).json({ data: getCategory });
  } else {
    const getCategory = await AppDataSource.getRepository(Category)
      .createQueryBuilder('category')
      .getMany();
    res.status(201).json({ data: getCategory });
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newCategory = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Category)
      .values({
        name: name,
      })
      .returning('*')
      .execute();

    res.status(201).json({ data: newCategory.raw });
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const { name, address, image } = req.body;
    const newupdatedCategory = await AppDataSource.createQueryBuilder()
      .update(Category)
      .set({ name: name })
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: newupdatedCategory });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const deleteCategory = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Category)
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: deleteCategory.raw });
  } catch (error) {
    console.log(error);
  }
};

export { createCategory, deleteCategory, getCategory, updateCategory };
