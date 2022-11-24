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
import File from './file';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  address: string;

  @Column({ nullable: true, type: 'jsonb' })
  image: File;
  // image: ()=>{};

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
