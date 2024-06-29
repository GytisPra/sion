import { Item } from '../../items/item.entity';
import { Bid } from '../../bids/bid.entity';
import { Auction } from '../../auctions/auction.entity';
import { Category } from '../../categories/category.entity';

export class PaginationDto {
  page = 1;
  limit = 10;
}
export class PaginatedBidsResultDto extends PaginationDto {
  data: Bid[];
  totalCount: number;
}
export class PaginatedItemsResultDto extends PaginationDto {
  data: Item[];
  totalCount: number;
}
export class PaginatedAuctionsResultDto extends PaginationDto {
  data: Auction[];
  totalCount: number;
}
export class PaginatedCategoriesResultDto extends PaginationDto {
  data: Category[];
  totalCount: number;
}
