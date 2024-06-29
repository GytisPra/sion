import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

import { Item } from '../items/item.entity';

import { CategoriesTypes } from '../enums';

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({
    unique: true,
  })
  public title: string;

  @TreeParent()
  public parentCategory: Category;

  @TreeChildren()
  public childrenCategory: Category | Category[];

  @OneToMany(() => Item, (item) => item.category)
  public items: Item[];

  @Column({
    type: 'enum',
    enum: CategoriesTypes,
  })
  public type: CategoriesTypes;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
