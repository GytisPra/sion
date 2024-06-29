import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUser } from '../interfaces/users.interface';

import { Role, Level } from '../../enums';

import { Auction } from '../../auctions/auction.entity';
import { Item } from '../../items/item.entity';
import { Bid } from '../../bids/bid.entity';
import { Notification } from '../../notifications/notification.entity';
import { Comment } from '../../comments/comment.entity';
import { UserImage } from '../../files/userImage.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToMany(() => UserImage, (userImage) => userImage.user)
  public userImages: UserImage[];

  @OneToMany(() => Item, (item) => item.user)
  public items: Item[];

  @OneToMany(() => Bid, (bid) => bid.user)
  public bids: Bid[];

  @OneToMany(() => Notification, (notification) => notification.user)
  public notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[];

  @OneToMany(() => Auction, (auction) => auction.soldToUser)
  public auctionsWon: Auction[];

  @OneToMany(() => Auction, (auction) => auction.createdByUser)
  public auctions: Auction[];

  @Column({
    nullable: true,
  })
  public username: string | null;

  @Column({ unique: true })
  public email: string;

  @Column({
    nullable: true,
  })
  public firstname: string | null;

  @Column({
    nullable: true,
  })
  public lastname: string | null;

  @Column()
  public password: string;

  @Column({
    type: 'float',
    default: 10,
  })
  public karmaPoints: number;

  @Column({ nullable: true })
  public phone: string | null;

  @Column({
    nullable: true,
  })
  public currentHashedRefreshToken: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  public roles: Role[];

  @Column({
    type: 'enum',
    enum: Level,
    nullable: true,
    default: null,
  })
  public level: Level | null;

  @Column({
    default: false,
  })
  public isVerified: boolean;

  @Column({
    default: false,
  })
  public isResetPasswordStarted: boolean;

  @Column({
    type: 'timestamptz',
    default: 'now()',
  })
  public verificationSentAt: Date;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  public verifiedAt: Date | null;

  @Column({
    nullable: true,
  })
  provider: string | null;

  @Column({
    nullable: true,
  })
  providerId: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
