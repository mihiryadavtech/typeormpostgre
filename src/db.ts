import { DataSource } from 'typeorm';
import { Restaurant } from './entities/Restaurant';
import { Category } from './entities/Category';
import { Food } from './entities/Food';
// import path from 'path';
// const entiities = path.join(__dirname, 'entities');
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'foodbase',
  //   entities: [Category, Restaurant, Food],
  // entities: ['entities/*.ts'],
  entities: [Category, Restaurant, Food],
  //   entities: ['entities/**/*.ts'],
  //   entities:[path.join(entiities,'/**/*.ts')],
  synchronize: true,
  logging: false,
});
export { AppDataSource };
