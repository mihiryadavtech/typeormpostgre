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

import { Restaurant } from './Restaurant';
import { Category } from './Category';
import { Food } from './Food';

@Entity('restaurantCategory')
export class RestaurantCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToMany(() => Category, (category) => category.restaurants)
  //   @JoinTable()
  //   category: Category[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.category, {
    onDelete: 'CASCADE',
  })
  relRestaurant: Restaurant;

  @ManyToOne(() => Category, (category) => category.restaurant, {
    onDelete: 'SET NULL',
  })
  relCategory: Category;

  @OneToMany(() => Food, (food) => food.restaurant)
  food: Food[];
}
