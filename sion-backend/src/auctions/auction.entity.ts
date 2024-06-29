import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Item } from '../items/item.entity';
import { Bid } from '../bids/bid.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/entities/user.entity';

import { AuctionStatuses, AuctionType } from '../enums';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'timestamptz',
    default: () => 'now()',
  })
  public startDate: Date = new Date();

  @Column({
    type: 'timestamptz',
  })
  public endDate: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'now()',
  })
  public initialEndDate: Date;

  @Column({
    type: 'enum',
    enum: AuctionType,
    default: [AuctionType.autoExtend],
    array: true,
  })
  public auctionType?: AuctionType[];

  @Column({
    type: 'enum',
    enum: AuctionStatuses,
    default: AuctionStatuses.ACTIVE,
  })
  public auctionStatus?: AuctionStatuses;

  @Column({ type: 'float', default: 1 })
  public startingPrice: number;

  @Column({ type: 'float', nullable: true })
  public buyNowPrice?: number;

  @Column({ type: 'float' })
  public price: number;

  @Column({ type: 'float' })
  public bidIncrement = 0;

  @Column({ type: 'float', nullable: true })
  public grandAuctionStartPrice?: number;

  @ManyToOne(() => User, (user) => user.auctionsWon)
  public soldToUser: User;

  @ManyToOne(() => User, (user) => user.auctions)
  @JoinColumn({ name: 'createdByUserId' })
  public createdByUser: User;

  @Column()
  public createdByUserId: string;

  @OneToMany(() => Bid, (bid) => bid.auction)
  public bids: Bid[];

  @OneToMany(() => Comment, (comment) => comment.auction)
  public comments: Comment[];

  @OneToOne(() => Item)
  @JoinColumn({ name: 'itemId' })
  public item: Item;

  @Column()
  public itemId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
