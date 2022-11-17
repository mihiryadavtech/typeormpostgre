import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppDataSource } from './db';

import express, { Express, NextFunction, Request, Response } from 'express';
import { foodRouter } from './routes/foodroutes';
import { restaurantRouter } from './routes/restaurantroutes';
import { categoryRouter } from './routes/categoryroutes';
const app = express();
const main = async () => {
  try {
    await AppDataSource.initialize();

    // await AppDataSource.initialize().catch((e) => console.log({ e }));
    // console.log('connected to Database');

    app.use(express.json());

    app.use('/api/v1', foodRouter);
    app.use('/api/v1', categoryRouter);
    app.use('/api/v1', restaurantRouter);

    app.use('/api', (req: Request, res: Response, next: NextFunction) => {
      res.json('hii there mihir');
    });
    app.listen(8000, () => {
      console.log('Listening On port 8000');
    });
  } catch (error) {
    console.log(error);
  }
};
main();
