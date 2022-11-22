import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Category } from './Category';
import { Food } from './Food';
import { RestaurantCategory } from '../entitiy/RestaurantCategory';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  image: string;

  @OneToMany(
    () => RestaurantCategory,
    (restaurantCategory) => restaurantCategory.relRestaurant,
    {
      onDelete: 'CASCADE',
    }
  )
  category: RestaurantCategory[];

  @OneToMany(() => Food, (food) => food.restaurant)
  food: Food[];
}
