import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ResetPasswordToken')
export class ResetPasswordToken {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @Column()
  public userId: string;

  @Column()
  public token: string;

  @Column({
    type: 'timestamptz',
  })
  public expiresAt: Date;
}
