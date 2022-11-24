import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  BaseEntity,
} from 'typeorm';
import { Category } from './Category';
import { Restaurant } from './Restaurant';
import File from './file';

@Entity('food')
export class Food extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ nullable: true, type: 'jsonb' })
  image: File;

  @ManyToOne(() => Category, (category) => category.food)
  category: Category;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.food)
  restaurant: Restaurant;
}
