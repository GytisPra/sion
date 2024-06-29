import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

import { NotificationTypes } from '../enums/notificationTypes.enum';
import { User } from '../users/entities/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @ManyToOne(() => User, (user) => user.notifications)
  public user: User;

  @Column({
    type: 'enum',
    enum: NotificationTypes,
  })
  @Transform(({ value }) => {
    if (value !== null) {
      return value;
    }
  })
  public type: NotificationTypes;

  @Column({
    default: false,
  })
  public isSeen: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  public createdAt: Date;
}
