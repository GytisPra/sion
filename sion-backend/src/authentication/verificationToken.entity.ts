import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerificationToken {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @Column()
  public userId: string;

  @Column()
  public code: string;

  @Column({
    type: 'timestamptz',
  })
  public expiresAt: Date;
}
