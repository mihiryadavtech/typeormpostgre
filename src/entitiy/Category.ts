import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { Food } from './Food';
import { Restaurant } from './Restaurant';
import { RestaurantCategory } from './RestaurantCategory';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;

  // @ManyToMany(() => Restaurant, (restaurant) => restaurant.category)
  // restaurants: Restaurant[];
  @OneToMany(
    () => RestaurantCategory,
    (restaurantCategory) => restaurantCategory.relCategory,
    {
      onDelete: 'CASCADE',
    }
  )
  restaurant: RestaurantCategory[];

  @OneToMany(() => Food, (food) => food.category)
  food: Food[];
}

// photo => photo.metadata is a function that returns the name of the inverse side of the relation. Here we show that the metadata property of the Photo class is where we store PhotoMetadata in the Photo class. Instead of passing a function that returns a property of the photo, you could alternatively simply pass a string to @OneToOne decorator, like "metadata". But we used this function-typed approach to make our refactoring easier.
