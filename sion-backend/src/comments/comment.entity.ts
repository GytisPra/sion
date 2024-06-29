import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Auction } from '../auctions/auction.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public comment: string;

  @ManyToOne(() => Auction, (auction) => auction.comments)
  public auction: Auction;

  @ManyToOne(() => User, (user) => user.comments)
  public user: User;

  @CreateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: new Date(),
    onUpdate: 'new Date()',
  })
  public updatedAt: Date;
}
