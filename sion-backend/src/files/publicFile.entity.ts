import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PublicFile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public url?: string;

  @Column()
  public key: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  public data?: Uint8Array;
}
