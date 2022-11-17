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

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  name: string;

  @Column()
  address: string;

  @Column()
  image: string;

  @ManyToMany(() => Category, (category) => category.restaurant)
  @JoinTable()
  category: Category[];

  @OneToMany(() => Food, (food) => food.restaurant)
  food: Food[];
}
