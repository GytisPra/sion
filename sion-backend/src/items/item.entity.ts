import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Auction } from '../auctions/auction.entity';
import { ItemImage } from '../files/itemImage.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @OneToMany(() => ItemImage, (itemImage) => itemImage.item)
  public images: ItemImage[];

  @ManyToOne(() => User, (user) => user.items)
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column()
  public userId: string;

  @Column()
  public brand: string;

  @Column()
  public categoryGroupId: string;

  @ManyToOne(() => Category, (categoryGroup) => categoryGroup.items)
  @JoinColumn({ name: 'categoryGroupId' })
  public categoryGroup: Category;

  @Column()
  public categoryId: string;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @Column({
    nullable: true,
  })
  public subcategoryId?: string;

  @ManyToOne(() => Category, (subcategory) => subcategory.items)
  @JoinColumn({ name: 'subcategoryId' })
  public subcategory?: Category;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @OneToOne(() => Auction, (auction: Auction) => auction.item)
  public auction: Auction;
}
