import { Entity, ManyToOne } from 'typeorm';

import { PublicFile } from './publicFile.entity';
import { User } from '../users/entities/user.entity';

@Entity()
export class UserImage extends PublicFile {
  @ManyToOne(() => User, (user) => user.userImages)
  public user: User;
}
