import { Item } from '../../../items/item.entity';
import { ItemImage } from '../../../files/itemImage.entity';
import { v4 as uuidV4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { plainItem } from './plainItem';

const item = plainToClass(Item, plainItem);

export const plainItemImage: ItemImage = {
  item,
  itemId: item.id,
  id: '1',
  url: 'https://google.com',
  key: uuidV4(),
};
