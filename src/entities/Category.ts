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

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurant: Restaurant[];

  @OneToMany(() => Food, (food) => food.category)
  food: Food[];
}
