import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Item } from '../items/item.entity';
import { PublicFile } from './publicFile.entity';

@Entity()
export class ItemImage extends PublicFile {
  @ManyToOne(() => Item, (item) => item.images)
  @JoinColumn({ name: 'itemId' })
  public item: Item;

  @Column()
  public itemId: string;
}
