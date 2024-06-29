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
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @Column({ type: 'float' })
  public value: number;

  @ManyToOne(() => Auction, (auction) => auction.bids)
  public auction: Auction;

  @ManyToOne(() => User, (user) => user.bids)
  public user: User;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  public updatedAt: Date;
}
